import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar, BarChart2, Users, TrendingUp } from 'lucide-react';
import { adminAPI } from '../../api/admin';
import { adminMetrics } from '../../utils/adminMetrics';

const AdminReports = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminAPI.getAllStudents(), adminAPI.getMentors()]).then(([s, m]) => {
      setStudents(s);
      setMentors(m);
      setLoading(false);
    });
  }, []);

  const stats = useMemo(() => adminMetrics.computePlatformStats(students, mentors), [students, mentors]);
  const subjects = useMemo(() => adminMetrics.subjectBreakdown(students), [students]);

  const itemV = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };
  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

  if (loading) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner" /></div>;

  const reportCards = [
    { title: 'Student Progress Report', desc: 'Comprehensive breakdown of all student XP, scores, and engagement levels across the program.', icon: Users, color: 'blue' },
    { title: 'Mentor Performance Report', desc: 'Mentor-wise analysis of student outcomes, response times, and resolution rates.', icon: TrendingUp, color: 'purple' },
    { title: 'Subject Analytics Report', desc: 'Subject-level completion rates, average scores, and student distribution analysis.', icon: BarChart2, color: 'emerald' },
    { title: 'Monthly Summary Report', desc: 'High-level monthly overview of platform metrics, growth, and intervention outcomes.', icon: Calendar, color: 'amber' },
  ];

  const colorMap = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', icon: 'text-blue-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', icon: 'text-purple-500' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', icon: 'text-emerald-500' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', icon: 'text-amber-500' },
  };

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10">
      <motion.header variants={itemV} className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Administration</div>
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Reports & Exports</h1>
          <p className="text-sm text-slate-500 mt-1">Generate and download platform reports for stakeholders.</p>
        </div>
      </motion.header>

      {/* Quick Summary */}
      <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Current Period Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
            <div className="text-2xl font-black text-slate-800">{stats.totalStudents}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">Students</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
            <div className="text-2xl font-black text-slate-800">{stats.totalMentors}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">Mentors</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
            <div className="text-2xl font-black text-emerald-600">{stats.activeRate}%</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">Active Rate</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
            <div className="text-2xl font-black text-slate-800">{stats.avgScore}%</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">Avg Score</div>
          </div>
        </div>
      </motion.div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportCards.map((report, i) => {
          const cm = colorMap[report.color];
          return (
            <motion.div
              key={report.title}
              variants={itemV}
              className="bg-white rounded-2xl border border-[var(--border)] p-6 group hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-11 h-11 rounded-xl ${cm.bg} ${cm.border} border flex items-center justify-center shrink-0`}>
                  <report.icon size={20} className={cm.icon} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{report.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{report.desc}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Last generated: Today</span>
                <button className="btn btn-secondary text-xs px-3 py-1.5 group-hover:border-blue-200 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                  <Download size={14} /> Download
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subject Breakdown Table */}
      <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Subject Performance Summary</h3>
            <p className="text-xs text-slate-400 mt-0.5">Ready for export</p>
          </div>
          <button className="btn btn-secondary text-xs px-3 py-1.5">
            <Download size={14} /> Export
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="p-4 pl-6 text-left font-medium">Subject</th>
              <th className="p-4 text-center font-medium">Students</th>
              <th className="p-4 text-center font-medium">Avg Score</th>
              <th className="p-4 pr-6 text-center font-medium">Rating</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(s => (
              <tr key={s.name} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors">
                <td className="p-4 pl-6 font-semibold text-slate-900">{s.name}</td>
                <td className="p-4 text-center text-slate-600">{s.students}</td>
                <td className="p-4 text-center font-semibold text-slate-900">{s.avgScore}%</td>
                <td className="p-4 pr-6 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-semibold ${
                    s.avgScore >= 70 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                    s.avgScore >= 50 ? 'bg-amber-50 border-amber-200 text-amber-700' :
                    'bg-red-50 border-red-200 text-red-700'
                  }`}>
                    {s.avgScore >= 70 ? 'Strong' : s.avgScore >= 50 ? 'Average' : 'Weak'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default AdminReports;
