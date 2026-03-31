import React, { useState } from 'react';

const AIAssistance = () => {
  const [messages, setMessages] = useState([
    { from: 'AI', text: 'Hello! How can I help you with your studies today?', time: 'now' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'You', text: input, time: 'now' }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { from: 'AI', text: 'That\'s a great question! Let me explain...', time: 'now' }]);
      }, 1000);
    }
  };

  return (
    <div className="ai-assistance">
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
        .ai-assistance {
          padding: 20px;
          background: var(--bg-color);
          color: var(--text-color);
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 40px);
        }
        .chat-container {
          flex: 1;
          background: var(--card-bg);
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }
        .chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }
        .message {
          margin-bottom: 15px;
          padding: 10px 15px;
          border-radius: 18px;
          max-width: 70%;
        }
        .message.ai {
          background: #e3f2fd;
          align-self: flex-start;
        }
        .message.user {
          background: #007bff;
          color: white;
          align-self: flex-end;
        }
        .chat-messages {
          display: flex;
          flex-direction: column;
        }
        .message-time {
          font-size: 12px;
          opacity: 0.7;
          margin-top: 5px;
        }
        .chat-input {
          display: flex;
          padding: 20px;
          border-top: 1px solid var(--border-color);
        }
        .chat-input input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          margin-right: 10px;
        }
        .chat-input button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
        }
        .suggestions {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .suggestions h3 {
          margin-top: 0;
        }
        .suggestion-btn {
          background: #f8f9fa;
          border: 1px solid var(--border-color);
          padding: 8px 15px;
          border-radius: 20px;
          margin: 5px;
          cursor: pointer;
        }
      `}</style>
      <h1>AI Assistance</h1>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.from === 'AI' ? 'ai' : 'user'}`}>
              <p>{msg.text}</p>
              <div className="message-time">{msg.time}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your studies..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
      <div className="suggestions">
        <h3>Quick Questions</h3>
        <button className="suggestion-btn" onClick={() => setInput('Explain photosynthesis')}>Explain photosynthesis</button>
        <button className="suggestion-btn" onClick={() => setInput('Help with algebra')}>Help with algebra</button>
        <button className="suggestion-btn" onClick={() => setInput('Study tips for exams')}>Study tips for exams</button>
      </div>
    </div>
  );
};

export default AIAssistance;