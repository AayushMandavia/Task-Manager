import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    const response = await api.post('/api/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  },
  register: async (email, password) => {
    const response = await api.post('/api/auth/register', { email, password });
    return response.data;
  }
};

export const taskAPI = {
  getTasks: async () => {
    const response = await api.get('/api/tasks/');
    return response.data;
  },
  createTask: async (taskData) => {
    const response = await api.post('/api/tasks/', taskData);
    return response.data;
  },
  deleteTask: async (id) => {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  }
};

export default api;
