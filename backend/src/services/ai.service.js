const ApiError = require('../utils/ApiError');

/**
 * MongoDB refactor placeholder.
 * This service is pending MongoDB implementation.
 */
const getHint = async () => {
  throw new ApiError(501, 'AI hint service not implemented for MongoDB yet.');
};

module.exports = { getHint };
