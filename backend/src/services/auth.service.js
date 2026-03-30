const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

const SALT_ROUNDS = 12;

/**
 * Register a new user
 */
const signup = async ({ name, email, password, role = 'STUDENT', className, subjects }) => {
  // Check if email already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw ApiError.conflict('Email already registered.');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      class: className ? parseInt(className) : null,
      subjects: subjects || [],
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      class: true,
      createdAt: true,
    },
  });

  // Initialize streak and XP if student
  if (role === 'STUDENT') {
    await prisma.streak.create({
      data: { userId: user.id, currentStreak: 0, longestStreak: 0 },
    });
    await prisma.xP.create({
      data: { userId: user.id, totalXp: 0 },
    });
  }

  // Generate token
  const token = generateToken(user.id);

  return { user, token };
};

/**
 * Login an existing user
 */
const login = async ({ email, password }) => {
  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password.');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password.');
  }

  // Generate token
  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      class: user.class,
    },
    token,
  };
};

/**
 * Get user profile by ID
 */
const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      class: true,
      subjects: true,
      createdAt: true,
      streak: { select: { currentStreak: true, longestStreak: true, lastActiveDate: true } },
      xp: { select: { totalXp: true } },
    },
  });

  if (!user) {
    throw ApiError.notFound('User not found.');
  }

  return user;
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
