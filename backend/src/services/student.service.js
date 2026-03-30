const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');
const { PAGINATION } = require('../utils/constants');

const prisma = new PrismaClient();

/**
 * Get student's full profile with XP, streak, and progress summary
 */
const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      class: true,
      createdAt: true,
      streak: {
        select: {
          currentStreak: true,
          longestStreak: true,
          lastActiveDate: true,
        },
      },
      xp: {
        select: { totalXp: true },
      },
    },
  });

  if (!user) {
    throw ApiError.notFound('Student not found.');
  }

  // Get progress stats
  const progressStats = await prisma.progress.aggregate({
    where: { userId, completed: true },
    _count: { id: true },
    _avg: { score: true },
  });

  const totalMissions = await prisma.mission.count({
    where: { class: user.class },
  });

  return {
    ...user,
    stats: {
      missionsCompleted: progressStats._count.id,
      totalMissions,
      averageScore: Math.round(progressStats._avg.score || 0),
      completionRate: totalMissions > 0
        ? Math.round((progressStats._count.id / totalMissions) * 100)
        : 0,
    },
  };
};

/**
 * Get detailed progress history for a student
 */
const getProgress = async (userId, { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = {}) => {
  const skip = (page - 1) * limit;

  const [progress, total] = await Promise.all([
    prisma.progress.findMany({
      where: { userId },
      include: {
        mission: {
          select: {
            id: true,
            subject: true,
            topic: true,
            class: true,
            difficulty: true,
          },
        },
      },
      orderBy: { completedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.progress.count({ where: { userId } }),
  ]);

  return {
    progress,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get current streak information
 */
const getStreak = async (userId) => {
  const streak = await prisma.streak.findUnique({
    where: { userId },
  });

  if (!streak) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      isActiveToday: false,
    };
  }

  // Check if active today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
  if (lastActive) lastActive.setHours(0, 0, 0, 0);

  const isActiveToday = lastActive && lastActive.getTime() === today.getTime();

  return {
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    lastActiveDate: streak.lastActiveDate,
    isActiveToday,
  };
};

/**
 * Get leaderboard — top students by XP
 */
const getLeaderboard = async ({ page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;

  const [leaderboard, total] = await Promise.all([
    prisma.xP.findMany({
      orderBy: { totalXp: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            class: true,
            streak: {
              select: { currentStreak: true },
            },
          },
        },
      },
      skip,
      take: limit,
    }),
    prisma.xP.count(),
  ]);

  const ranked = leaderboard.map((entry, index) => ({
    rank: skip + index + 1,
    userId: entry.user.id,
    name: entry.user.name,
    class: entry.user.class,
    totalXp: entry.totalXp,
    currentStreak: entry.user.streak?.currentStreak || 0,
  }));

  return {
    leaderboard: ranked,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = { getProfile, getProgress, getStreak, getLeaderboard };
