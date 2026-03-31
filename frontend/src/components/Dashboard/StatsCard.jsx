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
  const stroke = isUp ? '#10b981' : '#ef4444';
  return (
    <div className="w-full h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center px-2">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
        <polyline points={pts.join(' ')} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <polyline
          points={`${pts.join(' ')} 100,30 0,30`}
          fill={stroke}
          fillOpacity="0.08"
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
      className="bg-white rounded-2xl border border-[#e5e7eb] p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:border-slate-300"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">{title}</div>
          <div className="text-3xl font-bold text-slate-900 leading-none mt-2 font-[Syne,sans-serif]">{value}</div>
        </div>
        {trend !== undefined && trend !== null && (
          <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            <span>{trendText}</span>
          </div>
        )}
      </div>
      <MiniSpark series={series} isUp={isUp} />
    </motion.div>
  );
};

export default StatsCard;
