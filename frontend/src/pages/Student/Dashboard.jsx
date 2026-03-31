import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import Card from '../../components/UI/Card';
import StatsCard from '../../components/Dashboard/StatsCard';
import DashboardGrid from '../../components/Dashboard/DashboardGrid';
import TableCard from '../../components/Dashboard/TableCard';
import ActivityPanel from '../../components/Dashboard/ActivityPanel';

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

  const alerts = useMemo(() => [
    { id: 'al1', text: '2 missions due this week. Plan your schedule to avoid delays.' },
    { id: 'al2', text: 'Your streak is strong. One quick quiz today keeps momentum.' },
    { id: 'al3', text: 'Open "In Review" items to unlock mentor badges.' },
  ], []);

  const insights = useMemo(() => [
    { id: 'in1', label: 'Most active subject', value: 'Math',    tone: 'success' },
    { id: 'in2', label: 'Focus area',          value: 'Reading', tone: 'warning' },
    { id: 'in3', label: 'Next milestone',      value: 'Level 6', tone: 'info' },
  ], []);

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <motion.header
        className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Student Dashboard</div>
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">
            Welcome, {user?.name || 'Student'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">Your learning progress at a glance.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/student/missions')}
          className="mt-4 sm:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
        >
          Go to Missions →
        </button>
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

      {/* Main grid */}
      <DashboardGrid
        analytics={
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Weekly analytics</div>
                <div className="text-base font-semibold text-slate-900 mt-1.5">XP growth and activity</div>
                <div className="text-xs text-slate-400 mt-0.5">Last 7 days · steady improvements</div>
              </div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 whitespace-nowrap mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                +8.4% this week
              </div>
            </div>

            <div className="mt-4 h-36 w-full rounded-xl border border-slate-100 bg-slate-50 overflow-hidden">
              <svg viewBox="0 0 800 144" width="100%" height="100%" preserveAspectRatio="none">
                <polyline
                  points="40,110 120,88 200,100 280,62 360,70 440,48 520,54 600,30 680,40 760,20"
                  fill="none" stroke="#2563eb" strokeWidth="3.5"
                  strokeLinejoin="round" strokeLinecap="round"
                />
                <polyline
                  points="40,110 120,88 200,100 280,62 360,70 440,48 520,54 600,30 680,40 760,20 760,144 40,144"
                  fill="#2563eb" fillOpacity="0.06" stroke="none"
                />
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
        alerts={
          <motion.div
            className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="text-sm font-semibold text-slate-900">Alerts</div>
              <div className="text-xs text-slate-400 mt-0.5">Actionable reminders</div>
            </div>
            <div className="p-3 flex flex-col gap-1">
              {alerts.map((a) => (
                <div key={a.id} className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="text-sm text-slate-700">{a.text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        }
        insights={
          <motion.div
            className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.25 }}
          >
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="text-sm font-semibold text-slate-900">Insights</div>
              <div className="text-xs text-slate-400 mt-0.5">Personalized signals</div>
            </div>
            <div className="p-3 flex flex-col gap-1">
              {insights.map((ins) => {
                const t = ins.tone === 'success'
                  ? { dot: 'bg-emerald-500', text: 'text-emerald-700' }
                  : ins.tone === 'warning'
                    ? { dot: 'bg-amber-500', text: 'text-amber-700' }
                    : { dot: 'bg-blue-500', text: 'text-blue-700' };
                return (
                  <div key={ins.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">{ins.label}</div>
                      <div className={`text-sm font-semibold ${t.text} mt-0.5`}>{ins.value}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${t.dot}`} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        }
      />
    </div>
  );
};

export default StudentDashboard;
