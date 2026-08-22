'use client';

import React from 'react';
import { ShieldCheck, HeartHandshake, Crown, Users } from 'lucide-react';
import { PrivacyFilterType } from '../../types/booking';

interface PrivacyTagProps {
  type?: PrivacyFilterType;
  locale?: string;
  className?: string;
}

export function PrivacyTag({ type, locale = 'en', className = '' }: PrivacyTagProps) {
  const isArabic = locale === 'ar';

  if (!type || type === 'all') {
    return null;
  }

  if (type === 'ladies_only') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/40 backdrop-blur-md ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-rose-300" />
        {isArabic ? 'خصوصية سيدات 100%' : 'Ladies-Only Sanctuary'}
      </span>
    );
  }

  if (type === 'vip_exclusive') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-[#D4AF37]/50 backdrop-blur-md ${className}`}>
        <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
        {isArabic ? 'حصر VIP ونخبة' : 'VIP Ultra-Exclusive'}
      </span>
    );
  }

  if (type === 'family') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/40 backdrop-blur-md ${className}`}>
        <Users className="w-3.5 h-3.5 text-teal-300" />
        {isArabic ? 'جلسات عائلية خاصة' : 'Family Exclusive'}
      </span>
    );
  }

  return null;
}
