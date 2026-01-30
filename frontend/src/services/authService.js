import API from './api';

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const login = async (userData) => {
  const response = await API.post('/auth/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getProfile = async () => {
  const response = await API.get('/auth/profile');
  return response.data;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getTasks = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const response = await API.get(`/tasks${queryString ? `?${queryString}` : ''}`);
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await API.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await API.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await API.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};
