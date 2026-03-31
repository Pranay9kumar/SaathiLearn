import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  BookOpen, LogOut, LayoutDashboard, Users,
  TrendingUp, BarChart2, MessageSquare,
  Settings, FileText, ClipboardList, Building2,
  UserCog, PieChart
} from 'lucide-react';
import './Sidebar.css';

export const Sidebar = ({ requestCount = 0 }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderLinks = () => {
    switch (user?.role) {
      case 'STUDENT':
        return (
          <>
            <div className="sidebar-section-label">Learning</div>
            <NavLink to="/student/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <LayoutDashboard size={18} className="nav-icon" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            <NavLink to="/student/missions" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <BookOpen size={18} className="nav-icon" />
                <span>Missions</span>
              </div>
            </NavLink>

            <div className="sidebar-section-label">Progress</div>
            <NavLink to="/student/progress" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <TrendingUp size={18} className="nav-icon" />
                <span>Progress</span>
              </div>
            </NavLink>
            <NavLink to="/student/streak" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <BarChart2 size={18} className="nav-icon" />
                <span>Streak</span>
              </div>
            </NavLink>
            <NavLink to="/student/leaderboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <ClipboardList size={18} className="nav-icon" />
                <span>Leaderboard</span>
              </div>
            </NavLink>

            <div className="sidebar-section-label">Support</div>
            <NavLink to="/student/mentor" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <UserCog size={18} className="nav-icon" />
                <span>My Mentor</span>
              </div>
            </NavLink>
            <NavLink to="/student/ai-help" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <MessageSquare size={18} className="nav-icon" />
                <span>AI Help</span>
              </div>
            </NavLink>

            <div className="sidebar-section-label">Account</div>
            <NavLink to="/student/profile" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <Settings size={18} className="nav-icon" />
                <span>Profile</span>
              </div>
            </NavLink>
          </>
        );

      case 'MENTOR':
        return (
          <>
            <div className="sidebar-section-label">Overview</div>
            <NavLink to="/mentor/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <LayoutDashboard size={18} className="nav-icon" />
                <span>Dashboard</span>
              </div>
            </NavLink>

            <div className="sidebar-section-label">Manage</div>
            <NavLink to="/mentor/students" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <Users size={18} className="nav-icon" />
                <span>Students</span>
              </div>
            </NavLink>
            <NavLink to="/mentor/assignments" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <FileText size={18} className="nav-icon" />
                <span>Assignments</span>
              </div>
            </NavLink>
            <NavLink to="/mentor/requests" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <MessageSquare size={18} className="nav-icon" />
                <span>Doubts</span>
              </div>
              {requestCount > 0 && <span className="nav-badge animate-pulse">{requestCount}</span>}
            </NavLink>

            <div className="sidebar-section-label">Insights</div>
            <NavLink to="/mentor/analytics" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <BarChart2 size={18} className="nav-icon" />
                <span>Reports</span>
              </div>
            </NavLink>
            <NavLink to="/mentor/settings" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <Settings size={18} className="nav-icon" />
                <span>Settings</span>
              </div>
            </NavLink>
          </>
        );

      case 'ADMIN':
        return (
          <>
            <div className="sidebar-section-label">Overview</div>
            <NavLink to="/admin/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <LayoutDashboard size={18} className="nav-icon" />
                <span>Dashboard</span>
              </div>
            </NavLink>

            <div className="sidebar-section-label">Management</div>
            <NavLink to="/admin/mentors" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <UserCog size={18} className="nav-icon" />
                <span>Mentors</span>
              </div>
            </NavLink>
            <NavLink to="/admin/students" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <Users size={18} className="nav-icon" />
                <span>Students</span>
              </div>
            </NavLink>
            <NavLink to="/admin/requests" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <MessageSquare size={18} className="nav-icon" />
                <span>Requests</span>
              </div>
            </NavLink>

            <div className="sidebar-section-label">Insights</div>
            <NavLink to="/admin/analytics" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <PieChart size={18} className="nav-icon" />
                <span>Analytics</span>
              </div>
            </NavLink>
            <NavLink to="/admin/reports" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <ClipboardList size={18} className="nav-icon" />
                <span>Reports</span>
              </div>
            </NavLink>

            <div className="sidebar-section-label">System</div>
            <NavLink to="/admin/settings" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <Settings size={18} className="nav-icon" />
                <span>Settings</span>
              </div>
            </NavLink>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="logo-icon">S</div>
        <div className="brand-logo">
          Saathi<span style={{ color: 'var(--brand-green)' }}>Learn</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {renderLinks()}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} className="nav-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
