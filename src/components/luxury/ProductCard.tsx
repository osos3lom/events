'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Anchor, Sparkles, Home, Ticket, ArrowRight, ShieldCheck } from 'lucide-react';
import { LuxuryProduct } from '../../types/booking';
import { CapacityBadge } from './CapacityBadge';
import { PrivacyTag } from './PrivacyTag';
import { PriceDisplay } from './PriceDisplay';

interface ProductCardProps {
  product: LuxuryProduct;
  locale?: string;
  onQuickBook?: (product: LuxuryProduct) => void;
}

export function ProductCard({ product, locale = 'en', onQuickBook }: ProductCardProps) {
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
    'real-estate': { en: 'Real Estate & Club', ar: 'عقارات وعضويات' },
  };

  const ctaLabels = {
    events: { en: 'Select Tickets', ar: 'اختيار التذاكر' },
    'day-passes': { en: 'Book Day Pass', ar: 'حجز التصريح' },
    voyages: { en: 'Reserve Voyage', ar: 'حجز الرحلة' },
    'real-estate': { en: 'View Lease & Tour', ar: 'تفاصيل العقد والمعاينة' },
  };

  const detailUrl = `/${locale}/${product.category}/${product.id}`;

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white dark:bg-[#071E26]/80 border border-slate-200/80 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-[#D4AF37]/50 overflow-hidden shadow-lg dark:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-amber-500/10 dark:hover:shadow-[#D4AF37]/10">
      {/* Cover Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-900">
        <img
          src={product.coverImage}
          alt={product.title[isArabic ? 'ar' : 'en']}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Top Badges Floating Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          {/* Category Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/15">
            {categoryIcons[product.category]}
            {categoryLabels[product.category][isArabic ? 'ar' : 'en']}
          </span>

          {/* Privacy Tag */}
          {product.privacyType && (
            <PrivacyTag type={product.privacyType} locale={locale} />
          )}
        </div>

        {/* Urgent Scarcity Badge */}
        {product.badge && (
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#D4AF37] text-slate-950 shadow-md">
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
              <MapPin className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#D4AF37] shrink-0" />
              <span className="truncate">{product.locationName[isArabic ? 'ar' : 'en']}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/5 text-amber-700 dark:text-amber-300 font-semibold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={detailUrl} className="block group-hover:text-[#b8860b] dark:group-hover:text-[#D4AF37] transition-colors">
            <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
              {product.title[isArabic ? 'ar' : 'en']}
            </h3>
          </Link>

          {/* Tagline / Excerpt */}
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {product.tagline[isArabic ? 'ar' : 'en']}
          </p>

          {/* Specific Specs Pills based on Category */}
          {product.category === 'voyages' && product.vesselSpecs && (
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-cyan-800 dark:text-cyan-200/90 font-medium">
              <span className="bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-500/20 px-2 py-0.5 rounded-md">
                🚢 {product.vesselSpecs.lengthFt}ft • Max {product.vesselSpecs.guestCapacity} Guests
              </span>
              <span className="bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-500/20 px-2 py-0.5 rounded-md">
                ⚓ {product.vesselSpecs.crewCount} Crew Members
              </span>
            </div>
          )}

          {product.category === 'real-estate' && product.realEstateSpecs && (
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-emerald-800 dark:text-emerald-200/90 font-medium">
              <span className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-md">
                🏡 {product.realEstateSpecs.bedrooms} Beds • {product.realEstateSpecs.sqft.toLocaleString()} Sq Ft
              </span>
              <span className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-md">
                🏖️ {product.realEstateSpecs.privateBeachMeters}m Private Shoreline
              </span>
            </div>
          )}

          {product.category === 'events' && product.dateOrSchedule && (
            <div className="pt-1 text-[11px] text-amber-800 dark:text-amber-200/80 font-semibold">
              📅 {product.dateOrSchedule}
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
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
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#E07A5F] hover:from-[#c5a02a] hover:to-[#cb684e] text-slate-950 font-bold text-xs shadow-lg shadow-[#D4AF37]/20 transition-all group-hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <span>{ctaLabels[product.category][isArabic ? 'ar' : 'en']}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
