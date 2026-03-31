const catchAsync = require('../utils/catchAsync');
const chatbotService = require('../services/chatbot.service');

/**
 * POST /api/chatbot/ask-doubt
 * Ask a doubt question to the chatbot
 */
const askDoubt = catchAsync(async (req, res) => {
  console.log('🟡 Chatbot Controller - askDoubt called');
  console.log('Request body:', req.body);
  console.log('User:', req.user);

  const { question, subject, context } = req.body;
  const userId = req.user.id;

  if (!userId) {
    console.error('❌ No userId found in request');
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const result = await chatbotService.askDoubt(
      userId,
      question,
      subject || 'General',
      context
    );

    console.log('✅ Controller returning response:', result);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('❌ Controller error:', error);
    throw error;
  }
});

/**
 * GET /api/chatbot/history
 * Get chat history for the authenticated user
 */
const getChatHistory = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await chatbotService.getChatHistory(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * POST /api/chatbot/rate
 * Rate a chatbot response
 */
const rateResponse = catchAsync(async (req, res) => {
  const { messageId, score, feedback } = req.body;
  const userId = req.user.id;

  if (!messageId || messageId === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Message ID is required',
    });
  }

  if (!score) {
    return res.status(400).json({
      success: false,
      message: 'Score is required',
    });
  }

  const result = await chatbotService.rateResponse(
    userId,
    messageId,
    score,
    feedback
  );

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * POST /api/chatbot/clear-history
 * Clear chat history for the authenticated user
 */
const clearChatHistory = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await chatbotService.clearChatHistory(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = {
  askDoubt,
  getChatHistory,
  rateResponse,
  clearChatHistory,
};
