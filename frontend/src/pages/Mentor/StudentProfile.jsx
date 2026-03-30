import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Flame, Award, BookOpen, Clock, Activity, MessageSquare, ListTodo, Star, TrendingUp } from 'lucide-react';
import { mentorAPI } from '../../api/mentor';

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    mentorAPI.getStudents().then(data => {
      const found = data.find(s => s.id === id);
      setStudent(found);
    });
  }, [id]);

  if (!student) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner"></div></div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <Link to="/mentor/students" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors bg-white hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 shadow-sm">
          <ArrowLeft size={16} className="mr-2" /> Back to Directory
        </Link>
        <button className="btn btn-secondary text-sm px-4 py-2 border-blue-200 text-blue-600 hover:bg-blue-50 bg-white shadow-sm">
          <MessageSquare size={16} /> Direct Message
        </button>
      </div>

      <motion.div variants={itemVariants} className="glass-panel p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start group bg-white border border-slate-200">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-50 via-purple-50 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 transition-all duration-700"></div>
        
        <div className="relative shrink-0">
          <div className="w-32 h-32 rounded-[2rem] bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-5xl shadow-sm border-4 border-white rotate-3 group-hover:rotate-0 transition-transform duration-500 relative z-10">
            {student.name.charAt(0)}
          </div>
          <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-xl border-4 border-white flex items-center justify-center z-20 shadow-sm ${
            student.healthStatus === 'green' ? 'bg-emerald-500' :
            student.healthStatus === 'yellow' ? 'bg-amber-500' : 'bg-red-500'
          }`}>
            <Activity size={14} className="text-white" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">{student.name}</h1>
          
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm mb-6">
            <span className="bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-semibold shadow-sm">
              Class {student.class}
            </span>
            <span className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] shadow-sm ${
              student.healthStatus === 'green' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
              student.healthStatus === 'yellow' ? 'bg-amber-50 border-amber-200 text-amber-600' :
              'bg-red-50 border-red-200 text-red-600'
            }`}>
              {student.healthStatus === 'green' ? 'Active Learner' : student.healthStatus === 'yellow' ? 'Needs Attention' : 'At Risk'}
            </span>
            <span className="text-slate-500 flex items-center gap-1.5 font-medium px-2 py-1.5">
              <Clock size={16} /> Last active: <span className="text-slate-700">{student.lastActive}</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <Flame size={20} className={student.streak_days > 0 ? "fill-orange-400 text-orange-400" : "text-orange-400"} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 leading-none mb-1">{student.streak_days}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Day Streak</p>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Award size={20} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 leading-none mb-1">Lvl {student.level}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{student.total_xp} XP Total</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 leading-none mb-1">{student.avgScore}%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Avg Score</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8 flex flex-col min-h-[300px] bg-white border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <BookOpen size={20} className="text-blue-500"/> Context & Subjects
          </h3>
          <div className="space-y-6 flex-1">
            {student.subjects.map((sub, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-slate-700 font-bold">{sub}</span>
                  <span className="text-blue-600 font-bold text-lg">{(Math.random() * 40 + 40).toFixed(0)}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.random() * 40 + 40}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8 flex flex-col min-h-[300px] bg-white border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Award size={20} className="text-amber-500"/> Earned Badges
            </h3>
            <span className="text-slate-500 text-sm font-bold">{student.badges.length} Unlocked</span>
          </div>
          
          {student.badges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-max">
              {student.badges.map((badge, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="w-12 h-12 mb-3 bg-amber-50 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {badge.includes('Warrior') ? '🔥' : badge.includes('Master') ? '🏆' : badge.includes('Champion') ? '👑' : '⭐'}
                  </div>
                  <span className="text-xs font-bold text-slate-700 leading-tight">{badge}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm">
              <Star size={32} className="text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium max-w-xs">No badges unlocked yet. They need to complete more milestones!</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentProfile;
