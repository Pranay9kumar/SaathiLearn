import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { mentorAPI } from '../../api/mentor';
import Card from '../../components/UI/Card';
import StatsCard from '../../components/Dashboard/StatsCard';
import DashboardGrid from '../../components/Dashboard/DashboardGrid';
import TableCard from '../../components/Dashboard/TableCard';
import ActivityPanel from '../../components/Dashboard/ActivityPanel';
import { ArrowUpRight } from 'lucide-react';

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [requests, setRequests] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    let alive = true;
    Promise.all([
      mentorAPI.getAnalytics(),
      mentorAPI.getRequests(),
      mentorAPI.getStudents(),
      mentorAPI.getAssignments(),
    ])
      .then(([a, r, s, as]) => {
        if (!alive) return;
        setAnalytics(a);
        setRequests(r);
        setStudents(s);
        setAssignments(as);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => { alive = false; };
  }, []);

  const stats = useMemo(() => {
    if (!analytics) return [];
    return [
      { title: 'Total Students', value: analytics.totalStudents, trend: analytics.totalStudentsTrend, series: analytics.sparklines.totalStudents },
      { title: 'Active Today',   value: analytics.activeToday,   trend: analytics.activeStudentsTrend, series: analytics.sparklines.activeStudents },
      { title: 'Average Score',  value: `${analytics.avgScore}%`, trend: analytics.avgScoreTrend,      series: analytics.sparklines.avgScore },
      { title: 'At Risk',        value: analytics.atRisk,         trend: analytics.atRiskTrend,         series: analytics.sparklines.atRisk },
    ];
  }, [analytics]);

  const tableColumns = useMemo(() => [
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

  const tableRows = useMemo(() => students.slice(0, 6), [students]);

  const activityItems = useMemo(() => requests.slice(0, 5).map((r) => ({
    id: r.id,
    text: r.question,
    subText: `${r.studentName} · ${r.subject}`,
    time: r.time,
    tone: r.priority === 'high' ? 'danger' : r.priority === 'medium' ? 'warning' : 'info',
  })), [requests]);

  const dueAssignments = useMemo(
    () => assignments.filter((a) => a.status === 'due' || a.status === 'review').slice(0, 4),
    [assignments],
  );

  if (loading || !analytics) {
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
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Mentor Dashboard</div>
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Your program overview</h1>
          <p className="text-sm text-slate-500 mt-1">Students, requests, and performance signals.</p>
        </div>
        <div className="text-xs font-semibold text-slate-400 mt-4 sm:mt-0">Live data</div>
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
                <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Analytics</div>
                <div className="text-base font-semibold text-slate-900 mt-1.5">Performance over time</div>
                <div className="text-xs text-slate-400 mt-0.5">XP and active learners (weeks)</div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mt-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                Weekly trend
              </div>
            </div>

            <div className="mt-4 h-36 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.performanceOverTime}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }}
                    itemStyle={{ color: '#0f172a' }}
                  />
                  <Line type="monotone" dataKey="xp"    stroke="#2563eb" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-slate-400">Avg Score</div>
              <div className="text-sm font-semibold text-slate-900">{analytics.avgScore}%</div>
            </div>
          </Card>
        }
        table={
          <TableCard
            title="Student Performance"
            subtitle="Status, XP progress, and average score"
            columns={tableColumns}
            rows={tableRows}
            onRowClick={(row) => navigate(`/mentor/students/${row.id}`)}
          />
        }
        activity={<ActivityPanel title="Recent Doubts" items={activityItems} />}
        alerts={
          <motion.div
            className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="text-sm font-semibold text-slate-900">Alerts</div>
              <div className="text-xs text-slate-400 mt-0.5">Upcoming reviews and follow-ups</div>
            </div>
            <div className="p-3 flex flex-col gap-1">
              {dueAssignments.length === 0 ? (
                <div className="px-3 py-4 text-sm text-slate-400">No due items.</div>
              ) : (
                dueAssignments.map((a) => (
                  <div
                    key={a.id}
                    className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => navigate('/mentor/assignments')}
                  >
                    <div className="text-sm font-medium text-slate-800 truncate">{a.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">{a.subject} · Due {a.dueDate}</div>
                  </div>
                ))
              )}
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
              <div className="text-xs text-slate-400 mt-0.5">Subject concentration</div>
            </div>
            <div className="p-3 flex flex-col gap-1">
              {analytics.subjectBreakdown.slice(0, 4).map((s) => (
                <div key={s.name} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">{s.name}</div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">{s.value} students</div>
                  </div>
                  <ArrowUpRight size={14} className="text-blue-500" />
                </div>
              ))}
            </div>
          </motion.div>
        }
      />
    </div>
  );
};

export default MentorDashboard;
