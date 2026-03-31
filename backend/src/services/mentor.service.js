const ApiError = require('../utils/ApiError');
const MentorRequest = require('../models/MentorRequest');
const User = require('../models/User');

/**
 * Connect student with a specific mentor
 */
const connectWithMentor = async (studentId, mentorId, subject = 'General', message = '') => {
  try {
    console.log('🔗 Connecting student with mentor...');
    
    // Verify mentor exists and is a MENTOR
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'MENTOR') {
      throw new ApiError(404, 'Mentor not found');
    }

    // Check if connection already exists
    const existingConnection = await MentorRequest.findOne({
      studentId,
      mentorId,
      status: { $in: ['PENDING', 'ACCEPTED'] },
    });

    if (existingConnection) {
      throw new ApiError(400, 'You already have a pending or active connection with this mentor');
    }

    // Create new connection request
    const connection = new MentorRequest({
      studentId,
      mentorId,
      subject,
      message,
      status: 'PENDING',
    });

    await connection.save();
    await connection.populate('studentId', 'name email');
    await connection.populate('mentorId', 'name email subjects');

    console.log('✅ Connection request created:', connection.id);
    return connection;
  } catch (error) {
    console.error('❌ Error connecting with mentor:', error.message);
    throw error;
  }
};

/**
 * MongoDB refactor placeholder.
 * This service is pending MongoDB implementation.
 */
const createRequest = async () => {
  throw new ApiError(501, 'Mentor request creation is not implemented for MongoDB yet.');
};

const getStudents = async () => {
  throw new ApiError(501, 'Mentor students list is not implemented for MongoDB yet.');
};

const getRequests = async () => {
  throw new ApiError(501, 'Mentor requests list is not implemented for MongoDB yet.');
};

const replyToRequest = async () => {
  throw new ApiError(501, 'Mentor request replies are not implemented for MongoDB yet.');
};

module.exports = { connectWithMentor, createRequest, getStudents, getRequests, replyToRequest };
