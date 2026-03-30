/**
 * Wraps an async route handler to catch errors and pass them to Express error middleware.
 * Eliminates repetitive try/catch blocks in controllers.
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = catchAsync;
