import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Flame, Award, ChevronRight, Activity, Filter, Download, MessageSquare, MoreVertical, X } from 'lucide-react';
import { mentorAPI } from '../../api/mentor';

const MotionTbody = motion.tbody;
const MotionTr = motion.tr;
const MotionDiv = motion.div;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mentorAPI.getStudents().then(data => {
      setStudents(data);
      setLoading(false);
    });
  }, []);

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'All') return matchesSearch;
    if (filterType === 'Active') return matchesSearch && s.healthStatus === 'green';
    if (filterType === 'Idle') return matchesSearch && s.healthStatus === 'yellow';
    if (filterType === 'At Risk') return matchesSearch && s.healthStatus === 'red';
    return matchesSearch;
  });

  if (loading) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner"></div></div>;

  const filters = ['All', 'Active', 'Idle', 'At Risk'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  
  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="dash-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 pb-2">Student Directory</h1>
          <p className="text-slate-500 text-sm">Monitor progress, XP levels, and engagement across your cohort</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-all w-full md:w-64 lg:w-80 focus:ring-4 focus:ring-blue-500/10"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                onClick={() => setSearchTerm('')}
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          <button className="btn btn-secondary text-sm hidden sm:flex shrink-0">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="glass-panel p-6 flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
        
        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 sm:pb-0 hide-scrollbar">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2 hidden sm:block">Filters:</span>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filterType === f 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                {f} {f !== 'All' && <span className="ml-1 opacity-70 text-xs">({students.filter(s => {
                  if (f === 'Active') return s.healthStatus === 'green';
                  if (f === 'Idle') return s.healthStatus === 'yellow';
                  if (f === 'At Risk') return s.healthStatus === 'red';
                  return false;
                }).length})</span>}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-800">{filtered.length}</span> students
          </div>
        </div>

        {/* Student Table */}
        <div className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-white custom-scrollbar relative">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 bg-slate-50 z-10 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4 pl-6 font-medium">Student Info</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium w-1/4">XP Progress</th>
                <th className="p-4 font-medium text-center">Streak</th>
                <th className="p-4 font-medium">Last Active</th>
                <th className="p-4 pr-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            
            <MotionTbody 
              variants={containerVariants} 
              initial="hidden" 
              animate="visible"
              className="text-sm"
            >
              <AnimatePresence>
                {filtered.map((student, i) => (
                  <MotionTr 
                    variants={rowVariants}
                    exit={{ opacity: 0, x: -10, transition: { duration: 0.2 } }}
                    key={student.id} 
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors group"
                  >
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {student.avatar ? (
                            <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full border border-slate-200 object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                              {student.name.charAt(0)}
                            </div>
                          )}
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                            student.healthStatus === 'green' ? 'bg-emerald-500' :
                            student.healthStatus === 'yellow' ? 'bg-amber-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-base">{student.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4 text-center">
                      <div className={`inline-flex items-center justify-center min-w-[90px] gap-1.5 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-widest border ${
                        student.healthStatus === 'green' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                        student.healthStatus === 'yellow' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                        'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {student.healthStatus === 'green' ? 'Active' : student.healthStatus === 'yellow' ? 'Idle' : 'At Risk'}
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex flex-col gap-2 relative group/xp">
                        <div className="flex justify-between items-center text-xs font-semibold px-1">
                          <span className="text-blue-600 flex items-center gap-1.5"><Award size={12}/> Lvl {student.level}</span>
                          <span className="text-slate-500">{student.total_xp} XP</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                          <MotionDiv 
                            initial={{ width: 0 }} 
                            animate={{ width: `${student.xpProgress}%` }} 
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className="absolute top-0 left-0 bottom-0 bg-blue-500 rounded-full"
                          ></MotionDiv>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4 text-center">
                      <div className={`inline-flex items-center justify-center gap-1.5 font-bold ${student.streak_days > 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                        <Flame size={18} className={student.streak_days > 0 ? 'fill-amber-500 drop-shadow-sm' : ''} />
                        <span className="text-lg">{student.streak_days}</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Activity size={16} className={student.healthStatus === 'green' ? 'text-emerald-500' : 'text-slate-400'} />
                        {student.lastActive}
                      </div>
                    </td>
                    
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-xl bg-white hover:bg-slate-100 text-blue-600 transition-all border border-slate-200 hover:border-blue-200 shadow-sm focus:outline-none" title="Message Student">
                          <MessageSquare size={16} />
                        </button>
                        <Link to={`/mentor/students/${student.id}`} className="btn btn-primary px-4 py-2 text-sm">
                          Profile
                        </Link>
                      </div>
                    </td>
                  </MotionTr>
                ))}
              </AnimatePresence>
            </MotionTbody>
          </table>
          
          {filtered.length === 0 && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-slate-50/90 backdrop-blur-sm z-20">
              <div className="w-16 h-16 rounded-full bg-white flex flex-col justify-center items-center mb-4 text-slate-400 border border-slate-200 shadow-sm">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">No students found</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                We couldn't find any students matching "{searchTerm}" with the "{filterType}" filter.
              </p>
              <button 
                className="mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                onClick={() => { setSearchTerm(''); setFilterType('All'); }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination placeholder */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 font-medium px-2">
          <span>Page 1 of {Math.ceil(filtered.length / 10) || 1}</span>
          <div className="flex gap-2">
            <button className="btn btn-secondary px-3 py-1.5 opacity-50 cursor-not-allowed">Previous</button>
            <button className="btn btn-secondary px-3 py-1.5" disabled={filtered.length <= 10}>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Students;
