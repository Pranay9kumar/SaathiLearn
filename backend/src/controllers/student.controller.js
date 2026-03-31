const catchAsync = require('../utils/catchAsync');
const studentService = require('../services/student.service');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const ApiError = require('../utils/ApiError');

/**
 * GET /api/student/profile
 */
const getProfile = catchAsync(async (req, res) => {
  const profile = await studentService.getProfile(req.user.id);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

/**
 * GET /api/student/progress
 */
const getProgress = catchAsync(async (req, res) => {
  const { page, limit } = req.query;

  const result = await studentService.getProgress(req.user.id, {
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * GET /api/student/streak
 */
const getStreak = catchAsync(async (req, res) => {
  const streak = await studentService.getStreak(req.user.id);

  res.status(200).json({
    success: true,
    data: streak,
  });
});

/**
 * GET /api/student/leaderboard
 */
const getLeaderboard = catchAsync(async (req, res) => {
  const { page, limit } = req.query;

  const result = await studentService.getLeaderboard({
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * GET /api/student/learning-plan
 * Get AI-generated personalized learning plan
 */
const getLearningPlan = catchAsync(async (req, res) => {
  const profile = await studentService.getProfile(req.user.id);
  
  if (!profile) {
    throw new ApiError(404, 'Student profile not found');
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ GOOGLE_API_KEY not configured, using fallback learning plan');
    return res.status(200).json({
      success: true,
      data: getFallbackLearningPlan(profile),
    });
  }

  try {
    console.log('🚀 Generating personalized learning plan with Gemini AI...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert educational advisor. Based on this student's profile, create a personalized learning plan.

Student Profile:
- Name: ${profile.name}
- XP: ${profile.xp || 0}
- Learning Streak: ${profile.streak || 0} days
- Missions Completed: ${profile.missionsCompleted || 0}
- Subjects Mastered: ${(profile.subjectsMastered || []).join(', ') || 'None yet'}
- Weak Areas: ${(profile.weakAreas || []).join(', ') || 'To be assessed'}

Generate a JSON response (no markdown, just raw JSON) with this exact structure:
{
  "weeklyFocus": "Main focus area for this week",
  "recommendedTopics": [
    {"topic": "Topic name", "icon": "📚", "difficulty": "Intermediate", "estimatedTime": "30 mins"},
    {"topic": "Topic name", "icon": "🔬", "difficulty": "Beginner", "estimatedTime": "20 mins"},
    {"topic": "Topic name", "icon": "📐", "difficulty": "Advanced", "estimatedTime": "45 mins"}
  ],
  "milestones": [
    {"milestone": "Reach Level 5", "xpRequired": 500, "progress": 65},
    {"milestone": "100 Day Streak", "xpRequired": 100, "progress": 12},
    {"milestone": "Master 5 Subjects", "xpRequired": 200, "progress": 80}
  ],
  "dailyGoal": "Your daily goal to maintain momentum"
}`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    
    // Parse JSON response
    let planData = {};
    try {
      planData = JSON.parse(text);
    } catch (e) {
      // If parsing fails, try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        planData = JSON.parse(jsonMatch[0]);
      } else {
        throw e;
      }
    }

    console.log('✅ Learning plan generated successfully');
    return res.status(200).json({
      success: true,
      data: planData,
    });
  } catch (error) {
    console.error('❌ Error generating learning plan:', error.message);
    // Fallback to default plan
    res.status(200).json({
      success: true,
      data: getFallbackLearningPlan(profile),
    });
  }
});

/**
 * GET /api/student/available-mentors
 * Get list of available mentors to connect with
 */
const getAvailableMentors = catchAsync(async (req, res) => {
  const mentors = await studentService.getAvailableMentors();

  res.status(200).json({
    success: true,
    data: mentors,
  });
});

/**
 * Fallback learning plan when AI is unavailable
 */
const getFallbackLearningPlan = (profile) => ({
  weeklyFocus: 'Mathematics - Advanced Problem Solving',
  recommendedTopics: [
    { topic: 'Quadratic Equations', icon: '📚', difficulty: 'Intermediate', estimatedTime: '30 mins' },
    { topic: 'Cell Biology', icon: '🔬', difficulty: 'Beginner', estimatedTime: '25 mins' },
    { topic: 'Geometry Basics', icon: '📐', difficulty: 'Advanced', estimatedTime: '40 mins' },
  ],
  milestones: [
    { milestone: 'Reach Level 5', xpRequired: 500, progress: Math.min(100, ((profile.xp || 0) / 500) * 100) },
    { milestone: 'Building Streak', xpRequired: 100, progress: Math.min(100, ((profile.streak || 0) / 100) * 100) },
    { milestone: 'Master 5 Subjects', xpRequired: 200, progress: Math.min(100, (((profile.subjectsMastered || []).length || 0) / 5) * 100) },
  ],
  dailyGoal: 'Complete 1-2 lessons and maintain your learning streak!',
});

module.exports = { getProfile, getProgress, getStreak, getLeaderboard, getLearningPlan, getAvailableMentors };
