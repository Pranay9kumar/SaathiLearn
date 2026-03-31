import React, { useState, Suspense } from 'react';

// Lazy load components for code splitting
const ProgressTracking = React.lazy(() => import('./ProgressTracking'));
const Streak = React.lazy(() => import('./Streak'));
const Mentor = React.lazy(() => import('./Mentor'));
const AIAssistance = React.lazy(() => import('./AIAssistance'));
const GradeRanking = React.lazy(() => import('./GradeRanking'));
const Missions = React.lazy(() => import('./Missions'));
const Profile = React.lazy(() => import('./Profile'));

const StudentLearningDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeSidebar, setActiveSidebar] = useState(null);

  const subjects = [
    { 
      name: 'maths', 
      color: '#6f42c1', 
      progress: 50,
      textbooks: [] // Will be populated with textbook datasets
    },
    { 
      name: 'science', 
      color: '#28a745', 
      progress: 60,
      textbooks: [] // Will be populated with textbook datasets
    },
    { 
      name: 'english', 
      color: '#fd7e14', 
      progress: 90,
      textbooks: [] // Will be populated with textbook datasets
    },
    { 
      name: 'social', 
      color: '#dc3545', 
      progress: 80,
      textbooks: [] // Will be populated with textbook datasets
    },
    { 
      name: 'hindi', 
      color: '#007bff', 
      progress: 75,
      textbooks: [] // Will be populated with textbook datasets
    },
  ];

  const chapters = {
    'maths': [
      { name: 'Algebra', subtitle: 'Equations and functions', status: 'Completed' },
      { name: 'Geometry', subtitle: 'Shapes and theorems', status: 'In Progress' },
      { name: 'Calculus', subtitle: 'Limits and derivatives', status: 'Locked' },
      { name: 'Statistics', subtitle: 'Data analysis', status: 'Locked' },
    ],
    'science': [
      { name: 'Physics', subtitle: 'Motion and forces', status: 'Completed' },
      { name: 'Chemistry', subtitle: 'Matter and reactions', status: 'Completed' },
      { name: 'Biology', subtitle: 'Life and organisms', status: 'In Progress' },
      { name: 'Earth Science', subtitle: 'Planet and environment', status: 'Locked' },
    ],
    'english': [
      { name: 'Grammar', subtitle: 'Parts of speech', status: 'Completed' },
      { name: 'Literature', subtitle: 'Poems and stories', status: 'Completed' },
      { name: 'Writing', subtitle: 'Essays and letters', status: 'In Progress' },
      { name: 'Comprehension', subtitle: 'Reading skills', status: 'Locked' },
    ],
    'social': [
      { name: 'History', subtitle: 'Ancient civilizations', status: 'Completed' },
      { name: 'Geography', subtitle: 'Maps and continents', status: 'In Progress' },
      { name: 'Civics', subtitle: 'Government and society', status: 'Locked' },
      { name: 'Economics', subtitle: 'Money and trade', status: 'Locked' },
    ],
    'hindi': [
      { name: 'Grammar', subtitle: 'व्याकरण', status: 'Completed' },
      { name: 'Literature', subtitle: 'साहित्य', status: 'In Progress' },
      { name: 'Writing', subtitle: 'लेखन', status: 'Locked' },
      { name: 'Comprehension', subtitle: 'पठन कौशल', status: 'Locked' },
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

  const handleSidebarClick = (item) => {
    setActiveSidebar(item);
    setCurrentView('sidebar');
  };

  const handleBack = () => {
    setCurrentView('dashboard');
    setActiveSidebar(null);
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    // Here you can add actual logout logic, like clearing tokens, redirecting, etc.
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
        .sidebar li.active {
          background: var(--sidebar-bg);
          border-left: 4px solid #007bff;
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
          <li className={activeSidebar === 'Missions' ? 'active' : ''} onClick={() => handleSidebarClick('Missions')}>Missions</li>
          <li className={activeSidebar === 'Streak' ? 'active' : ''} onClick={() => handleSidebarClick('Streak')}>Streak</li>
          <li className={activeSidebar === 'Progress' ? 'active' : ''} onClick={() => handleSidebarClick('Progress')}>Progress</li>
          <li className={activeSidebar === 'Mentor' ? 'active' : ''} onClick={() => handleSidebarClick('Mentor')}>Mentor</li>
          <li className={activeSidebar === 'AI Assistance' ? 'active' : ''} onClick={() => handleSidebarClick('AI Assistance')}>AI Assistance</li>
          <li className={activeSidebar === 'Grade Rankings' ? 'active' : ''} onClick={() => handleSidebarClick('Grade Rankings')}>Grade Rankings</li>
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
        <div className={`view ${currentView === 'sidebar' ? 'active' : ''}`}>
          <button className="back-btn" onClick={handleBack}>Back</button>
          <Suspense fallback={<div>Loading...</div>}>
            {activeSidebar === 'Missions' && <Missions />}
            {activeSidebar === 'Progress' && <ProgressTracking />}
            {activeSidebar === 'Streak' && <Streak />}
            {activeSidebar === 'Mentor' && <Mentor />}
            {activeSidebar === 'AI Assistance' && <AIAssistance />}
            {activeSidebar === 'Grade Rankings' && <GradeRanking />}
          </Suspense>
        </div>
        <div className={`view ${currentView === 'profile' ? 'active' : ''}`}>
          <button className="back-btn" onClick={handleBack}>Back</button>
          <Suspense fallback={<div>Loading...</div>}>
            <Profile student={student} onLogout={handleLogout} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default StudentLearningDashboard;