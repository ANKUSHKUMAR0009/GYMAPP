
import api from './api';

// Endpoint paths to be matched with your friends' backend API.
const ANNOUNCEMENT_ENDPOINTS = {
  all: '/api/announcements',
  details: (id: string) => `/api/announcements/${id}`,
};

export const getAnnouncements = async () => {
  const response = await api.get(ANNOUNCEMENT_ENDPOINTS.all);
  return response.data;
};

export const getAnnouncementDetails = async (id: string) => {
  const response = await api.get(ANNOUNCEMENT_ENDPOINTS.details(id));
  return response.data;
};
