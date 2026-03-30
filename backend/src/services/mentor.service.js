const ApiError = require('../utils/ApiError');

/**
 * MongoDB refactor placeholder.
 * This service is pending MongoDB implementation.
 */
const createRequest = async () => {
  throw new ApiError(501, 'Mentor request creation is not implemented for MongoDB yet.');
};

const getStudents = async () => {
  throw new ApiError(501, 'Mentor students list is not implemented for MongoDB yet.');
};

const getRequests = async () => {
  throw new ApiError(501, 'Mentor requests list is not implemented for MongoDB yet.');
};

const replyToRequest = async () => {
  throw new ApiError(501, 'Mentor request replies are not implemented for MongoDB yet.');
};

module.exports = { createRequest, getStudents, getRequests, replyToRequest };
