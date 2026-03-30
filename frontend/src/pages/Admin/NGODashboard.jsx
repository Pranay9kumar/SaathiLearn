import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, TrendingUp, Target, AlertTriangle, Flame, Check,
  Send, ChevronRight, Lightbulb, ArrowUpRight, ArrowDownRight,
  Clock, UserPlus, CheckCircle2, BarChart3, Activity, Brain,
  Shield, BookOpen, X, MessageSquare
} from 'lucide-react';

// ─────────────────────── MOCK DATA ───────────────────────
const MOCK_DELAY = 500;

const MOCK_STUDENTS = [
  { id: 's1', name: 'Priya Sharma', avatar: 'P', progress: 92, status: 'on-track', streak: 28, subject: 'Math', mentor: 'Rahul M.', lastActive: 'Just now', xp: 4800 },
  { id: 's2', name: 'Deepak Singh', avatar: 'D', progress: 74, status: 'on-track', streak: 5, subject: 'Science', mentor: 'Rahul M.', lastActive: '1 hr ago', xp: 1800 },
  { id: 's3', name: 'Vikram Joshi', avatar: 'V', progress: 85, status: 'on-track', streak: 18, subject: 'Math', mentor: 'Sunita K.', lastActive: '30 min ago', xp: 3600 },
  { id: 's4', name: 'Kavya Nair', avatar: 'K', progress: 68, status: 'on-track', streak: 3, subject: 'English', mentor: 'Sunita K.', lastActive: '6 hrs ago', xp: 1500 },
  { id: 's5', name: 'Arjun Mehta', avatar: 'A', progress: 78, status: 'on-track', streak: 9, subject: 'Science', mentor: 'Pradeep V.', lastActive: '4 hrs ago', xp: 2100 },
  { id: 's6', name: 'Ishita Rao', avatar: 'I', progress: 88, status: 'on-track', streak: 15, subject: 'Math', mentor: 'Pradeep V.', lastActive: '1 hr ago', xp: 3200 },
  { id: 's7', name: 'Sneha Patel', avatar: 'S', progress: 42, status: 'needs-help', streak: 0, subject: 'Science', mentor: 'Rahul M.', lastActive: '3 days ago', xp: 1200 },
  { id: 's8', name: 'Ananya Reddy', avatar: 'A', progress: 38, status: 'needs-help', streak: 0, subject: 'English', mentor: 'Sunita K.', lastActive: '4 days ago', xp: 680 },
  { id: 's9', name: 'Rohan Gupta', avatar: 'R', progress: 45, status: 'needs-help', streak: 0, subject: 'Hindi', mentor: 'Pradeep V.', lastActive: '5 days ago', xp: 890 },
  { id: 's10', name: 'Amit Kumar', avatar: 'A', progress: 18, status: 'at-risk', streak: 0, subject: 'Math', mentor: 'Rahul M.', lastActive: '2 weeks ago', xp: 450 },
  { id: 's11', name: 'Meera Das', avatar: 'M', progress: 12, status: 'at-risk', streak: 0, subject: 'English', mentor: 'Sunita K.', lastActive: '3 weeks ago', xp: 220 },
  { id: 's12', name: 'Rahul Verma', avatar: 'R', progress: 22, status: 'at-risk', streak: 0, subject: 'Science', mentor: 'Pradeep V.', lastActive: '10 days ago', xp: 340 },
];

const MOCK_ALERTS = [
  { id: 'a1', student: 'Meera Das', issue: 'No login for 3 weeks. Zero completed missions this month.', priority: 'High', time: '2 hrs ago', tag: 'Inactive', resolved: false },
  { id: 'a2', student: 'Amit Kumar', issue: 'Failed last 3 quizzes. Math completion below 20%.', priority: 'High', time: '4 hrs ago', tag: 'Failing', resolved: false },
  { id: 'a3', student: 'Rahul Verma', issue: 'Dropped from 55% to 22% progress in 2 weeks.', priority: 'High', time: '6 hrs ago', tag: 'Declining', resolved: false },
  { id: 'a4', student: 'Sneha Patel', issue: 'Streak broken. No activity for 3 consecutive days.', priority: 'Medium', time: '1 day ago', tag: 'Needs Help', resolved: false },
  { id: 'a5', student: 'Ananya Reddy', issue: 'Pending assignment submission for "Essay Writing".', priority: 'Medium', time: '1 day ago', tag: 'Overdue', resolved: false },
  { id: 'a6', student: 'Rohan Gupta', issue: 'Low engagement score. Only 2 lessons accessed this week.', priority: 'Low', time: '2 days ago', tag: 'Low Engagement', resolved: false },
];

