import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { Play, Award, Flame, User, Clock, CheckCircle, Brain, Book, Trophy, Target, Star, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- MOCK DATA ---
const INITIAL_DATA = {
  tasks: [
    { id: 't1', title: 'Quadratic Equations Ex 4.2', type: 'Lesson', subject: 'Math', duration: '15 mins', icon: <Target />, color: 'var(--secondary-color)', bg: 'rgba(16, 185, 129, 0.1)' },
    { id: 't2', title: 'Cell Structure Quiz', type: 'Quiz', subject: 'Science', duration: '10 Qs', icon: <Brain />, color: 'var(--accent-color)', bg: 'rgba(245, 158, 11, 0.1)' },
    { id: 't3', title: 'Reading Comprehension', type: 'Assignment', subject: 'English', duration: 'Due Today', icon: <Book />, color: 'var(--primary-color)', bg: 'rgba(37, 99, 235, 0.1)' }
  ],
  progress: [
    { subject: 'Math', percent: 72, color: 'var(--secondary-color)' },
    { subject: 'Science', percent: 45, color: 'var(--accent-color)' },
    { subject: 'English', percent: 88, color: 'var(--primary-color)' }
  ],
  leaderboard: [
    { rank: 1, name: 'Priya S.', avatar: 'P', bg: 'linear-gradient(135deg, #f59e0b, #ef4444)', xp: 4800, isMe: false },
    { rank: 2, name: 'Rahul V.', avatar: 'R', bg: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', xp: 2450, isMe: true },
    { rank: 3, name: 'Deepak M.', avatar: 'D', bg: 'linear-gradient(135deg, #10b981, #0ea5e9)', xp: 2100, isMe: false },
    { rank: 4, name: 'Ananya R.', avatar: 'A', bg: 'rgba(0,0,0,0.05)', textColor: '#64748b', xp: 1950, isMe: false },
    { rank: 5, name: 'Amit K.', avatar: 'A', bg: 'rgba(0,0,0,0.05)', textColor: '#64748b', xp: 1800, isMe: false }
  ],
  assignments: [
    { title: 'Algebra Worksheet', status: 'Pending', due: 'Tomorrow 5 PM', class: 'text-amber-600 bg-amber-50 border-amber-200' },
    { title: 'Physics Lab Report', status: 'Needs Review', due: 'Submitted', class: 'text-purple-600 bg-purple-50 border-purple-200' },
    { title: 'History Essay', status: 'Completed', due: 'Graded', class: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
  ],
  badges: [
    { icon: '🔥', title: '7-Day Warrior', unlocked: true },
    { icon: '🎓', title: 'Scholar', unlocked: true },
    { icon: '🏆', title: 'Quiz Master', unlocked: true },
    { icon: '👑', title: 'Champion', unlocked: false },
    { icon: '🚀', title: 'Speedster', unlocked: false },
    { icon: '⭐', title: 'Rising Star', unlocked: false }
  ],
  activity: [
    { text: 'Completed lesson "Chemical Bonding"', time: '2 hours ago', type: 'emerald' },
    { text: 'Earned badge "Brainiac"', time: 'Yesterday', type: 'amber' },
    { text: 'Score 90% in Math Quiz', time: '2 days ago', type: 'purple' }
  ]
};

// --- COMPONENTS ---

// Circular Progress
const CircularProgress = ({ percent, color, subject }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let anim;
    if (value < percent) {
      anim = setTimeout(() => setValue(v => Math.min(v + 1, percent)), 15);
    }
    return () => clearTimeout(anim);
  }, [value, percent]);

  return (
    <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-colors hover:bg-white hover:shadow-sm group cursor-default">
      <div
        className="w-[90px] h-[90px] mx-auto mb-5 rounded-full flex items-center justify-center relative shadow-sm transition-transform group-hover:scale-105"
        style={{ background: `conic-gradient(${color} ${value}%, #e2e8f0 0)` }}
      >
        <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
          <span className="font-[Syne] text-xl font-extrabold text-slate-800">{value}%</span>
        </div>
      </div>
      <span className="font-bold text-slate-500 group-hover:text-slate-800 transition-colors">{subject}</span>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(INITIAL_DATA);
  const [userState, setUserState] = useState({ currentXp: 2450, level: 5 });
  const [toast, setToast] = useState(null);
  const [xpAnimation, setXpAnimation] = useState({ active: false, value: 0 });

  const xpPerLevel = 500;
  const levelProgress = ((userState.currentXp % xpPerLevel) / xpPerLevel) * 100;

  const showToastMsg = (msg, icon, borderCol = 'var(--primary-color)') => {
    setToast({ msg, icon, borderCol });
    setTimeout(() => setToast(null), 3000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
    });
  };

  const completeTask = (id, title) => {
    const xpGained = 50;

    // Remove task
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    }));

    showToastMsg(`Completed "${title}" (+${xpGained} XP)`, '🎉', 'var(--secondary-color)');

    setXpAnimation({ active: true, value: xpGained });
    setTimeout(() => setXpAnimation({ active: false, value: 0 }), 1500);

    const newXp = userState.currentXp + xpGained;
    const isLevelUp = Math.floor(newXp / xpPerLevel) > Math.floor(userState.currentXp / xpPerLevel);

    if (isLevelUp) {
      setTimeout(() => {
        triggerConfetti();
        setUserState(prev => ({ currentXp: newXp, level: prev.level + 1 }));
        showToastMsg(`LEVEL UP! You are now Level ${userState.level + 1}!`, '🎓', 'var(--primary-color)');
        setData(prev => ({
          ...prev,
          activity: [{ text: `Reached Level ${userState.level + 1}!`, time: 'Just now', type: 'purple' }, ...prev.activity]
        }));
      }, 800);
    } else {
      setUserState(prev => ({ ...prev, currentXp: newXp }));
    }
  };

  const handleBadgeClick = (b) => {
    if (b.unlocked) showToastMsg(`You've already mastered ${b.title}!`, '⭐', 'var(--accent-color)');
    else showToastMsg(`${b.title} is locked. Keep grinding!`, '🔒', '#94a3b8');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="dash-section-gap">

        <div className="dash-grid">
          {/* LEFT COLUMN */}
          <div className="dash-col-8 dash-section-gap">

            {/* Hero: Today's Plan */}
            <motion.section variants={itemVariants}>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  📅 Today's Learning Plan
                </h3>
                <a href="#" className="font-bold text-sm text-blue-600 hover:text-blue-700 transition-colors">View Full Path &rarr;</a>
              </div>

              <div className="space-y-4 relative">
                <AnimatePresence>
                  {data.tasks.map((t) => (
                    <motion.div
                      key={t.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, x: 50, transition: { duration: 0.3 } }}
                      whileHover={{ x: 4, backgroundColor: '#f8fafc', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                      className="glass-card flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 cursor-pointer group bg-white border border-slate-200 rounded-xl"
                    >
                      <div className="flex items-center gap-5 mb-4 sm:mb-0">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-105" style={{ background: t.bg, color: t.color }}>
                          {t.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-[1.15rem] text-slate-800 mb-1.5">{t.title}</h4>
                          <div className="flex items-center gap-3 text-[0.85rem] font-semibold text-slate-500">
                            <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 uppercase tracking-wide text-slate-600">{t.type}</span>
                            <span>&bull; {t.subject}</span>
                            <span>&bull; {t.duration}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); completeTask(t.id, t.title); }}
                        className="btn btn-primary w-full sm:w-auto text-sm"
                      >
                        Start <ChevronRight size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {data.tasks.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-10 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
                    <h3 className="text-2xl font-bold text-emerald-600 mb-2">All caught up! 🚀</h3>
                    <p className="text-emerald-700 font-medium opacity-80">Enjoy your free time or explore new topics.</p>
                  </motion.div>
                )}
              </div>
            </motion.section>

            {/* Subject Progress */}
            <motion.section variants={itemVariants} className="glass-panel p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-8">📈 Analytics & Mastery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {data.progress.map((p, i) => <CircularProgress key={i} {...p} />)}
              </div>
            </motion.section>

            {/* Assignments */}
            <motion.section variants={itemVariants}>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-bold text-slate-800">📝 Active Assignments</h3>
                <a href="#" className="font-bold text-sm text-blue-600 hover:text-blue-700 transition-colors">View All</a>
              </div>
              <div className="glass-panel p-6">
                <div className="space-y-4">
                  {data.assignments.map((a, i) => (
                    <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center transition-colors hover:bg-slate-100">
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1.5">{a.title}</h4>
                        <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5"><Clock size={12} /> Due: {a.due}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${a.class}`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="dash-col-4 dash-section-gap">

            {/* XP Gamification Card */}
            <motion.section variants={itemVariants} className="relative overflow-hidden p-8 rounded-[24px] border border-blue-100 shadow-[0_4px_20px_rgba(37,99,235,0.05)] bg-gradient-to-br from-blue-50 to-white">

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-bold text-sm uppercase tracking-widest shadow-sm">
                    Level {userState.level} Scholar
                  </span>
                  <span className="text-3xl">🎓</span>
                </div>

                <div className="text-center mb-8 relative">
                  {/* Floating XP Animation */}
                  <AnimatePresence>
                    {xpAnimation.active && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: -40, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 font-[Syne] font-black text-4xl text-emerald-500 z-20 pointer-events-none drop-shadow-sm"
                      >
                        +{xpAnimation.value}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h2 className="font-[Syne] font-black text-6xl leading-none text-slate-800">
                    {userState.currentXp}
                  </h2>
                  <span className="text-xl font-bold text-blue-600 ml-2">XP</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold text-slate-500 mb-2">
                    <span>Current Progress</span>
                    <span><span className="text-slate-800">{xpPerLevel - (userState.currentXp % xpPerLevel)}</span> XP to Lvl {userState.level + 1}</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${levelProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Leaderboard */}
            <motion.section variants={itemVariants} className="glass-panel p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">🏆 Top Performers</h3>
              <p className="text-xs font-semibold text-slate-500 mb-6">Cohort 10A • Resets Sunday</p>

              <div className="flex flex-col gap-2">
                {data.leaderboard.map((lb) => (
                  <div key={lb.rank} className={`flex items-center gap-4 p-3.5 rounded-xl border transition-colors ${lb.isMe ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-transparent hover:bg-slate-50'}`}>
                    <div className={`w-7 text-center font-bold text-lg ${lb.rank <= 3 ? 'text-amber-500' : 'text-slate-400'}`}>
                      {lb.rank === 1 ? '🥇' : lb.rank === 2 ? '🥈' : lb.rank === 3 ? '🥉' : `#${lb.rank}`}
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm" style={{ background: lb.bg, color: lb.textColor || 'white' }}>
                      {lb.avatar}
                    </div>
                    <div className="flex-1 font-bold text-slate-800 flex items-center gap-2">
                      {lb.name}
                      {lb.isMe && <span className="text-[0.65rem] text-blue-600 uppercase bg-blue-100 px-2 py-0.5 rounded-lg border border-blue-200">You</span>}
                    </div>
                    <div className="font-[Syne] font-bold text-blue-600">
                      {lb.xp} <span className="text-slate-400 text-xs">XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Badges */}
            <motion.section variants={itemVariants} className="glass-panel p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">🏅 Earned Badges</h3>
                <span className="px-3 py-1 bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold rounded-full">3/12 Unlocked</span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {data.badges.map((b, i) => (
                  <div
                    key={i}
                    onClick={() => handleBadgeClick(b)}
                    className={`aspect-square rounded-2xl border flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all duration-300 ${b.unlocked
                        ? 'bg-gradient-to-br from-amber-50 to-white border-amber-200 hover:scale-105 hover:-translate-y-1 hover:shadow-md hover:border-amber-300'
                        : 'bg-slate-50 border-slate-100 hover:bg-slate-100 opacity-70'
                      }`}
                  >
                    <span className={`text-4xl mb-2 transition-all duration-500 ${!b.unlocked ? 'grayscale opacity-40' : 'drop-shadow-sm'}`}>{b.icon}</span>
                    <span className={`text-[0.7rem] font-bold leading-tight ${b.unlocked ? 'text-slate-800' : 'text-slate-400'}`}>{b.title}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Activity Log */}
            <motion.section variants={itemVariants} className="glass-panel p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-8">⏱️ Recent Activity</h3>
              <div className="relative pl-6 flex flex-col gap-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[2px] before:bg-slate-200 before:rounded-full">
                {data.activity.map((a, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-white border-2 text-${a.type}-500 border-${a.type}-500 shadow-sm`}></div>
                    <p className="font-semibold text-slate-700 text-sm mb-1">{a.text}</p>
                    <p className="text-xs text-slate-400 font-medium">{a.time}</p>
                  </div>
                ))}
              </div>
            </motion.section>

          </div>
        </div>{/* end dash-grid */}
      </motion.div>

      {/* Toast Notification Container */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ x: 100, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="bg-white border text-slate-800 p-4 rounded-xl font-bold flex items-center gap-3 shadow-lg"
              style={{ borderLeft: `4px solid ${toast.borderCol}`, borderColor: 'var(--surface-border)' }}
            >
              <span className="text-2xl">{toast.icon}</span>
              <span className="text-sm">{toast.msg}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Dashboard;
