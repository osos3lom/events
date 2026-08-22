'use client';

import React from 'react';
import { Info, Lightbulb, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CalloutVariant = 'info' | 'tip' | 'warning' | 'success';

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const variantConfig = {
    info: {
      wrapper: 'bg-gradient-to-br from-primary/[0.06] via-card to-card border-primary/20',
      icon: <Info className="w-5 h-5 text-primary" />,
    },
    tip: {
      wrapper: 'bg-gradient-to-br from-amber-500/[0.08] via-card to-card border-amber-500/25',
      icon: <Lightbulb className="w-5 h-5 text-amber-600" />,
    },
    warning: {
      wrapper: 'bg-gradient-to-br from-destructive/[0.08] via-card to-card border-destructive/25',
      icon: <AlertTriangle className="w-5 h-5 text-destructive" />,
    },
    success: {
      wrapper: 'bg-gradient-to-br from-success/[0.10] via-card to-card border-success/30',
      icon: <CheckCircle className="w-5 h-5 text-success" />,
    },
  };

  const current = variantConfig[variant];

  return (
    <div
      className={cn(
        'relative flex items-start gap-3.5 p-4 rounded-[14px] border mb-4 overflow-hidden shadow-xs',
        current.wrapper,
        className
      )}
    >
      <div className="shrink-0 mt-0.5">{current.icon}</div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-bold text-foreground leading-tight tracking-tight mb-1">
            {title}
          </h4>
        )}
        <div className="text-xs text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted/80 transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
