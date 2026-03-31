import React from 'react';

const toneClasses = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-700',
  danger: 'bg-red-50 border-red-200 text-red-700',
  info: 'bg-blue-50 border-blue-200 text-blue-700',
  neutral: 'bg-slate-50 border-slate-200 text-slate-600',
};

const dotClasses = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-slate-400',
};

const Badge = ({ children, tone = 'neutral', dot = false, className = '' }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${toneClasses[tone] || toneClasses.neutral} ${className}`}
  >
    {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[tone] || dotClasses.neutral}`} />}
    {children}
  </span>
);

export default Badge;
