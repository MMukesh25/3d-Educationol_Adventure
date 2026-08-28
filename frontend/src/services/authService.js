import api from './api';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data && response.data.token) {
      localStorage.setItem('adventure_user', JSON.stringify(response.data));
    }
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    if (response.data && response.data.token) {
      localStorage.setItem('adventure_user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('adventure_user');
  },

  getCurrentUser: () => {
    const userJson = localStorage.getItem('adventure_user');
    return userJson ? JSON.parse(userJson) : null;
  },
};

export default authService;
