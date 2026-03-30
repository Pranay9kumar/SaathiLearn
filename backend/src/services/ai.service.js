const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Get a hint for a specific question.
 * Currently uses the local hint_text field from questions table.
 * Can be swapped for LLM integration (OpenAI, Gemini, etc.) later.
 */
const getHint = async (questionId) => {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: {
      id: true,
      question: true,
      hintText: true,
      mission: {
        select: {
          subject: true,
          topic: true,
        },
      },
    },
  });

  if (!question) {
    throw ApiError.notFound('Question not found.');
  }

  if (!question.hintText) {
    // Fallback: generate a generic hint based on topic
    return {
      questionId: question.id,
      hint: `Try reviewing the concept of "${question.mission.topic}" in ${question.mission.subject}. Break the problem into smaller steps and think about what you know.`,
      source: 'auto-generated',
    };
  }

  return {
    questionId: question.id,
    hint: question.hintText,
    source: 'curated',
  };
};

/**
 * PLACEHOLDER: LLM-powered hint generation
 * Uncomment and configure when integrating with an AI service.
 *
 * const getLLMHint = async (questionId) => {
 *   const question = await prisma.question.findUnique({ where: { id: questionId } });
 *   const response = await openai.chat.completions.create({
 *     model: 'gpt-4',
 *     messages: [
 *       { role: 'system', content: 'You are a friendly tutor. Give a helpful hint without revealing the answer.' },
 *       { role: 'user', content: `Question: ${question.question}\nOptions: ${JSON.stringify(question.options)}` },
 *     ],
 *   });
 *   return { questionId, hint: response.choices[0].message.content, source: 'ai' };
 * };
 */

module.exports = { getHint };
