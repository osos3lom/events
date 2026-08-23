'use client';

import React from 'react';
import { ServiceCategory } from '../../types/booking';

export interface CatalogFilters {
  category: ServiceCategory | 'all';
}

export const EMPTY_FILTERS: CatalogFilters = { category: 'all' };

export const hasActiveFilters = (f: CatalogFilters) => f.category !== 'all';

const CATEGORIES: {
  id: ServiceCategory | 'all';
  en: string;
  ar: string;
}[] = [
  { id: 'all', en: 'All', ar: 'الكل' },
  { id: 'events', en: 'Events', ar: 'فعاليات' },
  { id: 'voyages', en: 'Voyages', ar: 'رحلات' },
  { id: 'real-estate', en: 'Memberships', ar: 'عضويات' },
];

interface CatalogFilterBarProps {
  locale: string;
  filters: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  resultCount?: number;
}

export function CatalogFilterBar({ locale, filters, onChange }: CatalogFilterBarProps) {
  const isArabic = locale === 'ar';

  return (
    <nav
      aria-label={isArabic ? 'تصفية الفئات' : 'Category filter'}
      className="sticky top-20 sm:top-24 z-30 flex items-center justify-center px-4 pointer-events-none"
    >
      {/* Separately Floating Glassmorphic Tags without Icons */}
      <div className="pointer-events-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {CATEGORIES.map((cat) => {
          const selected = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange({ category: cat.id })}
              className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer backdrop-blur-xl ${
                selected
                  ? 'bg-slate-900/90 dark:bg-gradient-to-r dark:from-[#F5D982] dark:to-[#D4AF37] text-white dark:text-slate-950 border border-slate-800 dark:border-[#F5D982]/60 shadow-[0_10px_28px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_30px_rgba(212,175,55,0.35)] scale-105 font-semibold'
                  : 'bg-white/60 dark:bg-black/40 border border-white/60 dark:border-white/15 text-slate-700 dark:text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:bg-white/80 dark:hover:bg-white/15 hover:text-slate-950 dark:hover:text-white hover:scale-105 active:scale-95'
              }`}
            >
              <span>{isArabic ? cat.ar : cat.en}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
