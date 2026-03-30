import api from './axios';

const unwrapResponse = (response) => response?.data?.data ?? response?.data;

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return unwrapResponse(response);
};

export const signup = async (data) => {
  const response = await api.post('/auth/signup', data);
  return unwrapResponse(response);
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return unwrapResponse(response);
};
