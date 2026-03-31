import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/UI/Card';
import StatsCard from '../../components/Dashboard/StatsCard';
import DashboardGrid from '../../components/Dashboard/DashboardGrid';
import TableCard from '../../components/Dashboard/TableCard';
import ActivityPanel from '../../components/Dashboard/ActivityPanel';

const NGODashboard = () => {
  const [loading] = useState(false);

  const stats = useMemo(() => [
    { title: 'Total Students', value: 45,    trend: +3.8, series: [30, 31, 33, 36, 39, 42, 45] },
    { title: 'Active Rate',    value: '71%', trend: +4.2, series: [60, 62, 65, 68, 69, 70, 71] },
    { title: 'Avg Progress',   value: '58%', trend: +2.8, series: [50, 52, 54, 55, 56, 57, 58] },
    { title: 'At Risk',        value: 3,     trend: -1.0, series: [6, 5, 4, 4, 3, 3, 3] },
  ], []);

  const studentRows = useMemo(() => [
    { id: 's1', name: 'Priya Sharma',  email: 'priya.s@saathi.in',  healthStatus: 'green',  xpProgress: 92, avgScore: 86 },
    { id: 's2', name: 'Deepak Singh',  email: 'deepak.s@saathi.in', healthStatus: 'green',  xpProgress: 74, avgScore: 62 },
    { id: 's3', name: 'Vikram Joshi',  email: 'vikram.j@saathi.in', healthStatus: 'green',  xpProgress: 85, avgScore: 79 },
    { id: 's4', name: 'Kavya Nair',    email: 'kavya.n@saathi.in',  healthStatus: 'yellow', xpProgress: 68, avgScore: 55 },
    { id: 's5', name: 'Arjun Mehta',   email: 'arjun.m@saathi.in',  healthStatus: 'yellow', xpProgress: 78, avgScore: 57 },
    { id: 's6', name: 'Ishita Rao',    email: 'ishita.r@saathi.in', healthStatus: 'red',    xpProgress: 38, avgScore: 34 },
  ], []);

  const columns = useMemo(() => [
    {
      key: 'name', label: 'Student', truncate: true,
      render: (row) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
            {row.name?.charAt(0) || '?'}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-slate-900 text-sm truncate">{row.name}</div>
            <div className="text-xs text-slate-400 truncate max-w-[140px]">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'healthStatus', label: 'Status', truncate: false,
      render: (row) => {
        const t = row.healthStatus === 'green'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
          : row.healthStatus === 'yellow'
            ? 'bg-amber-50 border-amber-200 text-amber-700'
            : 'bg-red-50 border-red-200 text-red-700';
        const label = row.healthStatus === 'green' ? 'Active' : row.healthStatus === 'yellow' ? 'Idle' : 'At Risk';
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${t}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${row.healthStatus === 'green' ? 'bg-emerald-500' : row.healthStatus === 'yellow' ? 'bg-amber-500' : 'bg-red-500'}`} />
            {label}
          </span>
        );
      },
    },
    {
      key: 'xpProgress', label: 'XP Progress', truncate: false,
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
            <div
              className={`h-full rounded-full ${row.healthStatus === 'green' ? 'bg-emerald-500' : row.healthStatus === 'yellow' ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${row.xpProgress}%` }}
            />
          </div>
          <div className="text-xs font-semibold text-slate-700 w-9 text-right">{row.xpProgress}%</div>
        </div>
      ),
    },
    {
      key: 'avgScore', label: 'Avg Score', align: 'right', truncate: false,
      render: (row) => <span className="font-semibold text-slate-900">{row.avgScore}%</span>,
    },
  ], []);

  const activityItems = useMemo(() => [
    { id: 'a1', text: 'Mentor Rahul flagged 2 students for follow-up', subText: 'Program outreach', time: '2 hrs ago',  tone: 'warning' },
    { id: 'a2', text: 'New weekly check-in for at-risk learners',       subText: 'Action required',  time: 'Yesterday', tone: 'danger' },
    { id: 'a3', text: 'Math engagement improved across the board',       subText: 'Positive signal',  time: '3 days ago', tone: 'success' },
  ], []);

  const alerts = useMemo(() => [
    '3 learners at risk need additional mentor support this week.',
    'Math completion dipped in the last 48 hours. Encourage revision quizzes.',
    '1 pending assignment submission overdue. Send gentle reminders.',
  ], []);

  const insights = useMemo(() => [
    { id: 'i1', label: 'Top subject',        value: 'Math',         tone: 'success' },
    { id: 'i2', label: 'Largest drop',       value: 'Reading',      tone: 'warning' },
    { id: 'i3', label: 'Next intervention',  value: 'Quiz refresh', tone: 'info' },
  ], []);

  if (loading) {
    return (
      <div className="flex-center h-[calc(100vh-100px)]">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <motion.header
        className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">NGO Dashboard</div>
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Program health overview</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor student outcomes and program signals.</p>
        </div>
        <button type="button" className="mt-4 sm:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
          Export report →
        </button>
      </motion.header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <StatsCard key={s.title} title={s.title} value={s.value} trend={s.trend} series={s.series} delay={i * 0.06} />
        ))}
      </section>

      <DashboardGrid
        analytics={
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Engagement trend</div>
                <div className="text-base font-semibold text-slate-900 mt-1.5">Weekly learning activity</div>
                <div className="text-xs text-slate-400 mt-0.5">Active participation across the program</div>
              </div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 whitespace-nowrap mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                +5% vs last week
              </div>
            </div>

            <div className="mt-4 h-36 w-full rounded-xl border border-slate-100 bg-slate-50 overflow-hidden">
              <svg viewBox="0 0 800 144" width="100%" height="100%" preserveAspectRatio="none">
                <polyline
                  points="40,100 120,84 200,92 280,70 360,78 440,54 520,64 600,46 680,54 760,36"
                  fill="none" stroke="#10b981" strokeWidth="3.5"
                  strokeLinejoin="round" strokeLinecap="round"
                />
                <polyline
                  points="40,100 120,84 200,92 280,70 360,78 440,54 520,64 600,46 680,54 760,36 760,144 40,144"
                  fill="#10b981" fillOpacity="0.07" stroke="none"
                />
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-slate-400">This week</div>
              <div className="text-sm font-semibold text-slate-900">68% engagement</div>
            </div>
          </Card>
        }
        table={
          <TableCard
            title="Student Overview"
            subtitle="At-a-glance status and progress"
            columns={columns}
            rows={studentRows}
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
              <div className="text-xs text-slate-400 mt-0.5">Priority program signals</div>
            </div>
            <div className="p-3 flex flex-col gap-1">
              {alerts.map((t, i) => (
                <div key={i} className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="text-sm text-slate-700">{t}</div>
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
              <div className="text-xs text-slate-400 mt-0.5">What to do next</div>
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

export default NGODashboard;
