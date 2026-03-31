const { Router } = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth');
const mentorController = require('../controllers/mentor.controller');

const router = Router();

// All mentor routes require authentication
router.use(authenticate);

/**
 * POST /api/mentor/connect/:mentorId
 * Student connects with a mentor
 */
router.post(
  '/connect/:mentorId',
  authorize('STUDENT'),
  [
    param('mentorId')
      .notEmpty()
      .withMessage('Mentor ID is required.'),
    body('subject')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Subject must be under 100 characters.'),
    body('message')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Message must be under 500 characters.'),
    validate,
  ],
  mentorController.connectWithMentor
);

/**
 * POST /api/mentor/request
 * Student requests help from a mentor
 */
router.post(
  '/request',
  authorize('STUDENT'),
  [
    body('questionId')
      .notEmpty()
      .withMessage('Question ID is required.')
      .isUUID()
      .withMessage('Invalid question ID format.'),
    body('message')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Message must be under 500 characters.'),
    validate,
  ],
  mentorController.createRequest
);

/**
 * GET /api/mentor/students
 * Mentor views their assigned students
 */
router.get(
  '/students',
  authorize('MENTOR'),
  mentorController.getStudents
);

/**
 * GET /api/mentor/requests
 * Mentor views help requests (optional ?status=PENDING|ASSIGNED|RESOLVED filter)
 */
router.get(
  '/requests',
  authorize('MENTOR'),
  mentorController.getRequests
);

/**
 * POST /api/mentor/reply
 * Mentor replies to a student's help request
 */
router.post(
  '/reply',
  authorize('MENTOR'),
  [
    body('requestId')
      .notEmpty()
      .withMessage('Request ID is required.')
      .isUUID()
      .withMessage('Invalid request ID format.'),
    body('response')
      .trim()
      .notEmpty()
      .withMessage('Response is required.')
      .isLength({ max: 2000 })
      .withMessage('Response must be under 2000 characters.'),
    validate,
  ],
  mentorController.replyToRequest
);

module.exports = router;
