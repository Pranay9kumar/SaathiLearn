import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MiniSpark = ({ series, isUp }) => {
  const safe = Array.isArray(series) && series.length >= 2 ? series : [2, 4, 3, 6, 5, 7];
  const min = Math.min(...safe);
  const max = Math.max(...safe);
  const range = Math.max(1, max - min);
  const pts = safe.map((v, i) => {
    const x = (i / (safe.length - 1)) * 100;
    const y = 30 - ((v - min) / range) * 22;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const stroke = isUp ? '#06b6d4' : '#f43f5e';
  return (
    <div className="w-full h-10 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-[#e0e7ff] flex items-center px-2">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
        <polyline points={pts.join(' ')} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <polyline
          points={`${pts.join(' ')} 100,30 0,30`}
          fill={stroke}
          fillOpacity="0.12"
          stroke="none"
        />
      </svg>
    </div>
  );
};

const StatsCard = ({ title, value, trend, series, onClick, delay = 0 }) => {
  const numericTrend = typeof trend === 'number' ? trend : null;
  const isUp = numericTrend === null ? true : numericTrend >= 0;
  const trendText = numericTrend === null ? trend : `${Math.abs(numericTrend)}%`;

  return (
    <motion.div
      className="bg-white rounded-2xl border border-[#e0e7ff] p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] hover:-translate-y-1 hover:border-cyan-400 h-full shadow-[0_4px_16px_rgba(14,165,233,0.08)]"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">
            {title}
          </div>
          <div className="text-3xl font-bold text-slate-900 leading-none mt-3 font-['Plus_Jakarta_Sans',sans-serif]">
            {value}
          </div>
        </div>
        {trend !== undefined && trend !== null && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg ${
              isUp 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'bg-red-50 text-red-700'
            }`}
          >
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{trendText}</span>
          </motion.div>
        )}
      </div>
      <MiniSpark series={series} isUp={isUp} />
    </motion.div>
  );
};

export default StatsCard;
