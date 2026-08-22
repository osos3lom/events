'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import {
  Anchor,
  Sparkles,
  Home,
  ShieldCheck,
  Star,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { luxuryCatalog } from '../../data/luxuryCatalog';
import { LuxuryNavbar } from '../../components/luxury/LuxuryNavbar';
import { LuxuryFooter } from '../../components/luxury/LuxuryFooter';
import { WeatherMaritimeWidget } from '../../components/luxury/WeatherMaritimeWidget';
import { ProductCard } from '../../components/luxury/ProductCard';
import { UnifiedCheckoutModal } from '../../components/checkout/UnifiedCheckoutModal';
import { HeroAllocation } from '../../components/landing/HeroAllocation';
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

  /** Results for the sticky filter bar. Rendered — unlike the variable this replaces. */
  const filteredProducts = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return luxuryCatalog.filter((item) => {
      if (filters.category !== 'all' && item.category !== filters.category) return false;
      if (filters.location !== 'all' && item.marinaOrArea !== filters.location) return false;
      if (!query) return true;
      return [
        item.title.en,
        item.title.ar,
        item.description.en,
        item.description.ar,
        item.locationName.en,
        item.locationName.ar,
      ].some((field) => field.toLowerCase().includes(query));
    });
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

      <main className="flex-1 space-y-14 sm:space-y-20 pb-28 md:pb-24">
        {/* ==================================================================== */}
        {/* 1. HERO — LIVE ALLOCATION BOARD                                      */}
        {/* ==================================================================== */}
        <HeroAllocation locale={locale} />

        {/* ==================================================================== */}
        {/* 2. TWO-SPEED VERTICALS — fast lane cart, slow lane concierge         */}
        {/* ==================================================================== */}
        <TwoSpeedVerticals locale={locale} />

        {/* ==================================================================== */}
        {/* 2b. STICKY CATALOG FILTER — search lives where the results are        */}
        {/* ==================================================================== */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <CatalogFilterBar
            locale={locale}
            filters={filters}
            onChange={setFilters}
            resultCount={filteredProducts.length}
          />
        </div>

        {isFiltering && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-live="polite">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/15 p-10 text-center">
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  {isArabic ? 'لا توجد تجربة مطابقة' : 'Nothing matches those filters'}
                </p>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  {isArabic
                    ? 'جرّب توسيع الموقع أو الفئة.'
                    : 'Try widening the location or category.'}
                </p>
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="mt-4 inline-flex items-center rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-xs font-black text-white dark:text-slate-900 cursor-pointer"
                >
                  {isArabic ? 'مسح عوامل التصفية' : 'Clear filters'}
                </button>
              </div>
            )}
          </section>
        )}

        {!isFiltering && (
        <>
        {/* ==================================================================== */}
        {/* 3. SHOWCASE: UPCOMING EVENTS & CONCERTS */}
        {/* ==================================================================== */}
        <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#b8860b] dark:text-[#D4AF37] text-xs font-extrabold uppercase tracking-widest">
                <Flame className="w-4 h-4" />
                <span>{isArabic ? 'حفلات وأمسيات حية' : 'Live Shoreline Performances'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {isArabic ? 'أبرز الفعاليات والحفلات القادمة' : 'Upcoming Coastal Concerts & Festivals'}
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isArabic ? 'تحديث فوري لتوفر المقاعد وتذاكر VIP' : 'Real-time tier scarcity & instant ticketing'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {eventsList.map((event) => (
              <ProductCard key={event.id} product={event} locale={locale} />
            ))}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 4. SHOWCASE: EXCLUSIVE SEA VOYAGES & CHARTERS */}
        {/* ==================================================================== */}
        <section id="voyages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-extrabold uppercase tracking-widest">
                <Anchor className="w-4 h-4" />
                <span>{isArabic ? 'الإبحار واليخوت الفاخرة' : 'Certified Maritime Fleet'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {isArabic ? 'الرحلات البحرية وتأجير اليخوت الخاصة' : 'Exclusive Red Sea Voyages & Yacht Charters'}
              </h2>
            </div>
            <div className="flex flex-col sm:items-end gap-2">
              {/* Sea state belongs where it changes the buying decision */}
              <WeatherMaritimeWidget locale={locale} />
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                <span>{isArabic ? 'تصاريح فورية لحرس الحدود' : 'Saudi Coast Guard Pre-Cleared'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {voyagesList.map((voyage) => (
              <ProductCard key={voyage.id} product={voyage} locale={locale} />
            ))}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 5. SHOWCASE: BEACH DAY PASSES & CABANAS */}
        {/* ==================================================================== */}
        <section id="day-passes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>{isArabic ? 'شواطئ واستجمام خاص' : 'Day Retreats & Daybeds'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {isArabic ? 'تصاريح الشواطئ الخاصة والكابانات' : 'Beach Day Passes & Private Cabanas'}
              </h2>
            </div>

            {/* Privacy Category Filter Pill Switcher */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-1.5 rounded-2xl">
              {[
                { id: 'all', labelEn: 'All Beaches', labelAr: 'الكل' },
                { id: 'ladies_only', labelEn: 'Ladies-Only 100%', labelAr: 'سيدات فقط' },
                { id: 'family', labelEn: 'Family Pergolas', labelAr: 'عائلات' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setDayPassPrivacyFilter(btn.id as 'all' | 'ladies_only' | 'family')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    dayPassPrivacyFilter === btn.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isArabic ? btn.labelAr : btn.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {dayPassesList.map((pass) => (
              <ProductCard key={pass.id} product={pass} locale={locale} />
            ))}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 6. SHOWCASE: VIP MEMBERSHIPS & BEACHFRONT REAL ESTATE */}
        {/* ==================================================================== */}
        <section id="real-estate" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
                <Home className="w-4 h-4" />
                <span>{isArabic ? 'أصول النخبة الساحلية' : 'Prime Coastal Assets'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {isArabic ? 'العضويات والعقود السنوية' : 'VIP Memberships & Chalet Leases'}
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isArabic ? 'تشمل مراسي القوارب والكونسيرج 24/7' : 'Includes private yacht berths & 24/7 concierge'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {realEstateList.map((property) => (
              <ProductCard key={property.id} product={property} locale={locale} />
            ))}
          </div>
        </section>

        </>
        )}

        {/* ==================================================================== */}
        {/* 7. SOCIAL PROOF & SAUDI LOCALIZATION BANNER */}
        {/* ==================================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-[#071E26] dark:via-[#092B37] dark:to-[#071E26] border border-[#b8860b]/40 dark:border-[#D4AF37]/30 p-8 lg:p-12 shadow-2xl relative overflow-hidden text-white">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                  {isArabic ? 'التميز في الضيافة السعودية' : 'The Benchmark of Saudi Hospitality'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {isArabic
                    ? 'تجارب ساحلية استثنائية صُممت لراحتك وفق أعلى المعايير'
                    : 'Tailored Red Sea Experiences With Seamless 1-Click Verification'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                  {isArabic
                    ? 'من تأكيد تصريح حرس الحدود الفوري إلى إصدار التذاكر المشفرة ومطابقة الفاتورة الضريبية ZATCA، نضمن لك ولعائلتك تجربة خالية من أي تعقيد.'
                    : 'From instant Coast Guard port manifests to encrypted gate QR passes and ZATCA Phase 2 tax transparency, we deliver effortless luxury.'}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Mada, Apple Pay & STC Pay</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>15% ZATCA Compliant Invoice</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>24/7 VIP Red Sea Concierge</span>
                  </div>
                </div>
              </div>

              {/* Verified Trust Stats */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center space-y-4">
                <div>
                  <span className="text-3xl font-black text-[#D4AF37]">4.97 / 5</span>
                  <div className="flex justify-center gap-1 mt-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">Based on 1,200+ Verified Guests in 2026</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs font-bold text-white">Certified Maritime Fleet</p>
                  <p className="text-[11px] text-slate-300">Licensed under Saudi Tourism Authority</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global 3-Step Checkout Modal Controller */}
      <UnifiedCheckoutModal locale={locale} />

      {/* Luxury Footer */}
      <LuxuryFooter locale={locale} />
    </div>
  );
}
