import { apiRequest } from './api';

export const getStats = () => apiRequest('/stats');
