import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', onClick, role, tabIndex, initial, animate, transition }) => (
  <motion.div
    className={`bg-white rounded-2xl border border-[#e5e7eb] transition-all duration-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:border-slate-300 p-5 ${className}`}
    onClick={onClick}
    role={role}
    tabIndex={tabIndex}
    initial={initial ?? { opacity: 0, y: 16 }}
    animate={animate ?? { opacity: 1, y: 0 }}
    transition={transition ?? { duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default Card;
