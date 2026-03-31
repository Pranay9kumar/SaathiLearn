import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Chatbot from '../../components/Chatbot/Chatbot';

const DoubtsPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('chatbot');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      {/* Header with gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        
        <div className="relative px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/student/dashboard')}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </motion.button>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={28} className="text-yellow-300" />
                <h1 className="text-4xl font-bold tracking-tight">Doubt Assistant</h1>
              </div>
              <p className="text-indigo-100 mt-2 text-lg">Get instant answers to all your questions</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('chatbot')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'chatbot'
                  ? 'bg-white text-indigo-600 shadow-xl transform scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              <MessageCircle size={20} />
              Ask a Question
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'resources'
                  ? 'bg-white text-indigo-600 shadow-xl transform scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              <BookOpen size={20} />
              Resources
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="w-full px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-[1600px] mx-auto">
        {activeTab === 'chatbot' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {/* Main Chatbot */}
            <div className="lg:col-span-2 h-full min-h-[700px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Chatbot />
              </motion.div>
            </div>

            {/* Right Panel - Tips & Info */}
            <div className="space-y-8">
              {/* Tips Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(14,165,233,0.08)] p-6 border border-[#e0e7ff] h-fit hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] transition-all"
              >
                <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">💡</span> Tips for Success
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-3 items-start">
                    <span className="text-indigo-600 font-bold flex-shrink-0 text-lg">→</span>
                    <span className="text-slate-700 font-medium">Be specific about your doubt</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-indigo-600 font-bold flex-shrink-0 text-lg">→</span>
                    <span className="text-slate-700 font-medium">Include the topic or subject</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-indigo-600 font-bold flex-shrink-0 text-lg">→</span>
                    <span className="text-slate-700 font-medium">Share what you already know</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-indigo-600 font-bold flex-shrink-0 text-lg">→</span>
                    <span className="text-slate-700 font-medium">Ask follow-up questions</span>
                  </li>
                </ul>
              </motion.div>

              {/* User Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-2xl shadow-[0_4px_16px_rgba(14,165,233,0.08)] p-6 border border-[#e0e7ff] h-fit hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] transition-all"
              >
                <div className="text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-3 shadow-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-bold text-slate-900 text-base">{user?.name}</p>
                  <p className="text-xs text-slate-600 mb-5 font-medium tracking-wide">Class {user?.class}</p>
                  <div className="bg-white rounded-xl p-4 w-full border border-[#e0e7ff]">
                    <p className="text-xs text-slate-600 font-semibold">📚 Subjects</p>
                    <p className="text-sm font-bold text-indigo-600 mt-1">
                      {user?.subjects?.join(', ') || 'Math, Science, English'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(14,165,233,0.08)] p-6 border border-[#e0e7ff] h-fit hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] transition-all"
              >
                <h4 className="font-bold text-slate-900 mb-6 text-base flex items-center gap-2">
                  <span>📊</span> Your Progress
                </h4>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 font-medium text-sm">Questions Asked</span>
                    <span className="font-bold text-indigo-600 text-lg">0</span>
                  </div>
                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 font-medium text-sm">Doubts Resolved</span>
                    <span className="font-bold text-green-600 text-lg">0</span>
                  </div>
                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-xs text-slate-600 font-medium">⚡ Response Time: <span className="text-indigo-600 font-bold">~2s</span></p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-[0_4px_16px_rgba(14,165,233,0.08)] border border-[#e0e7ff] p-16 text-center h-96 flex flex-col items-center justify-center hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] transition-all">
              <BookOpen size={56} className="text-indigo-600 mb-6" />
              <h3 className="text-3xl font-bold text-slate-900 mb-3">Learning Resources</h3>
              <p className="text-slate-600 text-lg font-medium mb-8 max-w-md">
                Amazing educational materials coming your way! Stay tuned for curated content tailored to your subjects.
              </p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-indigo-600 font-bold text-sm"
              >
                ✨ Coming Soon ✨
              </motion.div>
            </div>
          </motion.div>
        )}
        </div>
      </motion.div>
    </div>
  );
};

export default DoubtsPage;
