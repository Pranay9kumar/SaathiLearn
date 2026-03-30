import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from 'recharts';
import { mentorAPI } from '../../api/mentor';
import { Activity, Award, AlertTriangle, Users, BookOpen, Download } from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    mentorAPI.getAnalytics().then(setData);
  }, []);

  if (!data) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner"></div></div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  const statCards = [
    { label: "Total Students", value: data.totalStudents, icon: Users, color: "#10b981", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Active Today", value: data.activeToday, icon: Activity, color: "#f59e0b", bg: "bg-amber-50", border: "border-amber-100" },
    { label: "Avg XP/Week", value: data.avgXp, icon: Award, color: "#2563eb", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Needs Attention", value: data.atRisk, icon: AlertTriangle, color: "#ef4444", bg: "bg-red-50", border: "border-red-100" }
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 pb-2">Cohort Analytics</h1>
          <p className="text-slate-500 text-sm">Visualize progress, identify trends, and export performance reports.</p>
        </div>
        <button className="btn btn-secondary text-sm border-blue-200 text-blue-600 hover:bg-blue-50 gap-2 shrink-0 bg-white shadow-sm">
          <Download size={16} /> Export PDF Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div variants={itemVariants} key={i} className={`glass-card group overflow-hidden bg-white border ${stat.border} hover:shadow-md transition-shadow relative flex flex-col justify-between p-6 rounded-2xl`}>
            <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full ${stat.bg} opacity-50 group-hover:scale-110 transition-transform`}></div>
            <div className="flex justify-between items-start mb-6 relative z-10 w-full">
              <p className="text-slate-500 font-bold uppercase tracking-wider text-[11px] leading-tight">{stat.label}</p>
              <div className={`p-2.5 rounded-xl ${stat.bg} shadow-sm`}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
            </div>
            <h3 className="text-4xl font-black text-slate-800 leading-none tracking-tighter relative z-10">
              {stat.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel bg-white border border-slate-200 p-6 md:p-8 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold text-slate-800">Engagement Trend</h3>
             <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                <option>Last 4 Weeks</option>
                <option>Last 3 Months</option>
             </select>
          </div>
          <div className="flex-1 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.performanceOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#cbd5e1" tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} />
                <YAxis stroke="#cbd5e1" tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '13px', fontWeight: 600, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" activeDot={{ r: 6, fill: '#fff', stroke: '#2563eb', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subject Breakdown Chart */}
        <motion.div variants={itemVariants} className="glass-panel bg-white border border-slate-200 p-6 md:p-8 flex flex-col min-h-[400px]">
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-500"/> Subject Focus
          </h3>
          <p className="text-xs text-slate-500 mb-8 font-medium">Distribution of complete missions.</p>
          <div className="flex-1 w-full pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.subjectBreakdown} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#cbd5e1" tick={{fill: '#475569', fontSize: 12, fontWeight: 700}} axisLine={false} tickLine={false} width={70} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px', fontWeight: 600, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                  {data.subjectBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
