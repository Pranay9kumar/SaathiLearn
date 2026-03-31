import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

export const GlassCard = ({ children, className, onClick, delay = 0 }) => {
  return (
    <motion.div
      className={classNames(
        'glass-card h-full flex flex-col',
        'bg-white rounded-2xl border border-[#e0e7ff]',
        'shadow-[0_4px_16px_rgba(14,165,233,0.08)]',
        'transition-all duration-300',
        'hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] hover:-translate-y-1 hover:border-cyan-400',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
};
