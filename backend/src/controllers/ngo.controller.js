const catchAsync = require('../utils/catchAsync');
const ngoService = require('../services/ngo.service');

/**
 * GET /api/ngo/metrics
 */
const getMetrics = catchAsync(async (req, res) => {
  const metrics = await ngoService.getMetrics();

  res.status(200).json({
    success: true,
    data: metrics,
  });
});

/**
 * GET /api/ngo/at-risk
 */
const getAtRiskStudents = catchAsync(async (req, res) => {
  const result = await ngoService.getAtRiskStudents();

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * GET /api/ngo/overview
 */
const getOverview = catchAsync(async (req, res) => {
  const overview = await ngoService.getOverview();

  res.status(200).json({
    success: true,
    data: overview,
  });
});

module.exports = { getMetrics, getAtRiskStudents, getOverview };
