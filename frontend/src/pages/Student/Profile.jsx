import React from 'react';

const Profile = ({ student, onLogout }) => {
  return (
    <div className="profile">
      <style>{`
        :root {
          --bg-color: #f8f9fa;
          --text-color: #333;
          --card-bg: #fff;
          --border-color: #dee2e6;
        }
        .dark-mode {
          --bg-color: #121212;
          --text-color: #fff;
          --card-bg: #1e1e1e;
          --border-color: #444;
        }
        .profile {
          padding: 20px;
          background: var(--bg-color);
          color: var(--text-color);
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
        }
        .profile-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #007bff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 15px;
        }
        .profile-info {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .info-item:last-child {
          border-bottom: none;
        }
        .logout-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background: #c82333;
        }
      `}</style>
      <div className="profile-header">
        <div className="profile-avatar">{student.avatar}</div>
        <h1>{student.name}</h1>
      </div>
      <div className="profile-info">
        <div className="info-item">
          <span>Grade</span>
          <span>{student.grade}</span>
        </div>
        <div className="info-item">
          <span>Streak</span>
          <span>{student.details.streak} days</span>
        </div>
        <div className="info-item">
          <span>Assigned Mentor</span>
          <span>Dr. Sarah Johnson</span>
        </div>
        <div className="info-item">
          <span>Rank</span>
          <span>#{student.stats.classRank}</span>
        </div>
      </div>
      <button className="logout-btn" onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default Profile;