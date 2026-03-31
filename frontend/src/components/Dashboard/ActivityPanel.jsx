import React from 'react';
import { motion } from 'framer-motion';

const toneMap = (tone) => {
  switch (tone) {
    case 'success': return { dot: 'bg-emerald-500', sub: 'text-emerald-600', bg: 'hover:bg-emerald-50' };
    case 'warning': return { dot: 'bg-amber-500', sub: 'text-amber-600', bg: 'hover:bg-amber-50' };
    case 'danger':  return { dot: 'bg-red-500',    sub: 'text-red-600', bg: 'hover:bg-red-50' };
    default:        return { dot: 'bg-blue-500',   sub: 'text-blue-600', bg: 'hover:bg-blue-50' };
  }
};

const ActivityPanel = ({ title = 'Activity', items = [], delay = 0 }) => (
  <motion.div
    className="bg-white rounded-2xl border border-[#e0e7ff] overflow-hidden h-full flex flex-col shadow-[0_4px_16px_rgba(14,165,233,0.08)] hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut', delay }}
  >
    <div className="px-6 py-5 border-b border-[#e0e7ff] bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="text-base font-bold text-slate-900">{title}</div>
      <div className="text-sm text-slate-600 mt-1 font-medium">Recent updates</div>
    </div>
    <div className="p-4 flex-1 flex flex-col overflow-y-auto">
      {items.length === 0 ? (
        <div className="px-4 py-8 text-sm text-slate-500 flex items-center justify-center flex-1 font-medium">
          ✨ No activity yet
        </div>
      ) : (
        <div className="flex flex-col gap-2 flex-1">
          {items.map((it, idx) => {
            const t = toneMap(it.tone);
            return (
              <motion.div
                key={it.id ?? `${it.text}-${it.time}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl transition-all cursor-pointer min-h-16 border border-transparent hover:border-blue-100 ${t.bg}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-3 h-3 rounded-full shrink-0 ${t.dot} shadow-md`}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
                      {it.text}
                    </div>
                    <div className={`text-xs mt-1 font-medium ${t.sub}`}>
                      {it.subText}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 whitespace-nowrap shrink-0 font-semibold">
                  {it.time}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  </motion.div>
);

export default ActivityPanel;
