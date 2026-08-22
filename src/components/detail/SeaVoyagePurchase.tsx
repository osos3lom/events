'use client';

import React, { useState } from 'react';
import { Anchor, Clock, ShieldCheck, UserCheck, Check, Waves, ArrowRight, LifeBuoy } from 'lucide-react';
import { LuxuryProduct, TierOption } from '../../types/booking';
import { useBookingStore } from '../../lib/bookingStore';
import { PriceDisplay } from '../luxury/PriceDisplay';
import { CapacityBadge } from '../luxury/CapacityBadge';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface SeaVoyagePurchaseProps {
  product: LuxuryProduct;
  locale?: string;
}

export function SeaVoyagePurchase({ product, locale = 'en' }: SeaVoyagePurchaseProps) {
  const isArabic = locale === 'ar';
  const { addToCart } = useBookingStore();

  const tiers = product.tiers || [];
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0] || {} as TierOption);
  const [date, setDate] = useState('2026-11-10');
  const [timeSlot, setTimeSlot] = useState(
    product.timeSlots?.[0] || '08:30 AM - 02:30 PM (Morning Coral Dive)'
  );
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleBookVoyage = () => {
    if (!selectedTier) return;
    const addOnsToAdd = (product.availableAddOns || [])
      .filter((a) => selectedAddons.includes(a.id))
      .map((a) => ({
        id: a.id,
        title: a.title,
        price: a.price,
        quantity: 1,
      }));

    addToCart({
      id: `${product.id}-${selectedTier.id}-${Date.now()}`,
      productId: product.id,
      category: 'voyages',
      title: product.title,
      coverImage: product.coverImage,
      locationName: product.locationName,
      selectedDate: date,
      selectedTimeSlot: timeSlot,
      tier: {
        id: selectedTier.id,
        name: selectedTier.name,
        price: selectedTier.price,
      },
      quantity: guestsCount,
      unitPrice: selectedTier.price,
      addOns: addOnsToAdd,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 Columns: Vessel Specifications, Captain Credentials, Tiers */}
      <div className="lg:col-span-2 space-y-6">
        {/* Vessel Specs Card */}
        {product.vesselSpecs && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#071E26] border border-slate-200 dark:border-sky-500/30 shadow-xl dark:shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Anchor className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {product.vesselSpecs.vesselName}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-bold border border-sky-200 dark:border-sky-500/30">
                {product.vesselSpecs.lengthFt} ft Luxury Vessel
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Captain</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block truncate">{product.vesselSpecs.captainName}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Max Guests</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{product.vesselSpecs.guestCapacity} Passengers</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Cruise Speed</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{product.vesselSpecs.maxSpeedKnots} Knots</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Crew Onboard</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{product.vesselSpecs.crewCount} Staff</span>
              </div>
            </div>

            {/* Vessel Amenities Checklist */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
              {product.vesselSpecs.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{amenity[isArabic ? 'ar' : 'en']}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Departure Time Slots */}
        {product.timeSlots && product.timeSlots.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{isArabic ? 'اختر موعد الإبحار والرحلة' : 'Select Departure Time Slot'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.timeSlots.map((slot, i) => {
                const isSelected = timeSlot === slot;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`p-3.5 rounded-2xl border text-left rtl:text-right text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 dark:border-sky-400 text-slate-900 dark:text-white shadow-lg shadow-sky-500/10'
                        : 'bg-white/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <span className="block text-[11px] text-sky-700 dark:text-sky-300 font-bold uppercase tracking-wider">Slot {i + 1}</span>
                    <span className="mt-1 block font-bold">{slot}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Charter Options / Tiers */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {isArabic ? 'باقات وتصاريح الرحلة' : 'Voyage & Charter Packages'}
          </h3>
          {tiers.map((tier) => {
            const isSelected = selectedTier.id === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#071E26] border-sky-500 dark:border-sky-400 shadow-xl shadow-sky-500/15 scale-[1.01]'
                    : 'bg-white/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {tier.name[isArabic ? 'ar' : 'en']}
                      </h4>
                      <CapacityBadge remaining={tier.capacityRemaining} locale={locale} />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {tier.description[isArabic ? 'ar' : 'en']}
                    </p>
                  </div>
                  <div className="text-left sm:text-right rtl:sm:text-left shrink-0">
                    <PriceDisplay amount={tier.price} period="per_charter" locale={locale} size="lg" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>{perk[isArabic ? 'ar' : 'en']}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Voyage Reservation Summary */}
      <div className="space-y-4">
        <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-[#071E26] border border-slate-200 dark:border-sky-500/30 shadow-xl dark:shadow-2xl space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-3">
            {isArabic ? 'ملخص الرحلة البحرية' : 'Voyage Booking'}
          </h3>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase">
              {isArabic ? 'تاريخ المغادرة' : 'Departure Date'}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-500/20 text-xs text-sky-900 dark:text-sky-200">
            <p className="font-bold">⏰ Selected Slot:</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{timeSlot}</p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>{selectedTier.name?.[isArabic ? 'ar' : 'en']}</span>
              <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">
                <span>{(selectedTier.price || 0).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>{isArabic ? 'ضريبة القيمة المضافة (15%)' : 'Saudi VAT (15%)'}</span>
              <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">
                <span>{((selectedTier.price || 0) * 0.15).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
            <div className="border-t border-slate-100 dark:border-white/10 pt-2 flex justify-between items-center font-black text-sm text-sky-700 dark:text-sky-400">
              <span>{isArabic ? 'المجموع المستحق' : 'Grand Total'}</span>
              <span className="inline-flex items-center gap-1">
                <span>{((selectedTier.price || 0) * 1.15).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
          </div>

          <button
            onClick={handleBookVoyage}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 transition-transform hover:scale-102 active:scale-95 cursor-pointer"
          >
            <span>{isArabic ? 'حجز الرحلة وإصدار التصريح' : 'Reserve Voyage & Manifest'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>{isArabic ? 'تصريح حرس الحدود معتمد تلقائياً' : 'Coast Guard Manifest Auto-Generated'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
