const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth');
const chatbotController = require('../controllers/chatbot.controller');

const router = Router();

/**
 * POST /api/chatbot/ask-doubt
 * Ask a doubt question to the chatbot (students only)
 */
router.post(
  '/ask-doubt',
  authenticate,
  authorize('STUDENT'),
  [
    body('question')
      .trim()
      .notEmpty()
      .withMessage('Question is required')
      .isLength({ min: 3 })
      .withMessage('Question must be at least 3 characters long'),
    body('subject')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage('Subject must be at least 2 characters long'),
    body('context')
      .optional()
      .trim(),
    validate,
  ],
  chatbotController.askDoubt
);

/**
 * GET /api/chatbot/history
 * Get chat history for the authenticated user
 */
router.get(
  '/history',
  authenticate,
  authorize('STUDENT'),
  chatbotController.getChatHistory
);

/**
 * POST /api/chatbot/rate
 * Rate a chatbot response
 */
router.post(
  '/rate',
  authenticate,
  authorize('STUDENT'),
  [
    body('messageId')
      .notEmpty()
      .withMessage('Message ID is required')
      .isInt()
      .withMessage('Message ID must be a number'),
    body('score')
      .notEmpty()
      .withMessage('Score is required')
      .isInt({ min: 1, max: 5 })
      .withMessage('Score must be between 1 and 5'),
    body('feedback')
      .optional()
      .trim(),
    validate,
  ],
  chatbotController.rateResponse
);

/**
 * POST /api/chatbot/clear-history
 * Clear chat history for the authenticated user
 */
router.post(
  '/clear-history',
  authenticate,
  authorize('STUDENT'),
  chatbotController.clearChatHistory
);

module.exports = router;
