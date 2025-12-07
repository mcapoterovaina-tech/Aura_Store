import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full';
  
  const variants = {
    primary: 'bg-apple-blue text-white hover:bg-blue-600 shadow-md hover:shadow-lg focus:ring-blue-500',
    secondary: 'bg-apple-gray text-apple-blue hover:bg-gray-200 focus:ring-gray-400',
    ghost: 'bg-transparent text-apple-blue hover:bg-blue-50 focus:ring-blue-200',
    glass: 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30',
  };

  const sizes = {
    sm: 'text-xs px-4 py-1.5',
    md: 'text-sm px-6 py-2',
    lg: 'text-base px-8 py-3',
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};