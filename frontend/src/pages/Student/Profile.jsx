import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { User, Mail, Award, Flame, BookOpen, Star, Shield, Edit3, Save } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const profileData = {
    name: user?.name || 'Student',
    email: user?.email || 'student@saathi.in',
    class: 10,
    school: 'Saathi Learning Center, Pune',
    joinedDate: 'August 2025',
    totalXP: 2450,
    level: 5,
    streak: 12,
    longestStreak: 28,
    missionsCompleted: 18,
    subjects: ['Math', 'Science', 'English', 'Hindi'],
    badges: ['7-Day Warrior', 'Rising Star', 'Quiz Master'],
    mentor: 'Dr. Sarah Johnson',
  };

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemV = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10 max-w-4xl mx-auto">
      <motion.header variants={itemV}>
        <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Account</div>
        <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Your learning identity and achievements.</p>
      </motion.header>

      {/* Profile Header Card */}
      <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-600 font-black text-3xl shrink-0">
            {profileData.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-slate-900">{profileData.name}</h2>
              <span className="bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg text-xs font-bold text-blue-600">Level {profileData.level}</span>
              <span className="bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-600">🔥 {profileData.streak}d streak</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">{profileData.email}</p>
            <div className="flex flex-wrap gap-2">
              {profileData.subjects.map(sub => (
                <span key={sub} className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-600">{sub}</span>
              ))}
            </div>
          </div>
          <button className="btn btn-secondary text-xs px-4 py-2 shrink-0 gap-2">
            <Edit3 size={14} /> Edit Profile
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stats */}
        <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-5">Learning Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total XP', value: profileData.totalXP.toLocaleString(), icon: Star, color: 'amber' },
              { label: 'Level', value: profileData.level, icon: Shield, color: 'blue' },
              { label: 'Missions Done', value: profileData.missionsCompleted, icon: BookOpen, color: 'emerald' },
              { label: 'Best Streak', value: `${profileData.longestStreak}d`, icon: Flame, color: 'purple' },
            ].map((stat, i) => {
              const colors = {
                amber: 'bg-amber-50 border-amber-100 text-amber-600',
                blue: 'bg-blue-50 border-blue-100 text-blue-600',
                emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
                purple: 'bg-purple-50 border-purple-100 text-purple-600',
              };
              return (
                <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg border ${colors[stat.color]}`}>
                      <stat.icon size={14} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-5">Personal Details</h3>
          <div className="space-y-4">
            {[
              { label: 'Class', value: `Class ${profileData.class}` },
              { label: 'School', value: profileData.school },
              { label: 'Joined', value: profileData.joinedDate },
              { label: 'Assigned Mentor', value: profileData.mentor },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-sm font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Earned Badges</h3>
        <p className="text-xs text-slate-400 mb-5">Achievements unlocked through consistent learning</p>
        <div className="flex flex-wrap gap-3">
          {profileData.badges.map((badge, i) => (
            <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center gap-2.5">
              <span className="text-xl">🏅</span>
              <span className="text-sm font-bold text-amber-700">{badge}</span>
            </div>
          ))}
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl px-5 py-3 flex items-center gap-2.5 opacity-50">
            <span className="text-xl">🔒</span>
            <span className="text-sm font-semibold text-slate-400">More to unlock...</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;