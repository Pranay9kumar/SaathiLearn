const ApiError = require('../utils/ApiError');
const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Initialize Gemini AI client
 */
const initializeGemini = () => {
  const apiKey = process.env.GOOGLE_API_KEY;
  
  console.log('🔧 Initializing Gemini...');
  console.log('📌 API Key present:', !!apiKey);
  console.log('📌 API Key length:', apiKey ? apiKey.length : 0);
  console.log('📌 Model:', process.env.GEMINI_MODEL);
  
  if (!apiKey) {
    console.warn('⚠️ GOOGLE_API_KEY not set. Using fallback responses.');
    return null;
  }
  
  try {
    const client = new GoogleGenerativeAI(apiKey);
    console.log('✅ Gemini client initialized successfully');
    return client;
  } catch (error) {
    console.error('❌ Failed to initialize Gemini:', error.message);
    return null;
  }
};

let genAI = initializeGemini();

/**
 * Reinitialize Gemini (useful for testing)
 */
const reinitializeGemini = () => {
  genAI = initializeGemini();
};

/**
 * Chat session to store conversation history
 * In production, this should be stored in MongoDB
 */
const chatSessions = new Map();

/**
 * Get or create a chat session for a user
 */
const getOrCreateSession = (userId) => {
  if (!chatSessions.has(userId)) {
    chatSessions.set(userId, {
      userId,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return chatSessions.get(userId);
};

/**
 * Generate a response using Gemini API or fallback
 */
const generateDoubtResponse = async (question, subject) => {
  console.log('🤖 Chatbot - Processing question:', question.substring(0, 50) + '...');
  console.log('📚 Subject:', subject);

  // If Gemini not initialized, use fallback
  if (!genAI) {
    console.log('⚠️ Gemini not initialized. Using fallback response.');
    return getFallbackResponse(question, subject);
  }

  try {
    console.log('🚀 Calling Gemini API...');
    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
    console.log('📌 Model:', modelName);
    
    const model = genAI.getGenerativeModel({ model: modelName });
    console.log('📌 Model instance created');

    const prompt = `You are an expert educational tutor helping school students understand academic concepts. 
    
The student has a doubt about: ${subject || 'General'}
Student's question: "${question}"

Please provide:
1. A clear, concise explanation (2-3 sentences)
2. A practical example or tip
3. One follow-up question to help them think deeper

Keep the language simple and encouraging. Focus on making them understand the concept.`;

    console.log('📤 Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    
    console.log('📥 Got response from Gemini API');
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from Gemini API');
    }

    console.log('✅ Gemini API response received:', text.substring(0, 50) + '...');
    return text;
  } catch (error) {
    console.error('❌ Gemini API error:', error.message);
    console.error('❌ Error details:', error);
    console.log('⚠️ Falling back to default response');
    return getFallbackResponse(question, subject);
  }
};

/**
 * Fallback responses when Gemini is not available
 */
const getFallbackResponse = (question, subject) => {
  const lowerQuestion = question.toLowerCase();

  // Simple keyword-based responses
  const responses = {
    // Mathematics
    quadratic: 'A quadratic equation is of the form ax² + bx + c = 0. To solve it, you can use the quadratic formula: x = [-b ± √(b² - 4ac)] / 2a. Try substituting your values and solve!',
    derivative: 'A derivative measures how a function changes at any given point. For f(x) = x², the derivative is f\'(x) = 2x. It tells you the slope of the tangent line at any point on the curve.',
    integral: 'Integration is the reverse of differentiation. The indefinite integral of x² is (x³/3) + C. Definite integrals give you the area under a curve between two points.',
    trigonometry: 'Trigonometry involves angles and ratios. sin(θ) = opposite/hypotenuse, cos(θ) = adjacent/hypotenuse, tan(θ) = opposite/adjacent. These ratios help solve triangle problems.',
    
    // Science
    photosynthesis: 'Photosynthesis is the process where plants convert light energy into chemical energy. The equation is: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. It happens in the chloroplasts!',
    mitochondria: 'Mitochondria are the powerhouse of the cell. They use glucose to produce ATP (energy) through cellular respiration. Without it, cells cannot perform their functions.',
    atom: 'An atom is the smallest unit of an element. It consists of protons (positive), neutrons (neutral), and electrons (negative). The nucleus contains protons and neutrons.',
    
    // General fallback
    default: `Great question about ${subject}! Let me help you understand this better.\n\nKey points to remember:\n1. Break down the problem into smaller parts\n2. Identify what you already know\n3. Look for patterns or similar problems you've solved\n4. Try working through examples step by step\n\nCould you provide more specific details about what you're struggling with? That will help me give you a better explanation!`,
  };

  // Check if any keyword matches
  for (const [keyword, response] of Object.entries(responses)) {
    if (keyword !== 'default' && lowerQuestion.includes(keyword)) {
      console.log('✅ Keyword matched:', keyword);
      return response;
    }
  }

  // Return default response
  console.log('⚠️ No keyword matched, using default response');
  return responses.default;
};

/**
 * Ask a doubt question
 * POST /api/chatbot/ask-doubt
 */
const askDoubt = async (userId, question, subject, context = '') => {
  if (!question || question.trim().length === 0) {
    throw new ApiError(400, 'Question cannot be empty');
  }

  console.log('🔵 Chatbot Service - askDoubt called');
  console.log('User ID:', userId);
  console.log('Question:', question);
  console.log('Subject:', subject);

  const session = getOrCreateSession(userId);

  // Add user question to session
  session.messages.push({
    role: 'user',
    content: question,
    subject,
    timestamp: new Date(),
  });

  try {
    // Generate response (replace with actual AI API call)
    const answer = await generateDoubtResponse(question, subject);

    console.log('✅ Generated answer:', answer.substring(0, 50) + '...');

    // Add bot response to session
    session.messages.push({
      role: 'assistant',
      content: answer,
      subject,
      timestamp: new Date(),
    });

    session.updatedAt = new Date();

    const response = {
      answer,
      question,
      subject,
      messageId: session.messages.length - 1,
      timestamp: new Date(),
    };

    console.log('✅ Returning response:', response);
    return response;
  } catch (error) {
    console.error('❌ Error in askDoubt:', error);
    throw new ApiError(500, 'Failed to generate response: ' + error.message);
  }
};

/**
 * Get chat history for a user
 */
const getChatHistory = async (userId) => {
  const session = getOrCreateSession(userId);
  return {
    messages: session.messages,
    totalMessages: session.messages.length,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  };
};

/**
 * Rate a chatbot response
 */
const rateResponse = async (userId, messageId, score, feedback = '') => {
  if (score < 1 || score > 5) {
    throw new ApiError(400, 'Rating must be between 1 and 5');
  }

  const session = getOrCreateSession(userId);

  if (messageId >= session.messages.length) {
    throw new ApiError(404, 'Message not found');
  }

  session.messages[messageId].rating = {
    score,
    feedback,
    ratedAt: new Date(),
  };

  return {
    success: true,
    message: 'Thank you for your feedback!',
  };
};

/**
 * Clear chat history for a user
 */
const clearChatHistory = async (userId) => {
  chatSessions.delete(userId);
  return { success: true, message: 'Chat history cleared successfully' };
};

module.exports = {
  askDoubt,
  getChatHistory,
  rateResponse,
  clearChatHistory,
};
