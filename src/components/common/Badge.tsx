'use client';

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'purple' | 'blue' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30',
    purple: 'bg-accent/10 text-accent font-semibold border-accent/20 dark:bg-accent/20 dark:text-accent dark:border-accent/30',
    blue: 'bg-sky-500/10 text-sky-700 border-sky-500/20 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/30',
    success: 'bg-success-soft text-success border-success/20 dark:bg-success-soft dark:text-success dark:border-success/30',
    warning: 'bg-warning-soft text-warning border-warning/20 dark:bg-warning-soft dark:text-warning dark:border-warning/30',
    danger: 'bg-destructive-soft text-destructive border-destructive/20 dark:bg-destructive-soft dark:text-destructive dark:border-destructive/30',
    gray: 'bg-muted text-muted-foreground border-border dark:bg-muted dark:text-muted-foreground dark:border-border'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-0.5 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
