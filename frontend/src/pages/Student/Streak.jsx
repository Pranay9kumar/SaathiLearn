import React from 'react';

const Streak = () => {
  const currentStreak = 15;
  const longestStreak = 28;
  const last7Days = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: false },
    { day: 'Fri', active: true },
    { day: 'Sat', active: true },
    { day: 'Sun', active: true },
  ];

  return (
    <div className="streak">
      <style>{`
        :root {
          --bg-color: #f8f9fa;
          --text-color: #333;
          --card-bg: #fff;
          --border-color: #dee2e6;
          --streak-color: #ffc107;
        }
        .dark-mode {
          --bg-color: #121212;
          --text-color: #fff;
          --card-bg: #1e1e1e;
          --border-color: #444;
        }
        .streak {
          padding: 20px;
          background: var(--bg-color);
          color: var(--text-color);
          font-family: Arial, sans-serif;
        }
        .streak-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
        }
        .streak-card {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
          flex: 1;
          margin: 0 10px;
        }
        .streak-number {
          font-size: 48px;
          font-weight: bold;
          color: var(--streak-color);
          margin-bottom: 10px;
        }
        .calendar {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .calendar h3 {
          margin-top: 0;
        }
        .days {
          display: flex;
          justify-content: space-around;
        }
        .day {
          text-align: center;
        }
        .day-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 5px auto;
          font-weight: bold;
        }
        .day.active {
          background: var(--streak-color);
          color: black;
        }
        .day.inactive {
          background: #e9ecef;
          color: #666;
        }
      `}</style>
      <h1>Learning Streak</h1>
      <div className="streak-stats">
        <div className="streak-card">
          <div className="streak-number">{currentStreak}</div>
          <h4>Current Streak</h4>
          <p>days</p>
        </div>
        <div className="streak-card">
          <div className="streak-number">{longestStreak}</div>
          <h4>Longest Streak</h4>
          <p>days</p>
        </div>
      </div>
      <div className="calendar">
        <h3>Last 7 Days</h3>
        <div className="days">
          {last7Days.map((day, index) => (
            <div key={index} className="day">
              <div className={`day-circle ${day.active ? 'active' : 'inactive'}`}>{day.day[0]}</div>
              <span>{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Streak;