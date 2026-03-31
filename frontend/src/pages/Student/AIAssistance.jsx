import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, Lightbulb, BookOpen, Calculator } from 'lucide-react';

const quickQuestions = [
  { label: 'Explain photosynthesis', icon: BookOpen },
  { label: 'Solve quadratic equations', icon: Calculator },
  { label: 'Study tips for exams', icon: Lightbulb },
  { label: 'What is Newton\'s 3rd law?', icon: Sparkles },
];

const aiResponses = {
  'explain photosynthesis': 'Photosynthesis is the process by which green plants convert sunlight, water, and CO₂ into glucose and oxygen. The equation is: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂. It happens in two stages: Light reactions (in thylakoids) and Calvin cycle (in stroma).',
  'solve quadratic equations': 'A quadratic equation ax² + bx + c = 0 can be solved using:\n1. **Factoring**: Find two numbers that multiply to ac and add to b\n2. **Quadratic Formula**: x = (-b ± √(b²-4ac)) / 2a\n3. **Completing the square**: Rewrite as a(x-h)² + k = 0',
  'study tips for exams': '1. **Spaced Repetition**: Review material at increasing intervals\n2. **Active Recall**: Test yourself instead of just re-reading\n3. **Pomodoro Technique**: Study 25 min, break 5 min\n4. **Teach Someone**: Explaining concepts deepens understanding\n5. **Sleep Well**: Memory consolidation happens during sleep!',
  "what is newton's 3rd law?": "Newton's Third Law states: For every action, there is an equal and opposite reaction. Examples:\n• When you push against a wall, the wall pushes back on you\n• A rocket expels gas downward, and the gas pushes the rocket upward\n• When walking, your foot pushes the ground backward, and the ground pushes you forward",
};

const AIAssistance = () => {
  const [messages, setMessages] = useState([
    { from: 'AI', text: "Hi! I'm your AI study assistant. Ask me anything about your subjects — I'll help you understand concepts, solve problems, and prepare for exams. 🚀" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: 'You', text }]);
    setInput('');
    setIsTyping(true);

    const key = text.toLowerCase().trim();
    const response = aiResponses[key] || `That's a great question! Let me explain: "${text}" is an interesting topic. Based on your curriculum, I'd recommend reviewing Chapter 5 of your textbook and practicing the related exercises. Would you like me to break this down step by step?`;

    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'AI', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemV = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10 h-full">
      <motion.header variants={itemV}>
        <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Support</div>
        <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">AI Study Assistant</h1>
        <p className="text-sm text-slate-500 mt-1">Get instant help with concepts, problem-solving, and exam prep.</p>
      </motion.header>

      <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] flex flex-col" style={{ minHeight: 520 }}>
        {/* Chat messages */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'You' ? 'justify-end' : 'justify-start'} gap-3`}>
              {msg.from === 'AI' && (
                <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={18} className="text-purple-500" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.from === 'You'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-bl-md'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 mt-1">
                <Bot size={18} className="text-purple-500" />
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="px-6 py-3 border-t border-slate-100 flex gap-2 overflow-x-auto hide-scrollbar">
          {quickQuestions.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q.label)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all whitespace-nowrap shrink-0">
              <q.icon size={14} /> {q.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask me anything about your studies..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className={`p-3 rounded-xl transition-all ${input.trim() ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIAssistance;