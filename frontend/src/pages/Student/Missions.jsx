import React from 'react';

const Missions = () => {
  const missions = [
    { id: 1, title: 'Complete 5 Math Chapters', progress: 80, reward: '10 XP', status: 'In Progress' },
    { id: 2, title: 'Achieve 90% in Biology Quiz', progress: 100, reward: '15 XP', status: 'Completed' },
    { id: 3, title: 'Study for 2 hours daily', progress: 60, reward: '20 XP', status: 'In Progress' },
    { id: 4, title: 'Help a classmate', progress: 0, reward: '25 XP', status: 'Not Started' },
  ];

  return (
    <div className="missions">
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
        .missions {
          padding: 20px;
          background: var(--bg-color);
          color: var(--text-color);
          font-family: Arial, sans-serif;
        }
        .mission-card {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 15px;
        }
        .mission-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .mission-title {
          font-weight: bold;
        }
        .mission-status {
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        .completed { background: #28a745; color: white; }
        .in-progress { background: #ffc107; color: black; }
        .not-started { background: #6c757d; color: white; }
        .progress-bar {
          height: 10px;
          background: #e9ecef;
          border-radius: 5px;
          margin: 10px 0;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: #007bff;
          border-radius: 5px;
        }
        .mission-reward {
          color: #666;
          font-size: 14px;
        }
      `}</style>
      <h1>Missions</h1>
      {missions.map(mission => (
        <div key={mission.id} className="mission-card">
          <div className="mission-header">
            <span className="mission-title">{mission.title}</span>
            <span className={`mission-status ${mission.status.toLowerCase().replace(' ', '-')}`}>{mission.status}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${mission.progress}%`}}></div>
          </div>
          <div className="mission-reward">Reward: {mission.reward}</div>
        </div>
      ))}
    </div>
  );
};

export default Missions;