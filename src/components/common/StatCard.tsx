'use client';

import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
}) => {
  return (
    <div className="bg-card rounded-[12px] border border-border p-5 shadow-xs transition hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-foreground mt-1 tracking-tight">
            {value}
          </h3>
        </div>
        <div className="p-3 bg-primary/5 text-primary rounded-[10px] border border-primary/10">
          {icon}
        </div>
      </div>
      {(subtitle || trend) && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          {trend && (
            <span
              className={`font-semibold ${
                trend.isPositive ? 'text-success' : 'text-destructive'
              }`}
            >
              {trend.value}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
