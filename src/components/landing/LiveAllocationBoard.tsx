'use client';

import React, { useMemo, useState } from 'react';
import { Flame, Clock, ShieldCheck, ArrowRight, Sparkles, Ticket, Anchor } from 'lucide-react';
import { luxuryCatalog } from '../../data/luxuryCatalog';
import { useBookingStore } from '../../lib/bookingStore';
import { LuxuryProduct, TierOption, CartItem } from '../../types/booking';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface LiveAllocationBoardProps {
  locale?: string;
}

interface AllocationItem {
  product: LuxuryProduct;
  tier: TierOption;
  scarcityRatio: number; // 0 to 1 (higher = more scarce/booked)
  percentBooked: number;
}

export function LiveAllocationBoard({ locale = 'en' }: LiveAllocationBoardProps) {
  const isArabic = locale === 'ar';
  const { addToCart, setIsCheckoutOpen } = useBookingStore();
  const [reservingTierId, setReservingTierId] = useState<string | null>(null);

  // Extract all active tiers across events, day-passes, and voyages
  const allocations = useMemo<AllocationItem[]>(() => {
    const list: AllocationItem[] = [];

    luxuryCatalog.forEach((product) => {
      // Include fast-velocity categories
      if (product.category === 'events' || product.category === 'day-passes' || product.category === 'voyages') {
        product.tiers?.forEach((tier) => {
          const booked = tier.capacityTotal - tier.capacityRemaining;
          const ratio = tier.capacityTotal > 0 ? booked / tier.capacityTotal : 0;
          list.push({
            product,
            tier,
            scarcityRatio: ratio,
            percentBooked: Math.round(ratio * 100),
          });
        });
      }
    });

    // Sort by scarcity ratio descending (most scarce first)
    return list.sort((a, b) => b.scarcityRatio - a.scarcityRatio).slice(0, 4);
  }, []);

  const handleInstantReserve = (item: AllocationItem) => {
    setReservingTierId(item.tier.id);

    const cartItem: CartItem = {
      id: `cart-${item.product.id}-${item.tier.id}-${Date.now()}`,
      productId: item.product.id,
      category: item.product.category,
      title: item.product.title,
      coverImage: item.product.coverImage,
      locationName: item.product.locationName,
      selectedDate: item.product.dateOrSchedule || '2026-10-30',
      tier: {
        id: item.tier.id,
        name: item.tier.name,
        price: item.tier.price,
      },
      quantity: 1,
      unitPrice: item.tier.price,
      addOns: [],
    };

    addToCart(cartItem);
    setIsCheckoutOpen(true);

    setTimeout(() => {
      setReservingTierId(null);
    }, 600);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'events':
        return <Ticket className="w-3 h-3 text-amber-400" />;
      case 'day-passes':
        return <Sparkles className="w-3 h-3 text-cyan-400" />;
      case 'voyages':
        return <Anchor className="w-3 h-3 text-sky-400" />;
      default:
        return <Flame className="w-3 h-3 text-coral-400" />;
    }
  };

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-slate-900/80 dark:bg-[#071724]/90 backdrop-blur-xl border border-white/15 dark:border-cyan-500/20 p-3 sm:p-5 shadow-2xl text-white">
      {/* Board Header */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/90">
            {isArabic ? 'لوحة التخصيص الفوري المباشرة' : 'Live Allocation Board'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400/90 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
          {isArabic ? 'مزامنة مع الميناء' : 'Port Manifest Sync'}
        </span>
      </div>

      {/* Tiers List */}
      <div className="divide-y divide-white/5 space-y-1 sm:space-y-1.5 pt-2">
        {allocations.map((item) => {
          const isUrgent = item.tier.capacityRemaining <= 5;
          const isHighDemand = item.percentBooked >= 80;

          return (
            <div
              key={item.tier.id}
              className="pt-2 sm:pt-2.5 pb-1 flex flex-col gap-2 hover:bg-white/[0.04] rounded-xl px-2 transition-colors"
            >
              {/* Top Meta Row */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-white/60 mb-0.5">
                    {getCategoryIcon(item.product.category)}
                    <span className="truncate">{item.product.title[isArabic ? 'ar' : 'en']}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                    {item.tier.name[isArabic ? 'ar' : 'en']}
                  </h4>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-black text-amber-300 dark:text-[#D4AF37] inline-flex items-center gap-0.5">
                    <span>{item.tier.price.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="xs" />
                  </span>
                </div>
              </div>

              {/* Scarcity Bar & Reserve Action */}
              <div className="flex items-center justify-between gap-3">
                {/* Visual Meter */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span
                      className={`font-semibold ${
                        isUrgent ? 'text-rose-400 animate-pulse' : 'text-amber-300'
                      }`}
                    >
                      {isArabic
                        ? `بقي ${item.tier.capacityRemaining} فقط`
                        : `Only ${item.tier.capacityRemaining} left`}
                    </span>
                    <span className="text-white/50">{item.percentBooked}% {isArabic ? 'محجوز' : 'booked'}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isUrgent
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : 'bg-gradient-to-r from-cyan-500 to-amber-400'
                      }`}
                      style={{ width: `${Math.min(item.percentBooked, 100)}%` }}
                    />
                  </div>
                </div>

                {/* One-Tap Reserve Button */}
                <button
                  onClick={() => handleInstantReserve(item)}
                  disabled={reservingTierId === item.tier.id}
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#E07A5F] hover:opacity-95 text-slate-950 shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{isArabic ? 'حجز فوري' : 'Reserve'}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer live sync badge */}
      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50 font-mono">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>{isArabic ? 'حرس الحدود • تصاريح ZATCA الفورية' : 'Coast Guard & ZATCA Verified'}</span>
        </span>
        <span className="text-cyan-300/80">{allocations.length} {isArabic ? 'باقات حصرية نشطة' : 'Active Allocations'}</span>
      </div>
    </div>
  );
}
