import { apiRequest } from './api';

export const getIssues = (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  return apiRequest(`/issues?${query}`);
};

export const createIssueRequest = (payload) =>
  apiRequest('/issues', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateIssueStatusRequest = (id, payload) =>
  apiRequest(`/issues/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

export const upvoteIssueRequest = (id, userId) =>
  apiRequest(`/issues/${id}/upvote`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  });

export const verifyIssueRequest = (id, action, note) =>
  apiRequest(`/issues/${id}/verify`, {
    method: 'POST',
    body: JSON.stringify({ action, feedbackNote: note }),
  });
