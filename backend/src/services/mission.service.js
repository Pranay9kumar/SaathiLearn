const ApiError = require('../utils/ApiError');

/**
 * MongoDB refactor placeholder.
 * This service is pending MongoDB implementation.
 */
const getTodaysMission = async () => {
  throw new ApiError(501, "Today's mission is not implemented for MongoDB yet.");
};

const submitMission = async () => {
  throw new ApiError(501, 'Mission submission is not implemented for MongoDB yet.');
};

const getMissionById = async () => {
  throw new ApiError(501, 'Get mission by id is not implemented for MongoDB yet.');
};

module.exports = { getTodaysMission, submitMission, getMissionById };
