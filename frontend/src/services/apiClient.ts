import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('vestra-auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        code: `HTTP_${error.response.status}`,
        message: error.response.data?.message || 'An error occurred',
        details: error.response.data?.details,
      });
    }
    return Promise.reject({
      code: 'NETWORK_ERROR',
      message: 'Unable to connect to the server. Please try again.',
    });
  }
);
