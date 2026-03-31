const ApiError = require('../utils/ApiError');
const User = require('../models/User');

/**
 * MongoDB refactor placeholder.
 * This service is pending MongoDB implementation.
 */
const getProfile = async () => {
  throw new ApiError(501, 'Student profile service is not implemented for MongoDB yet.');
};

const getProgress = async () => {
  throw new ApiError(501, 'Student progress service is not implemented for MongoDB yet.');
};

const getStreak = async () => {
  throw new ApiError(501, 'Student streak service is not implemented for MongoDB yet.');
};

const getLeaderboard = async () => {
  throw new ApiError(501, 'Leaderboard service is not implemented for MongoDB yet.');
};

/**
 * Get available mentors from the database (real registered mentors)
 */
const getAvailableMentors = async () => {
  try {
    console.log('🔍 Fetching mentors from database...');
    
    // Query all users with MENTOR role
    const mentors = await User.find({ role: 'MENTOR' })
      .select('name email subjects activities -passwordHash')
      .limit(20);

    console.log(`✅ Found ${mentors.length} mentors in database`);

    // Map to the format expected by frontend
    const formattedMentors = mentors.map((mentor, idx) => ({
      id: mentor._id.toString(),
      name: mentor.name,
      email: mentor.email,
      subjects: mentor.subjects && mentor.subjects.length > 0 
        ? mentor.subjects 
        : ['General'],
      rating: 4.5 + Math.random() * 0.4, // Mock rating (4.5-4.9)
      students: Math.floor(Math.random() * 20) + 3, // Mock student count
      bio: `Experienced mentor specializing in ${(mentor.subjects && mentor.subjects[0]) || 'education'}`,
      avatar: ['👨‍🏫', '👩‍🔬', '👨‍🎓', '👩‍💻'][idx % 4],
      responseTime: ['< 1 hour', '< 2 hours', '< 30 mins'][idx % 3],
      available: true,
    }));

    return formattedMentors;
  } catch (error) {
    console.error('❌ Error fetching mentors:', error.message);
    
    // Fallback to mock data if database fails
    console.log('⚠️ Using fallback mentor data');
    return [
      {
        id: 'mentor-1',
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh@example.com',
        subjects: ['Mathematics', 'Physics'],
        rating: 4.8,
        students: 12,
        bio: 'Expert in Math and Physics with 10+ years of teaching experience',
        avatar: '👨‍🏫',
        responseTime: '< 2 hours',
        available: true,
      },
      {
        id: 'mentor-2',
        name: 'Ms. Priya Singh',
        email: 'priya@example.com',
        subjects: ['Biology', 'Chemistry'],
        rating: 4.9,
        students: 8,
        bio: 'Biology specialist with passion for interactive learning',
        avatar: '👩‍🔬',
        responseTime: '< 1 hour',
        available: true,
      },
      {
        id: 'mentor-3',
        name: 'Prof. Amit Patel',
        email: 'amit@example.com',
        subjects: ['English', 'Literature'],
        rating: 4.7,
        students: 15,
        bio: 'English teacher helping students master language skills',
        avatar: '👨‍🎓',
        responseTime: '< 3 hours',
        available: true,
      },
      {
        id: 'mentor-4',
        name: 'Ms. Anjali Verma',
        email: 'anjali@example.com',
        subjects: ['Mathematics', 'Computer Science'],
        rating: 4.9,
        students: 10,
        bio: 'CS and Math expert focused on problem-solving',
        avatar: '👩‍💻',
        responseTime: '< 1.5 hours',
        available: true,
      },
    ];
  }
};

module.exports = { getProfile, getProgress, getStreak, getLeaderboard, getAvailableMentors };
