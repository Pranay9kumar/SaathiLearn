import api from './axios';

export const getNgoMetrics = async () => {
  const response = await api.get('/ngo/metrics');
  return response.data;
};

export const getAtRiskStudents = async () => {
  const response = await api.get('/ngo/at-risk');
  return response.data;
};
