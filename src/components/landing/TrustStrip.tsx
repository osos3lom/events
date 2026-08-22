'use client';

import React from 'react';
import { ShieldCheck, Star, CheckCircle2, Clock, Award, FileCheck } from 'lucide-react';

interface TrustStripProps {
  locale?: string;
}

export function TrustStrip({ locale = 'en' }: TrustStripProps) {
  const isArabic = locale === 'ar';

  const trustBadges = [
    {
      icon: <FileCheck className="w-4 h-4 text-emerald-400" />,
      title: isArabic ? 'فاتورة ضريبية معتمدة' : '15% ZATCA Phase 2 Compliant',
      subtitle: isArabic ? 'هيئة الزكاة والضريبة والجمارك' : 'Tax Transparent Digital Invoice',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
      title: isArabic ? 'تصاريح حرس الحدود الفورية' : 'Saudi Coast Guard Pre-Cleared',
      subtitle: isArabic ? 'إصدار مانيفست فوري للمراسي' : 'Instant Marina Port Manifests',
    },
    {
      icon: <Star className="w-4 h-4 text-amber-400 fill-amber-400" />,
      title: isArabic ? '4.97 / 5 تقييم الضيوف' : '4.97 / 5 Verified Rating',
      subtitle: isArabic ? '+1,200 ضيف معتمد لعام 2026' : '1,200+ Verified Guests in 2026',
    },
    {
      icon: <Award className="w-4 h-4 text-[#D4AF37]" />,
      title: isArabic ? 'مدى، أبل باي و STC Pay' : 'Mada, Apple Pay & Tamara',
      subtitle: isArabic ? 'دفع آمن وتجزئة ميسرة' : 'Instant 1-Click Encrypted Checkout',
    },
  ];

  return (
    <div className="w-full bg-slate-900/95 dark:bg-[#07131E] border-y border-white/10 dark:border-cyan-500/15 py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 text-white relative z-20 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-white/10">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 ${
                idx > 0 ? 'pt-3 sm:pt-0 sm:px-4' : 'sm:pr-4'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {badge.icon}
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-white tracking-tight truncate">
                  {badge.title}
                </h5>
                <p className="text-[10px] text-slate-300 dark:text-slate-400 truncate">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
