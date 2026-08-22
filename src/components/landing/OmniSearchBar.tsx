'use client';

import React, { useState } from 'react';
import { Calendar, Search, Sparkles, Anchor, Ticket, Home, ShieldCheck } from 'lucide-react';
import { ServiceCategory } from '../../types/booking';

interface OmniSearchBarProps {
  locale?: string;
  onFilterChange: (filters: {
    category: ServiceCategory | 'all';
    searchQuery: string;
    location: string;
    date: string;
    partySize: number;
  }) => void;
}

export function OmniSearchBar({ locale = 'en', onFilterChange }: OmniSearchBarProps) {
  const isArabic = locale === 'ar';

  const [activeTab, setActiveTab] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('all');
  const [date, setDate] = useState('');
  const [partySize, setPartySize] = useState(2);

  const tabs: {
    id: ServiceCategory | 'all';
    labelEn: string;
    labelAr: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'all', labelEn: 'All', labelAr: 'الكل', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'events', labelEn: 'Events', labelAr: 'حفلات', icon: <Ticket className="w-3.5 h-3.5" /> },
    { id: 'day-passes', labelEn: 'Tickets', labelAr: 'تذاكر', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'voyages', labelEn: 'Trips', labelAr: 'رحلات', icon: <Anchor className="w-3.5 h-3.5" /> },
    { id: 'real-estate', labelEn: 'Memberships', labelAr: 'عضويات', icon: <Home className="w-3.5 h-3.5" /> },
  ];

  const handleTabClick = (tabId: ServiceCategory | 'all') => {
    setActiveTab(tabId);
    onFilterChange({
      category: tabId,
      searchQuery,
      location,
      date,
      partySize,
    });
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onFilterChange({
      category: activeTab,
      searchQuery,
      location,
      date,
      partySize,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#071E26]/90 border border-slate-200/90 dark:border-[#D4AF37]/35 p-3.5 sm:p-5 lg:p-6 shadow-2xl backdrop-blur-2xl text-slate-900 dark:text-white transition-all">
      {/* Category Tabs Header */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 sm:pb-3.5 border-b border-slate-200 dark:border-white/10 scrollbar-none">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs lg:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E07A5F] text-slate-950 shadow-md shadow-[#D4AF37]/25 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span>{isArabic ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Inputs Form Grid */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 mt-3 sm:mt-4">
        {/* Search Keyword */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-slate-900 dark:text-white transition-colors">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#b8860b] dark:text-[#D4AF37] shrink-0" />
          <div className="flex flex-col text-left rtl:text-right w-full min-w-0">
            <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider truncate">
              {isArabic ? 'البحث أو التجربة' : 'Experience or Keyword'}
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onFilterChange({ category: activeTab, searchQuery: e.target.value, location, date, partySize });
              }}
              placeholder={isArabic ? 'يخت، حفلة، كابانا...' : 'Yacht, Concert, Cabana...'}
              className="bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none w-full truncate"
            />
          </div>
        </div>

        {/* Date Selection */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-slate-900 dark:text-white transition-colors">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#b8860b] dark:text-[#D4AF37] shrink-0" />
          <div className="flex flex-col text-left rtl:text-right w-full min-w-0">
            <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider truncate">
              {isArabic ? 'التاريخ' : 'Date / Schedule'}
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                onFilterChange({ category: activeTab, searchQuery, location, date: e.target.value, partySize });
              }}
              className="bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white outline-none w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Location / Marina */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-slate-900 dark:text-white transition-colors">
          <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-[#b8860b] dark:text-[#D4AF37] shrink-0" />
          <div className="flex flex-col text-left rtl:text-right w-full min-w-0">
            <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider truncate">
              {isArabic ? 'المرسى أو المنطقة' : 'Location / Marina'}
            </span>
            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                onFilterChange({ category: activeTab, searchQuery, location: e.target.value, date, partySize });
              }}
              className="bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white outline-none cursor-pointer w-full truncate"
            >
              <option value="all" className="bg-white dark:bg-[#071E26] text-slate-900 dark:text-white">
                {isArabic ? 'جميع سواحل جدة' : 'All Waterfront'}
              </option>
              <option value="north_obhur" className="bg-white dark:bg-[#071E26] text-slate-900 dark:text-white">
                {isArabic ? 'أبحر الشمالية' : 'North Obhur'}
              </option>
              <option value="jeddah_yacht_club" className="bg-white dark:bg-[#071E26] text-slate-900 dark:text-white">
                {isArabic ? 'نادي اليخوت والمارينا' : 'Jeddah Yacht Club'}
              </option>
              <option value="durrat_al_arus" className="bg-white dark:bg-[#071E26] text-slate-900 dark:text-white">
                {isArabic ? 'درة العروس وبياضة' : 'Durrat Al Arus'}
              </option>
            </select>
          </div>
        </div>

        {/* Search CTA Button */}
        <button
          type="submit"
          className="w-full h-full min-h-[46px] sm:min-h-[50px] bg-gradient-to-r from-[#D4AF37] to-[#E07A5F] hover:from-[#c8a02a] hover:to-[#d0694e] text-slate-950 font-black rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-xs sm:text-sm sm:col-span-2 md:col-span-1"
        >
          <Search className="w-4 h-4 text-slate-950 shrink-0" />
          <span>{isArabic ? 'استكشف التجارب' : 'Search'}</span>
        </button>
      </form>

      {/* Sub-bar Saudi Compliance & Trust Notice */}
      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 gap-1.5 text-center sm:text-left rtl:sm:text-right">
        <div className="flex items-center gap-1.5 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
          <span>
            {isArabic
              ? 'معتمد من حرس الحدود • دفع مدى وأبل باي'
              : 'Coast Guard Certified • Instant Mada & Apple Pay'}
          </span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <span>{isArabic ? 'شامل 15% ضريبة ZATCA' : '15% ZATCA VAT Breakdown'}</span>
        </div>
      </div>
    </div>
  );
}
