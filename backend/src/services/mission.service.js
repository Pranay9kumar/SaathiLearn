const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');
const { XP: XP_CONFIG, STREAK: STREAK_CONFIG } = require('../utils/constants');

const prisma = new PrismaClient();

/**
 * Get today's mission for a student based on their class.
 * Uses a daily rotation algorithm to pick different missions each day.
 */
const getTodaysMission = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { class: true },
  });

  if (!user || !user.class) {
    throw ApiError.badRequest('Student class not set. Please update your profile.');
  }

  // Get all missions for this class
  const missions = await prisma.mission.findMany({
    where: { class: user.class },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
          // Don't send correctAnswer to client
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  if (missions.length === 0) {
    throw ApiError.notFound('No missions available for your class yet.');
  }

  // Daily rotation: use day-of-year to pick a different mission each day
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const missionIndex = dayOfYear % missions.length;

  const todaysMission = missions[missionIndex];

  // Check if already completed today
  const existingProgress = await prisma.progress.findUnique({
    where: {
      userId_missionId: {
        userId,
        missionId: todaysMission.id,
      },
    },
  });

  return {
    mission: todaysMission,
    alreadyCompleted: existingProgress?.completed || false,
    previousScore: existingProgress?.score || null,
  };
};

/**
 * Submit mission answers, calculate score, award XP, update streak
 */
const submitMission = async (userId, missionId, answers) => {
  // 1. Get mission with correct answers
  const mission = await prisma.mission.findUnique({
    where: { id: missionId },
    include: { questions: true },
  });

  if (!mission) {
    throw ApiError.notFound('Mission not found.');
  }

  // 2. Check if already completed
  const existingProgress = await prisma.progress.findUnique({
    where: {
      userId_missionId: { userId, missionId },
    },
  });

  if (existingProgress?.completed) {
    throw ApiError.conflict('You have already completed this mission.');
  }

  // 3. Calculate score
  let correctCount = 0;
  const totalQuestions = mission.questions.length;
  const results = [];

  for (const question of mission.questions) {
    const studentAnswer = answers.find((a) => a.questionId === question.id);
    const isCorrect = studentAnswer?.answer === question.correctAnswer;

    if (isCorrect) correctCount++;

    results.push({
      questionId: question.id,
      question: question.question,
      yourAnswer: studentAnswer?.answer || null,
      correctAnswer: question.correctAnswer,
      isCorrect,
    });
  }

  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // 4. Calculate XP earned
  let xpEarned = correctCount * XP_CONFIG.PER_CORRECT_ANSWER;
  if (scorePercent === 100) {
    xpEarned += XP_CONFIG.PERFECT_SCORE_BONUS;
  }

  // 5. Execute everything in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // Save/update progress
    const progress = await tx.progress.upsert({
      where: {
        userId_missionId: { userId, missionId },
      },
      create: {
        userId,
        missionId,
        completed: true,
        score: scorePercent,
        answers,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        score: scorePercent,
        answers,
        completedAt: new Date(),
      },
    });

    // Update XP
    const xp = await tx.xP.upsert({
      where: { userId },
      create: { userId, totalXp: xpEarned },
      update: { totalXp: { increment: xpEarned } },
    });

    // Update Streak
    const streak = await updateStreak(tx, userId);

    // Apply streak bonus
    if (streak.currentStreak >= STREAK_CONFIG.BONUS_THRESHOLD) {
      const streakBonus = Math.min(
        Math.round(xpEarned * XP_CONFIG.STREAK_BONUS_MULTIPLIER * streak.currentStreak),
        XP_CONFIG.MAX_STREAK_BONUS
      );
      if (streakBonus > 0) {
        await tx.xP.update({
          where: { userId },
          data: { totalXp: { increment: streakBonus } },
        });
        xpEarned += streakBonus;
      }
    }

    return { progress, xp, streak };
  });

  return {
    score: scorePercent,
    correctCount,
    totalQuestions,
    xpEarned,
    currentStreak: result.streak.currentStreak,
    totalXp: result.xp.totalXp + (xpEarned - (correctCount * XP_CONFIG.PER_CORRECT_ANSWER + (scorePercent === 100 ? XP_CONFIG.PERFECT_SCORE_BONUS : 0))),
    results,
  };
};

/**
 * Get a specific mission by ID
 */
const getMissionById = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    where: { id: missionId },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });

  if (!mission) {
    throw ApiError.notFound('Mission not found.');
  }

  return mission;
};

/**
 * Update streak logic:
 * - Same day: no change
 * - Next day: increment streak
 * - Missed days: reset to 1
 */
const updateStreak = async (tx, userId) => {
  const streak = await tx.streak.findUnique({ where: { userId } });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!streak) {
    return tx.streak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today,
      },
    });
  }

  const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
  }

  // Same day — no streak change
  if (lastActive && lastActive.getTime() === today.getTime()) {
    return streak;
  }

  // Check if yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let newStreak;
  if (lastActive && lastActive.getTime() === yesterday.getTime()) {
    // Consecutive day
    newStreak = streak.currentStreak + 1;
  } else {
    // Missed a day — reset
    newStreak = 1;
  }

  const longestStreak = Math.max(newStreak, streak.longestStreak);

  return tx.streak.update({
    where: { userId },
    data: {
      currentStreak: newStreak,
      longestStreak,
      lastActiveDate: today,
    },
  });
};

module.exports = { getTodaysMission, submitMission, getMissionById };
