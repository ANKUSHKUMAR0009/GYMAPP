
import api from './api';

// Endpoint paths to be matched with the backend team's API.
const ATTENDANCE_ENDPOINTS = {
  summary: '/api/attendance/summary',
  history: '/api/attendance/history',
};

export const getAttendanceSummary = async () => {
  const response = await api.get(ATTENDANCE_ENDPOINTS.summary);
  return response.data;
};

export const getAttendanceHistory = async () => {
  const response = await api.get(ATTENDANCE_ENDPOINTS.history);
  return response.data;
};
