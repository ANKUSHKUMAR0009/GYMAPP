import axios from 'axios';

// Your friends will provide this URL later.
export const BASE_URL = 'YOUR_BACKEND_BASE_URL';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;