const ApiError = require('../utils/ApiError');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let status = err.status || 'error';

  // Prisma known errors
  if (err.code === 'P2002') {
    statusCode = 409;
    status = 'fail';
    const field = err.meta?.target?.[0] || 'field';
    message = `A record with this ${field} already exists.`;
  }

  if (err.code === 'P2025') {
    statusCode = 404;
    status = 'fail';
    message = 'Record not found.';
  }

  // Validation errors from express-validator
  if (err.array && typeof err.array === 'function') {
    statusCode = 400;
    status = 'fail';
    message = 'Validation failed';
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('─── ERROR ───────────────────────────');
    console.error(`Status: ${statusCode}`);
    console.error(`Message: ${message}`);
    if (statusCode === 500) {
      console.error('Stack:', err.stack);
    }
    console.error('─────────────────────────────────────');
  }

  // Send response
  const response = {
    success: false,
    status,
    message,
  };

  // Include stack trace in development for 500 errors
  if (process.env.NODE_ENV === 'development' && statusCode === 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
