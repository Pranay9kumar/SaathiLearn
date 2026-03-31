import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/UI/Card';
import StatsCard from '../../components/Dashboard/StatsCard';
import DashboardGrid from '../../components/Dashboard/DashboardGrid';
import TableCard from '../../components/Dashboard/TableCard';
import ActivityPanel from '../../components/Dashboard/ActivityPanel';
import { adminAPI } from '../../api/admin';
import { adminMetrics } from '../../utils/adminMetrics';
import { ArrowUpRight } from 'lucide-react';

const NGODashboard = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    Promise.all([
      adminAPI.getMentors(),
      adminAPI.getAllStudents(),
      adminAPI.getAllRequests(),
    ]).then(([m, s, r]) => {
      if (!alive) return;
      setMentors(m);
      setStudents(s);
      setRequests(r);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { alive = false; };
  }, []);

  const platformStats = useMemo(() =>
    adminMetrics.computePlatformStats(students, mentors), [students, mentors]);

  const alerts = useMemo(() =>
    adminMetrics.generateAlerts(students, requests), [students, requests]);

  const stats = useMemo(() => [
    { title: 'Total Students', value: platformStats.totalStudents, trend: +3.8, series: [30, 31, 33, 36, 39, 42, platformStats.totalStudents] },
    { title: 'Total Mentors', value: platformStats.totalMentors, trend: +2.0, series: [3, 3, 4, 4, 4, 5, platformStats.totalMentors] },
    { title: 'Active Rate', value: `${platformStats.activeRate}%`, trend: +4.2, series: [60, 62, 65, 68, 69, 70, platformStats.activeRate] },
    { title: 'At Risk', value: platformStats.atRisk, trend: -1.0, series: [6, 5, 4, 4, 3, 3, platformStats.atRisk] },
  ], [platformStats]);

  const mentorColumns = useMemo(() => [
    {
      key: 'name', label: 'Mentor', truncate: true,
      render: (row) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-xs font-bold text-purple-600 shrink-0">
            {row.name?.charAt(0) || '?'}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-slate-900 text-sm truncate">{row.name}</div>
            <div className="text-xs text-slate-400 truncate">{row.subject}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'studentsAssigned', label: 'Students', align: 'center', truncate: false,
      render: (row) => <span className="font-semibold text-slate-800">{row.studentsAssigned}</span>,
    },
    {
      key: 'avgStudentScore', label: 'Avg Score', align: 'center', truncate: false,
      render: (row) => {
        const color = row.avgStudentScore >= 75 ? 'text-emerald-600' : row.avgStudentScore >= 55 ? 'text-amber-600' : 'text-red-600';
        return <span className={`font-semibold ${color}`}>{row.avgStudentScore}%</span>;
      },
    },
    {
      key: 'status', label: 'Status', truncate: false,
      render: (row) => {
        const t = row.status === 'active'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
          : 'bg-slate-50 border-slate-200 text-slate-600';
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${t}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            {row.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
  ], []);

  const activityItems = useMemo(() => {
    const openReqs = requests.filter(r => r.status === 'open').slice(0, 4);
    return openReqs.map(r => ({
      id: r.id,
      text: r.question,
      subText: `${r.studentName} → ${r.mentor}`,
      time: r.time,
      tone: r.priority === 'high' ? 'danger' : r.priority === 'medium' ? 'warning' : 'info',
    }));
  }, [requests]);

  const subjectData = useMemo(() =>
    adminMetrics.subjectBreakdown(students), [students]);

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
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">NGO Admin</div>
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Program Health Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor students, mentors, and platform signals at a glance.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/reports')}
          className="mt-4 sm:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
        >
          Export Report →
        </button>
      </motion.header>

      {/* Stats row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <StatsCard key={s.title} title={s.title} value={s.value} trend={s.trend} series={s.series} delay={i * 0.06} />
        ))}
      </section>

      {/* Main grid */}
      <DashboardGrid
        analytics={
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Platform Overview</div>
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
                  fill="none" stroke="#2563eb" strokeWidth="3.5"
                  strokeLinejoin="round" strokeLinecap="round"
                />
                <polyline
                  points="40,100 120,84 200,92 280,70 360,78 440,54 520,64 600,46 680,54 760,36 760,144 40,144"
                  fill="#2563eb" fillOpacity="0.06" stroke="none"
                />
              </svg>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-slate-400">Avg Score</div>
              <div className="text-sm font-semibold text-slate-900">{platformStats.avgScore}%</div>
            </div>
          </Card>
        }
        table={
          <TableCard
            title="Mentor Performance"
            subtitle="Students, scores, and status overview"
            columns={mentorColumns}
            rows={mentors}
            onRowClick={(row) => navigate('/admin/mentors')}
          />
        }
        activity={<ActivityPanel title="Open Help Requests" items={activityItems} />}
        alerts={
          <motion.div
            className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="text-sm font-semibold text-slate-900">Alerts</div>
              <div className="text-xs text-slate-400 mt-0.5">Priority program signals</div>
            </div>
            <div className="p-3 flex flex-col gap-1">
              {alerts.length === 0 ? (
                <div className="px-3 py-4 text-sm text-slate-400">All clear — no alerts.</div>
              ) : (
                alerts.map((a) => (
                  <div key={a.id} className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${a.type === 'danger' ? 'bg-red-500' : 'bg-amber-500'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${a.type === 'danger' ? 'text-red-500' : 'text-amber-500'}`}>{a.type}</span>
                    </div>
                    <div className="text-sm text-slate-700">{a.text}</div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        }
        insights={
          <motion.div
            className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.25 }}
          >
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="text-sm font-semibold text-slate-900">Subject Focus</div>
              <div className="text-xs text-slate-400 mt-0.5">Students per subject area</div>
            </div>
            <div className="p-3 flex flex-col gap-1">
              {subjectData.map((s) => (
                <div key={s.name} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">{s.name}</div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">{s.students} students · {s.avgScore}% avg</div>
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

export default NGODashboard;
