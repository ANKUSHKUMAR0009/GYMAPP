
import api from './api';

// Endpoint to be matched with your friends' backend API.
const TIMINGS_ENDPOINT = '/api/gym/timings';

export const getGymTimings = async () => {
  const response = await api.get(TIMINGS_ENDPOINT);
  return response.data;
};
