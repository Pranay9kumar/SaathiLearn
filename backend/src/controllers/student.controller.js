const catchAsync = require('../utils/catchAsync');
const studentService = require('../services/student.service');

/**
 * GET /api/student/profile
 */
const getProfile = catchAsync(async (req, res) => {
  const profile = await studentService.getProfile(req.user.id);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

/**
 * GET /api/student/progress
 */
const getProgress = catchAsync(async (req, res) => {
  const { page, limit } = req.query;

  const result = await studentService.getProgress(req.user.id, {
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * GET /api/student/streak
 */
const getStreak = catchAsync(async (req, res) => {
  const streak = await studentService.getStreak(req.user.id);

  res.status(200).json({
    success: true,
    data: streak,
  });
});

/**
 * GET /api/student/leaderboard
 */
const getLeaderboard = catchAsync(async (req, res) => {
  const { page, limit } = req.query;

  const result = await studentService.getLeaderboard({
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = { getProfile, getProgress, getStreak, getLeaderboard };
