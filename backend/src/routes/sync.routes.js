const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth');
const syncController = require('../controllers/sync.controller');

const router = Router();

/**
 * POST /api/sync
 * Batch sync offline progress data
 */
router.post(
  '/',
  authenticate,
  authorize('STUDENT'),
  [
    body('submissions')
      .isArray({ min: 1 })
      .withMessage('Submissions must be a non-empty array.'),
    body('submissions.*.missionId')
      .notEmpty()
      .withMessage('Each submission must have a missionId.')
      .isUUID()
      .withMessage('Invalid mission ID format.'),
    body('submissions.*.answers')
      .isArray({ min: 1 })
      .withMessage('Each submission must have answers.'),
    validate,
  ],
  syncController.syncOfflineData
);

module.exports = router;
