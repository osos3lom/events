'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  ShieldAlert,
  Ticket,
  Sparkles,
  Anchor,
  Home,
  Award,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  MapPin,
  Calendar,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { luxuryCatalog } from '../../data/luxuryCatalog';
import { LuxuryProduct, CartItem } from '../../types/booking';
import { useBookingStore } from '../../lib/bookingStore';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';
import { ConciergeInquiryModal } from '../luxury/ConciergeInquiryModal';

interface TwoSpeedBentoProps {
  locale?: string;
}

export function TwoSpeedBento({ locale = 'en' }: TwoSpeedBentoProps) {
  const isArabic = locale === 'ar';
  const { addToCart, setIsCheckoutOpen } = useBookingStore();
  const [selectedConciergeProduct, setSelectedConciergeProduct] = useState<LuxuryProduct | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  // Fast Lane: high velocity items (events, beach day passes, reef voyages)
  const fastLaneProducts = luxuryCatalog
    .filter((p) => p.category === 'events' || p.category === 'day-passes' || (p.category === 'voyages' && p.basePrice <= 1500))
    .slice(0, 3);

  // Slow Lane: high ticket items (Gold Key membership, Waterfront Leases, Superyachts)
  const slowLaneProducts = luxuryCatalog
    .filter((p) => p.category === 'real-estate' || (p.category === 'voyages' && p.basePrice > 1500))
    .slice(0, 2);

  const handleQuickReserve = (product: LuxuryProduct) => {
    const tier = product.tiers?.[0];
    const cartItem: CartItem = {
      id: `cart-${product.id}-${tier?.id || 'base'}-${Date.now()}`,
      productId: product.id,
      category: product.category,
      title: product.title,
      coverImage: product.coverImage,
      locationName: product.locationName,
      selectedDate: product.dateOrSchedule || '2026-10-30',
      tier: tier ? { id: tier.id, name: tier.name, price: tier.price } : undefined,
      quantity: 1,
      unitPrice: tier?.price || product.basePrice,
      addOns: [],
    };
    addToCart(cartItem);
    setIsCheckoutOpen(true);
  };

  const handleOpenConcierge = (product: LuxuryProduct) => {
    setSelectedConciergeProduct(product);
    setIsConciergeOpen(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-10">
        <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#b8860b] dark:text-[#D4AF37]">
          {isArabic ? 'هندسة الحجز الذكية' : 'Two-Speed Access Architecture'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {isArabic
            ? 'المسار السريع للتذاكر المباشرة • المسار الخاص للأصول الملكية'
            : 'Instant Fast-Lane Passes & Private Concierge Assets'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light">
          {isArabic
            ? 'فصلنا تذاكر الفعاليات والشواطئ الفورية عن عقود الاستئجار والعضويات السنوية لنمنحك تجربة حجز دقيقة ومخصصة.'
            : 'Immediate 1-tap booking for passes & voyages, paired with rigorous KYC consultation for long-term coastal leases.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ==================================================================== */}
        {/* FAST LANE (7 Cols): High-Velocity Instant Cart & Instant QR */}
        {/* ==================================================================== */}
        <div className="lg:col-span-7 space-y-5">
          {/* Lane Header */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-transparent border border-amber-500/30 dark:border-[#D4AF37]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isArabic ? 'المسار السريع: تذاكر وتصاريح فورية' : 'Fast Lane: Instant Passes & Direct Cart'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isArabic ? 'إصدار تصريح QR مشفر فوراً على الجوال' : 'Instant 1-Click checkout with Apple Pay & Mada'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              {isArabic ? 'حجز فوري' : 'Instant Access'}
            </span>
          </div>

          {/* Fast Lane Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {fastLaneProducts.map((product) => {
              const tier = product.tiers?.[0];
              const price = tier?.price || product.basePrice;
              const remaining = tier?.capacityRemaining ?? 10;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#071E26]/90 border border-slate-200/80 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-[#D4AF37]/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                    <img
                      src={product.coverImage}
                      alt={product.title[isArabic ? 'ar' : 'en']}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {product.category === 'events' ? 'Event' : product.category === 'day-passes' ? 'Day Pass' : 'Voyage'}
                    </span>

                    <span className="absolute bottom-2 left-2.5 text-[10px] font-mono text-amber-300 font-bold bg-black/70 px-2 py-0.5 rounded">
                      {isArabic ? `بقي ${remaining}` : `Only ${remaining} left`}
                    </span>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {product.title[isArabic ? 'ar' : 'en']}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {product.locationName[isArabic ? 'ar' : 'en']}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                      <span className="text-xs font-black text-[#b8860b] dark:text-[#D4AF37] inline-flex items-center gap-0.5">
                        <span>{price.toLocaleString()}</span>
                        <SaudiRiyalSymbol size="xs" />
                      </span>

                      <button
                        onClick={() => handleQuickReserve(product)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#E07A5F] text-slate-950 hover:opacity-90 shadow-sm active:scale-95 transition cursor-pointer"
                      >
                        {isArabic ? 'احجز' : 'Reserve'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* SLOW LANE (5 Cols): High-Ticket / KYC-Vetted / Concierge Consultation */}
        {/* ==================================================================== */}
        <div className="lg:col-span-5 space-y-5">
          {/* Lane Header */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-[#091F2C] dark:via-[#071722] dark:to-[#091F2C] text-white border border-[#D4AF37]/40 shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-200 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {isArabic ? 'المسار الخاص: أصول وعضويات النخبة' : 'Slow Lane: VIP Assets & Annual Leases'}
                </h3>
                <p className="text-[11px] text-slate-300">
                  {isArabic ? 'فحص الهوية (KYC) واستشارة الكونسيرج الخاص' : 'High-ticket leases requiring identity vetting'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#D4AF37] bg-black/40 border border-[#D4AF37]/40 px-2.5 py-1 rounded-full">
              KYC Vetted
            </span>
          </div>

          {/* Slow Lane Cards */}
          <div className="space-y-4">
            {slowLaneProducts.map((property) => (
              <div
                key={property.id}
                className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 dark:from-[#081824] dark:to-[#040C12] text-white border border-[#D4AF37]/30 p-4 sm:p-5 shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="relative w-full sm:w-28 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                    <img
                      src={property.coverImage}
                      alt={property.title[isArabic ? 'ar' : 'en']}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] font-mono bg-black/70 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/30">
                      Private Berth
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                        {isArabic ? 'معاينة خاصة' : 'VIP Consultation'}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {property.title[isArabic ? 'ar' : 'en']}
                    </h4>
                    <p className="text-[11px] text-slate-300 line-clamp-1">
                      {property.locationName[isArabic ? 'ar' : 'en']}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs sm:text-sm font-black text-[#D4AF37] inline-flex items-center gap-0.5">
                        <span>{property.basePrice.toLocaleString()}</span>
                        <SaudiRiyalSymbol size="xs" />
                        <span className="text-[10px] text-slate-400 font-normal">
                          {property.category === 'real-estate' ? (isArabic ? '/ سنوي' : '/ yr') : ''}
                        </span>
                      </span>

                      {/* Bespoke Concierge Consultation Button (NO generic cart) */}
                      <button
                        onClick={() => handleOpenConcierge(property)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        <span>{isArabic ? 'طلب كونسيرج' : 'Request Concierge'}</span>
                        <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Concierge Consultation Modal */}
      <ConciergeInquiryModal
        product={selectedConciergeProduct}
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        locale={locale}
      />
    </section>
  );
}
