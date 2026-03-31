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

/**
 * GET /api/student/learning-plan
 * Get AI-generated personalized learning plan
 */
router.get('/learning-plan', studentController.getLearningPlan);

/**
 * GET /api/student/available-mentors
 * Get list of available mentors to connect with
 */
router.get('/available-mentors', studentController.getAvailableMentors);

module.exports = router;
