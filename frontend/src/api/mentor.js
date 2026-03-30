import api from './axios';

export const requestMentorHelp = async (questionId, message) => {
  const response = await api.post('/mentor/request', { questionId, message });
  return response.data;
};

export const getMentorStudents = async () => {
  const response = await api.get('/mentor/students');
  return response.data;
};

export const getMentorRequests = async (status) => {
  const query = status ? `?status=${status}` : '';
  const response = await api.get(`/mentor/requests${query}`);
  return response.data;
};

export const replyToRequest = async (requestId, responseStr) => {
  const response = await api.post('/mentor/reply', { requestId, response: responseStr });
  return response.data;
};
