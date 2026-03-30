const ApiError = require('../utils/ApiError');

/**
 * MongoDB refactor placeholder.
 * This service is pending MongoDB implementation.
 */
const getMetrics = async () => {
  throw new ApiError(501, 'NGO metrics are not implemented for MongoDB yet.');
};

const getAtRiskStudents = async () => {
  throw new ApiError(501, 'At-risk students is not implemented for MongoDB yet.');
};

const getOverview = async () => {
  throw new ApiError(501, 'NGO overview is not implemented for MongoDB yet.');
};

module.exports = { getMetrics, getAtRiskStudents, getOverview };
