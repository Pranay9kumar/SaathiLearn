import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Check, X, Clock, HelpCircle, Send, MoreHorizontal, AlertCircle } from 'lucide-react';
import { mentorAPI } from '../../api/mentor';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    mentorAPI.getRequests().then(data => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  const handleResolve = (id, e) => {
    if (e) e.stopPropagation();
    setRequests(prev => prev.filter(r => r.id !== id));
    setActiveReplyId(null);
    setReplyText('');
    // Toast notification can be added here
  };

  const handleSendReply = (id) => {
    if (!replyText.trim()) return;
    handleResolve(id);
  };

  if (loading) return <div className="flex-center h-[calc(100vh-100px)]"><div className="spinner"></div></div>;

  return (
    <div className="space-y-8 pb-10 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 pb-2">Doubts Inbox</h1>
          <p className="text-slate-500 text-sm">Respond to student queries in real-time to keep them unblocked</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 text-purple-600 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
          <HelpCircle size={22} className="text-purple-500" />
          <div className="flex flex-col">
             <span className="text-2xl font-black leading-none">{requests.length}</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Active Doubts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {requests.map((req, i) => (
            <motion.div 
              key={req.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveReplyId(activeReplyId === req.id ? null : req.id)}
              className={`glass-card cursor-pointer transition-all duration-300 bg-white border ${activeReplyId === req.id ? 'border-purple-300 shadow-md ring-2 ring-purple-100' : 'border-slate-200 hover:border-purple-200 hover:shadow-sm'}`}
            >
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 relative z-10">
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                      {req.studentName.charAt(0)}
                    </div>
                    {req.priority === 'high' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                        <AlertCircle size={10} />
                      </div>
                    )}
                  </div>
                  <div className="pr-4">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-slate-800 font-bold text-lg">{req.studentName}</h3>
                      <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-xs font-semibold text-slate-600">
                        {req.subject}
                      </span>
                      <span className="bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md text-xs font-semibold text-purple-600">
                        {req.topic}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Clock size={12}/> 
                      <span className={req.priority === 'high' ? 'text-red-500 font-bold' : ''}>{req.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-2 shrink-0">
                  <button 
                    onClick={(e) => handleResolve(req.id, e)}
                    className="p-2 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all border border-transparent hover:border-emerald-100"
                    title="Mark as Resolved"
                  >
                    <Check size={18} />
                  </button>
                  <button className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition-all border border-transparent hover:border-slate-200 group" title="More Options">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-2 relative z-10">
                <p className="text-slate-700 leading-relaxed text-[15px]">"{req.question}"</p>
              </div>

              <AnimatePresence>
                {activeReplyId === req.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-blue-100 shrink-0 flex items-center justify-center text-blue-600 font-bold text-sm shadow-sm border-2 border-white">
                        M
                      </div>
                      <div className="flex-1 relative group/input">
                        <textarea
                          autoFocus
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your explanation here... Use simple analogies where possible."
                          className="w-full bg-white border border-slate-200 focus:border-purple-400 rounded-xl pl-4 pr-14 py-3 text-sm text-slate-800 resize-none shadow-inner focus:ring-4 focus:ring-purple-500/10 outline-none min-h-[100px] transition-all"
                        />
                        <button 
                          onClick={() => handleSendReply(req.id)}
                          disabled={!replyText.trim()}
                          className={`absolute bottom-3 right-3 p-2 rounded-lg flex items-center justify-center transition-all ${
                            replyText.trim() 
                              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm' 
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <Send size={16} className={replyText.trim() ? "translate-x-0.5" : ""} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          
          {requests.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-16 flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full bg-white border border-slate-200"
            >
              <div className="relative mb-6">
                
                <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center relative z-10 shadow-sm">
                  <Check size={40} className="text-emerald-500" />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-3">Zero Inbox!</h3>
              <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                You've answered all student doubts. Great job keeping everyone unblocked and learning!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Requests;
