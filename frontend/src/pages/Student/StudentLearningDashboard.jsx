 import React, { useState } from 'react';

const StudentLearningDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    { name: 'Computer Science', color: '#007bff', progress: 75 },
    { name: 'Biology', color: '#28a745', progress: 60 },
    { name: 'History', color: '#fd7e14', progress: 90 },
    { name: 'Mathematics', color: '#6f42c1', progress: 50 },
    { name: 'Physics', color: '#dc3545', progress: 80 },
  ];

  const chapters = {
    'Computer Science': [
      { name: 'Introduction to Programming', subtitle: 'Basics of coding', status: 'Completed' },
      { name: 'Data Structures', subtitle: 'Arrays and lists', status: 'In Progress' },
      { name: 'Algorithms', subtitle: 'Sorting and searching', status: 'Locked' },
      { name: 'Object-Oriented Programming', subtitle: 'Classes and objects', status: 'Locked' },
    ],
    'Biology': [
      { name: 'Cell Biology', subtitle: 'Structure and function', status: 'Completed' },
      { name: 'Genetics', subtitle: 'DNA and inheritance', status: 'In Progress' },
      { name: 'Ecology', subtitle: 'Ecosystems and interactions', status: 'Locked' },
      { name: 'Evolution', subtitle: 'Natural selection', status: 'Locked' },
    ],
    'History': [
      { name: 'Ancient Civilizations', subtitle: 'Early human societies', status: 'Completed' },
      { name: 'World Wars', subtitle: '20th century conflicts', status: 'Completed' },
      { name: 'Modern History', subtitle: 'Post-WWII era', status: 'In Progress' },
      { name: 'Cultural Revolutions', subtitle: 'Social changes', status: 'Locked' },
    ],
    'Mathematics': [
      { name: 'Algebra', subtitle: 'Equations and functions', status: 'Completed' },
      { name: 'Geometry', subtitle: 'Shapes and theorems', status: 'In Progress' },
      { name: 'Calculus', subtitle: 'Limits and derivatives', status: 'Locked' },
      { name: 'Statistics', subtitle: 'Data analysis', status: 'Locked' },
    ],
    'Physics': [
      { name: 'Mechanics', subtitle: 'Motion and forces', status: 'Completed' },
      { name: 'Electricity', subtitle: 'Circuits and magnetism', status: 'Completed' },
      { name: 'Thermodynamics', subtitle: 'Heat and energy', status: 'In Progress' },
      { name: 'Quantum Physics', subtitle: 'Atomic and subatomic', status: 'Locked' },
    ],
  };

  const student = {
    name: 'John Doe',
    grade: '10th',
    section: 'A',
    avatar: 'JD',
    stats: { grade: 'A', classRank: 5, averageScore: 92 },
    details: {
      studentId: '12345',
      school: 'ABC High School',
      subjects: 'CS, Bio, Hist, Math, Phys',
      streak: 15,
      missions: 8,
      email: 'john.doe@example.com',
      guardian: 'Jane Doe',
    },
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setCurrentView('chapters');
  };

  const handleAvatarClick = () => {
    setCurrentView('profile');
  };

  const handleBack = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="dashboard">
      <style>{`
        :root {
          --bg-color: #f8f9fa;
          --text-color: #333;
          --card-bg: #fff;
          --sidebar-bg: #e9ecef;
          --border-color: #dee2e6;
        }
        .dark-mode {
          --bg-color: #121212;
          --text-color: #fff;
          --card-bg: #1e1e1e;
          --sidebar-bg: #2d2d2d;
          --border-color: #444;
        }
        .dashboard {
          display: flex;
          height: 100vh;
          background: var(--bg-color);
          color: var(--text-color);
          font-family: Arial, sans-serif;
        }
        .sidebar {
          width: 250px;
          background: var(--sidebar-bg);
          padding: 20px;
          box-sizing: border-box;
        }
        .sidebar h2 {
          margin-top: 0;
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
        }
        .sidebar li {
          padding: 10px 0;
          cursor: pointer;
        }
        .main {
          flex: 1;
          padding: 20px;
          position: relative;
        }
        .topbar {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #007bff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .subject-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .subject-card {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .subject-card:hover {
          transform: translateY(-2px);
        }
        .progress-bar {
          height: 10px;
          background: #e9ecef;
          border-radius: 5px;
          margin: 10px 0;
          overflow: hidden;
        }
        .btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn:hover {
          background: #0056b3;
        }
        .chapters {
          margin-top: 60px;
        }
        .chapter {
          display: flex;
          align-items: center;
          margin: 15px 0;
          padding: 15px;
          background: var(--card-bg);
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .chapter-number {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-weight: bold;
        }
        .chapter-info {
          flex: 1;
        }
        .chapter-info h4 {
          margin: 0 0 5px 0;
        }
        .chapter-info p {
          margin: 0;
          color: #666;
        }
        .status-badge {
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        .completed { background: #28a745; color: white; }
        .in-progress { background: #ffc107; color: black; }
        .locked { background: #6c757d; color: white; }
        .profile {
          margin-top: 60px;
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
        .stats {
          display: flex;
          justify-content: space-around;
          margin: 30px 0;
        }
        .stat-card {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          flex: 1;
          margin: 0 10px;
        }
        .stat-card h4 {
          margin: 0 0 10px 0;
          color: #666;
        }
        .stat-card p {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
        .details {
          list-style: none;
          padding: 0;
          background: var(--card-bg);
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .details li {
          display: flex;
          justify-content: space-between;
          padding: 15px 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .details li:last-child {
          border-bottom: none;
        }
        .view {
          display: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .view.active {
          display: block;
          opacity: 1;
        }
        .back-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #6c757d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .back-btn:hover {
          background: #545b62;
        }
      `}</style>
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>Missions</li>
          <li>Streak</li>
          <li>Progress</li>
          <li>Mentor</li>
          <li>AI Assistance</li>
          <li>Grade Rankings</li>
        </ul>
      </div>
      <div className="main">
        <div className="topbar">
          <div className="avatar" onClick={handleAvatarClick}>{student.avatar}</div>
        </div>
        <div className={`view ${currentView === 'dashboard' ? 'active' : ''}`}>
          <h1>Subjects</h1>
          <div className="subject-cards">
            {subjects.map(subject => (
              <div key={subject.name} className="subject-card" onClick={() => handleSubjectClick(subject)}>
                <h3>{subject.name}</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{background: subject.color, width: `${subject.progress}%`}}></div>
                </div>
                <button className="btn">Continue Learning</button>
              </div>
            ))}
          </div>
        </div>
        <div className={`view ${currentView === 'chapters' ? 'active' : ''}`}>
          <button className="back-btn" onClick={handleBack}>Back</button>
          <div className="chapters">
            <h1>{selectedSubject?.name} Chapters</h1>
            {chapters[selectedSubject?.name]?.map((chapter, index) => (
              <div key={index} className="chapter">
                <div className="chapter-number" style={{background: selectedSubject.color}}>{index + 1}</div>
                <div className="chapter-info">
                  <h4>{chapter.name}</h4>
                  <p>{chapter.subtitle}</p>
                </div>
                <span className={`status-badge ${chapter.status.toLowerCase().replace(' ', '-')}`}>{chapter.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`view ${currentView === 'profile' ? 'active' : ''}`}>
          <button className="back-btn" onClick={handleBack}>Back</button>
          <div className="profile">
            <div className="profile-header">
              <div className="profile-avatar">{student.avatar}</div>
              <h2>{student.name}</h2>
              <p>{student.grade} - {student.section}</p>
            </div>
            <div className="stats">
              <div className="stat-card">
                <h4>Grade</h4>
                <p>{student.stats.grade}</p>
              </div>
              <div className="stat-card">
                <h4>Class Rank</h4>
                <p>{student.stats.classRank}</p>
              </div>
              <div className="stat-card">
                <h4>Average Score</h4>
                <p>{student.stats.averageScore}%</p>
              </div>
            </div>
            <ul className="details">
              {Object.entries(student.details).map(([key, value]) => (
                <li key={key}>
                  <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLearningDashboard;