import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, Star, ChevronRight, Zap } from 'lucide-react';

const missions = [
  { id: 'm1', title: 'Quadratic Equations Practice', subject: 'Math', type: 'Lesson', progress: 100, reward: 120, status: 'Completed', dueDate: 'Completed' },
  { id: 'm2', title: 'Cell Structure Quiz', subject: 'Science', type: 'Quiz', progress: 100, reward: 90, status: 'Completed', dueDate: 'Completed' },
  { id: 'm3', title: 'Reading Comprehension', subject: 'English', type: 'Assignment', progress: 60, reward: 80, status: 'In Progress', dueDate: 'Tomorrow' },
  { id: 'm4', title: 'Periodic Table Quiz', subject: 'Science', type: 'Quiz', progress: 85, reward: 70, status: 'In Review', dueDate: 'In Review' },
  { id: 'm5', title: 'Essay: My Favourite Season', subject: 'English', type: 'Assignment', progress: 30, reward: 100, status: 'In Progress', dueDate: '3 days' },
  { id: 'm6', title: 'Trigonometry Worksheet', subject: 'Math', type: 'Lesson', progress: 0, reward: 110, status: 'Not Started', dueDate: '5 days' },
  { id: 'm7', title: 'Hindi Poem Recitation', subject: 'Hindi', type: 'Assignment', progress: 0, reward: 60, status: 'Not Started', dueDate: '1 week' },
];

const statusConfig = {
  'Completed':   { badge: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: CheckCircle, color: 'text-emerald-500', bar: 'bg-emerald-500' },
  'In Progress': { badge: 'bg-blue-50 border-blue-200 text-blue-700', icon: Clock, color: 'text-blue-500', bar: 'bg-blue-500' },
  'In Review':   { badge: 'bg-amber-50 border-amber-200 text-amber-700', icon: Star, color: 'text-amber-500', bar: 'bg-amber-500' },
  'Not Started': { badge: 'bg-slate-50 border-slate-200 text-slate-600', icon: BookOpen, color: 'text-slate-400', bar: 'bg-slate-300' },
};

const Missions = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return missions;
    return missions.filter(m => m.status === filter);
  }, [filter]);

  const completedCount = missions.filter(m => m.status === 'Completed').length;
  const totalXP = missions.reduce((a, m) => a + (m.status === 'Completed' ? m.reward : 0), 0);

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemV = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10">
      <motion.header variants={itemV} className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Learning</div>
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">My Missions</h1>
          <p className="text-sm text-slate-500 mt-1">Complete missions to earn XP and level up your skills.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold">
            <Zap size={16} className="text-emerald-500" /> {totalXP} XP earned
          </div>
          <div className="text-sm text-slate-500 font-medium">
            <span className="text-slate-800 font-bold">{completedCount}</span>/{missions.length} done
          </div>
        </div>
      </motion.header>

      {/* Filters */}
      <motion.div variants={itemV} className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
        {['All', 'In Progress', 'Not Started', 'In Review', 'Completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              filter === f ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}>
            {f}
          </button>
        ))}
      </motion.div>

      {/* Mission Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((mission, i) => {
          const cfg = statusConfig[mission.status] || statusConfig['Not Started'];
          const Icon = cfg.icon;
          return (
            <motion.div key={mission.id} variants={itemV}
              className="bg-white rounded-2xl border border-[var(--border)] p-6 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all group cursor-pointer">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center ${cfg.color} shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{mission.title}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-xs font-semibold text-slate-600">{mission.subject}</span>
                      <span className="text-xs text-slate-400">{mission.type}</span>
                      {mission.status !== 'Completed' && mission.dueDate !== 'In Review' && (
                        <span className="text-xs text-slate-400">· Due: {mission.dueDate}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${cfg.badge}`}>
                    {mission.status}
                  </span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${cfg.bar}`} style={{ width: `${mission.progress}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-700 w-10 text-right">{mission.progress}%</span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
                  <Zap size={12} /> {mission.reward} XP
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-[var(--border)] p-16 flex flex-col items-center text-center">
          <BookOpen size={32} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">No missions here</h3>
          <p className="text-sm text-slate-500">Try a different filter to see more.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Missions;