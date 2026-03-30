const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth');
const aiController = require('../controllers/ai.controller');

const router = Router();

/**
 * POST /api/ai/hint
 * Get a hint for a specific question (student only)
 */
router.post(
  '/hint',
  authenticate,
  authorize('STUDENT'),
  [
    body('questionId')
      .notEmpty()
      .withMessage('Question ID is required.')
      .isUUID()
      .withMessage('Invalid question ID format.'),
    validate,
  ],
  aiController.getHint
);

module.exports = router;
