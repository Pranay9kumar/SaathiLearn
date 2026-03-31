import React from 'react';

const colorMap = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  purple: 'bg-purple-500',
};

const ProgressBar = ({
  value = 0,
  max = 100,
  color = 'blue',
  height = 'h-1.5',
  showLabel = false,
  className = '',
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const barColor = colorMap[color] || color;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`flex-1 ${height} bg-slate-100 rounded-full overflow-hidden`}>
        <div
          className={`${height} rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-slate-700 w-9 text-right shrink-0">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
