const ApiError = require('../utils/ApiError');

/**
 * MongoDB refactor placeholder.
 * This service is pending MongoDB implementation.
 */
const getProfile = async () => {
  throw new ApiError(501, 'Student profile service is not implemented for MongoDB yet.');
};

const getProgress = async () => {
  throw new ApiError(501, 'Student progress service is not implemented for MongoDB yet.');
};

const getStreak = async () => {
  throw new ApiError(501, 'Student streak service is not implemented for MongoDB yet.');
};

const getLeaderboard = async () => {
  throw new ApiError(501, 'Leaderboard service is not implemented for MongoDB yet.');
};

module.exports = { getProfile, getProgress, getStreak, getLeaderboard };
