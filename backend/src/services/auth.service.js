const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const SALT_ROUNDS = 12;

/**
 * Register a new user
 */
const signup = async ({ name, email, password, role = 'STUDENT', className, subjects, activities }) => {
  // Check if email already exists
  const existing = await User.findOne({ email }).lean();
  if (existing) {
    throw ApiError.conflict('Email already registered.');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await User.create({
    name,
    email,
    passwordHash,
    role,
    class: className ? parseInt(className, 10) : null,
    subjects: subjects || [],
    activities: activities || [],
  });

  // Generate token
  const token = generateToken(user._id.toString());

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      class: user.class,
      subjects: user.subjects,
      activities: user.activities,
      createdAt: user.createdAt,
    },
    token,
  };
};

/**
 * Login an existing user
 */
const login = async ({ email, password }) => {
  // Find user
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password.');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password.');
  }

  // Generate token
  const token = generateToken(user._id.toString());

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      class: user.class,
      subjects: user.subjects,
      activities: user.activities,
      createdAt: user.createdAt,
    },
    token,
  };
};

/**
 * Get user profile by ID
 */
const getProfile = async (userId) => {
  const user = await User.findById(userId).select('name email role class subjects activities createdAt').lean();

  if (!user) {
    throw ApiError.notFound('User not found.');
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    class: user.class,
    subjects: user.subjects,
    activities: user.activities,
    createdAt: user.createdAt,
  };
};

/**
 * Generate JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = { signup, login, getProfile };
