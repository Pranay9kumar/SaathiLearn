import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message, isUser, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`flex gap-3 items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white'
            : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
        }`}
      >
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </motion.div>

      {/* Message Bubble */}
      <div
        className={`max-w-xs lg:max-w-md flex flex-col gap-1 ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className={`px-5 py-3 rounded-2xl shadow-md border ${
            isUser
              ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-br-none border-indigo-500'
              : 'bg-white text-slate-900 rounded-bl-none border-[#e0e7ff] shadow-[0_4px_12px_rgba(14,165,233,0.1)]'
          }`}
        >
          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap font-medium">
            {message.text}
          </p>
        </motion.div>
        <span className={`text-xs font-medium ${isUser ? 'text-indigo-600 mr-2' : 'text-slate-500 ml-2'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
