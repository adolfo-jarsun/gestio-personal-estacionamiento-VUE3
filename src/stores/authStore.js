import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),

  actions: {
    async register(userData) {
      try {
        const response = await api.post('/register', {
          email: userData.email,
          password: userData.password,
          name: userData.name,
        });
        this.token = response.data.accessToken;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem('token', this.token);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Error al registrar' };
      }
    },

    async login(credentials) {
      try {
        const response = await api.post('/login', {
          email: credentials.email,
          password: credentials.password,
        });
        this.token = response.data.accessToken;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem('token', this.token);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Error al iniciar sesión' };
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});