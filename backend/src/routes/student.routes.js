const { Router } = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const studentController = require('../controllers/student.controller');

const router = Router();

// All student routes require authentication + STUDENT role
router.use(authenticate, authorize('STUDENT'));

/**
 * GET /api/student/profile
 * Get student's full profile with stats
 */
router.get('/profile', studentController.getProfile);

/**
 * GET /api/student/progress
 * Get detailed progress history (paginated)
 */
router.get('/progress', studentController.getProgress);

/**
 * GET /api/student/streak
 * Get current streak information
 */
router.get('/streak', studentController.getStreak);

/**
 * GET /api/student/leaderboard
 * Get XP leaderboard (all students)
 */
router.get('/leaderboard', studentController.getLeaderboard);

module.exports = router;
