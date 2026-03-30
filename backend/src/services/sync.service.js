const ApiError = require('../utils/ApiError');

/**
 * MongoDB refactor placeholder.
 * This service is pending MongoDB implementation.
 */
const syncOfflineData = async () => {
  throw new ApiError(501, 'Offline sync is not implemented for MongoDB yet.');
};

module.exports = { syncOfflineData };
