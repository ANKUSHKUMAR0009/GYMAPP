
import api from './api';

// Endpoint paths to be matched with your friends' backend API.
const PROFILE_ENDPOINTS = {
  details: '/api/user/profile',
  update: '/api/user/profile',
  changePassword: '/api/user/change-password',
  logout: '/api/user/logout',
};

export const getUserProfile = async () => {
  const response = await api.get(PROFILE_ENDPOINTS.details);
  return response.data;
};

export const updateUserProfile = async (profileData: object) => {
  const response = await api.put(
    PROFILE_ENDPOINTS.update,
    profileData,
  );
  return response.data;
};

export const changeUserPassword = async (passwordData: object) => {
  const response = await api.put(
    PROFILE_ENDPOINTS.changePassword,
    passwordData,
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post(PROFILE_ENDPOINTS.logout);
  return response.data;
};
