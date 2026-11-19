
import api from './api';

// These endpoint paths will be matched with your friends' backend routes.
const MEMBERSHIP_ENDPOINTS = {
  plans: '/api/memberships/plans',
  current: '/api/memberships/current',
  history: '/api/memberships/history',
  purchase: '/api/memberships/purchase',
  verifyPayment: '/api/payments/verify',
};

export const getMembershipPlans = async () => {
  const response = await api.get(MEMBERSHIP_ENDPOINTS.plans);
  return response.data;
};

export const getCurrentMembership = async () => {
  const response = await api.get(MEMBERSHIP_ENDPOINTS.current);
  return response.data;
};

export const getMembershipHistory = async () => {
  const response = await api.get(MEMBERSHIP_ENDPOINTS.history);
  return response.data;
};

export const purchaseMembership = async (purchaseData: object) => {
  const response = await api.post(
    MEMBERSHIP_ENDPOINTS.purchase,
    purchaseData,
  );
  return response.data;
};

export const verifyPayment = async (paymentData: object) => {
  const response = await api.post(
    MEMBERSHIP_ENDPOINTS.verifyPayment,
    paymentData,
  );
  return response.data;
};
