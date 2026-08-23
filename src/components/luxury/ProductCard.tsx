'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Anchor, Sparkles, Home, Ticket, ArrowRight } from 'lucide-react';
import { LuxuryProduct } from '../../types/booking';
import { CapacityBadge } from './CapacityBadge';
import { PrivacyTag } from './PrivacyTag';
import { PriceDisplay } from './PriceDisplay';

interface ProductCardProps {
  product: LuxuryProduct;
  locale?: string;
  onQuickBook?: (product: LuxuryProduct) => void;
}

export function ProductCard({ product, locale = 'en' }: ProductCardProps) {
  const isArabic = locale === 'ar';
  const remainingTotal = product.tiers?.reduce((sum, t) => sum + t.capacityRemaining, 0) ?? 10;

  const categoryIcons = {
    events: <Ticket className="w-3.5 h-3.5 text-amber-400" />,
    'day-passes': <Sparkles className="w-3.5 h-3.5 text-cyan-400" />,
    voyages: <Anchor className="w-3.5 h-3.5 text-sky-400" />,
    'real-estate': <Home className="w-3.5 h-3.5 text-emerald-400" />,
  };

  const categoryLabels = {
    events: { en: 'Concert & Event', ar: 'حفلة وفعالية' },
    'day-passes': { en: 'Beach Day Pass', ar: 'تصريح شاطئ' },
    voyages: { en: 'Sea Voyage', ar: 'رحلة بحرية' },
    'real-estate': { en: 'Membership & Villa', ar: 'عقارات وعضويات' },
  };

  const ctaLabels = {
    events: { en: 'Book Tickets', ar: 'احجز التذاكر' },
    'day-passes': { en: 'Reserve Pass', ar: 'احجز التصريح' },
    voyages: { en: 'Book Voyage', ar: 'احجز الرحلة' },
    'real-estate': { en: 'View Details', ar: 'تفاصيل العضوية' },
  };

  const detailUrl = `/${locale}/${product.category}/${product.id}`;

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white/65 dark:bg-[#071E26]/40 hover:bg-white/90 dark:hover:bg-[#071E26]/70 border border-white/60 dark:border-white/10 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 shadow-[0_10px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)] backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-1.5">
      {/* Cover Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-900/10">
        <img
          src={product.coverImage}
          alt={product.title[isArabic ? 'ar' : 'en']}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

        {/* Top Badges Floating Header */}
        <div className="absolute top-3.5 start-3.5 end-3.5 flex items-center justify-between gap-2">
          {/* Category Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md text-white border border-white/15 shadow-sm">
            {categoryIcons[product.category]}
            {categoryLabels[product.category][isArabic ? 'ar' : 'en']}
          </span>

          {/* Privacy Tag */}
          {product.privacyType && (
            <PrivacyTag type={product.privacyType} locale={locale} />
          )}
        </div>

        {/* Bottom Image Overlay Badges */}
        {product.badge && (
          <div className="absolute bottom-3 start-3.5 end-3.5 flex justify-between items-center">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#D4AF37] text-slate-950 shadow-md">
              {product.badge[isArabic ? 'ar' : 'en']}
            </span>
            <CapacityBadge remaining={remainingTotal} locale={locale} />
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-5 lg:p-6 justify-between gap-4">
        <div className="space-y-2.5">
          {/* Location & Rating row */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 truncate max-w-[70%]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{product.locationName[isArabic ? 'ar' : 'en']}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md text-amber-600 dark:text-amber-300 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={detailUrl} className="block group-hover:text-[#b8860b] dark:group-hover:text-[#F5D982] transition-colors">
            <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
              {product.title[isArabic ? 'ar' : 'en']}
            </h3>
          </Link>

          {/* Tagline / Excerpt */}
          <p className="text-xs text-slate-600 dark:text-slate-300 font-light line-clamp-2 leading-relaxed">
            {product.tagline[isArabic ? 'ar' : 'en']}
          </p>

          {/* Specs / Schedule based on category */}
          {product.category === 'voyages' && product.vesselSpecs && (
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-sky-800 dark:text-sky-200/90 font-medium">
              <span className="bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md">
                🚢 {product.vesselSpecs.lengthFt}ft • Max {product.vesselSpecs.guestCapacity} Guests
              </span>
            </div>
          )}

          {product.category === 'real-estate' && product.realEstateSpecs && (
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-emerald-800 dark:text-emerald-200/90 font-medium">
              <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                🏡 {product.realEstateSpecs.bedrooms} Beds • {product.realEstateSpecs.privateBeachMeters}m Private Shoreline
              </span>
            </div>
          )}

          {product.category === 'events' && product.dateOrSchedule && (
            <div className="pt-1 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
              📅 {product.dateOrSchedule}
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-3.5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase tracking-wider font-semibold">
              {isArabic ? 'يبدأ من' : 'Starting From'}
            </span>
            <PriceDisplay
              amount={product.basePrice}
              period={
                product.category === 'real-estate'
                  ? 'monthly'
                  : product.category === 'voyages'
                  ? 'per_charter'
                  : 'per_pass'
              }
              locale={locale}
              size="md"
              showVatNote={false}
            />
          </div>

          <Link
            href={detailUrl}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold text-xs transition-all group-hover:scale-105 active:scale-95 whitespace-nowrap shadow-sm"
          >
            <span>{ctaLabels[product.category][isArabic ? 'ar' : 'en']}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
