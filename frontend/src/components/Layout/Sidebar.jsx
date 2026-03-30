import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BookOpen, LogOut, LayoutDashboard, Users, HeartHandshake, TrendingUp } from 'lucide-react';
import './Sidebar.css';

export const Sidebar = () => {
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
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/student/missions" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <BookOpen size={20} />
              <span>Missions</span>
            </NavLink>
          </>
        );
      case 'MENTOR':
        return (
          <>
            <NavLink to="/mentor/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <HeartHandshake size={20} />
              <span>Help Requests</span>
            </NavLink>
            <NavLink to="/mentor/students" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Users size={20} />
              <span>My Students</span>
            </NavLink>
          </>
        );
      case 'ADMIN':
        return (
          <>
            <NavLink to="/admin/ngo" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <TrendingUp size={20} />
              <span>NGO Metrics</span>
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
        <h2 className="brand-logo">Saathi<span style={{ color: 'var(--secondary-color)' }}>Learn</span></h2>
        {user && <p className="user-greeting">Hi, {user.name.split(' ')[0]}</p>}
      </div>
      
      <nav className="sidebar-nav">
        {renderLinks()}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
