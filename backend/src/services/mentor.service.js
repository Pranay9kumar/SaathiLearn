const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');
const { MENTOR_REQUEST_STATUS, PAGINATION } = require('../utils/constants');

const prisma = new PrismaClient();

/**
 * Student creates a mentor help request
 */
const createRequest = async (studentId, questionId, message) => {
  // Verify question exists
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: {
      mission: { select: { subject: true } },
    },
  });

  if (!question) {
    throw ApiError.notFound('Question not found.');
  }

  // Check for existing pending request on the same question
  const existingRequest = await prisma.mentorRequest.findFirst({
    where: {
      studentId,
      questionId,
      status: { in: ['PENDING', 'ASSIGNED'] },
    },
  });

  if (existingRequest) {
    throw ApiError.conflict('You already have a pending request for this question.');
  }

  // Find best mentor: matches subject and has fewest open requests
  const subject = question.mission.subject;

  const mentors = await prisma.user.findMany({
    where: {
      role: 'MENTOR',
      subjects: { has: subject },
    },
    include: {
      mentorRequests: {
        where: {
          status: { in: ['PENDING', 'ASSIGNED'] },
        },
      },
    },
  });

  // Sort by fewest open requests
  mentors.sort((a, b) => a.mentorRequests.length - b.mentorRequests.length);

  const assignedMentor = mentors.length > 0 ? mentors[0] : null;

  // Create request
  const request = await prisma.mentorRequest.create({
    data: {
      studentId,
      questionId,
      mentorId: assignedMentor?.id || null,
      status: assignedMentor ? 'ASSIGNED' : 'PENDING',
      message: message || null,
    },
    include: {
      question: {
        select: {
          question: true,
          mission: { select: { subject: true, topic: true } },
        },
      },
      mentor: {
        select: { id: true, name: true },
      },
    },
  });

  return request;
};

/**
 * Get students assigned to a mentor
 */
const getStudents = async (mentorId) => {
  const studentIds = await prisma.mentorRequest.findMany({
    where: { mentorId },
    select: { studentId: true },
    distinct: ['studentId'],
  });

  const students = await prisma.user.findMany({
    where: {
      id: { in: studentIds.map((s) => s.studentId) },
    },
    select: {
      id: true,
      name: true,
      email: true,
      class: true,
      streak: { select: { currentStreak: true } },
      xp: { select: { totalXp: true } },
    },
  });

  return students;
};

/**
 * Get mentor's requests (pending + assigned)
 */
const getRequests = async (mentorId, { status, page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = {}) => {
  const skip = (page - 1) * limit;
  const where = { mentorId };

  if (status) {
    where.status = status;
  }

  const [requests, total] = await Promise.all([
    prisma.mentorRequest.findMany({
      where,
      include: {
        student: {
          select: { id: true, name: true, class: true },
        },
        question: {
          select: {
            id: true,
            question: true,
            options: true,
            correctAnswer: true,
            mission: { select: { subject: true, topic: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.mentorRequest.count({ where }),
  ]);

  return {
    requests,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

/**
 * Mentor replies to a student's request
 */
const replyToRequest = async (mentorId, requestId, response) => {
  const request = await prisma.mentorRequest.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    throw ApiError.notFound('Request not found.');
  }

  if (request.mentorId && request.mentorId !== mentorId) {
    throw ApiError.forbidden('This request is assigned to another mentor.');
  }

  if (request.status === 'RESOLVED') {
    throw ApiError.conflict('This request has already been resolved.');
  }

  const updated = await prisma.mentorRequest.update({
    where: { id: requestId },
    data: {
      mentorId,
      status: 'RESOLVED',
      response,
    },
    include: {
      student: { select: { id: true, name: true } },
      question: {
        select: {
          question: true,
          mission: { select: { subject: true, topic: true } },
        },
      },
    },
  });

  return updated;
};

module.exports = { createRequest, getStudents, getRequests, replyToRequest };
