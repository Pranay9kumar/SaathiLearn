import React from 'react';

const Mentor = () => {
  const mentor = {
    name: 'Dr. Sarah Johnson',
    subject: 'Computer Science',
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    availability: 'Mon-Fri, 2-4 PM',
  };

  const messages = [
    { from: 'Mentor', text: 'Great progress on your algorithms chapter!', time: '2 hours ago' },
    { from: 'You', text: 'Thanks! I have a question about sorting.', time: '1 hour ago' },
    { from: 'Mentor', text: 'Sure, let\'s schedule a call.', time: '30 min ago' },
  ];

  return (
    <div className="mentor">
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
        .mentor {
          padding: 20px;
          background: var(--bg-color);
          color: var(--text-color);
          font-family: Arial, sans-serif;
        }
        .mentor-info {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        .mentor-avatar {
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
        .mentor-details {
          text-align: center;
        }
        .mentor-details h2 {
          margin: 0 0 5px 0;
        }
        .mentor-details p {
          margin: 5px 0;
          color: #666;
        }
        .contact-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin: 5px;
        }
        .messages {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .message {
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 8px;
        }
        .message.mentor {
          background: #e3f2fd;
          text-align: left;
        }
        .message.student {
          background: #f3e5f5;
          text-align: right;
        }
        .message-time {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }
      `}</style>
      <h1>Mentor</h1>
      <div className="mentor-info">
        <div className="mentor-avatar">SJ</div>
        <div className="mentor-details">
          <h2>{mentor.name}</h2>
          <p>{mentor.subject} Mentor</p>
          <p>Email: {mentor.email}</p>
          <p>Phone: {mentor.phone}</p>
          <p>Available: {mentor.availability}</p>
          <button className="contact-btn">Send Message</button>
          <button className="contact-btn">Schedule Call</button>
        </div>
      </div>
      <div className="messages">
        <h3>Recent Messages</h3>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from === 'Mentor' ? 'mentor' : 'student'}`}>
            <p>{msg.text}</p>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentor;