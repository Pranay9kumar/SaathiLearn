import React from 'react';

const GradeRanking = () => {
  const rankings = [
    { rank: 1, name: 'Alice Johnson', grade: 'A+', score: 98 },
    { rank: 2, name: 'Bob Smith', grade: 'A', score: 95 },
    { rank: 3, name: 'John Doe', grade: 'A-', score: 92 },
    { rank: 4, name: 'Emma Wilson', grade: 'B+', score: 88 },
    { rank: 5, name: 'Michael Brown', grade: 'B', score: 85 },
    { rank: 6, name: 'Sophia Davis', grade: 'B-', score: 82 },
    { rank: 7, name: 'James Miller', grade: 'C+', score: 78 },
    { rank: 8, name: 'Olivia Garcia', grade: 'C', score: 75 },
  ];

  const currentUserRank = rankings.find(r => r.name === 'John Doe').rank;

  return (
    <div className="grade-ranking">
      <style>{`
        :root {
          --bg-color: #f8f9fa;
          --text-color: #333;
          --card-bg: #fff;
          --border-color: #dee2e6;
          --highlight-color: #fff3cd;
        }
        .dark-mode {
          --bg-color: #121212;
          --text-color: #fff;
          --card-bg: #1e1e1e;
          --border-color: #444;
          --highlight-color: #333;
        }
        .grade-ranking {
          padding: 20px;
          background: var(--bg-color);
          color: var(--text-color);
          font-family: Arial, sans-serif;
        }
        .ranking-header {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 30px;
          text-align: center;
        }
        .ranking-list {
          background: var(--card-bg);
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .ranking-item {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .ranking-item:last-child {
          border-bottom: none;
        }
        .ranking-item.current-user {
          background: var(--highlight-color);
        }
        .rank {
          width: 50px;
          font-weight: bold;
          font-size: 18px;
          text-align: center;
        }
        .rank-1 { color: #ffd700; }
        .rank-2 { color: #c0c0c0; }
        .rank-3 { color: #cd7f32; }
        .student-info {
          flex: 1;
        }
        .student-name {
          font-weight: bold;
          margin: 0;
        }
        .student-grade {
          color: #666;
          margin: 5px 0 0 0;
        }
        .score {
          font-weight: bold;
          font-size: 18px;
          text-align: center;
          width: 60px;
        }
        .medal {
          font-size: 24px;
          margin-left: 10px;
        }
      `}</style>
      <h1>Grade Rankings</h1>
      <div className="ranking-header">
        <h2>Class Rankings</h2>
        <p>Your current rank: #{currentUserRank}</p>
      </div>
      <div className="ranking-list">
        {rankings.map((student) => (
          <div key={student.rank} className={`ranking-item ${student.name === 'John Doe' ? 'current-user' : ''}`}>
            <div className={`rank rank-${student.rank <= 3 ? student.rank : ''}`}>
              {student.rank}
              {student.rank <= 3 && <span className="medal">
                {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : '🥉'}
              </span>}
            </div>
            <div className="student-info">
              <p className="student-name">{student.name}</p>
              <p className="student-grade">Grade: {student.grade}</p>
            </div>
            <div className="score">{student.score}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeRanking;