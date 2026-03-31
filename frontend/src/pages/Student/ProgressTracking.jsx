import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, CheckCircle, BarChart2 } from 'lucide-react';

const subjects = [
  { name: 'Mathematics', color: 'blue', progress: 75, completed: 12, total: 16, avgScore: 82, icon: '📐' },
  { name: 'Science', color: 'emerald', progress: 60, completed: 9, total: 15, avgScore: 74, icon: '🔬' },
  { name: 'English', color: 'purple', progress: 90, completed: 18, total: 20, avgScore: 88, icon: '📚' },
  { name: 'Hindi', color: 'amber', progress: 50, completed: 8, total: 16, avgScore: 65, icon: '📝' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-100', bar: 'bg-blue-500', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', bar: 'bg-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-100', bar: 'bg-purple-500', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-100', bar: 'bg-amber-500', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
};

const ProgressTracking = () => {
  const overallProgress = Math.round(subjects.reduce((a, s) => a + s.progress, 0) / subjects.length);
  const totalCompleted = subjects.reduce((a, s) => a + s.completed, 0);
  const totalChapters = subjects.reduce((a, s) => a + s.total, 0);
  const avgScore = Math.round(subjects.reduce((a, s) => a + s.avgScore, 0) / subjects.length);

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemV = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10">
      <motion.header variants={itemV}>
        <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Learning</div>
        <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Progress Tracking</h1>
        <p className="text-sm text-slate-500 mt-1">Subject-wise breakdown of your learning journey.</p>
      </motion.header>

      {/* Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Overall Progress', value: `${overallProgress}%`, icon: TrendingUp, cls: 'bg-blue-50 border-blue-100 text-blue-600' },
          { label: 'Chapters Done', value: `${totalCompleted}/${totalChapters}`, icon: CheckCircle, cls: 'bg-emerald-50 border-emerald-100 text-emerald-600' },
          { label: 'Avg Score', value: `${avgScore}%`, icon: BarChart2, cls: 'bg-purple-50 border-purple-100 text-purple-600' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] p-6 flex items-center gap-5">
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${stat.cls}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subjects.map((subject, i) => {
          const c = colorMap[subject.color];
          return (
            <motion.div key={subject.name} variants={itemV}
              className="bg-white rounded-2xl border border-[var(--border)] p-6 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center text-xl`}>
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{subject.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{subject.completed} of {subject.total} chapters</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${c.badge}`}>
                  {subject.avgScore}% avg
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500 font-medium">Progress</span>
                  <span className={`font-bold ${c.text}`}>{subject.progress}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${c.bar}`} style={{ width: `${subject.progress}%` }} />
                </div>
              </div>

              {/* Chapter breakdown */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                  <div className="text-lg font-black text-slate-800">{subject.completed}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">Done</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                  <div className="text-lg font-black text-slate-800">{subject.total - subject.completed}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">Remaining</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProgressTracking;