const { Router } = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth');
const missionController = require('../controllers/mission.controller');

const router = Router();

// All mission routes require authentication
router.use(authenticate);

/**
 * GET /api/mission/today
 * Get today's mission for the logged-in student
 */
router.get(
  '/today',
  authorize('STUDENT'),
  missionController.getTodaysMission
);

/**
 * POST /api/mission/submit
 * Submit answers for a mission
 */
router.post(
  '/submit',
  authorize('STUDENT'),
  [
    body('missionId')
      .notEmpty()
      .withMessage('Mission ID is required.')
      .isUUID()
      .withMessage('Invalid mission ID format.'),
    body('answers')
      .isArray({ min: 1 })
      .withMessage('Answers must be a non-empty array.'),
    body('answers.*.questionId')
      .notEmpty()
      .withMessage('Each answer must have a questionId.')
      .isUUID()
      .withMessage('Invalid question ID format.'),
    body('answers.*.answer')
      .notEmpty()
      .withMessage('Each answer must have an answer value.'),
    validate,
  ],
  missionController.submitMission
);

/**
 * GET /api/mission/:id
 * Get a specific mission by ID
 */
router.get(
  '/:id',
  authorize('STUDENT', 'MENTOR', 'ADMIN'),
  [
    param('id')
      .isUUID()
      .withMessage('Invalid mission ID format.'),
    validate,
  ],
  missionController.getMission
);

module.exports = router;
