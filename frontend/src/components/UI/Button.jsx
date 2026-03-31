import React from 'react';

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-500/20',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-800',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-500/20',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-2.5 text-sm gap-2',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center font-semibold rounded-xl cursor-pointer transition-all duration-200 outline-none
      ${variantClasses[variant] || variantClasses.primary}
      ${sizeClasses[size] || sizeClasses.md}
      ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:-translate-y-px active:translate-y-0'}
      ${className}`}
    {...rest}
  >
    {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
    {children}
    {IconRight && <IconRight size={size === 'sm' ? 14 : 16} />}
  </button>
);

export default Button;
