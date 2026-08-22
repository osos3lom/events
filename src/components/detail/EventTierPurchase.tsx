'use client';

import React, { useState } from 'react';
import { Sparkles, Ticket, Check, ShieldCheck, MapPin, Calendar, Users, Flame, ArrowRight } from 'lucide-react';
import { LuxuryProduct, TierOption } from '../../types/booking';
import { useBookingStore } from '../../lib/bookingStore';
import { CapacityBadge } from '../luxury/CapacityBadge';
import { PriceDisplay } from '../luxury/PriceDisplay';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface EventTierPurchaseProps {
  product: LuxuryProduct;
  locale?: string;
}

export function EventTierPurchase({ product, locale = 'en' }: EventTierPurchaseProps) {
  const isArabic = locale === 'ar';
  const { addToCart } = useBookingStore();

  const tiers = product.tiers || [];
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0] || {} as TierOption);
  const [quantity, setQuantity] = useState(2);
  const [selectedDate, setSelectedDate] = useState(product.dateOrSchedule || '2026-10-30');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleReserve = () => {
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
      category: 'events',
      title: product.title,
      coverImage: product.coverImage,
      locationName: product.locationName,
      selectedDate,
      tier: {
        id: selectedTier.id,
        name: selectedTier.name,
        price: selectedTier.price,
      },
      quantity,
      unitPrice: selectedTier.price,
      addOns: addOnsToAdd,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 Cols: Tier Selection & Live Floorplan Info */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#b8860b] dark:text-[#D4AF37]" />
            <span>{isArabic ? 'اختر فئة التذكرة وتصريح الدخول' : 'Select Admission Tier & Seating Area'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isArabic ? 'تذاكر رقمية مشفرة بضمان الدخول الفوري ومقاعد كبار الشخصيات' : 'Encrypted digital gate access with real-time capacity and VIP privileges'}
          </p>
        </div>

        {/* Tiers List */}
        <div className="space-y-4">
          {tiers.map((tier) => {
            const isSelected = selectedTier.id === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`relative p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#071E26] border-amber-500 dark:border-[#D4AF37] shadow-xl shadow-amber-500/10 dark:shadow-[#D4AF37]/20 scale-[1.01]'
                    : 'bg-white/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 right-6 bg-gradient-to-r from-[#D4AF37] to-[#E07A5F] text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    {isArabic ? 'الأكثر طلباً' : 'Most Popular'}
                  </span>
                )}

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

                {/* Tier Perks Checklist */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#b8860b] dark:text-[#D4AF37] shrink-0" />
                      <span>{perk[isArabic ? 'ar' : 'en']}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons Selector */}
        {product.availableAddOns && product.availableAddOns.length > 0 && (
          <div className="pt-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {isArabic ? 'ترقيات وخدمات الضيافة المتاحة' : 'Optional Event Upgrades & Concierge'}
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
                        ? 'bg-amber-50 dark:bg-[#D4AF37]/10 border-amber-500 dark:border-[#D4AF37] text-slate-900 dark:text-white'
                        : 'bg-white/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{addon.title[isArabic ? 'ar' : 'en']}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{addon.description[isArabic ? 'ar' : 'en']}</p>
                    </div>
                    <div className="text-right rtl:text-left shrink-0">
                      <span className="font-bold text-[#b8860b] dark:text-[#D4AF37] inline-flex items-center gap-1">
                        <span>+{addon.price}</span>
                        <SaudiRiyalSymbol size="xs" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Checkout Summary Box */}
      <div className="space-y-4">
        <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-[#071E26] border border-slate-200 dark:border-[#D4AF37]/40 shadow-xl dark:shadow-2xl space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-3">
            {isArabic ? 'ملخص تذاكر الحفل' : 'Reservation Summary'}
          </h3>

          {/* Date Picker */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase">
              {isArabic ? 'تاريخ الفعالية' : 'Event Date'}
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white">
              <Calendar className="w-4 h-4 text-[#b8860b] dark:text-[#D4AF37]" />
              <span>{selectedDate}</span>
            </div>
          </div>

          {/* Ticket Quantity */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase">
              {isArabic ? 'عدد التذاكر' : 'Number of Tickets'}
            </label>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white">
              <span className="font-bold">{quantity} {isArabic ? 'تذاكر' : 'Passes'}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 flex items-center justify-center text-sm font-bold text-slate-800 dark:text-white"
                >
                  -
                </button>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 flex items-center justify-center text-sm font-bold text-slate-800 dark:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Calculation */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>{selectedTier.name?.[isArabic ? 'ar' : 'en'] || 'Tier'} x {quantity}</span>
              <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">
                <span>{((selectedTier.price || 0) * quantity).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>{isArabic ? 'ضريبة القيمة المضافة (15%)' : 'Saudi VAT (15%)'}</span>
              <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">
                <span>{(((selectedTier.price || 0) * quantity) * 0.15).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
            <div className="border-t border-slate-100 dark:border-white/10 pt-2 flex justify-between items-center font-black text-sm text-[#b8860b] dark:text-[#D4AF37]">
              <span>{isArabic ? 'المجموع الإجمالي' : 'Estimated Total'}</span>
              <span className="inline-flex items-center gap-1">
                <span>{(((selectedTier.price || 0) * quantity) * 1.15).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleReserve}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#E07A5F] hover:from-[#c5a02a] hover:to-[#cb684e] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/25 transition-transform hover:scale-102 active:scale-95 cursor-pointer"
          >
            <span>{isArabic ? 'حجز التذاكر والانتقال للدفع' : 'Reserve Tickets & Checkout'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>{isArabic ? 'تأكيد فوري • استرداد كامل حتى 48 ساعة' : 'Instant Confirmation • 48h Refund Guarantee'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
