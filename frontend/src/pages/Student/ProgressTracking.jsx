import React from 'react';

const ProgressTracking = () => {
  const subjects = [
    { name: 'Computer Science', color: '#007bff', progress: 75, completed: 12, total: 16 },
    { name: 'Biology', color: '#28a745', progress: 60, completed: 9, total: 15 },
    { name: 'History', color: '#fd7e14', progress: 90, completed: 18, total: 20 },
    { name: 'Mathematics', color: '#6f42c1', progress: 50, completed: 8, total: 16 },
    { name: 'Physics', color: '#dc3545', progress: 80, completed: 16, total: 20 },
  ];

  const overallProgress = Math.round(subjects.reduce((acc, sub) => acc + sub.progress, 0) / subjects.length);

  return (
    <div className="progress-tracking">
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
        .progress-tracking {
          padding: 20px;
          background: var(--bg-color);
          color: var(--text-color);
          font-family: Arial, sans-serif;
        }
        .overall-progress {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 30px;
          text-align: center;
        }
        .progress-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: conic-gradient(#007bff ${overallProgress}%, #e9ecef 0%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          position: relative;
        }
        .progress-circle::before {
          content: '${overallProgress}%';
          position: absolute;
          color: var(--text-color);
          font-weight: bold;
          font-size: 18px;
        }
        .subject-progress {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }
        .progress-bar {
          height: 12px;
          background: #e9ecef;
          border-radius: 6px;
          margin: 10px 0;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 6px;
        }
        .progress-stats {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #666;
        }
      `}</style>
      <h1>Progress Tracking</h1>
      <div className="overall-progress">
        <div className="progress-circle"></div>
        <h2>Overall Progress</h2>
        <p>{overallProgress}% Complete</p>
      </div>
      <h2>Subject Progress</h2>
      {subjects.map(subject => (
        <div key={subject.name} className="subject-progress">
          <h3>{subject.name}</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{background: subject.color, width: `${subject.progress}%`}}></div>
          </div>
          <div className="progress-stats">
            <span>{subject.completed} / {subject.total} Chapters</span>
            <span>{subject.progress}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressTracking;