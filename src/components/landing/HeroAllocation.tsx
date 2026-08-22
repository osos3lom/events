'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Star, Sparkles, Tag, Gift, PhoneCall, CheckCircle2, Clock } from 'lucide-react';
import { allocationBoardRows, totalPlacesRemaining, criticalTierCount, fastLaneEntryPrice } from '../../lib/allocation';
import { useCountUp } from '../../hooks/useCountUp';
import { AllocationBoard } from './AllocationBoard';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';
import { CircularPieTin } from '../common/CircularPieTin';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&auto=format&fit=crop&q=85';

interface HeroAllocationProps {
  locale: string;
}

export function HeroAllocation({ locale }: HeroAllocationProps) {
  const isArabic = locale === 'ar';
  const prefersReduced = useReducedMotion() ?? false;

  const rows = useMemo(() => allocationBoardRows(4), []);
  const placesRemaining = useMemo(() => totalPlacesRemaining(), []);
  const criticalCount = useMemo(() => criticalTierCount(), []);
  const entryPrice = useMemo(() => fastLaneEntryPrice(), []);

  const animatedPlaces = useCountUp(placesRemaining, 1800, !prefersReduced);

  const rise = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden flex items-center min-h-[94svh] lg:min-h-[82vh]">
      {/* ---------- Cinematic backdrop with luxury marine tint ---------- */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          src={HERO_IMAGE}
          alt="Jeddah Red Sea Luxury Waterfront"
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center"
          initial={prefersReduced ? { scale: 1.06 } : { scale: 1.06, x: 0, y: 0 }}
          animate={prefersReduced ? { scale: 1.06 } : { scale: 1.16, x: '-1.5%', y: '-1.5%' }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 26, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
          }
        />

        {/* Layered cinematic scrims for high contrast and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02090C]/90 via-[#02090C]/65 to-slate-50 dark:to-[#040C0E]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02090C]/95 via-[#02090C]/55 to-transparent rtl:bg-gradient-to-l" />
        {/* Warm Gold Horizon Glow */}
        <div className="absolute inset-x-0 bottom-1/4 h-72 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.18),transparent_70%)]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-28 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-center">
          {/* ================= LEFT: Limited Offers Editorial Narrative ================= */}
          <div className="space-y-5 sm:space-y-6 text-start">
            {/* Top Badge: Limited Season Offers & Rating */}
            <motion.div
              {...rise(0.05)}
              className="flex flex-wrap items-center gap-2.5 text-[11px] sm:text-xs font-semibold"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5D982]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {isArabic
                    ? 'عروض موسم البحر الأحمر 2026 • باقات حصرية ومزايا إضافية'
                    : 'Red Sea Season 2026 • Exclusive Limited Offers & Early Perks'}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isArabic ? 'مرخّص ومعتمد سياحياً' : 'STA Licensed & Verified'}</span>
              </span>
            </motion.div>

            {/* Headline — Limited Promotional Allocations */}
            <motion.h1
              {...rise(0.12)}
              className="text-[32px] xs:text-3xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] font-black tracking-tight leading-[1.08] text-white text-balance"
            >
              <span className="block text-slate-100">
                {isArabic ? 'عروض وتجارب استثنائية' : 'Exclusive Limited Offers'}
              </span>
              <span className="block">
                <span className="bg-gradient-to-r from-[#F5D982] via-[#D4AF37] to-[#E07A5F] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(212,175,55,0.25)]">
                  {isArabic ? 'على شواطئ البحر الأحمر بجدة' : 'on Jeddah Waterfront & Sea.'}
                </span>
              </span>
            </motion.h1>

            {/* Editorial copy with specific value propositions */}
            <motion.p
              {...rise(0.2)}
              className="text-xs sm:text-sm lg:text-base text-slate-200 font-light leading-relaxed max-w-xl"
            >
              {isArabic
                ? 'احجز تذاكر الحفلات الموسيقية، أسرة الشواطئ الخاصة مع رصيد طعام مجاني، ورحلات الكتماران الفاخرة مع إصدار فوري لمانيفست حرس الحدود. استمتع بمزايا الحجز المبكر والتقسيط المريح.'
                : 'Claim early-access passes for shoreline festivals, private beach retreats with complimentary dining vouchers, and certified superyacht charters with instant port clearance.'}
            </motion.p>

            {/* Three Value Offer Highlights */}
            <motion.div
              {...rise(0.25)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1"
            >
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[11px] font-semibold text-slate-200 leading-tight">
                  {isArabic ? 'رصيد طعام يصل لـ 400 ر.س' : 'Up to 400 SAR Food Credit'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-[11px] font-semibold text-slate-200 leading-tight">
                  {isArabic ? 'تصاريح فورية لحرس الحدود' : 'Instant Gate QR & Manifest'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-semibold text-slate-200 leading-tight">
                  {isArabic ? 'تقسيط على 4 دفعات 0% فوائد' : '0% Interest 4-Pay BNPL'}
                </span>
              </div>
            </motion.div>

            {/* Circular Pie Tin Seasonal Quota Dial */}
            <motion.div
              {...rise(0.3)}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/60 border border-[#D4AF37]/30 backdrop-blur-md max-w-fit shadow-lg"
            >
              <CircularPieTin
                percentage={86}
                size={48}
                strokeWidth={4.5}
                isCritical={criticalCount > 2}
                showPercentInside={true}
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                  </span>
                  {isArabic
                    ? `بقي ${animatedPlaces.toLocaleString('en-US')} مقعداً وتصريحاً فقط`
                    : `Only ${animatedPlaces.toLocaleString('en-US')} promotional spots left`}
                </span>
                <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {isArabic
                    ? '86% من حصة العروض الترويجية محجوزة'
                    : '86% of limited seasonal quota claimed'}
                </span>
              </div>
            </motion.div>

            {/* Two CTAs, one per speed lane */}
            <motion.div {...rise(0.35)} className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="#events"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#F5D982] via-[#D4AF37] to-[#E07A5F] px-5 sm:px-6 py-3 text-sm font-black text-[#04141A] shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl hover:shadow-[#D4AF37]/35 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02090C]"
              >
                <span>{isArabic ? 'احجز العروض الحصرية' : 'Claim Limited Offers'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#real-estate"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/5 backdrop-blur-sm px-5 py-3 text-sm font-bold text-white hover:bg-white/12 hover:border-white/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>{isArabic ? 'طلب كونسيرج خاص' : 'VIP Concierge Inquiry'}</span>
              </Link>
            </motion.div>

            {/* Payment & ZATCA compliance strip */}
            <motion.div
              {...rise(0.4)}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-[10px] sm:text-[11px] font-semibold text-slate-300"
            >
              {['mada', 'Apple Pay', 'STC Pay'].map((method) => (
                <span
                  key={method}
                  className="rounded-md border border-white/15 bg-white/5 px-2 py-1 backdrop-blur-sm"
                >
                  {method}
                </span>
              ))}
              <span className="rounded-md border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-2 py-1 text-[#F0D98A] backdrop-blur-sm">
                {isArabic ? 'تابي وتمارا — قسّمها على 4 دفعات' : 'Tabby & Tamara — Split in 4'}
              </span>
              <span className="text-slate-400">
                {isArabic ? 'فاتورة ضريبية ZATCA' : '15% ZATCA Invoice'}
              </span>
            </motion.div>
          </div>

          {/* ================= RIGHT: The Limited Offers Board ================= */}
          <AllocationBoard rows={rows} locale={locale} />
        </div>
      </div>
    </section>
  );
}
