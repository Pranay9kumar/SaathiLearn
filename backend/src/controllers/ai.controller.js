const catchAsync = require('../utils/catchAsync');
const aiService = require('../services/ai.service');

/**
 * POST /api/ai/hint
 */
const getHint = catchAsync(async (req, res) => {
  const { questionId } = req.body;

  const hint = await aiService.getHint(questionId);

  res.status(200).json({
    success: true,
    data: hint,
  });
});

module.exports = { getHint };
