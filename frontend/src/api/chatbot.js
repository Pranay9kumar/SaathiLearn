import api from './axios';

/**
 * Ask a doubt question to the chatbot
 * @param {Object} question - The question details
 * @param {string} question.question - The actual question text
 * @param {string} question.subject - The subject related to question
 * @param {string} question.context - Optional context about the question
 * @returns {Promise} Response with answer from chatbot
 */
export const askDoubtsQuestion = async ({ question, subject, context = '' }) => {
  try {
    console.log('📤 Frontend API - Sending question to backend:', question);
    console.log('📤 Subject:', subject);

    const payload = {
      question,
      subject,
      context,
    };

    console.log('📤 Payload:', payload);

    const response = await api.post('/chatbot/ask-doubt', payload);

    console.log('📥 Backend response:', response.data);

    if (!response.data.data) {
      console.error('❌ No data in response:', response.data);
      throw new Error('No response data from chatbot');
    }

    return response.data.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    if (error.response) {
      console.error('❌ Response status:', error.response.status);
      console.error('❌ Response data:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || error.message || 'Failed to get response from chatbot'
    );
  }
};

/**
 * Get chat history for a student
 * @returns {Promise} Array of previous chat messages
 */
export const getChatHistory = async () => {
  try {
    const response = await api.get('/chatbot/history');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch chat history'
    );
  }
};

/**
 * Rate the chatbot response
 * @param {Object} rating - Rating details
 * @param {string} rating.messageId - ID of the chatbot message
 * @param {number} rating.score - Rating score (1-5)
 * @param {string} rating.feedback - Optional feedback text
 * @returns {Promise} Confirmation of rating
 */
export const rateResponse = async ({ messageId, score, feedback = '' }) => {
  try {
    const response = await api.post('/chatbot/rate', {
      messageId,
      score,
      feedback,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error rating response:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to submit rating'
    );
  }
};

/**
 * Clear chat history for a student
 * @returns {Promise} Confirmation of clear
 */
export const clearChatHistory = async () => {
  try {
    const response = await api.post('/chatbot/clear-history');
    return response.data.data;
  } catch (error) {
    console.error('Error clearing chat history:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to clear chat history'
    );
  }
};