const MOCK_INSIGHTS = [
  { id: 'i1', text: '3 students are at risk this week', delta: '+1 from last week', type: 'danger', icon: AlertTriangle },
  { id: 'i2', text: 'Math completion dropped by 8%', delta: 'vs last week', type: 'warning', icon: Target },
  { id: 'i3', text: 'Mentor Rahul has highest engagement', delta: '92% response rate', type: 'success', icon: TrendingUp },
  { id: 'i4', text: 'English scores improved by 12%', delta: 'across all levels', type: 'success', icon: BookOpen },
  { id: 'i5', text: '5 students hit new streak records', delta: 'this week', type: 'info', icon: Flame },
];

const MOCK_WEEKLY_ENGAGEMENT = [
  { label: 'Mon', value: 72 },
  { label: 'Tue', value: 85 },
  { label: 'Wed', value: 68 },
  { label: 'Thu', value: 91 },
  { label: 'Fri', value: 78 },
  { label: 'Sat', value: 45 },
  { label: 'Sun', value: 38 },
];

const MOCK_MENTORS = [
  { name: 'Rahul M.', students: 4, responseRate: 92, avgStudentProgress: 56 },
  { name: 'Sunita K.', students: 4, responseRate: 88, avgStudentProgress: 65 },
  { name: 'Pradeep V.', students: 4, responseRate: 78, avgStudentProgress: 62 },
];

const MOCK_METRICS = {
  totalStudents: 45,
  activeRate: 71,
  activeRateTrend: +4.2,
  avgProgress: 58,
  avgProgressTrend: +2.8,
  atRiskCount: 3,
  atRiskTrend: +1,
};

// ─────────────────────── HELPER COMPONENTS ───────────────────────

