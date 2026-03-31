import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';
import { adminAPI } from '../../api/admin';
import { adminMetrics } from '../../utils/adminMetrics';
import { Activity, Award, AlertTriangle, Users, BookOpen, TrendingUp } from 'lucide-react';

const AdminAnalytics = () => {
  const [students, setStudents] = useState([]);
  const [engagement, setEngagement] = useState([]);
  const [completion, setCompletion] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminAPI.getAllStudents(),
      adminAPI.getEngagementTrend(),
      adminAPI.getCompletionRates(),
    ]).then(([s, e, c]) => {
      setStudents(s);
      setEngagement(e);
      setCompletion(c);
      setLoading(false);
    });
  }, []);

  const platformStats = useMemo(() => {
    if (!students.length) return null;
    const active = students.filter(s => s.healthStatus === 'green').length;
    const atRisk = students.filter(s => s.healthStatus === 'red').length;
    const avgScore = Math.round(students.reduce((a, s) => a + s.avgScore, 0) / students.length);
    return { active, atRisk, avgScore, total: students.length };
  }, [students]);

  const subjectData = useMemo(() => adminMetrics.subjectBreakdown(students), [students]);

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemV = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

  if (loading || !platformStats) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner" /></div>;

  const statCards = [
    { label: 'Total Students', value: platformStats.total, icon: Users, color: '#10b981', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Active Now', value: platformStats.active, icon: Activity, color: '#f59e0b', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Avg Score', value: `${platformStats.avgScore}%`, icon: Award, color: '#2563eb', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'At Risk', value: platformStats.atRisk, icon: AlertTriangle, color: '#ef4444', bg: 'bg-red-50', border: 'border-red-100' },
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10">
      <motion.header variants={itemV} className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Administration</div>
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Platform Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Visualize engagement, completion rates, and subject performance.</p>
        </div>
      </motion.header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => (
          <motion.div variants={itemV} key={i} className={`bg-white border ${stat.border} rounded-2xl p-6 relative overflow-hidden group hover:shadow-md transition-shadow`}>
            <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full ${stat.bg} opacity-50 group-hover:scale-110 transition-transform`} />
            <div className="flex justify-between items-start mb-5 relative z-10">
              <p className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">{stat.label}</p>
              <div className={`p-2.5 rounded-xl ${stat.bg} shadow-sm`}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-800 leading-none tracking-tighter relative z-10">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Trend */}
        <motion.div variants={itemV} className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col min-h-[380px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-500" /> Engagement Trend
              </h3>
              <p className="text-xs text-slate-500 mt-1">Weekly active vs completed missions</p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagement} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminColorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="adminColorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="week" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 13, fontWeight: 600, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="active" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#adminColorActive)" />
                <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#adminColorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="w-3 h-1.5 rounded bg-blue-500" /> Active
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="w-3 h-1.5 rounded bg-emerald-500" /> Completed
            </div>
          </div>
        </motion.div>

        {/* Subject Breakdown */}
        <motion.div variants={itemV} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col min-h-[380px]">
          <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
            <BookOpen size={18} className="text-blue-500" /> Subject Focus
          </h3>
          <p className="text-xs text-slate-500 mb-6">Student distribution by subject</p>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#cbd5e1" tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 12, fontWeight: 600 }} />
                <Bar dataKey="students" radius={[0, 6, 6, 0]} barSize={22}>
                  {subjectData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Completion Rates */}
      <motion.div variants={itemV} className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Completion Rates by Subject</h3>
        <p className="text-xs text-slate-500 mb-6">Percentage of assigned missions completed</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {completion.map((c, i) => (
            <div key={c.subject} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-bold text-slate-700">{c.subject}</span>
                <span className={`text-lg font-black ${c.rate >= 65 ? 'text-emerald-600' : c.rate >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{c.rate}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${c.rate >= 65 ? 'bg-emerald-500' : c.rate >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${c.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminAnalytics;
