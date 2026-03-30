import api from './axios';

export const getTodaysMission = async () => {
  const response = await api.get('/mission/today');
  return response.data;
};

export const submitMission = async (missionId, answers) => {
  const response = await api.post('/mission/submit', { missionId, answers });
  return response.data;
};
