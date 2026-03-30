const catchAsync = require('../utils/catchAsync');
const missionService = require('../services/mission.service');

/**
 * GET /api/mission/today
 */
const getTodaysMission = catchAsync(async (req, res) => {
  const result = await missionService.getTodaysMission(req.user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * POST /api/mission/submit
 */
const submitMission = catchAsync(async (req, res) => {
  const { missionId, answers } = req.body;

  const result = await missionService.submitMission(
    req.user.id,
    missionId,
    answers
  );

  // Emit XP update via Socket.io if available
  const io = req.app.get('io');
  if (io) {
    io.to(`user:${req.user.id}`).emit('student:xpUpdate', {
      totalXp: result.totalXp,
      xpEarned: result.xpEarned,
      currentStreak: result.currentStreak,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Mission submitted successfully!',
    data: result,
  });
});

/**
 * GET /api/mission/:id
 */
const getMission = catchAsync(async (req, res) => {
  const mission = await missionService.getMissionById(req.params.id);

  res.status(200).json({
    success: true,
    data: mission,
  });
});

module.exports = { getTodaysMission, submitMission, getMission };
