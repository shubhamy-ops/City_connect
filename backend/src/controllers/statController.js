import Issue from '../models/Issue.js';

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Public
export const getStats = async (req, res) => {
  try {
    const total = await Issue.countDocuments();
    const reported = await Issue.countDocuments({ status: 'Reported' });
    const inProgress = await Issue.countDocuments({ status: { $in: ['In Progress', 'Assigned'] } });
    const resolved = await Issue.countDocuments({ status: { $in: ['Fixed', 'Verified'] } });
    
    const now = new Date();
    const overdueCount = await Issue.countDocuments({
      status: { $nin: ['Fixed', 'Verified'] },
      slaDueDate: { $lt: now }
    });

    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    // Calculate real avgResolutionHours and weeklyResolutionData
    const resolvedIssues = await Issue.find({ status: { $in: ['Fixed', 'Verified'] } });
    
    let totalHours = 0;
    let resolvedCount = 0;
    const weeklyCounts = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    resolvedIssues.forEach(issue => {
       const reportedEvent = issue.timeline.find(t => t.status === 'Reported');
       const fixedEvent = issue.timeline.find(t => t.status === 'Fixed');
       
       if (reportedEvent && fixedEvent) {
          const diffMs = new Date(fixedEvent.timestamp) - new Date(reportedEvent.timestamp);
          totalHours += diffMs / (1000 * 60 * 60);
          resolvedCount++;
       }
       if (fixedEvent) {
          const dayName = days[new Date(fixedEvent.timestamp).getDay()];
          weeklyCounts[dayName]++;
       }
    });
    
    const avgResolutionHours = resolvedCount > 0 ? (totalHours / resolvedCount).toFixed(1) : 0;

    const maxCount = Math.max(...Object.values(weeklyCounts), 1);
    const weeklyResolutionData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      day,
      count: weeklyCounts[day],
      height: `${Math.round((weeklyCounts[day] / maxCount) * 100)}%`
    }));
    res.json({
      success: true,
      stats: {
        total,
        reported,
        inProgress,
        resolved,
        overdueCount,
        resolutionRate,
        avgResolutionHours,
        weeklyResolutionData
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
