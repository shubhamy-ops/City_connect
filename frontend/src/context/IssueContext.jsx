import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialIssues } from '../data/mockIssues.js';
import { getIssues, createIssueRequest, updateIssueStatusRequest, upvoteIssueRequest, verifyIssueRequest } from '../services/issueService.js';
import { getStats } from '../services/statService.js';

const IssueContext = createContext();

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState(initialIssues);
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState('citizen'); // 'citizen' | 'admin'
  const [activePage, setActivePage] = useState('landing'); // 'landing' | 'report' | 'dashboard' | 'admin' | 'detail'
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 'user-77',
    name: 'Alex Rivera',
    email: 'alex.rivera@civicnet.org',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  });

  const [toasts, setToasts] = useState([]);
  const [stats, setStats] = useState({
    total: initialIssues.length,
    reported: 1,
    inProgress: 2,
    resolved: 2,
    overdueCount: 0,
    resolutionRate: 80
  });

  // Helper to add toast
  const addToast = (title, message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Fetch issues from API or fallback to local
  const fetchIssues = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getIssues(filters);
      if (data.success && data.data) {
        setIssues(data.data);
      }
    } catch (err) {
      console.warn("Backend API not reached directly, using local state store:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const data = await getStats();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      // Calculate local stats
      const total = issues.length;
      const reported = issues.filter(i => i.status === 'Reported').length;
      const inProgress = issues.filter(i => i.status === 'In Progress' || i.status === 'Assigned').length;
      const resolved = issues.filter(i => i.status === 'Fixed' || i.status === 'Verified').length;
      setStats({
        total,
        reported,
        inProgress,
        resolved,
        overdueCount: 1,
        resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
      });
    }
  };

  useEffect(() => {
    fetchIssues();
    fetchStats();
  }, []);

  // Submit new issue
  const createIssue = async (issueData) => {
    setLoading(true);
    try {
      const data = await createIssueRequest({
        ...issueData,
        reporterName: currentUser.name
      });
      if (data.success) {
        setIssues(prev => [data.data, ...prev]);
        addToast("Issue Logged!", `Report ${data.data.id} registered and auto-routed.`, "success");
        fetchStats();
        return data.data;
      }
    } catch (err) {
      console.warn("Using offline issue submission fallback");
    }

    // Local fallback
    const newId = `CITY-${100 + issues.length + 1}`;
    const now = new Date().toISOString();
    const fallbackIssue = {
      id: newId,
      title: issueData.title,
      description: issueData.description,
      category: issueData.category,
      priority: issueData.priority || 'Medium',
      status: 'Reported',
      assignedDepartment: 'Department of Public Works',
      location: issueData.location || { address: 'District 1', lat: 37.7749, lng: -122.4194 },
      image: issueData.image || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      beforeAfterImage: { before: issueData.image, after: null },
      reporter: { name: currentUser.name, avatar: currentUser.avatar, role: 'Citizen' },
      upvotes: 1,
      upvotedBy: ['current-user'],
      aiDetection: { category: issueData.category, confidence: 0.95, detectedObject: 'Verified Civic Pattern' },
      slaDueDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      createdAt: now,
      updatedAt: now,
      timeline: [
        {
          status: 'Reported',
          title: 'Issue Submitted',
          note: `Report registered by ${currentUser.name}. Auto-routing initiated.`,
          timestamp: now,
          actor: currentUser.name
        }
      ]
    };

    setIssues(prev => [fallbackIssue, ...prev]);
    addToast("Issue Logged!", `Report ${newId} registered and auto-routed.`, "success");
    setLoading(false);
    return fallbackIssue;
  };

  // Update status (Admin function)
  const updateIssueStatus = async (id, status, assignedDepartment, priority, note, afterImage) => {
    try {
      const data = await updateIssueStatusRequest(id, {
        status,
        assignedDepartment,
        priority,
        note,
        afterImage,
        updatedBy: `${currentUser.name} (${activeRole === 'admin' ? 'Official' : 'Citizen'})`
      });
      if (data.success) {
        setIssues(prev => prev.map(i => i.id === id ? data.data : i));
        addToast("Status Updated", `Issue ${id} set to "${status}"`, "info");
        fetchStats();
        return data.data;
      }
    } catch (err) {
      console.warn("Using offline status update fallback");
    }

    // Local fallback
    const now = new Date().toISOString();
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const updated = {
          ...issue,
          status: status || issue.status,
          assignedDepartment: assignedDepartment || issue.assignedDepartment,
          priority: priority || issue.priority,
          updatedAt: now,
          timeline: [
            ...issue.timeline,
            {
              status: status || issue.status,
              title: `Status set to ${status}`,
              note: note || `Department workflow updated by ${currentUser.name}`,
              timestamp: now,
              actor: `${currentUser.name} (${activeRole === 'admin' ? 'City Official' : 'Citizen'})`
            }
          ]
        };

        if (afterImage) {
          updated.beforeAfterImage = { before: issue.image, after: afterImage };
        }
        return updated;
      }
      return issue;
    }));

    addToast("Status Updated", `Issue ${id} set to "${status}"`, "info");
  };

  // Upvote issue
  const upvoteIssue = async (id) => {
    try {
      await upvoteIssueRequest(id, currentUser.id);
    } catch (err) {
      // offline fallback
    }

    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const hasUpvoted = issue.upvotedBy.includes(currentUser.id);
        const newUpvotedBy = hasUpvoted
          ? issue.upvotedBy.filter(uid => uid !== currentUser.id)
          : [...issue.upvotedBy, currentUser.id];
        return {
          ...issue,
          upvotes: hasUpvoted ? Math.max(0, issue.upvotes - 1) : issue.upvotes + 1,
          upvotedBy: newUpvotedBy
        };
      }
      return issue;
    }));
  };

  // Citizen verification
  const verifyIssue = async (id, action, note) => {
    try {
      const data = await verifyIssueRequest(id, action, note);
      if (data.success) {
        setIssues(prev => prev.map(i => i.id === id ? data.data : i));
        addToast(
          action === 'verify' ? "Resolution Verified!" : "Issue Reopened",
          action === 'verify' ? "Thank you for confirming resolution." : "Crews notified for re-inspection.",
          action === 'verify' ? "success" : "warning"
        );
        fetchStats();
        return;
      }
    } catch (err) {
      // fallback
    }

    const now = new Date().toISOString();
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const newStatus = action === 'verify' ? 'Verified' : 'In Progress';
        return {
          ...issue,
          status: newStatus,
          updatedAt: now,
          timeline: [
            ...issue.timeline,
            {
              status: newStatus,
              title: action === 'verify' ? 'Verified by Citizen' : 'Reopened by Citizen',
              note: note || (action === 'verify' ? 'Resolution confirmed.' : 'Incomplete fix flagged.'),
              timestamp: now,
              actor: `${currentUser.name} (Citizen)`
            }
          ]
        };
      }
      return issue;
    }));

    addToast(
      action === 'verify' ? "Resolution Verified!" : "Issue Reopened",
      action === 'verify' ? "Thank you for confirming resolution." : "Crews notified for re-inspection.",
      action === 'verify' ? "success" : "warning"
    );
  };

  const navigateToDetail = (issueId) => {
    setSelectedIssueId(issueId);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <IssueContext.Provider value={{
      issues,
      loading,
      activeRole,
      setActiveRole,
      activePage,
      setActivePage,
      selectedIssueId,
      setSelectedIssueId,
      currentUser,
      setCurrentUser,
      toasts,
      addToast,
      stats,
      createIssue,
      updateIssueStatus,
      upvoteIssue,
      verifyIssue,
      navigateToDetail,
      authModalOpen,
      setAuthModalOpen,
      fetchIssues
    }}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = () => useContext(IssueContext);

