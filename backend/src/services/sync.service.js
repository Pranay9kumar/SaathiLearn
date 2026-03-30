const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Process batch sync of offline progress data.
 * Accepts an array of mission submissions and processes them in a transaction.
 * Deduplicates already-completed missions.
 */
const syncOfflineData = async (userId, submissions) => {
  if (!Array.isArray(submissions) || submissions.length === 0) {
    throw ApiError.badRequest('No submissions to sync.');
  }

  const results = {
    synced: [],
    skipped: [],
    errors: [],
  };

  // Process each submission
  await prisma.$transaction(async (tx) => {
    for (const submission of submissions) {
      try {
        const { missionId, answers, completedAt } = submission;

        if (!missionId || !answers) {
          results.errors.push({
            missionId,
            reason: 'Missing missionId or answers',
          });
          continue;
        }

        // Check if mission exists
        const mission = await tx.mission.findUnique({
          where: { id: missionId },
          include: { questions: true },
        });

        if (!mission) {
          results.errors.push({ missionId, reason: 'Mission not found' });
          continue;
        }

        // Check if already completed
        const existing = await tx.progress.findUnique({
          where: {
            userId_missionId: { userId, missionId },
          },
        });

        if (existing?.completed) {
          results.skipped.push({
            missionId,
            reason: 'Already completed',
          });
          continue;
        }

        // Calculate score
        let correctCount = 0;
        for (const question of mission.questions) {
          const studentAnswer = answers.find(
            (a) => a.questionId === question.id
          );
          if (studentAnswer?.answer === question.correctAnswer) {
            correctCount++;
          }
        }

        const scorePercent = Math.round(
          (correctCount / mission.questions.length) * 100
        );

        // Save progress
        await tx.progress.upsert({
          where: {
            userId_missionId: { userId, missionId },
          },
          create: {
            userId,
            missionId,
            completed: true,
            score: scorePercent,
            answers,
            completedAt: completedAt ? new Date(completedAt) : new Date(),
          },
          update: {
            completed: true,
            score: scorePercent,
            answers,
            completedAt: completedAt ? new Date(completedAt) : new Date(),
          },
        });

        // Award XP
        const xpEarned = correctCount * 10 + (scorePercent === 100 ? 25 : 0);
        await tx.xP.upsert({
          where: { userId },
          create: { userId, totalXp: xpEarned },
          update: { totalXp: { increment: xpEarned } },
        });

        results.synced.push({
          missionId,
          score: scorePercent,
          xpEarned,
        });
      } catch (error) {
        results.errors.push({
          missionId: submission.missionId,
          reason: error.message,
        });
      }
    }

    // Log sync operation
    await tx.syncLog.create({
      data: {
        userId,
        payload: { submissions: submissions.length, results },
      },
    });
  });

  return {
    totalSubmissions: submissions.length,
    synced: results.synced.length,
    skipped: results.skipped.length,
    errors: results.errors.length,
    details: results,
  };
};

module.exports = { syncOfflineData };
