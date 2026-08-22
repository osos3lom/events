'use client';

import React from 'react';
import { Waves, Thermometer, Wind, SunDim } from 'lucide-react';

interface WeatherWidgetProps {
  locale?: string;
  className?: string;
}

export function WeatherMaritimeWidget({ locale = 'en', className = '' }: WeatherWidgetProps) {
  const isArabic = locale === 'ar';

  return (
    <div
      className={`w-full sm:w-auto inline-flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white/90 dark:bg-[#071E26]/85 border border-slate-200/80 dark:border-[#D4AF37]/30 backdrop-blur-md text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 shadow-lg transition-all ${className}`}
    >
      {/* Live Indicator */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-bold text-slate-900 dark:text-white tracking-wide">
          {isArabic ? 'حالة بحر جدة الحي' : 'Jeddah Red Sea Live'}
        </span>
      </div>

      {/* Stats List */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1 text-slate-600 dark:text-slate-300 font-medium">
        <div className="flex items-center gap-1">
          <Waves className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span>{isArabic ? 'هادئ (0.4م)' : 'Calm (0.4m)'}</span>
        </div>
        <div className="flex items-center gap-1">
          <Thermometer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>{isArabic ? 'ماء 29°م' : 'Water 29°C'}</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind className="w-3.5 h-3.5 text-teal-600 dark:text-teal-300 shrink-0" />
          <span>{isArabic ? '7 عقد شمال غرب' : '7 kts NW'}</span>
        </div>
        <div className="hidden xs:flex items-center gap-1">
          <SunDim className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
          <span>{isArabic ? 'غروب 06:18م' : 'Sunset 6:18 PM'}</span>
        </div>
      </div>
    </div>
  );
}
