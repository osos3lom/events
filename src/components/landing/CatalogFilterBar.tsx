'use client';

import React from 'react';
import { Search, X, Ticket, Sparkles, Anchor, Home, LayoutGrid } from 'lucide-react';
import { ServiceCategory } from '../../types/booking';

export interface CatalogFilters {
  category: ServiceCategory | 'all';
  query: string;
  location: string;
}

export const EMPTY_FILTERS: CatalogFilters = { category: 'all', query: '', location: 'all' };

export const hasActiveFilters = (f: CatalogFilters) =>
  f.category !== 'all' || f.query.trim() !== '' || f.location !== 'all';

const CATEGORIES: {
  id: ServiceCategory | 'all';
  en: string;
  ar: string;
  icon: React.ReactNode;
}[] = [
  { id: 'all', en: 'Everything', ar: 'الكل', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { id: 'events', en: 'Concerts', ar: 'حفلات', icon: <Ticket className="w-3.5 h-3.5" /> },
  { id: 'day-passes', en: 'Beaches', ar: 'شواطئ', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'voyages', en: 'Voyages', ar: 'رحلات', icon: <Anchor className="w-3.5 h-3.5" /> },
  { id: 'real-estate', en: 'Memberships', ar: 'عضويات', icon: <Home className="w-3.5 h-3.5" /> },
];

const LOCATIONS: { id: string; en: string; ar: string }[] = [
  { id: 'all', en: 'All waterfront', ar: 'جميع السواحل' },
  { id: 'north_obhur', en: 'North Obhur', ar: 'أبحر الشمالية' },
  { id: 'south_obhur', en: 'South Obhur', ar: 'أبحر الجنوبية' },
  { id: 'jeddah_yacht_club', en: 'Jeddah Yacht Club', ar: 'نادي اليخوت' },
  { id: 'corniche', en: 'Corniche', ar: 'الكورنيش' },
  { id: 'bayada_reef', en: 'Bayada Reef', ar: 'شعاب بياضة' },
  { id: 'durrat_al_arus', en: 'Durrat Al Arus', ar: 'درة العروس' },
];

interface CatalogFilterBarProps {
  locale: string;
  filters: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  resultCount: number;
}

/**
 * Sticky filter bar docked above the catalog.
 *
 * Search lives where the results are — unlike the old hero search box, whose
 * output was computed into a variable the page never rendered.
 */
export function CatalogFilterBar({ locale, filters, onChange, resultCount }: CatalogFilterBarProps) {
  const isArabic = locale === 'ar';
  const active = hasActiveFilters(filters);

  const patch = (next: Partial<CatalogFilters>) => onChange({ ...filters, ...next });

  return (
    <div className="sticky top-16 sm:top-20 z-30 -mx-4 sm:mx-0 px-4 sm:px-0">
      <div className="rounded-none sm:rounded-2xl border-y sm:border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-[#061A21]/85 backdrop-blur-xl shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 p-2.5 sm:p-3">
          {/* Category pills */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto lg:overflow-visible"
            role="group"
            aria-label={isArabic ? 'تصفية حسب الفئة' : 'Filter by category'}
          >
            {CATEGORIES.map((cat) => {
              const selected = filters.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => patch({ category: cat.id })}
                  className={`inline-flex items-center gap-1.5 shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    selected
                      ? 'bg-slate-900 dark:bg-[#D4AF37] text-white dark:text-[#04141A] shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  {cat.icon}
                  {isArabic ? cat.ar : cat.en}
                </button>
              );
            })}
          </div>

          <div className="flex-1 flex flex-col sm:flex-row gap-2.5 lg:justify-end">
            {/* Keyword */}
            <label className="relative flex-1 sm:max-w-xs">
              <span className="sr-only">{isArabic ? 'ابحث' : 'Search experiences'}</span>
              <Search className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                value={filters.query}
                onChange={(e) => patch({ query: e.target.value })}
                placeholder={isArabic ? 'يخت، حفلة، كابانا…' : 'Yacht, concert, cabana…'}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 ps-9 pe-3 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
              />
            </label>

            {/* Location */}
            <label className="sm:w-48">
              <span className="sr-only">{isArabic ? 'الموقع' : 'Location'}</span>
              <select
                value={filters.location}
                onChange={(e) => patch({ location: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] cursor-pointer transition-colors"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-white dark:bg-[#071E26]">
                    {isArabic ? loc.ar : loc.en}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Result summary — only when the visitor has actually filtered */}
        {active && (
          <div className="flex items-center justify-between gap-3 border-t border-slate-200 dark:border-white/10 px-3 py-2">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
              {resultCount === 0
                ? isArabic
                  ? 'لا توجد نتائج مطابقة'
                  : 'Nothing matches those filters'
                : isArabic
                  ? `${resultCount} تجربة مطابقة`
                  : `${resultCount} ${resultCount === 1 ? 'experience' : 'experiences'} match`}
            </p>
            <button
              type="button"
              onClick={() => onChange(EMPTY_FILTERS)}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <X className="w-3.5 h-3.5" />
              {isArabic ? 'مسح' : 'Clear'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
