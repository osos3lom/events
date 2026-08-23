'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Ticket, Anchor, Home, Sparkles } from 'lucide-react';
import { luxuryCatalog } from '../../data/luxuryCatalog';
import { ProductCard } from '../luxury/ProductCard';
import { LuxuryNavbar } from '../luxury/LuxuryNavbar';
import { LuxuryFooter } from '../luxury/LuxuryFooter';
import { UnifiedCheckoutModal } from '../checkout/UnifiedCheckoutModal';

interface CategoryListingViewProps {
  locale: string;
  category: 'events' | 'voyages' | 'real-estate' | 'memberships';
}

const CATEGORY_META = {
  events: {
    titleEn: 'Shoreline Concerts & Events',
    titleAr: 'فعاليات وأمسيات البحر الأحمر',
    subtitleEn: 'Live Tarab nights, beach music sessions, and acoustic concerts by the water.',
    subtitleAr: 'جلسات طرب حية، ليالي الشاطئ، وأمسيات موسيقية راقية على الواجهة البحرية.',
    dbCategory: 'events',
    icon: <Ticket className="w-4 h-4" />,
  },
  voyages: {
    titleEn: 'Private Sea Charters & Voyages',
    titleAr: 'رحلات بحرية ويخوت خاصة',
    subtitleEn: 'Catamaran day sails to Bayada reef and private sunset motor yacht charters.',
    subtitleAr: 'إبحار إلى شعاب بياضة الفيروزية ويخوت خاصة للغروب مع طاقم معتمد.',
    dbCategory: 'voyages',
    icon: <Anchor className="w-4 h-4" />,
  },
  'real-estate': {
    titleEn: 'VIP Memberships & Packages',
    titleAr: 'العضويات والباقات الشاطئية',
    subtitleEn: 'Exclusive 4 friends cabana passes and annual VIP coastal club memberships.',
    subtitleAr: 'باقات الكابانا للأصدقاء وعضويات سنوية حصرية لدخول أرقى المنتجعات.',
    dbCategory: 'real-estate',
    icon: <Home className="w-4 h-4" />,
  },
  memberships: {
    titleEn: 'VIP Memberships & Packages',
    titleAr: 'العضويات والباقات الشاطئية',
    subtitleEn: 'Exclusive 4 friends cabana passes and annual VIP coastal club memberships.',
    subtitleAr: 'باقات الكابانا للأصدقاء وعضويات سنوية حصرية لدخول أرقى المنتجعات.',
    dbCategory: 'real-estate',
    icon: <Home className="w-4 h-4" />,
  },
};

export function CategoryListingView({ locale, category }: CategoryListingViewProps) {
  const isArabic = locale === 'ar';
  const meta = CATEGORY_META[category] || CATEGORY_META.events;

  const items = luxuryCatalog.filter(
    (item) => item.category === meta.dbCategory
  );

  const navCategories = [
    { id: 'events', path: 'events', en: 'Events', ar: 'فعاليات' },
    { id: 'voyages', path: 'voyages', en: 'Voyages', ar: 'رحلات' },
    { id: 'real-estate', path: 'memberships', en: 'Memberships', ar: 'عضويات' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EBF2F7] via-[#E4EDF3] to-[#DAE5EC] dark:from-[#040C0E] dark:via-[#061820] dark:to-[#040E14] text-slate-900 dark:text-white flex flex-col selection:bg-[#D4AF37] selection:text-slate-950 transition-colors">
      <LuxuryNavbar locale={locale} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 w-full space-y-10">
        
        {/* Back Link & Category Navigation Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-[#F5D982] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{isArabic ? 'الرئيسية' : 'Back to Home'}</span>
          </Link>

          {/* Quick Floating Category Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            {navCategories.map((c) => {
              const active = c.id === category || (category === 'memberships' && c.id === 'real-estate');
              return (
                <Link
                  key={c.id}
                  href={`/${locale}/${c.path}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all ${
                    active
                      ? 'bg-slate-900 dark:bg-gradient-to-r dark:from-[#F5D982] dark:to-[#D4AF37] text-white dark:text-slate-950 font-bold shadow-md scale-105'
                      : 'bg-white/60 dark:bg-black/30 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/90 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{isArabic ? c.ar : c.en}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <header className="space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 border border-white/40 dark:border-white/15 text-[11px] font-semibold text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? meta.titleAr : meta.titleEn}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
            {isArabic ? (
              <>
                استكشف <span className="font-medium bg-gradient-to-r from-[#F5D982] via-[#D4AF37] to-[#E07A5F] bg-clip-text text-transparent">{meta.titleAr}</span>
              </>
            ) : (
              <>
                Explore <span className="font-medium italic font-serif bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-[#F5D982] dark:to-[#D4AF37] bg-clip-text text-transparent">{meta.titleEn}</span>
              </>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl">
            {isArabic ? meta.subtitleAr : meta.subtitleEn}
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item) => (
            <ProductCard key={item.id} product={item} locale={locale} />
          ))}
        </div>
      </main>

      <UnifiedCheckoutModal locale={locale} />
      <LuxuryFooter locale={locale} />
    </div>
  );
}
