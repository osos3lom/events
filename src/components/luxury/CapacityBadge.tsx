'use client';

import React from 'react';
import { AlertCircle, Flame, Check } from 'lucide-react';
import { LocalizedString } from '../../types/booking';

interface CapacityBadgeProps {
  remaining: number;
  total?: number;
  locale?: string;
  className?: string;
}

export function CapacityBadge({ remaining, total, locale = 'en', className = '' }: CapacityBadgeProps) {
  const isArabic = locale === 'ar';
  
  if (remaining <= 0) {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 ${className}`}>
        <AlertCircle className="w-3 h-3" />
        {isArabic ? 'مكتمل العدد' : 'Sold Out'}
      </span>
    );
  }

  if (remaining <= 5) {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 animate-pulse ${className}`}>
        <Flame className="w-3 h-3 text-amber-500" />
        {isArabic ? `متبقي ${remaining} مقاعد فقط!` : `Only ${remaining} Left!`}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 ${className}`}>
      <Check className="w-3 h-3" />
      {isArabic ? `متاح (${remaining} متوفر)` : `Available (${remaining} left)`}
    </span>
  );
}
