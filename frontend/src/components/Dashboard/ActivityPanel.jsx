import React from 'react';
import { motion } from 'framer-motion';

const toneMap = (tone) => {
  switch (tone) {
    case 'success': return { dot: 'bg-emerald-500', sub: 'text-emerald-600' };
    case 'warning': return { dot: 'bg-amber-500', sub: 'text-amber-600' };
    case 'danger':  return { dot: 'bg-red-500',    sub: 'text-red-600' };
    default:        return { dot: 'bg-blue-500',   sub: 'text-blue-600' };
  }
};

const ActivityPanel = ({ title = 'Activity', items = [] }) => (
  <motion.div
    className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut', delay: 0.15 }}
  >
    <div className="px-5 py-4 border-b border-slate-100">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-xs text-slate-400 mt-0.5">Recent updates</div>
    </div>
    <div className="p-3">
      {items.length === 0 ? (
        <div className="px-4 py-5 text-sm text-slate-400">No activity yet.</div>
      ) : (
        <div className="flex flex-col gap-1">
          {items.map((it) => {
            const t = toneMap(it.tone);
            return (
              <div
                key={it.id ?? `${it.text}-${it.time}`}
                className="flex items-start justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${t.dot}`} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-800 truncate max-w-[200px]">{it.text}</div>
                    <div className={`text-xs mt-0.5 ${t.sub}`}>{it.subText}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 whitespace-nowrap shrink-0">{it.time}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </motion.div>
);

export default ActivityPanel;
