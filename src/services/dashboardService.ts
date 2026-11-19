
import api from './api';

// Dashboard endpoint.
// Confirm this path with your backend team when their APIs are ready.
const DASHBOARD_ENDPOINT = '/api/user/dashboard';

export interface DashboardData {
  user: {
    firstName: string;
  };
  membership: {
    status: string;
    planName?: string;
  } | null;
  attendance: {
    totalDays: number;
  };
  latestAnnouncement: {
    id: string;
    title: string;
    message: string;
    date: string;
  } | null;
}

export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await api.get<DashboardData>(DASHBOARD_ENDPOINT);
  return response.data;
};
