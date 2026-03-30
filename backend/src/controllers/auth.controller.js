const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');

/**
 * POST /api/auth/signup
 */
const signup = catchAsync(async (req, res) => {
  const { name, email, password, role, class: className, subjects, activities } = req.body;

  const result = await authService.signup({
    name,
    email,
    password,
    role,
    className,
    subjects,
    activities,
  });

  res.status(201).json({
    success: true,
    message: 'Account created successfully.',
    data: result,
  });
});

/**
 * POST /api/auth/login
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    data: result,
  });
});

/**
 * GET /api/auth/me
 */
const getMe = catchAsync(async (req, res) => {
  const profile = await authService.getProfile(req.user.id);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

module.exports = { signup, login, getMe };
