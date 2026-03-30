import React from 'react';
import classNames from 'classnames';

export const GlassCard = ({ children, className, onClick }) => {
  return (
    <div
      className={classNames('glass-card', className)}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </div>
  );
};
