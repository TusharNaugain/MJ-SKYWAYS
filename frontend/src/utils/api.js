import axios from 'axios';

const api = axios.create({
  // Production builds (Vercel) call the backend on the same origin via /api.
  // Dev keeps using the local Express server on port 5002.
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5002/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mjs_access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
