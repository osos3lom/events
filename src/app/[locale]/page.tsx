'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Anchor,
  Sparkles,
  Home,
  Star,
  Flame,
} from 'lucide-react';
import { luxuryCatalog } from '../../data/luxuryCatalog';
import { LuxuryNavbar } from '../../components/luxury/LuxuryNavbar';
import { LuxuryFooter } from '../../components/luxury/LuxuryFooter';
import { WeatherMaritimeWidget } from '../../components/luxury/WeatherMaritimeWidget';
import { ProductCard } from '../../components/luxury/ProductCard';
import { UnifiedCheckoutModal } from '../../components/checkout/UnifiedCheckoutModal';
import { RelaxedVideoHero } from '../../components/landing/RelaxedVideoHero';
import { TwoSpeedVerticals } from '../../components/landing/TwoSpeedVerticals';
import {
  CatalogFilterBar,
  CatalogFilters,
  EMPTY_FILTERS,
  hasActiveFilters,
} from '../../components/landing/CatalogFilterBar';

export default function LuxuryLandingPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isArabic = locale === 'ar';

  const [dayPassPrivacyFilter, setDayPassPrivacyFilter] = useState<'all' | 'ladies_only' | 'family'>('all');
  const [filters, setFilters] = useState<CatalogFilters>(EMPTY_FILTERS);

  /** Results for the category filter bar. */
  const filteredProducts = useMemo(() => {
    if (filters.category === 'all') return luxuryCatalog;
    return luxuryCatalog.filter((item) => item.category === filters.category);
  }, [filters]);

  const isFiltering = hasActiveFilters(filters);

  const eventsList = useMemo(
    () => luxuryCatalog.filter((p) => p.category === 'events'),
    []
  );
  const dayPassesList = useMemo(() => {
    if (dayPassPrivacyFilter === 'all') {
      return luxuryCatalog.filter((p) => p.category === 'day-passes');
    }
    return luxuryCatalog.filter(
      (p) => p.category === 'day-passes' && p.privacyType === dayPassPrivacyFilter
    );
  }, [dayPassPrivacyFilter]);

  const voyagesList = useMemo(
    () => luxuryCatalog.filter((p) => p.category === 'voyages'),
    []
  );
  const realEstateList = useMemo(
    () => luxuryCatalog.filter((p) => p.category === 'real-estate'),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040C0E] text-slate-900 dark:text-white flex flex-col selection:bg-[#D4AF37] selection:text-slate-950 transition-colors">
      {/* Top Luxury Navigation */}
      <LuxuryNavbar locale={locale} />

      <main className="flex-1 pb-28 md:pb-24">
        {/* ==================================================================== */}
        {/* 1. HERO — RELAXED RED SEA VIDEO HERO                                */}
        {/* ==================================================================== */}
        <RelaxedVideoHero locale={locale} />

        {/* ==================================================================== */}
        {/* 2. TWO-SPEED VERTICALS — full-screen experience showcase             */}
        {/* ==================================================================== */}
        <TwoSpeedVerticals locale={locale} />

        {/* ==================================================================== */}
        {/* 3. RELAXED CATALOG & SHOWCASE SECTION                                */}
        {/* ==================================================================== */}
        <div className="relative py-12 sm:py-16 bg-gradient-to-b from-[#EBF2F7] via-[#E4EDF3] to-[#DAE5EC] dark:from-[#040C0E] dark:via-[#061820] dark:to-[#040E14] transition-colors space-y-16 sm:space-y-20">
          {/* Floating Filter Bar */}
          <CatalogFilterBar
            locale={locale}
            filters={filters}
            onChange={setFilters}
            resultCount={filteredProducts.length}
          />

          {isFiltering && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-live="polite">
              {filteredProducts.length > 0 ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} locale={locale} />
                    ))}
                  </div>

                  <div className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={() => setFilters(EMPTY_FILTERS)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>{isArabic ? 'عرض كل التجارب' : 'View All Experiences'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/15 p-10 text-center">
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {isArabic ? 'لا توجد تجربة مطابقة' : 'Nothing matches those filters'}
                  </p>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                    {isArabic ? 'جرّب البحث بكلمات أخرى.' : 'Try another search keyword.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilters(EMPTY_FILTERS)}
                    className="mt-4 inline-flex items-center rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-xs font-black text-white dark:text-slate-900 cursor-pointer"
                  >
                    {isArabic ? 'عرض الكل' : 'View all'}
                  </button>
                </div>
              )}
            </section>
          )}

          {!isFiltering && (
            <>
              {/* ==================================================================== */}
              {/* 3a. SHOWCASE: EVENTS & CONCERTS (فعاليات)                            */}
              {/* ==================================================================== */}
              <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-[#b8860b] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                      <Flame className="w-4 h-4" />
                      <span>{isArabic ? 'فعاليات وأمسيات' : 'Shoreline Concerts'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white mt-1">
                      {isArabic ? (
                        <>
                          أبرز <span className="font-medium text-[#b8860b] dark:text-[#F5D982]">الفعاليات والحفلات</span>
                        </>
                      ) : (
                        <>
                          Featured <span className="font-medium italic font-serif">Concerts & Festivals</span>
                        </>
                      )}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {eventsList.slice(0, 3).map((event) => (
                    <ProductCard key={event.id} product={event} locale={locale} />
                  ))}
                </div>

                {/* View All Events */}
                <div className="flex justify-center pt-8">
                  <Link
                    href={`/${locale}/events`}
                    className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>{isArabic ? 'عرض جميع الفعاليات' : 'View All Events'}</span>
                    <Star className="w-3 h-3 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
                  </Link>
                </div>
              </section>

              {/* ==================================================================== */}
              {/* 3b. SHOWCASE: SEA VOYAGES & CHARTERS (رحلات)                         */}
              {/* ==================================================================== */}
              <section id="voyages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest">
                      <Anchor className="w-4 h-4" />
                      <span>{isArabic ? 'رحلات بحرية ويخوت' : 'Maritime Fleet'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white mt-1">
                      {isArabic ? (
                        <>
                          رحلات <span className="font-medium text-sky-600 dark:text-sky-400">اليخوت الخاصة</span>
                        </>
                      ) : (
                        <>
                          Exclusive <span className="font-medium italic font-serif">Red Sea Voyages</span>
                        </>
                      )}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <WeatherMaritimeWidget locale={locale} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {voyagesList.slice(0, 3).map((voyage) => (
                    <ProductCard key={voyage.id} product={voyage} locale={locale} />
                  ))}
                </div>

                {/* View All Voyages */}
                <div className="flex justify-center pt-8">
                  <Link
                    href={`/${locale}/voyages`}
                    className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>{isArabic ? 'عرض جميع الرحلات' : 'View All Voyages'}</span>
                    <Anchor className="w-3 h-3 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </section>

              {/* ==================================================================== */}
              {/* 3c. SHOWCASE: VIP MEMBERSHIPS & REAL ESTATE (عضويات)                 */}
              {/* ==================================================================== */}
              <section id="real-estate" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
                      <Home className="w-4 h-4" />
                      <span>{isArabic ? 'عضويات وشاليهات' : 'VIP Memberships'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white mt-1">
                      {isArabic ? (
                        <>
                           تذاكر الدخول <span className="font-medium text-emerald-600 dark:text-emerald-400">والعضويات</span>
                        </>
                      ) : (
                        <>
                          Exclusive <span className="font-medium italic font-serif">Memberships</span>
                        </>
                      )}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {realEstateList.slice(0, 3).map((property) => (
                    <ProductCard key={property.id} product={property} locale={locale} />
                  ))}
                </div>

                {/* View All Memberships */}
                <div className="flex justify-center pt-8">
                  <Link
                    href={`/${locale}/memberships`}
                    className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>{isArabic ? 'عرض جميع العضويات' : 'View All Memberships'}</span>
                    <Sparkles className="w-3 h-3 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </section>
            </>
          )}
        </div>

      </main>

      {/* Global 3-Step Checkout Modal Controller */}
      <UnifiedCheckoutModal locale={locale} />

      {/* Luxury Footer */}
      <LuxuryFooter locale={locale} />
    </div>
  );
}
