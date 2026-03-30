const { PrismaClient } = require('@prisma/client');
const { NGO } = require('../utils/constants');

const prisma = new PrismaClient();

/**
 * Get aggregate engagement metrics for the NGO dashboard
 */
const getMetrics = async () => {
  // Total students
  const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });

  // Average engagement score: (missions completed / total missions per student) × 100
  const allStudents = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    select: {
      id: true,
      class: true,
      progress: { where: { completed: true }, select: { id: true } },
    },
  });

  let totalEngagement = 0;
  for (const student of allStudents) {
    const availableMissions = await prisma.mission.count({
      where: { class: student.class },
    });
    if (availableMissions > 0) {
      totalEngagement += (student.progress.length / availableMissions) * 100;
    }
  }
  const engagementScore = totalStudents > 0
    ? Math.round(totalEngagement / totalStudents)
    : 0;

  // Consistency Index: average streak across all students
  const streakAgg = await prisma.streak.aggregate({
    _avg: { currentStreak: true },
    _max: { currentStreak: true },
  });
  const consistencyIndex = Math.round(streakAgg._avg.currentStreak || 0);

  // Learning Improvement: average score trend (last 7 days vs previous 7 days)
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fourteenDaysAgo = new Date(now);
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const [recentScores, previousScores] = await Promise.all([
    prisma.progress.aggregate({
      where: {
        completed: true,
        completedAt: { gte: sevenDaysAgo },
      },
      _avg: { score: true },
      _count: { id: true },
    }),
    prisma.progress.aggregate({
      where: {
        completed: true,
        completedAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo },
      },
      _avg: { score: true },
      _count: { id: true },
    }),
  ]);

  const recentAvg = recentScores._avg.score || 0;
  const previousAvg = previousScores._avg.score || 0;
  const learningImprovement = Math.round(recentAvg - previousAvg);

  // Active students (completed at least 1 mission in last 7 days)
  const activeStudents = await prisma.progress.groupBy({
    by: ['userId'],
    where: {
      completed: true,
      completedAt: { gte: sevenDaysAgo },
    },
  });

  // Mentor requests stats
  const [pendingRequests, resolvedRequests] = await Promise.all([
    prisma.mentorRequest.count({ where: { status: 'PENDING' } }),
    prisma.mentorRequest.count({ where: { status: 'RESOLVED' } }),
  ]);

  return {
    totalStudents,
    activeStudentsLast7Days: activeStudents.length,
    engagementScore,
    consistencyIndex,
    maxStreak: streakAgg._max.currentStreak || 0,
    learningImprovement,
    recentAverageScore: Math.round(recentAvg),
    missionsCompletedLast7Days: recentScores._count.id,
    mentorRequests: {
      pending: pendingRequests,
      resolved: resolvedRequests,
    },
  };
};

/**
 * Detect at-risk students: low streak + low completion rate
 */
const getAtRiskStudents = async () => {
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    select: {
      id: true,
      name: true,
      email: true,
      class: true,
      streak: {
        select: { currentStreak: true, lastActiveDate: true },
      },
      xp: {
        select: { totalXp: true },
      },
      progress: {
        where: { completed: true },
        select: { id: true },
      },
    },
  });

  const atRiskStudents = [];

  for (const student of students) {
    const availableMissions = await prisma.mission.count({
      where: { class: student.class },
    });

    const completionRate = availableMissions > 0
      ? Math.round((student.progress.length / availableMissions) * 100)
      : 0;

    const currentStreak = student.streak?.currentStreak || 0;

    // At-risk if: streak below threshold AND completion rate below threshold
    if (
      currentStreak < NGO.AT_RISK_STREAK &&
      completionRate < NGO.AT_RISK_COMPLETION_RATE
    ) {
      atRiskStudents.push({
        id: student.id,
        name: student.name,
        email: student.email,
        class: student.class,
        currentStreak,
        completionRate,
        totalXp: student.xp?.totalXp || 0,
        lastActiveDate: student.streak?.lastActiveDate || null,
        riskFactors: [
          currentStreak < NGO.AT_RISK_STREAK ? `Low streak (${currentStreak})` : null,
          completionRate < NGO.AT_RISK_COMPLETION_RATE ? `Low completion (${completionRate}%)` : null,
        ].filter(Boolean),
      });
    }
  }

  // Sort by most at-risk (lowest streak + lowest completion)
  atRiskStudents.sort((a, b) => {
    const aRisk = a.currentStreak + a.completionRate;
    const bRisk = b.currentStreak + b.completionRate;
    return aRisk - bRisk;
  });

  return {
    total: atRiskStudents.length,
    students: atRiskStudents,
  };
};

/**
 * High-level overview stats
 */
const getOverview = async () => {
  const [totalStudents, totalMentors, totalMissions, totalQuestions] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.user.count({ where: { role: 'MENTOR' } }),
    prisma.mission.count(),
    prisma.question.count(),
  ]);

  const totalCompletions = await prisma.progress.count({
    where: { completed: true },
  });

  const xpAgg = await prisma.xP.aggregate({
    _sum: { totalXp: true },
    _avg: { totalXp: true },
  });

  return {
    totalStudents,
    totalMentors,
    totalMissions,
    totalQuestions,
    totalCompletions,
    totalXpAwarded: xpAgg._sum.totalXp || 0,
    averageXpPerStudent: Math.round(xpAgg._avg.totalXp || 0),
  };
};

module.exports = { getMetrics, getAtRiskStudents, getOverview };
