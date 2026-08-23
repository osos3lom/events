'use client';

import React, { useState } from 'react';
import { Home, Calendar, ShieldCheck, Download, Check, PhoneCall, Building2, KeyRound, ArrowRight } from 'lucide-react';
import { LuxuryProduct, TierOption } from '../../types/booking';
import { useBookingStore } from '../../lib/bookingStore';
import { PriceDisplay } from '../luxury/PriceDisplay';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface RealEstatePurchaseProps {
  product: LuxuryProduct;
  locale?: string;
}

export function RealEstatePurchase({ product, locale = 'en' }: RealEstatePurchaseProps) {
  const isArabic = locale === 'ar';
  const { addToCart } = useBookingStore();

  const [leaseCycle, setLeaseCycle] = useState<'annual' | 'monthly'>('annual');
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourDate, setTourDate] = useState('2026-09-01');
  const [tourPhone, setTourPhone] = useState('+966 ');

  const specs = product.realEstateSpecs;
  const tiers = product.tiers || [];
  const selectedTier = tiers.find((t) => (leaseCycle === 'annual' ? t.id.includes('annual') : t.id.includes('monthly'))) || tiers[0];

  const handleApplyLease = () => {
    if (!selectedTier) return;
    addToCart({
      id: `${product.id}-${selectedTier.id}-${Date.now()}`,
      productId: product.id,
      category: 'real-estate',
      title: product.title,
      coverImage: product.coverImage,
      locationName: product.locationName,
      selectedDate: leaseCycle === 'annual' ? '12-Month Contract' : 'Monthly Season',
      tier: {
        id: selectedTier.id,
        name: selectedTier.name,
        price: selectedTier.price,
      },
      quantity: 1,
      unitPrice: selectedTier.price,
      addOns: [],
      leasePlan: leaseCycle,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 Columns: Architecture, Specs, Mooring, Floorplan, Lease Terms */}
      <div className="lg:col-span-2 space-y-6">
        {/* Real Estate Specifications Highlights */}
        {specs && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#071E26] border border-slate-200 dark:border-emerald-500/30 shadow-xl dark:shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isArabic ? 'المواصفات الهندسية والمساحات الشاطئية' : 'Architectural & Waterfront Specs'}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-500/30">
                {specs.sqft.toLocaleString()} Sq Ft
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Bedrooms</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{specs.bedrooms} Suites</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Bathrooms</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{specs.bathrooms} Baths</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Private Shoreline</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{specs.privateBeachMeters}m Sand</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Security Deposit</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 inline-flex items-center gap-1">
                  <span>{(specs.securityDeposit ?? 0).toLocaleString()}</span>
                  <SaudiRiyalSymbol size="xs" />
                </span>
              </div>
            </div>

            {/* Amenities List */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              {(specs.amenities || []).map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{item[isArabic ? 'ar' : 'en']}</span>
                </div>
              ))}
            </div>

            {/* Floorplan & Legal Prospectus CTA */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 dark:text-slate-300">
                {isArabic ? 'تحميل مخطط الفيلا والمواصفات الرسمية (PDF)' : 'Official Architectural Floor Plan & Lease Brochure'}
              </span>
              <button
                type="button"
                onClick={() => alert('Downloading official Jeddah Waterfront Lease Prospectus (PDF)...')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{isArabic ? 'تحميل العقد والمخطط' : 'Download Brochure'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Pricing Cycle Toggle: Monthly vs Annual */}
        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {isArabic ? 'مدة العقد ونظام السداد' : 'Lease Duration & Payment Terms'}
            </h3>
            <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setLeaseCycle('monthly')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  leaseCycle === 'monthly'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isArabic ? 'إيجار شهري موسمي' : 'Monthly Seasonal'}
              </button>
              <button
                type="button"
                onClick={() => setLeaseCycle('annual')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  leaseCycle === 'annual'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isArabic ? 'عقد سنوي 12 شهراً' : 'Annual 12-Month'}
              </button>
            </div>
          </div>
        </div>

        {/* Lease Period Tabs & Pricing Matrix */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#071E26] border border-slate-200 dark:border-emerald-500/30 shadow-xl dark:shadow-2xl space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isArabic ? 'خطط الإيجار وباقات التعاقد' : 'Select Lease Plan & Contract Duration'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isArabic ? 'عقود موثقة إلكترونياً مع خدمة كونسيرج وصيانة شاملة' : 'Digitally authenticated leases with comprehensive concierge & maintenance'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tiers.map((tier) => {
              const isSelected = selectedTier?.id === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setLeaseCycle(tier.id.includes('annual') ? 'annual' : 'monthly')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-slate-50/50 dark:bg-white/5'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {tier.name[isArabic ? 'ar' : 'en']}
                      </h4>
                      {tier.popular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          {isArabic ? 'العقد الأكثر طلباً' : 'Best Value'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {tier.description[isArabic ? 'ar' : 'en']}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
                    <PriceDisplay
                      amount={tier.price}
                      period={tier.id.includes('annual') ? 'annual' : 'monthly'}
                      locale={locale}
                      size="lg"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Reservation / Schedule Viewing Action Box */}
      <div className="space-y-4">
        <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-[#071E26] border border-slate-200 dark:border-emerald-500/30 shadow-xl dark:shadow-2xl space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-3">
            {isArabic ? 'ملخص طلب الحجز والعقد' : 'Lease Application Summary'}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            {isArabic
              ? 'يمكنك حجز موعد معاينة خاصة برفقة مستشارنا العقاري أو بدء دفع مقدم الحجز الإلكتروني فوراً.'
              : 'Schedule an on-site private walkthrough with our VIP estate concierge or submit your digital reservation.'}
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>{isArabic ? 'قيمة الإيجار' : 'Lease Rate'}</span>
              <span className="font-bold text-slate-900 dark:text-white inline-flex items-center gap-1">
                <span>{(selectedTier?.price || 0).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>{isArabic ? 'التأمين المسترد' : 'Refundable Deposit'}</span>
              <span className="font-bold text-slate-900 dark:text-white inline-flex items-center gap-1">
                <span>{(specs?.securityDeposit || 25000).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
            <div className="border-t border-slate-100 dark:border-white/10 pt-2 flex justify-between items-center font-black text-sm text-[#b8860b] dark:text-[#D4AF37]">
              <span>{isArabic ? 'إجمالي الدفعة الأولى' : 'First Payment Total'}</span>
              <span className="inline-flex items-center gap-1">
                <span>{((selectedTier?.price || 0) + (specs?.securityDeposit || 25000)).toLocaleString()}</span>
                <SaudiRiyalSymbol size="xs" />
              </span>
            </div>
          </div>

          {/* Schedule Viewing CTA */}
          <button
            type="button"
            onClick={() => setIsTourModalOpen(true)}
            className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isArabic ? 'طلب موعد معاينة خاصة للفيلا' : 'Schedule Private VIP Tour'}</span>
          </button>

          {/* Apply & Reserve Lease CTA */}
          <button
            onClick={handleApplyLease}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-transform hover:scale-102 active:scale-95 cursor-pointer"
          >
            <span>{isArabic ? 'بدء إجراءات حجز العقد' : 'Apply & Reserve Lease Online'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* Tour Request Modal */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#071E26] border border-slate-200 dark:border-emerald-500/40 max-w-md w-full text-slate-900 dark:text-white space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{isArabic ? 'جدولة موعد المعاينة الخاصة' : 'Book Private On-Site Tour'}</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {isArabic
                ? 'سيقوم مستشارنا العقاري بالتواصل معك لتأكيد موعد الجولة واستقبالك في المارينا.'
                : 'Our coastal luxury specialist will meet you at the North Obhur gate for a private walkthrough.'}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Preferred Date</label>
                <input
                  type="date"
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Mobile Number (+966)</label>
                <input
                  type="tel"
                  value={tourPhone}
                  onChange={(e) => setTourPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsTourModalOpen(false)}
                className="w-1/3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Your private viewing request has been confirmed! Our concierge will call you.');
                  setIsTourModalOpen(false);
                }}
                className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Confirm Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
