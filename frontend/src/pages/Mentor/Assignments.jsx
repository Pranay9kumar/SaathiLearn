import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Search, Calendar, Users, Eye, Edit2, Trash2 } from 'lucide-react';
import { mentorAPI } from '../../api/mentor';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    mentorAPI.getAssignments().then(data => {
      setAssignments(data);
      setLoading(false);
    });
  }, []);

  const filtered = assignments.filter(a => {
    if (filter === 'All') return true;
    if (filter === 'Due') return a.status === 'due';
    if (filter === 'Review') return a.status === 'review';
    if (filter === 'Done') return a.status === 'done';
    return true;
  });

  if (loading) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner"></div></div>;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 pb-2">Assignment Board</h1>
          <p className="text-slate-500 text-sm">Create, manage and review class assignments</p>
        </div>
        
        <button className="btn btn-primary group">
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          Create Assignment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto hide-scrollbar">
        {['All', 'Due', 'Review', 'Done'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === f 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            {f} {f !== 'All' && 
              <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] ${
                filter === f ? 'bg-white/20' : 'bg-slate-200 text-slate-600'
              }`}>
                {assignments.filter(a => f === 'Due' ? a.status === 'due' : f === 'Review' ? a.status === 'review' : a.status === 'done').length}
              </span>
            }
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((asgn, i) => (
            <motion.div 
              key={asgn.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card hover:border-blue-200 hover:shadow-md group flex flex-col h-full bg-white border border-slate-200"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                  asgn.status === 'due' ? 'bg-sky-50 text-sky-600 border border-sky-200' :
                  asgn.status === 'review' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                  'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}>
                  {asgn.status === 'due' ? 'Due Soon' : asgn.status === 'review' ? 'Needs Review' : 'Completed'}
                </span>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors border border-transparent hover:border-slate-200"><Edit2 size={14} /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100"><Trash2 size={14} /></button>
                </div>
              </div>

              <div className="mb-4">
                 <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{asgn.title}</h3>
                 <p className="text-sm text-slate-500 line-clamp-2">{asgn.description}</p>
                 <span className="inline-block mt-3 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 font-medium">#{asgn.subject}</span>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-slate-400" />
                  <span className="text-slate-600 font-medium">{asgn.dueDate}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500 flex items-center gap-1.5"><Users size={12}/>{asgn.submitted}/{asgn.assignedTo}</span>
                    <span className="text-blue-600">{Math.round((asgn.submitted/asgn.assignedTo)*100)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(asgn.submitted/asgn.assignedTo)*100}%`}}></div>
                  </div>
                </div>
              </div>

              <button className="mt-5 w-full btn bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-600 py-2.5 transition-all text-sm group-hover:shadow-sm">
                <Eye size={16} className="mr-1 inline" /> View Details
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
         <div className="glass-panel p-16 flex flex-col items-center justify-center text-center bg-white border border-slate-200">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
              <FileText size={32} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No assignments found</h2>
            <p className="text-slate-500 mb-8 max-w-md">You don't have any assignments matching the "{filter}" filter.</p>
            <button className="btn btn-primary" onClick={() => setFilter('All')}>Clear Filters</button>
         </div>
      )}
    </div>
  );
};

export default Assignments;
