import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Clock, MessageSquare, Send, Video } from 'lucide-react';

const Mentor = () => {
  const mentor = {
    name: 'Dr. Sarah Johnson',
    subject: 'Mathematics & Science',
    email: 'sarah.johnson@saathi.in',
    phone: '+91 98765 43210',
    availability: 'Mon-Fri, 2:00–4:00 PM',
    responseTime: '~15 min avg',
    studentsHelped: 124,
    rating: 4.9,
  };

  const messages = [
    { from: 'Mentor', text: 'Great progress on your quadratic equations chapter! You scored 92%.', time: '2 hours ago' },
    { from: 'You', text: 'Thanks! I still have a doubt about the discriminant method though.', time: '1 hour ago' },
    { from: 'Mentor', text: "Sure! Let's go over it. The discriminant b²-4ac tells you the nature of roots. I'll send a detailed explanation.", time: '45 min ago' },
    { from: 'Mentor', text: 'Check the resource I shared. Let me know if you want to schedule a call.', time: '30 min ago' },
  ];

  const [newMsg, setNewMsg] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSend = () => {
    if (!newMsg.trim()) return;
    setChatMessages(prev => [...prev, { from: 'You', text: newMsg, time: 'Just now' }]);
    setNewMsg('');
  };

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemV = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10">
      <motion.header variants={itemV}>
        <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Support</div>
        <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">My Mentor</h1>
        <p className="text-sm text-slate-500 mt-1">Connect with your assigned mentor for guidance and doubt resolution.</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mentor Profile Card */}
        <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] p-6 lg:col-span-1">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-600 font-black text-2xl mx-auto mb-4">
              SJ
            </div>
            <h3 className="text-lg font-bold text-slate-900">{mentor.name}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{mentor.subject}</p>
            <div className="flex justify-center gap-2 mt-3">
              <span className="bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-600">⭐ {mentor.rating}</span>
              <span className="bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-600">● Online</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {[
              { icon: Mail, label: mentor.email },
              { icon: Phone, label: mentor.phone },
              { icon: Clock, label: mentor.availability },
              { icon: MessageSquare, label: mentor.responseTime },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <item.icon size={16} className="text-slate-400 shrink-0" />
                <span className="text-sm text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <div className="text-xl font-black text-blue-700">{mentor.studentsHelped}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">Students Helped</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
              <div className="text-xl font-black text-purple-700">{mentor.rating}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">Rating</div>
            </div>
          </div>

          <button className="w-full btn btn-primary gap-2 justify-center py-3 rounded-xl">
            <Video size={16} /> Schedule Call
          </button>
        </motion.div>

        {/* Chat Section */}
        <motion.div variants={itemV} className="bg-white rounded-2xl border border-[var(--border)] lg:col-span-2 flex flex-col" style={{ minHeight: 500 }}>
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Messages</h3>
            <p className="text-xs text-slate-400 mt-0.5">Chat with your mentor</p>
          </div>

          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.from === 'You'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-800 rounded-bl-md'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1.5 ${msg.from === 'You' ? 'text-blue-200' : 'text-slate-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask your mentor..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!newMsg.trim()}
                className={`p-3 rounded-xl transition-all ${newMsg.trim() ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Mentor;