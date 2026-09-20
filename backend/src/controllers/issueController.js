import Issue from '../models/Issue.js';
import { calculateSLA, mockAICategorize, defaultDepartments } from '../utils/helpers.js';

// @desc    Fetch all issues
// @route   GET /api/issues
// @access  Public
export const getIssues = async (req, res) => {
  try {
    const { category, status, priority, search } = req.query;
    
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;
    if (priority && priority !== 'All') query.priority = priority;

    if (search) {
      const q = new RegExp(search, 'i');
      query.$or = [
        { title: q },
        { description: q },
        { customId: q },
        { 'location.address': q }
      ];
    }

    const issues = await Issue.find(query)
      .populate('reporter', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: issues.length, data: issues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single issue
// @route   GET /api/issues/:id
// @access  Public
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findOne({ customId: req.params.id }).populate('reporter', 'name avatar role');
    
    if (issue) {
      res.json({ success: true, data: issue });
    } else {
      res.status(404).json({ success: false, message: 'Issue not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create an issue
// @route   POST /api/issues
// @access  Private
export const createIssue = async (req, res) => {
  try {
    const { title, description, category, priority, location, image } = req.body;

    if (!title || !description || !category || !image) {
      return res.status(400).json({ success: false, message: 'Please provide title, description, category, and image' });
    }

    const selectedPriority = priority || 'Medium';
    const assignedDept = defaultDepartments[category] || 'General Municipal Operations';

    const issue = new Issue({
      title,
      description,
      category,
      priority: selectedPriority,
      assignedDepartment: assignedDept,
      location: location || { address: 'Metropolitan District', lat: 37.7749, lng: -122.4194 },
      image,
      beforeAfterImage: {
        before: image,
        after: null
      },
      reporter: req.user._id, // Set from auth middleware
      aiDetection: mockAICategorize(title, description, category),
      slaDueDate: calculateSLA(selectedPriority),
      timeline: [
        {
          status: 'Reported',
          title: 'Issue Submitted & Categorized',
          note: `Logged via CityConnect portal. Auto-assigned routing to ${assignedDept}.`,
          actor: req.user.name
        }
      ]
    });

    const createdIssue = await issue.save();
    
    // Populate reporter info for immediate frontend use
    await createdIssue.populate('reporter', 'name avatar role');

    res.status(201).json({ success: true, data: createdIssue, message: 'Issue reported successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update issue status (Admin only)
// @route   PATCH /api/issues/:id/status
// @access  Private/Admin
export const updateIssueStatus = async (req, res) => {
  try {
    const { status, assignedDepartment, priority, note, afterImage } = req.body;
    
    const issue = await Issue.findOne({ customId: req.params.id });

    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    if (status) issue.status = status;
    if (assignedDepartment) issue.assignedDepartment = assignedDepartment;
    if (priority) issue.priority = priority;
    
    if (afterImage) {
      issue.beforeAfterImage.after = afterImage;
    }

    const timelineTitles = {
      'Reported': 'Status Reset to Reported',
      'Assigned': `Assigned to ${assignedDepartment || issue.assignedDepartment}`,
      'In Progress': 'Work Order Issued - Crews On Site',
      'Fixed': 'Resolution Work Completed',
      'Verified': 'Civic Resolution Verified & Archived'
    };

    issue.timeline.push({
      status: status || issue.status,
      title: timelineTitles[status] || `Updated to ${status}`,
      note: note || `Department status updated by ${req.user.name}.`,
      actor: `${req.user.name} (Admin)`
    });

    const updatedIssue = await issue.save();
    await updatedIssue.populate('reporter', 'name avatar role');

    res.json({ success: true, data: updatedIssue, message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upvote an issue
// @route   POST /api/issues/:id/upvote
// @access  Private
export const upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findOne({ customId: req.params.id });

    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    const hasUpvoted = issue.upvotedBy.includes(req.user._id);

    if (hasUpvoted) {
      issue.upvotes = Math.max(0, issue.upvotes - 1);
      issue.upvotedBy = issue.upvotedBy.filter(id => id.toString() !== req.user._id.toString());
    } else {
      issue.upvotes += 1;
      issue.upvotedBy.push(req.user._id);
    }

    await issue.save();

    res.json({ success: true, upvotes: issue.upvotes, upvoted: !hasUpvoted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Citizen verification
// @route   POST /api/issues/:id/verify
// @access  Private
export const verifyIssue = async (req, res) => {
  try {
    const { action, feedbackNote } = req.body;
    const issue = await Issue.findOne({ customId: req.params.id });

    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    // Only allow reporter to verify
    if (issue.reporter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Only the reporter can verify this issue' });
    }

    if (action === 'verify') {
      issue.status = 'Verified';
      issue.timeline.push({
        status: 'Verified',
        title: 'Resolution Verified by Resident',
        note: feedbackNote || 'Citizen confirmed issue resolution with high satisfaction.',
        actor: `${req.user.name} (Citizen)`
      });
    } else if (action === 'reopen') {
      issue.status = 'In Progress';
      issue.timeline.push({
        status: 'In Progress',
        title: 'Resolution Reopened by Resident',
        note: feedbackNote || 'Citizen indicated fix is incomplete or required further maintenance.',
        actor: `${req.user.name} (Citizen)`
      });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid action' });
    }

    const updatedIssue = await issue.save();
    await updatedIssue.populate('reporter', 'name avatar role');

    res.json({ success: true, data: updatedIssue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
