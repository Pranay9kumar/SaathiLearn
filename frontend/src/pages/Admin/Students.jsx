import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Download } from 'lucide-react';
import { adminAPI } from '../../api/admin';
import { getStatusLabel, getStatusClasses, filterStudents } from '../../utils/studentUtils';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');

  useEffect(() => {
    adminAPI.getAllStudents().then(data => {
      setStudents(data);
      setLoading(false);
    });
  }, []);

  const subjects = useMemo(() => {
    const set = new Set();
    students.forEach(s => (s.subjects || []).forEach(sub => set.add(sub)));
    return ['All', ...Array.from(set).sort()];
  }, [students]);

  const filtered = useMemo(() => {
    let result = filterStudents(students, searchTerm, statusFilter);
    if (subjectFilter !== 'All') {
      result = result.filter(s => (s.subjects || []).includes(subjectFilter));
    }
    return result;
  }, [students, searchTerm, statusFilter, subjectFilter]);

  if (loading) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner" /></div>;

  const filters = ['All', 'Active', 'Idle', 'At Risk'];

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
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">All Students</h1>
          <p className="text-sm text-slate-500 mt-1">Platform-wide student directory with performance tracking.</p>
        </div>
        <button className="btn btn-secondary text-sm hidden sm:flex mt-4 sm:mt-0 shrink-0">
          <Download size={16} /> Export CSV
        </button>
      </motion.header>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => setSearchTerm('')}>
              <X size={14} />
            </button>
          )}
        </div>
        <select
          value={subjectFilter}
          onChange={e => setSubjectFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
        >
          {subjects.map(s => <option key={s} value={s}>{s === 'All' ? 'All Subjects' : s}</option>)}
        </select>
      </div>

      {/* Status Tabs + Table */}
      <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col" style={{ minHeight: 500 }}>
        {/* Tabs */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  statusFilter === f
                    ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="text-sm text-slate-500 font-medium shrink-0 ml-4">
            <span className="text-slate-800">{filtered.length}</span> students
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="sticky top-0 bg-slate-50 z-10 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4 pl-5 font-medium">Student</th>
                <th className="p-4 font-medium">Mentor</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium">XP Progress</th>
                <th className="p-4 font-medium text-center">Avg Score</th>
                <th className="p-4 font-medium text-center">Level</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map(student => {
                const sc = getStatusClasses(student.healthStatus);
                return (
                  <tr key={student.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 pl-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-400">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 text-sm">{student.mentor}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${sc.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {getStatusLabel(student.healthStatus)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                          <div
                            className={`h-full rounded-full ${student.healthStatus === 'green' ? 'bg-emerald-500' : student.healthStatus === 'yellow' ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${student.xpProgress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 w-9 text-right">{student.xpProgress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-semibold text-slate-900">{student.avgScore}%</td>
                    <td className="p-4 text-center">
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-bold">Lvl {student.level}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search size={24} className="text-slate-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-2">No students found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
              <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium" onClick={() => { setSearchTerm(''); setStatusFilter('All'); setSubjectFilter('All'); }}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
