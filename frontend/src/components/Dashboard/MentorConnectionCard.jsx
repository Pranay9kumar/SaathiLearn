import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, MessageCircle, AlertCircle, Clock, Award } from 'lucide-react';
import api from '../../api/axios';

const MentorConnectionCard = ({ onMentorSelect }) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [error, setError] = useState(null);
  const [connecting, setConnecting] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await api.get('/student/available-mentors');
        if (response.data.success) {
          setMentors(response.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Failed to load available mentors');
        // Fallback mentors
        setMentors([
          {
            id: 'mentor-1',
            name: 'Dr. Rajesh Kumar',
            subjects: ['Mathematics', 'Physics'],
            rating: 4.8,
            students: 12,
            bio: 'Expert in Math and Physics',
            avatar: '👨‍🏫',
            responseTime: '< 2 hours',
            available: true,
          },
          {
            id: 'mentor-2',
            name: 'Ms. Priya Singh',
            subjects: ['Biology', 'Chemistry'],
            rating: 4.9,
            students: 8,
            bio: 'Biology specialist with passion',
            avatar: '👩‍🔬',
            responseTime: '< 1 hour',
            available: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleConnectMentor = async (mentor) => {
    setConnecting(mentor.id);
    setError(null);
    setSuccessMessage(null);

    try {
      console.log('🔗 Sending connection request to mentor:', mentor.name);
      
      // Call the backend API to connect with mentor
      const response = await api.post(`/mentor/connect/${mentor.id}`, {
        subject: 'General Help',
        message: `Hi ${mentor.name}, I would like to connect with you for personalized guidance and support.`,
      });

      if (response.data.success) {
        setSuccessMessage(`Connected with ${mentor.name}! Check your notifications for response.`);
        console.log('✅ Connection request sent:', response.data.data);
        
        if (onMentorSelect) {
          onMentorSelect(mentor);
        }

        setSelectedMentor(mentor);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to connect with mentor';
      setError(errorMessage);
      console.error('❌ Error connecting with mentor:', err);
    } finally {
      setConnecting(null);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="bg-white rounded-2xl border border-slate-200 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="animate-spin mb-4">
              <Users className="mx-auto text-indigo-600" size={32} />
            </div>
            <p className="text-slate-600 font-medium">Loading mentors...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.3 }}
    >
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Connect with a Mentor</div>
            <div className="text-xs text-purple-100 mt-0.5">Get personalized guidance from experts</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {error && (
          <motion.div
            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <MessageCircle size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-700">{successMessage}</p>
          </motion.div>
        )}

        {mentors && mentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentors.map((mentor, idx) => (
              <motion.div
                key={mentor.id}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl p-4 transition-all cursor-pointer group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + idx * 0.05 }}
                onClick={() => handleConnectMentor(mentor)}
              >
                {/* Status Badge */}
                {mentor.available && (
                  <div className="mb-3 inline-block">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                      Available
                    </span>
                  </div>
                )}

                {/* Avatar and Name */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl flex-shrink-0">{mentor.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 truncate">{mentor.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mt-0.5">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-slate-400">({mentor.students} students)</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{mentor.bio}</p>

                {/* Subjects */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {mentor.subjects && mentor.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                {/* Response Time */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Clock size={14} />
                    <span>Responds {mentor.responseTime}</span>
                  </div>
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConnectMentor(mentor);
                    }}
                    disabled={connecting === mentor.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-xs font-semibold hover:shadow-md transition-all ${
                      connecting === mentor.id ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    whileHover={connecting !== mentor.id ? { scale: 1.05 } : {}}
                    whileTap={connecting !== mentor.id ? { scale: 0.95 } : {}}
                  >
                    {connecting === mentor.id ? (
                      <>
                        <div className="animate-spin">
                          <MessageCircle size={14} />
                        </div>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <MessageCircle size={14} />
                        Connect
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Users size={32} className="mx-auto text-slate-400 mb-3" />
            <p className="text-slate-600 font-medium">No mentors available at the moment</p>
            <p className="text-sm text-slate-500 mt-1">Check back soon!</p>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-3">
            <Award size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-purple-900">Get Expert Help</p>
              <p className="text-xs text-purple-700 mt-1">Connect with mentors for personalized guidance on doubts, assignments, and learning strategies.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MentorConnectionCard;
