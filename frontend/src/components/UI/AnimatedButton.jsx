import React from 'react';
import classNames from 'classnames';

export const AnimatedButton = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className,
  icon: Icon
}) => {
  const baseClass = 'btn';
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger'
  }[variant] || 'btn-primary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(baseClass, variantClass, { 'btn-disabled': disabled }, className)}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};