const StatusBadge = ({ status }) => {
  const config = {
    'on-track': { label: 'On Track', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    'needs-help': { label: 'Needs Help', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-500' },
    'at-risk': { label: 'At Risk', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-widest border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {c.label}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const config = {
    'High': 'bg-red-50 text-red-600 border-red-200',
    'Medium': 'bg-amber-50 text-amber-600 border-amber-200',
    'Low': 'bg-slate-50 text-slate-500 border-slate-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${config[priority]}`}>
      {priority}
    </span>
  );
};

const MiniBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-2 h-32 w-full">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / max) * 100}%` }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
            className={`w-full rounded-t-lg min-h-[4px] ${d.value >= 70 ? 'bg-blue-500' : d.value >= 50 ? 'bg-blue-400' : 'bg-blue-300'}`}
          />
          <span className="text-[10px] font-bold text-slate-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────── MAIN COMPONENT ───────────────────────

const NGODashboard = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(MOCK_STUDENTS);
      setAlerts(MOCK_ALERTS);
      setMetrics(MOCK_METRICS);
      setLoading(false);
    }, MOCK_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const handleResolve = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    setActiveReplyId(null);
    setReplyText('');
  };

  const handleAssignMentor = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, tag: 'Assigned' } : a));
  };

  const handleSendReply = (id) => {
    if (!replyText.trim()) return;
    handleResolve(id);
  };

  // Sort students: at-risk → needs-help → on-track
  const sortedStudents = [...students].sort((a, b) => {
    const order = { 'at-risk': 0, 'needs-help': 1, 'on-track': 2 };
    return order[a.status] - order[b.status];
  });

  if (loading) {
    return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner"></div></div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } }
  };

  const statCards = [
    {
      label: 'Total Students', value: metrics.totalStudents,
      sub: '12 enrolled this month', icon: Users,
      color: '#2563eb', bgColor: 'bg-blue-50', borderColor: 'border-blue-100'
    },
    {
      label: 'Active Rate', value: `${metrics.activeRate}%`,
      trend: metrics.activeRateTrend, sub: 'vs last week', icon: Activity,
      color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100'
    },
    {
      label: 'Avg Progress', value: `${metrics.avgProgress}%`,
      trend: metrics.avgProgressTrend, sub: 'weekly change', icon: Target,
      color: '#f59e0b', bgColor: 'bg-amber-50', borderColor: 'border-amber-100'
    },
    {
      label: 'At-Risk Students', value: metrics.atRiskCount,
      trend: metrics.atRiskTrend, sub: 'needs immediate attention', icon: AlertTriangle,
      color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-100',
      isRisk: true
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="dash-section-gap"
    >
      {/* ── HEADER ── */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 pb-1">Program Dashboard</h1>
          <p className="text-slate-500 text-sm">Monitor student outcomes, mentor performance, and program impact.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Last updated: Just now</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </motion.div>

      {/* ── EXECUTIVE METRICS ── */}
      <div className="dash-stats">
        {statCards.map((stat, i) => (
          <motion.div
            variants={itemVariants}
            key={i}
            className={`glass-card group cursor-default bg-white border ${stat.borderColor} hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.bgColor} opacity-40 group-hover:scale-125 transition-transform duration-500`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</p>
              <div className={`p-2.5 rounded-xl ${stat.bgColor} shadow-sm`}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-end gap-2 mb-1">
                <h2 className={`text-4xl font-black tracking-tighter leading-none ${stat.isRisk ? 'text-red-600' : 'text-slate-800'}`}>
                  {stat.value}
                </h2>
                {stat.trend !== undefined && (
                  <div className={`flex items-center text-xs font-bold mb-1 ${stat.isRisk
                      ? (stat.trend > 0 ? 'text-red-500' : 'text-emerald-500')
                      : (stat.trend >= 0 ? 'text-emerald-500' : 'text-red-500')
                    }`}>
                    {stat.trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(stat.trend)}{typeof stat.trend === 'number' && stat.label !== 'At-Risk Students' ? '%' : ''}
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── MAIN GRID: Student Overview + Alerts ── */}
      <div className="dash-grid">

        {/* LEFT: Student Overview Panel */}
        <motion.div variants={itemVariants} className="dash-col-8 glass-panel p-6 flex flex-col bg-white border border-slate-200">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Student Overview</h3>
              <p className="text-xs text-slate-500 font-medium">Sorted by risk level • {students.length} students</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-red-500"><span className="w-2 h-2 rounded-full bg-red-500"></span>{students.filter(s => s.status === 'at-risk').length} At Risk</span>
              <span className="flex items-center gap-1.5 text-amber-500"><span className="w-2 h-2 rounded-full bg-amber-500"></span>{students.filter(s => s.status === 'needs-help').length} Needs Help</span>
              <span className="flex items-center gap-1.5 text-emerald-500"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>{students.filter(s => s.status === 'on-track').length} On Track</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto max-h-[520px] pr-1 space-y-3 custom-scrollbar">
            {sortedStudents.map((student, i) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ x: 3 }}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-default group ${student.status === 'at-risk'
                    ? 'bg-red-50/60 border-red-200 hover:border-red-300 hover:shadow-sm'
                    : student.status === 'needs-help'
                      ? 'bg-amber-50/40 border-amber-100 hover:border-amber-200 hover:shadow-sm'
                      : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 hover:shadow-sm'
                  }`}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0 ${student.status === 'at-risk' ? 'bg-red-100 text-red-600' :
                      student.status === 'needs-help' ? 'bg-amber-100 text-amber-600' :
                        'bg-blue-100 text-blue-600'
                    }`}>
                    {student.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-800 text-sm truncate">{student.name}</p>
                      <StatusBadge status={student.status} />
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span>{student.subject}</span>
                      <span>•</span>
                      <span>Mentor: {student.mentor}</span>
                      <span>•</span>
                      <span>{student.lastActive}</span>
                    </div>
                  </div>

                  {/* Streak */}
                  <div className={`flex items-center gap-1 shrink-0 ${student.streak > 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                    <Flame size={16} className={student.streak > 0 ? 'fill-amber-500' : ''} />
                    <span className="font-bold text-sm">{student.streak}</span>
                  </div>

                  {/* Progress */}
                  <div className="w-28 shrink-0 hidden sm:block">
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className={
                        student.progress >= 70 ? 'text-emerald-600' :
                          student.progress >= 40 ? 'text-amber-600' : 'text-red-600'
                      }>{student.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${student.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className={`h-full rounded-full ${student.progress >= 70 ? 'bg-emerald-500' :
                            student.progress >= 40 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Alerts Panel */}
        <motion.div variants={itemVariants} className="dash-col-4 glass-panel p-6 flex flex-col bg-white border border-slate-200">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" /> Active Alerts
            </h3>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">{alerts.length}</span>
          </div>

          <div className="flex-1 overflow-auto max-h-[480px] space-y-4 pr-1 custom-scrollbar">
            <AnimatePresence>
              {alerts.map((alert, i) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${activeReplyId === alert.id
                      ? 'border-blue-300 bg-blue-50/30 shadow-sm ring-1 ring-blue-100'
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white'
                    }`}
                  onClick={() => setActiveReplyId(activeReplyId === alert.id ? null : alert.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{alert.student}</p>
                      <PriorityBadge priority={alert.priority} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">{alert.time}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{alert.issue}</p>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${alert.tag === 'Assigned'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>{alert.tag}</span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAssignMentor(alert.id); }}
                        className="p-1.5 rounded-lg bg-white hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                        title="Assign Mentor"
                      >
                        <UserPlus size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleResolve(alert.id); }}
                        className="p-1.5 rounded-lg bg-white hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100"
                        title="Mark Resolved"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Reply Input */}
                  <AnimatePresence>
                    {activeReplyId === alert.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-slate-200/80 flex gap-2">
                          <textarea
                            autoFocus
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Add a note or recommendation..."
                            className="flex-1 bg-white border border-slate-200 focus:border-blue-400 rounded-lg px-3 py-2 text-xs text-slate-800 resize-none outline-none min-h-[60px] transition-all focus:ring-2 focus:ring-blue-500/10"
                          />
                          <button
                            onClick={() => handleSendReply(alert.id)}
                            disabled={!replyText.trim()}
                            className={`self-end p-2 rounded-lg transition-all shrink-0 ${replyText.trim()
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              }`}
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {alerts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 shadow-sm">
                  <CheckCircle2 size={28} className="text-emerald-500" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">All Clear!</h4>
                <p className="text-sm text-slate-500 max-w-xs">No active alerts. All students are progressing well.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM ROW: Insights + Engagement + Mentor Performance ── */}
      <div className="dash-grid">

        {/* Smart Insights */}
        <motion.div variants={itemVariants} className="dash-col-4 glass-panel p-6 bg-white border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-500" /> Smart Insights
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-5">AI-powered observations from this week</p>

          <div className="space-y-3">
            {MOCK_INSIGHTS.map((insight, i) => {
              const colorMap = {
                danger: { bg: 'bg-red-50', border: 'border-red-100', icon: 'text-red-500', delta: 'text-red-500' },
                warning: { bg: 'bg-amber-50', border: 'border-amber-100', icon: 'text-amber-500', delta: 'text-amber-600' },
                success: { bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'text-emerald-500', delta: 'text-emerald-600' },
                info: { bg: 'bg-blue-50', border: 'border-blue-100', icon: 'text-blue-500', delta: 'text-blue-600' },
              };
              const c = colorMap[insight.type];
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-3.5 rounded-xl border ${c.bg} ${c.border} flex items-start gap-3 transition-all hover:shadow-sm`}
                >
                  <div className={`mt-0.5 shrink-0 ${c.icon}`}>
                    <insight.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-700 text-sm leading-snug">{insight.text}</p>
                    <p className={`text-[11px] font-medium mt-0.5 ${c.delta}`}>{insight.delta}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly Engagement Chart */}
        <motion.div variants={itemVariants} className="dash-col-4 glass-panel p-6 bg-white border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
            <BarChart3 size={18} className="text-blue-500" /> Engagement Trend
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-6">Active participation rate this week</p>

          <div className="flex-1 flex flex-col justify-end">
            <MiniBarChart data={MOCK_WEEKLY_ENGAGEMENT} />
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">
              <span className="text-slate-800 font-bold">68%</span> avg. this week
            </div>
            <div className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <ArrowUpRight size={12} /> +5% vs last week
            </div>
          </div>
        </motion.div>

        {/* Mentor Performance */}
        <motion.div variants={itemVariants} className="dash-col-4 glass-panel p-6 bg-white border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
            <Shield size={18} className="text-indigo-500" /> Mentor Effectiveness
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-5">Response rates & student outcomes</p>

          <div className="space-y-4">
            {MOCK_MENTORS.map((mentor, i) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {mentor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{mentor.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{mentor.students} students assigned</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${mentor.responseRate >= 90 ? 'text-emerald-600' : mentor.responseRate >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                      {mentor.responseRate}%
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">Response</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-semibold mb-1">
                    <span className="text-slate-400">Avg Student Progress</span>
                    <span className="text-blue-600">{mentor.avgStudentProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mentor.avgStudentProgress}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default NGODashboard;
