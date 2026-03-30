const catchAsync = require('../utils/catchAsync');
const mentorService = require('../services/mentor.service');

/**
 * POST /api/mentor/request
 */
const createRequest = catchAsync(async (req, res) => {
  const { questionId, message } = req.body;

  const request = await mentorService.createRequest(
    req.user.id,
    questionId,
    message
  );

  // Emit real-time notification to assigned mentor
  const io = req.app.get('io');
  if (io && request.mentorId) {
    io.to(`user:${request.mentorId}`).emit('mentor:newRequest', {
      requestId: request.id,
      student: { id: req.user.id, name: req.user.name },
      question: request.question,
      message: request.message,
      createdAt: request.createdAt,
    });
  }

  res.status(201).json({
    success: true,
    message: request.mentorId
      ? 'Request sent! A mentor has been assigned.'
      : 'Request received. We will assign a mentor shortly.',
    data: request,
  });
});

/**
 * GET /api/mentor/students
 */
const getStudents = catchAsync(async (req, res) => {
  const students = await mentorService.getStudents(req.user.id);

  res.status(200).json({
    success: true,
    data: students,
  });
});

/**
 * GET /api/mentor/requests
 */
const getRequests = catchAsync(async (req, res) => {
  const { status, page, limit } = req.query;

  const result = await mentorService.getRequests(req.user.id, {
    status,
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * POST /api/mentor/reply
 */
const replyToRequest = catchAsync(async (req, res) => {
  const { requestId, response } = req.body;

  const updated = await mentorService.replyToRequest(
    req.user.id,
    requestId,
    response
  );

  // Emit real-time notification to student
  const io = req.app.get('io');
  if (io) {
    io.to(`user:${updated.student.id}`).emit('mentor:reply', {
      requestId: updated.id,
      mentor: { id: req.user.id, name: req.user.name },
      response: updated.response,
      question: updated.question,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Reply sent successfully.',
    data: updated,
  });
});

module.exports = { createRequest, getStudents, getRequests, replyToRequest };
