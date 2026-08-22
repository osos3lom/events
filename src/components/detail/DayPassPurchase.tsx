'use client';

import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Check, ShieldCheck, HeartHandshake, SunDim, Coffee, ArrowRight } from 'lucide-react';
import { LuxuryProduct, TierOption } from '../../types/booking';
import { useBookingStore } from '../../lib/bookingStore';
import { PrivacyTag } from '../luxury/PrivacyTag';
import { CapacityBadge } from '../luxury/CapacityBadge';
import { PriceDisplay } from '../luxury/PriceDisplay';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface DayPassPurchaseProps {
  product: LuxuryProduct;
  locale?: string;
}

export function DayPassPurchase({ product, locale = 'en' }: DayPassPurchaseProps) {
  const isArabic = locale === 'ar';
  const { addToCart } = useBookingStore();

  const tiers = product.tiers || [];
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0] || {} as TierOption);
  const [date, setDate] = useState('2026-11-03');
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleBookPass = () => {
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
      category: 'day-passes',
      title: product.title,
      coverImage: product.coverImage,
      locationName: product.locationName,
      selectedDate: date,
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
      {/* Left 2 Columns: Privacy Information, Cabana Tiers & Amenities */}
      <div className="lg:col-span-2 space-y-6">
        {/* Privacy Highlight Banner */}
        {product.privacyType === 'ladies_only' && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-rose-600 dark:text-rose-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-rose-900 dark:text-rose-300">
                {isArabic ? 'ضمان الخصوصية التامة 100% للسيدات' : '100% Guaranteed Female Privacy Sanctuary'}
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] mt-0.5">
                {isArabic
                  ? 'طاقم أمني وفندقي نسائي متكامل 100%، يمنع التصوير تماماً لضمان الراحة والاسترخاء التام.'
                  : 'Exclusively staffed by female security, lifeguards, and hospitality specialists with strict no-camera policy.'}
              </p>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span>{isArabic ? 'خيارات الأسرة الشاطئية والكباينالخاصة' : 'Select Daybed or Private Beach Cabana'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isArabic ? 'تشمل الدخول للشاطئ والمسبح واستخدام المناشف والمرافق الفاخرة' : 'Includes full cove beach access, towel service, and resort facilities'}
          </p>
        </div>

        {/* Day Pass Tiers Grid */}
        <div className="space-y-4">
          {tiers.map((tier) => {
            const isSelected = selectedTier.id === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`relative p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#071E26] border-cyan-500 dark:border-cyan-400 shadow-xl shadow-cyan-500/10 scale-[1.01]'
                    : 'bg-white/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {tier.name[isArabic ? 'ar' : 'en']}
                      </h3>
                      <CapacityBadge remaining={tier.capacityRemaining} locale={locale} />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {tier.description[isArabic ? 'ar' : 'en']}
                    </p>
                  </div>

                  <div className="text-left sm:text-right rtl:sm:text-left shrink-0">
                    <PriceDisplay amount={tier.price} period="per_pass" locale={locale} size="lg" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span>{perk[isArabic ? 'ar' : 'en']}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Day Pass Add-ons: Massage, Dining Buffet */}
        {product.availableAddOns && product.availableAddOns.length > 0 && (
          <div className="pt-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {isArabic ? 'إضافات الاسترخاء والمأكولات' : 'Wellness & Dining Add-Ons'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.availableAddOns.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                      isChecked
                        ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 dark:border-cyan-400 text-slate-900 dark:text-white'
                        : 'bg-white/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{addon.title[isArabic ? 'ar' : 'en']}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{addon.description[isArabic ? 'ar' : 'en']}</p>
                    </div>
                    <span className="font-bold text-cyan-700 dark:text-cyan-300 shrink-0 inline-flex items-center gap-1">
                      <span>+{addon.price}</span>
                      <SaudiRiyalSymbol size="xs" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Day Pass Booking Summary */}
      <div className="space-y-4">
        <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-[#071E26] border border-slate-200 dark:border-cyan-500/30 shadow-xl dark:shadow-2xl space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-3">
            {isArabic ? 'ملخص تصريح الشاطئ' : 'Day Pass Summary'}
          </h3>

          {/* Date Picker */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase">
              {isArabic ? 'تاريخ الزيارة' : 'Visit Date'}
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white">
              <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent outline-none w-full text-slate-900 dark:text-white cursor-pointer"
              />
            </div>
          </div>

          {/* Number of Guests */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase">
              {isArabic ? 'عدد الضيوف' : 'Number of Guests'}
            </label>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white">
              <span className="font-bold">{guestsCount} {isArabic ? 'ضيوف' : 'Guests'}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 flex items-center justify-center text-sm font-bold text-slate-800 dark:text-white"
                >
                  -
                </button>
                <button
                  onClick={() => setGuestsCount(Math.min(12, guestsCount + 1))}
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 flex items-center justify-center text-sm font-bold text-slate-800 dark:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>{selectedTier.name?.[isArabic ? 'ar' : 'en']} x {guestsCount}</span>
              <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">
                <span>{((selectedTier.price || 0) * guestsCount).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>{isArabic ? 'ضريبة القيمة المضافة (15%)' : 'Saudi VAT (15%)'}</span>
              <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">
                <span>{(((selectedTier.price || 0) * guestsCount) * 0.15).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
            <div className="border-t border-slate-100 dark:border-white/10 pt-2 flex justify-between items-center font-black text-sm text-cyan-600 dark:text-cyan-400">
              <span>{isArabic ? 'المجموع المستحق' : 'Total Amount'}</span>
              <span className="inline-flex items-center gap-1">
                <span>{(((selectedTier.price || 0) * guestsCount) * 1.15).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleBookPass}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-transform hover:scale-102 active:scale-95 cursor-pointer"
          >
            <span>{isArabic ? 'تأكيد حجز الشاطئ' : 'Book Day Pass Now'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
