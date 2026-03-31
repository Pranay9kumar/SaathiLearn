import axios from 'axios';
import { getApiOrigin } from '../config/api';

const api = axios.create({
  baseURL: `${getApiOrigin()}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('saathilearn_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry / unauth globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logic to handle unauthorized access automatically
      // e.g., clear localStorage and redirect to login if we have a router hook
      console.warn('Unauthorized access -> Token expired or invalid.');
      localStorage.removeItem('saathilearn_token');
      localStorage.removeItem('saathilearn_user');
      // If we're not already on login
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/') {
         window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
