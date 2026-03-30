import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  BookOpen, LogOut, LayoutDashboard, Users, 
  HeartHandshake, TrendingUp, BarChart2, MessageSquare, 
  History, Settings, FileText
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
            <NavLink to="/student/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <LayoutDashboard size={20} className="nav-icon" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            <NavLink to="/student/missions" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <BookOpen size={20} className="nav-icon" />
                <span>Missions</span>
              </div>
            </NavLink>
          </>
        );
      case 'MENTOR':
        return (
          <>
            <NavLink to="/mentor/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <LayoutDashboard size={20} className="nav-icon" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            <NavLink to="/mentor/students" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <Users size={20} className="nav-icon" />
                <span>Students</span>
              </div>
            </NavLink>
            <NavLink to="/mentor/assignments" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <FileText size={20} className="nav-icon" />
                <span>Assignments</span>
              </div>
            </NavLink>
            <NavLink to="/mentor/requests" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <MessageSquare size={20} className="nav-icon" />
                <span>Doubts</span>
              </div>
              {requestCount > 0 && <span className="nav-badge animate-pulse">{requestCount}</span>}
            </NavLink>
            <NavLink to="/mentor/analytics" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <BarChart2 size={20} className="nav-icon" />
                <span>Reports</span>
              </div>
            </NavLink>
            <NavLink to="/mentor/settings" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <Settings size={20} className="nav-icon" />
                <span>Settings</span>
              </div>
            </NavLink>
          </>
        );
      case 'ADMIN':
        return (
          <>
            <NavLink to="/admin/ngo" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <div className="nav-item-content">
                <TrendingUp size={20} className="nav-icon" />
                <span>NGO Metrics</span>
              </div>
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sidebar-container glass-panel">
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
          <LogOut size={20} className="nav-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
