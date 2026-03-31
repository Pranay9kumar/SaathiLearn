import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Calendar, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

const Streak = () => {
  const currentStreak = 12;
  const longestStreak = 28;
  const totalActiveDays = 84;

  const last14Days = [
    { day: 'M', date: 17, active: true },
    { day: 'T', date: 18, active: true },
    { day: 'W', date: 19, active: true },
    { day: 'T', date: 20, active: false },
    { day: 'F', date: 21, active: true },
    { day: 'S', date: 22, active: true },
    { day: 'S', date: 23, active: true },
    { day: 'M', date: 24, active: true },
    { day: 'T', date: 25, active: true },
    { day: 'W', date: 26, active: true },
    { day: 'T', date: 27, active: true },
    { day: 'F', date: 28, active: true },
    { day: 'S', date: 29, active: true },
    { day: 'S', date: 30, active: true },
  ];

  const milestones = [
    { days: 7, label: '7-Day Warrior', earned: true },
    { days: 14, label: 'Two-Week Champion', earned: false },
    { days: 30, label: 'Monthly Master', earned: false },
    { days: 100, label: 'Century Legend', earned: false },
  ];

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemV = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10">
      <motion.header variants={itemV}>
        <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Learning</div>
        <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Learning Streak</h1>
        <p className="text-sm text-slate-500 mt-1">Stay consistent to unlock streak badges and bonus XP.</p>
      </motion.header>

      {/* Streak Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Current Streak', value: `${currentStreak}d`, icon: Flame, color: 'amber', desc: 'Keep it going!' },
          { label: 'Longest Streak', value: `${longestStreak}d`, icon: Trophy, color: 'purple', desc: 'Personal best' },
          { label: 'Total Active', value: `${totalActiveDays}d`, icon: Calendar, color: 'blue', desc: 'All time' },
        ].map((stat, i) => {
          const colors = {
            amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', icon: 'text-amber-500' },
            purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', icon: 'text-purple-500' },
            blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', icon: 'text-blue-500' },
          };
          const c = colors[stat.color];
          return (
            <motion.div key={i} variants={itemV}
              className={`bg-white rounded-2xl border ${c.border} p-6 relative overflow-hidden group hover:shadow-md transition-shadow`}>
              <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full ${c.bg} opacity-50 group-hover:scale-110 transition-transform`} />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <p className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">{stat.label}</p>
                <div className={`p-2.5 rounded-xl ${c.bg} shadow-sm`}>
                  <stat.icon size={20} className={c.icon} />
                </div>
              </div>
              <h3 className={`text-3xl font-black ${c.text} leading-none tracking-tighter relative z-10`}>{stat.value}</h3>
              <p className="text-xs text-slate-400 mt-2 relative z-10">{stat.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Calendar */}
      <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Last 14 Days</h3>
        <p className="text-xs text-slate-400 mb-6">Green = active day · Gray = missed</p>
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-3">
          {last14Days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold uppercase text-slate-400">{d.day}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                d.active
                  ? 'bg-emerald-100 border border-emerald-200 text-emerald-700'
                  : 'bg-slate-100 border border-slate-200 text-slate-400'
              }`}>
                {d.active ? <CheckCircle size={16} /> : <XCircle size={14} />}
              </div>
              <span className="text-[10px] text-slate-500">{d.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Streak Milestones */}
      <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Streak Milestones</h3>
        <p className="text-xs text-slate-400 mb-6">Unlock badges by maintaining consistent streaks</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, i) => (
            <div key={i} className={`rounded-xl border p-5 text-center transition-all ${
              m.earned
                ? 'bg-amber-50 border-amber-200 shadow-sm'
                : 'bg-slate-50 border-slate-200 opacity-60'
            }`}>
              <div className="text-3xl mb-2">{m.earned ? '🏆' : '🔒'}</div>
              <div className={`text-lg font-black ${m.earned ? 'text-amber-700' : 'text-slate-500'}`}>{m.days} Days</div>
              <div className="text-xs text-slate-500 mt-1">{m.label}</div>
              {m.earned && <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-2">Earned ✓</div>}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Streak;