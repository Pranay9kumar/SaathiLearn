const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');
const authController = require('../controllers/auth.controller');

const router = Router();

/**
 * POST /api/auth/signup
 * Register a new user
 */
router.post(
  '/signup',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required.')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be 2–100 characters.'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email.')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters.')
      .matches(/\d/)
      .withMessage('Password must contain at least one number.'),
    body('role')
      .optional()
      .isIn(['STUDENT', 'MENTOR', 'ADMIN'])
      .withMessage('Role must be STUDENT, MENTOR, or ADMIN.'),
    body('class')
      .optional()
      .isInt({ min: 1, max: 12 })
      .withMessage('Class must be between 1 and 12.'),
    body('subjects')
      .optional()
      .isArray()
      .withMessage('Subjects must be an array.'),
    validate,
  ],
  authController.signup
);

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post(
  '/login',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email.')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required.'),
    validate,
  ],
  authController.login
);

/**
 * GET /api/auth/me
 * Get current user profile (requires auth)
 */
router.get('/me', authenticate, authController.getMe);

module.exports = router;
