import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const userJson = localStorage.getItem('adventure_user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (err) {
        console.error('Error parsing stored user token', err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling unauthorized 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired or invalid
      // localStorage.removeItem('adventure_user');
    }
    return Promise.reject(error);
  }
);

export default api;
