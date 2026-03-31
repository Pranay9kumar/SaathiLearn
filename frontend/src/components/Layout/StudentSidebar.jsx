import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  MessageCircle,
  BookOpen,
  Trophy,
  Users,
  Target,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Zap,
  Award,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentSidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      route: '/student/dashboard',
      description: 'Overview & stats',
    },
    {
      id: 'missions',
      label: 'Missions',
      icon: Target,
      route: '/student/missions',
      description: 'Learn & complete tasks',
    },
    {
      id: 'doubts',
      label: 'Ask Doubts',
      icon: MessageCircle,
      route: '/student/doubts',
      description: 'AI chatbot & mentors',
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: BookOpen,
      route: '/student/courses',
      description: 'Browse & enroll',
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: Trophy,
      route: '/student/leaderboard',
      description: 'Rankings & achievements',
    },
    {
      id: 'mentors',
      label: 'Mentors',
      icon: Users,
      route: '/student/mentors',
      description: 'Connect & learn',
    },
  ];

  const utilityItems = [
    {
      id: 'analytics',
      label: 'My Analytics',
      icon: BarChart3,
      route: '/student/analytics',
      description: 'Performance insights',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      route: '/student/settings',
      description: 'Preferences & account',
    },
  ];

  const handleNavigate = (route, id) => {
    setActiveSection(id);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem('saathilearn_token');
    localStorage.removeItem('saathilearn_user');
    navigate('/login');
  };

  return (
    <motion.aside
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-2xl transition-all duration-300 z-40
        ${collapsed ? 'w-20' : 'w-64'}
      `}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-indigo-700">
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-2xl font-bold">🎓 Saathi</div>
            <div className="text-xs text-indigo-300">Learn Hub</div>
          </motion.div>
        )}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </motion.button>
      </div>

      {/* Main Menu */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
        <div className={`text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 ${collapsed ? 'text-center' : ''}`}>
          {!collapsed && 'Main Menu'}
        </div>

        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavigate(item.route, item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative
                ${isActive
                  ? 'bg-white/20 border border-white/30 shadow-lg'
                  : 'hover:bg-white/10 border border-transparent'
                }
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: collapsed ? 0 : 4 }}
            >
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                <Icon size={18} />
              </div>

              {!collapsed && (
                <div className="text-left flex-1">
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-xs text-indigo-200 group-hover:text-white transition-colors">
                    {item.description}
                  </div>
                </div>
              )}

              {isActive && !collapsed && (
                <motion.div
                  className="w-1 h-6 bg-white rounded-full"
                  layoutId="activeIndicator"
                />
              )}

              {/* Tooltip for collapsed view */}
              {collapsed && (
                <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg whitespace-nowrap text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Utility Menu */}
      <nav className="p-4 space-y-2 border-t border-indigo-700">
        <div className={`text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 ${collapsed ? 'text-center' : ''}`}>
          {!collapsed && 'Tools'}
        </div>

        {utilityItems.map((item, idx) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavigate(item.route, item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all group relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + idx * 0.05 }}
              whileHover={{ x: collapsed ? 0 : 4 }}
            >
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                <Icon size={18} />
              </div>

              {!collapsed && (
                <div className="text-left flex-1">
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-xs text-indigo-200 group-hover:text-white transition-colors">
                    {item.description}
                  </div>
                </div>
              )}

              {collapsed && (
                <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg whitespace-nowrap text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </motion.button>
          );
        })}

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-all group relative mt-4"
          whileHover={{ x: collapsed ? 0 : 4 }}
        >
          <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
            <LogOut size={18} />
          </div>

          {!collapsed && (
            <div className="text-left flex-1">
              <div className="text-sm font-semibold">Logout</div>
            </div>
          )}

          {collapsed && (
            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg whitespace-nowrap text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Logout
            </div>
          )}
        </motion.button>
      </nav>

      {/* Stats Footer */}
      {!collapsed && (
        <motion.div className="p-4 border-t border-indigo-700 space-y-3">
          <div className="bg-white/10 rounded-lg p-3 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs text-indigo-200">
                <Zap size={16} />
                <span>Daily Streak</span>
              </div>
              <span className="font-bold text-white">12</span>
            </div>
            <div className="w-full bg-indigo-700 rounded-full h-1.5">
              <div className="bg-yellow-400 h-1.5 rounded-full w-3/4" />
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-3 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-indigo-200">
                <Award size={16} />
                <span>Level</span>
              </div>
              <span className="font-bold text-white text-lg">5</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default StudentSidebar;
