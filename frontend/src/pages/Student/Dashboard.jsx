import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Card from '../../components/UI/Card';
import StatsCard from '../../components/Dashboard/StatsCard';
import DashboardGrid from '../../components/Dashboard/DashboardGrid';
import TableCard from '../../components/Dashboard/TableCard';
import ActivityPanel from '../../components/Dashboard/ActivityPanel';
import AlertsInsightsCard from '../../components/Dashboard/AlertsInsightsCard';
import LearningPlanCard from '../../components/Dashboard/LearningPlanCard';
import MentorConnectionCard from '../../components/Dashboard/MentorConnectionCard';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const stats = useMemo(() => [
    { title: 'Total XP',          value: 2450, trend: 8.4,  series: [28, 30, 35, 33, 40, 42, 46] },
    { title: 'Learning Streak',   value: 12,   trend: 3.0,  series: [3, 5, 6, 7, 8, 9, 12] },
    { title: 'Missions Done',     value: 18,   trend: 6.2,  series: [10, 12, 13, 14, 16, 17, 18] },
    { title: 'Subjects Mastered', value: 4,    trend: -1.5, series: [1, 2, 2, 3, 3, 4, 4] },
  ], []);

  const missionRows = useMemo(() => [
    { id: 'm1', mission: 'Quadratic Equations Practice', type: 'Lesson',     status: 'Completed',   xp: 120, updated: 'Today' },
    { id: 'm2', mission: 'Cell Structure Quiz',          type: 'Quiz',       status: 'Completed',   xp: 90,  updated: 'Yesterday' },
    { id: 'm3', mission: 'Reading Comprehension',        type: 'Assignment', status: 'In Progress', xp: 45,  updated: '2 days ago' },
    { id: 'm4', mission: 'Periodic Table Quiz',          type: 'Quiz',       status: 'In Review',   xp: 70,  updated: '3 days ago' },
    { id: 'm5', mission: 'Essay: My Favourite Season',   type: 'Assignment', status: 'In Progress', xp: 55,  updated: '5 days ago' },
  ], []);

  const tableColumns = useMemo(() => [
    { key: 'mission', label: 'Mission', align: 'left', truncate: true },
    { key: 'type',    label: 'Type',    truncate: true },
    {
      key: 'status', label: 'Status', truncate: false,
      render: (row) => {
        const t = row.status === 'Completed'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
          : row.status === 'In Progress'
            ? 'bg-blue-50 border-blue-200 text-blue-700'
            : 'bg-amber-50 border-amber-200 text-amber-700';
        return (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-semibold ${t}`}>
            {row.status}
          </span>
        );
      },
    },
    {
      key: 'xp', label: 'XP', align: 'right', truncate: false,
      render: (row) => <span className="font-semibold text-slate-900">{row.xp} XP</span>,
    },
    { key: 'updated', label: 'Updated', align: 'left', truncate: true },
  ], []);

  const activityItems = useMemo(() => [
    { id: 'a1', text: 'Completed: Quadratic Equations Practice', subText: 'XP +120',                  time: 'Just now',    tone: 'success' },
    { id: 'a2', text: 'Quiz submitted: Cell Structure Quiz',     subText: 'XP +90',                   time: '2 hours ago', tone: 'success' },
    { id: 'a3', text: 'Started: Reading Comprehension',         subText: 'Keep going!',               time: 'Yesterday',   tone: 'warning' },
    { id: 'a4', text: 'In review: Periodic Table Quiz',         subText: 'Mentor feedback pending',   time: '3 days ago',  tone: 'warning' },
  ], []);

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <motion.header
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <div className="text-xs uppercase tracking-wider text-indigo-600 font-bold">📊 Student Dashboard</div>
          <h1 className="text-4xl font-bold text-slate-900 mt-2 leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-base text-slate-600 mt-3 font-medium">Track your learning journey and master new skills</p>
        </div>
        <div className="flex gap-3 sm:flex-col lg:flex-row">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => navigate('/student/missions')}
            className="px-5 py-3 font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-200 text-sm"
          >
            📚 My Missions
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/student/doubts')}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-[0_8px_16px_rgba(37,99,235,0.3)] transition-all text-sm"
          >
            <MessageCircle size={18} />
            Ask a Doubt
          </motion.button>
        </div>
      </motion.header>

      {/* Stats row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <StatsCard
            key={s.title}
            title={s.title}
            value={s.value}
            trend={s.trend}
            series={s.series}
            delay={i * 0.06}
            onClick={() => navigate('/student/missions')}
          />
        ))}
      </section>

      {/* Main grid - Analytics, Missions, Activity */}
      <DashboardGrid
        analytics={
          <Card delay={0}>
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-indigo-600 font-bold">📈 Weekly Analytics</div>
                <div className="text-xl font-bold text-slate-900 mt-2">XP Growth & Activity</div>
                <div className="text-sm text-slate-600 mt-1 font-medium">Last 7 days · Steady improvement</div>
              </div>
              <div className="text-sm font-bold text-emerald-600 flex items-center gap-2 whitespace-nowrap px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                +8.4% this week
              </div>
            </div>

            <div className="mt-5 h-40 w-full rounded-xl border border-[#e0e7ff] bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden shadow-sm">
              <svg viewBox="0 0 800 144" width="100%" height="100%" preserveAspectRatio="none">
                <polyline
                  points="40,110 120,88 200,100 280,62 360,70 440,48 520,54 600,30 680,40 760,20"
                  fill="none" stroke="url(#grad1)" strokeWidth="3.5"
                  strokeLinejoin="round" strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <polyline
                  points="40,110 120,88 200,100 280,62 360,70 440,48 520,54 600,30 680,40 760,20 760,144 40,144"
                  fill="url(#grad2)" stroke="none"
                />
                <defs>
                  <linearGradient id="grad2">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-slate-400">Avg XP / day</div>
              <div className="text-sm font-semibold text-slate-900">350</div>
            </div>
          </Card>
        }
        table={
          <TableCard
            title="Mission Performance"
            subtitle="Completion status and XP impact"
            columns={tableColumns}
            rows={missionRows}
          />
        }
        activity={<ActivityPanel title="Recent Activity" items={activityItems} />}
      />

      {/* New sections - Alerts & Insights, Mentors, Learning Plan */}
      <section className="space-y-8">
        {/* Improved Alerts & Insights */}
        <AlertsInsightsCard />

        {/* Mentor Connection */}
        <MentorConnectionCard 
          onMentorSelect={(mentor) => {
            console.log('Selected mentor:', mentor);
            // Could navigate to mentor chat or open a modal
          }}
        />

        {/* Personalized Learning Plan */}
        <LearningPlanCard />
      </section>
    </div>
  );
};

export default StudentDashboard;
