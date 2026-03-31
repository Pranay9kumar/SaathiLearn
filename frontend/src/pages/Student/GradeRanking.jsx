import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';

const rankings = [
  { rank: 1, name: 'Priya Sharma', xp: 4800, level: 10, streak: 28, avatar: 'P' },
  { rank: 2, name: 'Vikram Joshi', xp: 3600, level: 8, streak: 18, avatar: 'V' },
  { rank: 3, name: 'Ishita Rao', xp: 3200, level: 7, streak: 15, avatar: 'I' },
  { rank: 4, name: 'You', xp: 2450, level: 5, streak: 12, avatar: 'Y', isCurrentUser: true },
  { rank: 5, name: 'Arjun Mehta', xp: 2100, level: 5, streak: 9, avatar: 'A' },
  { rank: 6, name: 'Deepak Singh', xp: 1800, level: 4, streak: 5, avatar: 'D' },
  { rank: 7, name: 'Kavya Nair', xp: 1500, level: 4, streak: 3, avatar: 'K' },
  { rank: 8, name: 'Sneha Patel', xp: 1200, level: 3, streak: 0, avatar: 'S' },
  { rank: 9, name: 'Rohan Gupta', xp: 890, level: 2, streak: 0, avatar: 'R' },
  { rank: 10, name: 'Ananya Reddy', xp: 680, level: 2, streak: 0, avatar: 'An' },
];

const medalColors = {
  1: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700', icon: Crown },
  2: { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-600', icon: Medal },
  3: { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-700', icon: Medal },
};

const GradeRanking = () => {
  const currentUser = rankings.find(r => r.isCurrentUser);
  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemV = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10 max-w-4xl mx-auto">
      <motion.header variants={itemV}>
        <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Learning</div>
        <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Leaderboard</h1>
        <p className="text-sm text-slate-500 mt-1">See how you rank among your classmates based on XP earned.</p>
      </motion.header>

      {/* Your Position Card */}
      {currentUser && (
        <motion.div variants={itemV} className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-black">
              #{currentUser.rank}
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-lg">Your Position</h3>
              <p className="text-sm text-blue-600">Level {currentUser.level} · {currentUser.xp} XP · {currentUser.streak}d streak</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-blue-700">
            <TrendingUp size={16} /> Top {Math.round((currentUser.rank / rankings.length) * 100)}%
          </div>
        </motion.div>
      )}

      {/* Top 3 Podium */}
      <motion.div variants={itemV} className="grid grid-cols-3 gap-4">
        {rankings.slice(0, 3).map((r) => {
          const mc = medalColors[r.rank];
          const MedalIcon = mc.icon;
          return (
            <div key={r.rank} className={`${mc.bg} ${mc.border} border rounded-2xl p-6 text-center ${r.rank === 1 ? 'ring-2 ring-amber-300/50' : ''}`}>
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${mc.text}`}>
                <MedalIcon size={28} />
              </div>
              <div className={`text-2xl font-black ${mc.text}`}>#{r.rank}</div>
              <h3 className="font-bold text-slate-900 mt-2 text-sm">{r.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{r.xp.toLocaleString()} XP</p>
              <div className="mt-3 flex justify-center gap-2">
                <span className="bg-white/70 border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-600">Lvl {r.level}</span>
                {r.streak > 0 && (
                  <span className="bg-white/70 border border-amber-200 px-2 py-0.5 rounded-md text-[10px] font-semibold text-amber-600">🔥 {r.streak}d</span>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Full Rankings Table */}
      <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Full Rankings</h3>
          <p className="text-xs text-slate-400 mt-0.5">Based on total XP earned this cohort</p>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4 pl-6 text-left font-medium w-16">Rank</th>
                <th className="p-4 text-left font-medium">Student</th>
                <th className="p-4 text-center font-medium">Level</th>
                <th className="p-4 text-center font-medium">Streak</th>
                <th className="p-4 pr-6 text-right font-medium">XP</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map(r => (
                <tr key={r.rank} className={`border-b border-slate-50 last:border-0 transition-colors ${
                  r.isCurrentUser ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50/70'
                }`}>
                  <td className="p-4 pl-6">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                      r.rank <= 3
                        ? `${medalColors[r.rank].bg} ${medalColors[r.rank].text}`
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {r.rank}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        r.isCurrentUser ? 'bg-blue-100 border border-blue-200 text-blue-600' : 'bg-slate-100 border border-slate-200 text-slate-600'
                      }`}>
                        {r.avatar}
                      </div>
                      <span className={`font-semibold ${r.isCurrentUser ? 'text-blue-700' : 'text-slate-900'}`}>
                        {r.name} {r.isCurrentUser && <span className="text-xs text-blue-500">(you)</span>}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-bold">Lvl {r.level}</span>
                  </td>
                  <td className="p-4 text-center text-sm">
                    {r.streak > 0 ? (
                      <span className="text-amber-600 font-semibold">🔥 {r.streak}d</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="p-4 pr-6 text-right font-bold text-slate-900">{r.xp.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GradeRanking;