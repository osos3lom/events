'use client';

import React from 'react';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  period?: 'per_pass' | 'per_guest' | 'per_charter' | 'monthly' | 'annual';
  locale?: string;
  showVatNote?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function PriceDisplay({
  amount,
  currency = 'SAR',
  period,
  locale = 'en',
  showVatNote = true,
  size = 'md',
  className = '',
}: PriceDisplayProps) {
  const isArabic = locale === 'ar';
  const formattedAmount = amount.toLocaleString(isArabic ? 'ar-SA' : 'en-US');

  const periodLabels: Record<string, { en: string; ar: string }> = {
    per_pass: { en: '/ pass', ar: '/ للتصريح' },
    per_guest: { en: '/ guest', ar: '/ للضيف' },
    per_charter: { en: '/ charter', ar: '/ للرحلة' },
    monthly: { en: '/ month', ar: '/ شهرياً' },
    annual: { en: '/ year', ar: '/ سنوياً' },
  };

  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-black',
    xl: 'text-3xl lg:text-4xl font-black tracking-tight',
  };

  const iconSizes: Record<string, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> = {
    sm: 'xs',
    md: 'sm',
    lg: 'md',
    xl: 'lg',
  };

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div className="inline-flex items-center gap-1.5 text-slate-900 dark:text-white">
        <span className={`text-[#b8860b] dark:text-[#D4AF37] ${sizeClasses[size]}`}>{formattedAmount}</span>
        <SaudiRiyalSymbol size={iconSizes[size]} className="text-[#b8860b] dark:text-[#D4AF37]" />
        {period && periodLabels[period] && (
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-0.5">
            {isArabic ? periodLabels[period].ar : periodLabels[period].en}
          </span>
        )}
      </div>
      {showVatNote && (
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
          {isArabic ? '+ 15% ضريبة القيمة المضافة (ZATCA)' : 'excl. 15% Saudi VAT'}
        </span>
      )}
    </div>
  );
}
