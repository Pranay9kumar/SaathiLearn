import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, TrendingUp, Star, MoreVertical } from 'lucide-react';
import { adminAPI } from '../../api/admin';
import { adminMetrics } from '../../utils/adminMetrics';

const AdminMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    adminAPI.getMentors().then(data => {
      setMentors(data);
      setLoading(false);
    });
  }, []);

  const enriched = useMemo(() => adminMetrics.computeMentorPerformance(mentors), [mentors]);

  const filtered = useMemo(() => {
    if (!searchTerm) return enriched;
    return enriched.filter(m =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enriched, searchTerm]);

  if (loading) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner" /></div>;

  return (
    <div className="flex flex-col gap-6">
      <motion.header
        className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Administration</div>
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Mentor Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and monitor mentor performance across the program.</p>
        </div>
      </motion.header>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            placeholder="Search mentors..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-slate-500 font-medium">
          <span className="text-slate-800">{filtered.length}</span> mentors
        </div>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-[var(--border)] p-6 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-lg font-bold text-purple-600">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{m.name}</h3>
                  <p className="text-xs text-slate-500">{m.email}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${
                m.performanceTone === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                m.performanceTone === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                'bg-red-50 border-red-200 text-red-700'
              }`}>
                {m.performanceLabel}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-slate-900">{m.studentsAssigned}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">Students</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-slate-900">{m.avgStudentScore}%</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">Avg Score</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-slate-900">{m.resolvedRequests}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">Resolved</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md text-xs font-semibold text-blue-600">{m.subject}</span>
                {m.pendingRequests > 0 && (
                  <span className="bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md text-xs font-semibold text-amber-600">
                    {m.pendingRequests} pending
                  </span>
                )}
              </div>
              <span className={`flex items-center gap-1.5 text-xs font-semibold ${m.status === 'active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                {m.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-[var(--border)] p-16 flex flex-col items-center justify-center text-center">
          <Users size={32} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">No mentors found</h3>
          <p className="text-slate-500 text-sm">Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default AdminMentors;
