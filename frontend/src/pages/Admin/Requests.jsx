import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Check, MoreHorizontal, AlertCircle, Clock, UserCog } from 'lucide-react';
import { adminAPI } from '../../api/admin';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    adminAPI.getAllRequests().then(data => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'All') return requests;
    if (filter === 'Open') return requests.filter(r => r.status === 'open');
    if (filter === 'Resolved') return requests.filter(r => r.status === 'resolved');
    return requests;
  }, [requests, filter]);

  const handleResolve = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
  };

  if (loading) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner" /></div>;

  const openCount = requests.filter(r => r.status === 'open').length;

  return (
    <div className="flex flex-col gap-6 pb-10 max-w-5xl mx-auto">
      <motion.header
        className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Administration</div>
          <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Help Requests</h1>
          <p className="text-sm text-slate-500 mt-1">All student queries across the platform. Assign mentors or resolve directly.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 text-blue-600 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm mt-4 sm:mt-0">
          <MessageSquare size={22} className="text-blue-500" />
          <div className="flex flex-col">
            <span className="text-2xl font-black leading-none">{openCount}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Open</span>
          </div>
        </div>
      </motion.header>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'Open', 'Resolved'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === f
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Request Cards */}
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {filtered.map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border p-6 transition-all ${
                req.status === 'resolved'
                  ? 'border-slate-100 opacity-60'
                  : req.priority === 'high'
                    ? 'border-red-200 hover:shadow-md'
                    : 'border-slate-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 shrink-0">
                    {req.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-slate-800 font-bold">{req.studentName}</h3>
                      <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-xs font-semibold text-slate-600">{req.subject}</span>
                      {req.priority === 'high' && (
                        <span className="bg-red-50 border border-red-200 px-2 py-0.5 rounded-md text-xs font-bold text-red-600 flex items-center gap-1">
                          <AlertCircle size={10} /> Urgent
                        </span>
                      )}
                      {req.status === 'resolved' && (
                        <span className="bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-xs font-bold text-emerald-600">Resolved</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock size={12} /> {req.time}</span>
                      <span className="flex items-center gap-1"><UserCog size={12} /> {req.mentor}</span>
                    </div>
                  </div>
                </div>

                {req.status === 'open' && (
                  <button
                    onClick={() => handleResolve(req.id)}
                    className="p-2 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all border border-transparent hover:border-emerald-100 shrink-0"
                    title="Mark as Resolved"
                  >
                    <Check size={18} />
                  </button>
                )}
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-slate-700 text-sm leading-relaxed">"{req.question}"</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-slate-200 p-16 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
              <Check size={36} className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">All Clear!</h3>
            <p className="text-slate-500 text-sm max-w-sm">No requests match the current filter.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminRequests;
