import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Target, Zap, Clock, ChevronRight } from 'lucide-react';
import api from '../../api/axios';

const LearningPlanCard = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLearningPlan = async () => {
      try {
        setLoading(true);
        const response = await api.get('/student/learning-plan');
        if (response.data.success) {
          setPlan(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching learning plan:', err);
        setError('Failed to load learning plan');
        // Set fallback plan
        setPlan({
          weeklyFocus: 'Mathematics - Advanced Problem Solving',
          recommendedTopics: [
            { topic: 'Quadratic Equations', icon: '📚', difficulty: 'Intermediate', estimatedTime: '30 mins' },
            { topic: 'Cell Biology', icon: '🔬', difficulty: 'Beginner', estimatedTime: '25 mins' },
            { topic: 'Geometry Basics', icon: '📐', difficulty: 'Advanced', estimatedTime: '40 mins' },
          ],
          milestones: [
            { milestone: 'Reach Level 5', xpRequired: 500, progress: 65 },
            { milestone: 'Building Streak', xpRequired: 100, progress: 45 },
            { milestone: 'Master 5 Subjects', xpRequired: 200, progress: 75 },
          ],
          dailyGoal: 'Complete 1-2 lessons and maintain your learning streak!',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPlan();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="bg-white rounded-2xl border border-slate-200 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin mb-4">
              <Zap className="mx-auto text-indigo-600" size={32} />
            </div>
            <p className="text-slate-600 font-medium">Generating your personalized learning plan...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!plan) {
    return null;
  }

  const difficultyColors = {
    'Beginner': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
    'Intermediate': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
    'Advanced': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header with Weekly Focus */}
      <motion.div
        className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">Weekly Focus</span>
            </div>
            <h2 className="text-3xl font-bold">{plan.weeklyFocus || 'Your Weekly Focus'}</h2>
          </div>
          <div className="p-3 bg-white/20 rounded-xl">
            <BookOpen size={24} />
          </div>
        </div>
        <p className="text-blue-100 flex items-center gap-2">
          <Zap size={16} />
          {plan.dailyGoal}
        </p>
      </motion.div>

      {/* Recommended Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-slate-200 p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BookOpen size={20} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recommended Topics</h3>
            <p className="text-sm text-slate-500 mt-0.5">Master these topics this week</p>
          </div>
        </div>

        <div className="space-y-3">
          {plan.recommendedTopics && plan.recommendedTopics.map((topic, idx) => {
            const colors = difficultyColors[topic.difficulty] || difficultyColors['Beginner'];
            return (
              <motion.div
                key={idx}
                className={`${colors.bg} ${colors.border} border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group hover:scale-[1.02]`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-2xl">{topic.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{topic.topic}</p>
                    <p className={`text-xs font-medium ${colors.text}`}>{topic.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock size={16} />
                    <span className="text-sm font-medium">{topic.estimatedTime}</span>
                  </div>
                  <ChevronRight size={20} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-slate-200 p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <CheckCircle size={20} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your Milestones</h3>
            <p className="text-sm text-slate-500 mt-0.5">Track your progress towards goals</p>
          </div>
        </div>

        <div className="space-y-4">
          {plan.milestones && plan.milestones.map((milestone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-900">{milestone.milestone}</p>
                <span className={`text-sm font-bold ${
                  milestone.progress >= 100 ? 'text-emerald-600' :
                  milestone.progress >= 75 ? 'text-blue-600' :
                  'text-orange-600'
                }`}>
                  {Math.round(milestone.progress)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${milestone.progress}%` }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LearningPlanCard;
