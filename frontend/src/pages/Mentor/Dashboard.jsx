import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Clock, Flame, Award, ArrowRight, ArrowUpRight, ArrowDownRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { mentorAPI } from '../../api/mentor';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const SparkLine = ({ data, color }) => (
  <div className="h-10 w-24">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((val, i) => ({ val, i }))}>
        <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
        <Line
          type="monotone"
          dataKey="val"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState({ analytics: null, requests: [], students: [], assignments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      mentorAPI.getAnalytics(),
      mentorAPI.getRequests(),
      mentorAPI.getStudents(),
      mentorAPI.getAssignments()
    ]).then(([analytics, requests, students, assignments]) => {
      setData({ analytics, requests, students, assignments });
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner"></div></div>;

  const { analytics, requests, students, assignments } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const statCards = [
    {
      label: "Total Students", value: analytics.totalStudents, trend: analytics.totalStudentsTrend,
      sparkline: analytics.sparklines.totalStudents, icon: Users,
      color: "var(--secondary-color)", bgColor: "rgba(16, 185, 129, 0.1)"
    },
    {
      label: "Active Today", value: analytics.activeToday, trend: analytics.activeStudentsTrend,
      sparkline: analytics.sparklines.activeStudents, icon: Flame,
      color: "var(--accent-color)", bgColor: "rgba(245, 158, 11, 0.1)"
    },
    {
      label: "Average Score", value: `${analytics.avgScore}%`, trend: analytics.avgScoreTrend,
      sparkline: analytics.sparklines.avgScore, icon: Award,
      color: "var(--primary-color)", bgColor: "rgba(37, 99, 235, 0.1)"
    },
    {
      label: "At Risk", value: analytics.atRisk, trend: analytics.atRiskTrend,
      sparkline: analytics.sparklines.atRisk, icon: Clock,
      color: "var(--danger)", bgColor: "rgba(239, 68, 68, 0.1)"
    }
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="dash-section-gap">
      {/* Premium Stats Grid */}
      <div className="dash-stats">
        {statCards.map((stat, i) => (
          <motion.div variants={itemVariants} key={i} className="glass-card group cursor-default">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 font-medium text-sm mb-1">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-3xl font-bold text-slate-800 leading-none">{stat.value}</h3>
                  <div className={`flex items-center text-xs font-bold leading-none mb-1 ${stat.trend >= 0 ? (stat.label === "At Risk" ? 'text-red-500' : 'text-emerald-500') : (stat.label === "At Risk" ? 'text-emerald-500' : 'text-red-500')}`}>
                    {stat.trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(stat.trend)}%
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
                <stat.icon size={22} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Last 7 days</span>
              <SparkLine data={stat.sparkline} color={stat.color} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dash-grid">

        {/* Main Students Table Panel */}
        <motion.div variants={itemVariants} className="dash-col-8 glass-panel p-6 flex flex-col" style={{ minHeight: '480px' }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Student Performance</h3>
              <p className="text-sm text-slate-500">Activity and progress overview</p>
            </div>
            <Link to="/mentor/students" className="btn btn-secondary text-sm px-4 py-2">
              View All
            </Link>
          </div>

          <div className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-white custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="sticky top-0 bg-slate-50 z-10 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4 font-medium">Student</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">XP Progress</th>
                  <th className="p-4 font-medium">Avg Score</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {students.slice(0, 5).map((student, i) => (
                  <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${student.healthStatus === 'green' ? 'bg-emerald-50 text-emerald-600' :
                          student.healthStatus === 'yellow' ? 'bg-amber-50 text-amber-600' :
                            'bg-red-50 text-red-600'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${student.healthStatus === 'green' ? 'bg-emerald-500' :
                            student.healthStatus === 'yellow' ? 'bg-amber-500' : 'bg-red-500'
                          }`}></div>
                        {student.healthStatus === 'green' ? 'Active' : student.healthStatus === 'yellow' ? 'Idle' : 'At Risk'}
                      </div>
                    </td>
                    <td className="p-4 w-1/4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${student.xpProgress}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="h-full bg-blue-500 rounded-full"
                          ></motion.div>
                        </div>
                        <span className="text-xs text-slate-500 font-medium w-8">{student.xpProgress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-700 font-medium">{student.avgScore}%</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-slate-200 text-blue-600 transition-colors" title="Message">
                          <MessageSquare size={16} />
                        </button>
                        <Link to={`/mentor/students/${student.id}`} className="p-1.5 rounded-lg hover:bg-slate-200 text-emerald-600 transition-colors" title="View Profile">
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Side Panels */}
        <div className="dash-col-4 dash-section-gap">

          {/* Doubts Panel */}
          <motion.div variants={itemVariants} className="glass-panel p-6 flex flex-col relative overflow-hidden group">

            <div className="flex justify-between items-center mb-5 relative z-10">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare size={18} className="text-purple-600" /> Recent Doubts
              </h3>
              {requests.length > 0 && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{requests.length}</span>
              )}
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-4 relative z-10">
              {requests.slice(0, 3).map(req => (
                <div key={req.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 hover:border-purple-200 transition-all hover:bg-slate-100 cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">
                        {req.studentName.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700 text-sm">{req.studentName}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{req.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">"{req.question}"</p>
                </div>
              ))}
              {requests.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <CheckCircle2 size={32} className="text-emerald-400 mb-3" />
                  <p className="text-sm text-slate-500">All doubts resolved!</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center relative z-10">
              <Link to="/mentor/requests" className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors inline-flex items-center gap-1">
                Open Doubts Inbox <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Assignments Mini-Panel */}
          <motion.div variants={itemVariants} className="glass-panel p-6 flex flex-col relative overflow-hidden group">

            <div className="flex justify-between items-center mb-5 relative z-10">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Clock size={18} className="text-amber-500" /> Active Assignments
              </h3>
            </div>

            <div className="flex-1 space-y-3 relative z-10">
              {assignments.filter(a => a.status === 'due' || a.status === 'review').slice(0, 2).map((asgn) => (
                <div key={asgn.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex justify-between items-center group/asgn hover:border-amber-200 transition-all">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-1 line-clamp-1 group-hover/asgn:text-amber-600 transition-colors">{asgn.title}</h4>
                    <div className="flex gap-2 text-[10px] font-medium uppercase tracking-wider">
                      <span className={asgn.status === 'review' ? 'text-amber-500' : 'text-slate-400'}>
                        {asgn.status === 'review' ? 'Needs Review' : 'In Progress'}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{asgn.submitted}/{asgn.assignedTo} Done</span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 group-hover/asgn:bg-amber-100 group-hover/asgn:text-amber-600">
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center relative z-10">
              <Link to="/mentor/assignments" className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors inline-flex items-center gap-1">
                Manage Assignments <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
