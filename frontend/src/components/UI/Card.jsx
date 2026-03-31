import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', onClick, role, tabIndex, initial, animate, transition }) => (
  <motion.div
    className={`bg-white rounded-2xl border border-[#e0e7ff] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] hover:-translate-y-1 hover:border-[#06b6d4] px-6 py-5 h-full flex flex-col shadow-[0_4px_16px_rgba(14,165,233,0.08)] ${className}`}
    onClick={onClick}
    role={role}
    tabIndex={tabIndex}
    initial={initial ?? { opacity: 0, y: 20 }}
    animate={animate ?? { opacity: 1, y: 0 }}
    transition={transition ?? { duration: 0.4, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default Card;
