const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Verify JWT token and attach user to request
 */
const authenticate = async (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('No token provided. Please log in.');
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        class: true,
        subjects: true,
      },
    });

    if (!user) {
      throw ApiError.unauthorized('User no longer exists.');
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(ApiError.unauthorized('Invalid token. Please log in again.'));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(ApiError.unauthorized('Token expired. Please log in again.'));
    }
    next(error);
  }
};

/**
 * Role-based authorization middleware
 * @param  {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required.'));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(`Role '${req.user.role}' is not authorized to access this resource.`)
      );
    }
    next();
  };
};

module.exports = { authenticate, authorize };
