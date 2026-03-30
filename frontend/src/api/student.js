import api from './axios';

export const getStudentProfile = async () => {
  const response = await api.get('/student/profile');
  return response.data;
};

export const getLeaderboard = async (page = 1) => {
  const response = await api.get(`/student/leaderboard?page=${page}`);
  return response.data;
};

export const getHint = async (questionId) => {
  const response = await api.post('/ai/hint', { questionId });
  return response.data;
};
