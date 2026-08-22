'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Anchor, Flame, KeyRound, CalendarClock } from 'lucide-react';
import { LuxuryProduct } from '../../types/booking';
import {
  AllocationRow,
  nextDatedEvent,
  productsInCategory,
  scarcestTierOf,
  entryPriceOf,
  slowLaneRows,
} from '../../lib/allocation';
import { useCountdown } from '../../hooks/useCountdown';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface TwoSpeedVerticalsProps {
  locale: string;
}

export function TwoSpeedVerticals({ locale }: TwoSpeedVerticalsProps) {
  const isArabic = locale === 'ar';
  const prefersReduced = useReducedMotion() ?? false;

  const featured = useMemo(() => nextDatedEvent(), []);
  const dayPasses = useMemo(() => productsInCategory('day-passes'), []);
  const voyages = useMemo(() => productsInCategory('voyages'), []);
  const slowLane = useMemo(() => slowLaneRows(), []);

  const ladies = dayPasses.find((p) => p.privacyType === 'ladies_only') ?? dayPasses[0];
  const catamaran = voyages.find((p) => (p.tiers?.[0]?.capacityTotal ?? 0) > 1) ?? voyages[0];

  const reveal = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ---------------- FAST LANE ---------------- */}
      <motion.header {...reveal(0)} className="mb-7 sm:mb-9">
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#b8860b] dark:text-[#D4AF37]">
          <Flame className="w-3.5 h-3.5" />
          {isArabic ? 'احجز هذا الأسبوع' : 'Book this week'}
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white text-balance">
          {isArabic
            ? 'ما زال متاحاً — وبأعداد محدودة فعلاً'
            : 'Still available, and genuinely limited'}
        </h2>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-5">
        {/* Feature tile — the next dated event */}
        {featured && (
          <motion.div {...reveal(0.05)} className="min-w-0">
            <FeatureEventTile product={featured.product} date={featured.date} locale={locale} />
          </motion.div>
        )}

        {/* Two stacked tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 min-w-0">
          <motion.div {...reveal(0.12)} className="min-w-0">
            <LaneTile
              product={ladies}
              locale={locale}
              accent="cyan"
              icon={<Sparkles className="w-5 h-5" />}
              eyebrow={isArabic ? 'شواطئ خاصة' : 'Private beaches'}
              heading={isArabic ? 'سيدات فقط وعائلات' : 'Ladies-only & family'}
              href={`#day-passes`}
              cta={isArabic ? 'اختر تاريخاً' : 'Pick a date'}
              pills={[
                { en: 'Ladies-only 100%', ar: 'سيدات 100%' },
                { en: 'Family pergolas', ar: 'كباينعائلية' },
              ]}
            />
          </motion.div>

          <motion.div {...reveal(0.18)} className="min-w-0">
            <LaneTile
              product={catamaran}
              locale={locale}
              accent="sky"
              icon={<Anchor className="w-5 h-5" />}
              eyebrow={isArabic ? 'الأسطول البحري' : 'Certified fleet'}
              heading={isArabic ? 'الشعاب المرجانية واليخوت' : 'Reef sails & charters'}
              href={`#voyages`}
              cta={isArabic ? 'مواعيد الإبحار' : 'Check departures'}
              trust={{
                en: 'Saudi Coast Guard pre-cleared',
                ar: 'تصريح مسبق من حرس الحدود',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ---------------- SLOW LANE ---------------- */}
      <motion.div {...reveal(0.1)} className="mt-5">
        <SlowLaneBand rows={slowLane} locale={locale} />
      </motion.div>
    </section>
  );
}

/* ============================================================= */
/* Feature tile: image-led, live countdown, two scarcest tiers    */
/* ============================================================= */

function FeatureEventTile({
  product,
  date,
  locale,
}: {
  product: LuxuryProduct;
  date: Date;
  locale: string;
}) {
  const isArabic = locale === 'ar';
  const countdown = useCountdown(date);
  const entryPrice = entryPriceOf(product);
  const tiers = [...(product.tiers ?? [])]
    .sort((a, b) => a.capacityRemaining / a.capacityTotal - b.capacityRemaining / b.capacityTotal)
    .slice(0, 2);

  const dateLabel = new Intl.DateTimeFormat(isArabic ? 'ar-SA' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'Asia/Riyadh',
  }).format(date);

  const units = countdown
    ? [
        { value: countdown.days, en: 'days', ar: 'يوم' },
        { value: countdown.hours, en: 'hrs', ar: 'ساعة' },
        { value: countdown.minutes, en: 'min', ar: 'دقيقة' },
        { value: countdown.seconds, en: 'sec', ar: 'ثانية' },
      ]
    : null;

  return (
    <article className="group relative h-full min-h-[420px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl">
      {/* Cover */}
      <img
        src={product.coverImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#02090C] via-[#02090C]/70 to-[#02090C]/25" />

      <div className="relative h-full flex flex-col justify-between gap-6 p-5 sm:p-7 text-white">
        {/* Top: date + countdown */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[11px] font-bold">
            <CalendarClock className="w-3.5 h-3.5 text-[#D4AF37]" />
            {dateLabel}
          </span>

          {units && (
            <div className="flex items-center gap-1.5" aria-label={isArabic ? 'الوقت المتبقي' : 'Time remaining'}>
              {units.map((unit) => (
                <div
                  key={unit.en}
                  className="min-w-[46px] rounded-xl bg-black/55 backdrop-blur-md border border-[#D4AF37]/30 px-2 py-1.5 text-center"
                >
                  <span className="block text-base font-black tabular-nums leading-none text-[#F0D98A]">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 mt-1">
                    {isArabic ? unit.ar : unit.en}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: the offer */}
        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#D4AF37]">
              {isArabic ? 'الحدث القادم' : 'Next on the water'}
            </span>
            <h3 className="mt-1.5 text-xl sm:text-2xl lg:text-[1.7rem] font-black leading-tight text-balance">
              {product.title[isArabic ? 'ar' : 'en']}
            </h3>
          </div>

          {/* Live tier scarcity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {tiers.map((tier) => {
              const ratio = tier.capacityRemaining / tier.capacityTotal;
              const critical = ratio <= 0.15;
              return (
                <div
                  key={tier.id}
                  className="rounded-xl bg-white/[0.07] backdrop-blur-sm border border-white/12 px-3 py-2.5"
                >
                  <p className="text-[11px] font-bold truncate">{tier.name[isArabic ? 'ar' : 'en']}</p>
                  <p
                    className={`text-[11px] font-black tabular-nums mt-1 ${
                      critical ? 'text-rose-300' : 'text-amber-300'
                    }`}
                  >
                    {isArabic
                      ? `${tier.capacityRemaining} من ${tier.capacityTotal} متبقٍ`
                      : `${tier.capacityRemaining} of ${tier.capacityTotal} left`}
                  </p>
                  <div className="mt-1.5 h-1 rounded-full bg-white/15 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        critical
                          ? 'bg-gradient-to-r from-rose-500 to-rose-400'
                          : 'bg-gradient-to-r from-[#D4AF37] to-amber-300'
                      }`}
                      style={{ width: `${Math.round((1 - ratio) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div>
              <p className="inline-flex items-center gap-1 text-lg font-black tabular-nums">
                {isArabic ? 'من' : 'From'} {entryPrice.toLocaleString('en-US')}
                <SaudiRiyalSymbol size="sm" />
              </p>
              <p className="text-[11px] text-slate-300 tabular-nums">
                {isArabic
                  ? `أو ٤ × ${Math.ceil(entryPrice / 4)} مع تابي`
                  : `or 4 × ${Math.ceil(entryPrice / 4)} with Tabby`}
              </p>
            </div>
            <Link
              href={`/${locale}/${product.category}/${product.id}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#E8C558] to-[#B8860B] px-5 py-2.5 text-sm font-black text-[#04141A] shadow-lg shadow-black/30 hover:-translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02090C]"
            >
              {isArabic ? 'اختر فئتك' : 'Reserve a tier'}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================= */
/* Lane tile: compact, live count, one clear action               */
/* ============================================================= */

const ACCENTS = {
  cyan: {
    icon: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
    hover: 'hover:border-cyan-500/60 dark:hover:border-cyan-400/60',
    bar: 'bg-gradient-to-r from-cyan-500 to-cyan-300',
  },
  sky: {
    icon: 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400',
    hover: 'hover:border-sky-500/60 dark:hover:border-sky-400/60',
    bar: 'bg-gradient-to-r from-sky-500 to-sky-300',
  },
} as const;

function LaneTile({
  product,
  locale,
  accent,
  icon,
  eyebrow,
  heading,
  href,
  cta,
  pills,
  trust,
}: {
  product: LuxuryProduct;
  locale: string;
  accent: keyof typeof ACCENTS;
  icon: React.ReactNode;
  eyebrow: string;
  heading: string;
  href: string;
  cta: string;
  pills?: { en: string; ar: string }[];
  trust?: { en: string; ar: string };
}) {
  const isArabic = locale === 'ar';
  const theme = ACCENTS[accent];
  const scarcest = scarcestTierOf(product);
  const entryPrice = entryPriceOf(product);

  return (
    <article
      className={`group h-full flex flex-col justify-between gap-4 rounded-3xl bg-white dark:bg-[#071E26]/90 border border-slate-200 dark:border-white/10 ${theme.hover} p-5 shadow-lg transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${theme.icon}`}>
            {icon}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 text-end">
            {eyebrow}
          </span>
        </div>

        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{heading}</h3>

        {/* Live scarcity — the reason to act */}
        {scarcest && (
          <div>
            <p className="text-[12px] font-black tabular-nums text-rose-600 dark:text-rose-400">
              {isArabic
                ? `${scarcest.tier.name.ar}: ${scarcest.remaining} من ${scarcest.total} متبقٍ`
                : `${scarcest.tier.name.en}: ${scarcest.remaining} of ${scarcest.total} left`}
            </p>
            <div className="mt-1.5 h-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full ${theme.bar}`}
                style={{ width: `${Math.round((1 - scarcest.ratio) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {pills && (
          <div className="flex flex-wrap gap-1.5">
            {pills.map((pill) => (
              <span
                key={pill.en}
                className="rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-1 text-[10px] font-bold text-slate-700 dark:text-slate-300"
              >
                {isArabic ? pill.ar : pill.en}
              </span>
            ))}
          </div>
        )}

        {trust && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isArabic ? trust.ar : trust.en}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
        <span className="inline-flex items-center gap-1 text-sm font-black text-slate-900 dark:text-white tabular-nums">
          {isArabic ? 'من' : 'From'} {entryPrice.toLocaleString('en-US')}
          <SaudiRiyalSymbol size="xs" />
        </span>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 dark:bg-white px-3.5 py-2 text-[11px] font-black text-white dark:text-slate-900 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white"
        >
          {cta}
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

/* ============================================================= */
/* Slow lane: allocation, not urgency. Concierge, never a cart.   */
/* ============================================================= */

function SlowLaneBand({ rows, locale }: { rows: AllocationRow[]; locale: string }) {
  const isArabic = locale === 'ar';
  const headline = rows.slice(0, 3);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#071E26] via-[#092B37] to-[#04141A] p-6 sm:p-8 lg:p-10 text-white shadow-2xl">
      {/* Embossed gold field */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 22px)',
        }}
      />
      <div className="absolute -top-24 -end-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22),transparent_65%)] pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-7 items-center">
        <div className="space-y-3.5">
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#D4AF37]">
            <KeyRound className="w-3.5 h-3.5" />
            {isArabic ? 'بالدعوة والتحقق فقط' : 'Invitation & vetted KYC only'}
          </span>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-balance">
            {isArabic
              ? 'المفتاح الذهبي وعقود شاليهات أبحر'
              : 'The Gold Key & Obhur chalet leases'}
          </h3>

          <p className="text-sm text-slate-300 font-light leading-relaxed max-w-xl">
            {isArabic
              ? 'دخول غير محدود لأربعة منتجعات خاصة، أولوية في مراسي اليخوت، ودعوات حصرية للحفلات الملكية. لا يُباع عبر السلة.'
              : 'Unlimited access to four private resorts, priority yacht mooring, and invitation-only galas. Not sold through a cart.'}
          </p>
        </div>

        <div className="space-y-4">
          {/* Allocation, stated plainly */}
          <ul className="space-y-2">
            {headline.map((row) => (
              <li
                key={row.tier.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-black/30 border border-white/10 px-3.5 py-2.5"
              >
                <span className="text-[11px] font-semibold text-slate-300 truncate">
                  {row.tier.name[isArabic ? 'ar' : 'en']}
                </span>
                <span className="text-[11px] font-black tabular-nums text-[#F0D98A] shrink-0">
                  {isArabic
                    ? `${row.remaining} من ${row.total}`
                    : `${row.remaining} of ${row.total}`}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="#real-estate"
            className="group flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/50 bg-transparent px-5 py-3 text-sm font-black text-[#F0D98A] hover:bg-[#D4AF37]/12 hover:border-[#D4AF37] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071E26]"
          >
            {isArabic ? 'اطلب معاينة خاصة' : 'Request a private viewing'}
            <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
          <p className="text-center text-[10px] text-slate-400">
            {isArabic ? 'لا توجد سلة شراء · رد خلال 24 ساعة' : 'No cart. Callback within 24 hours.'}
          </p>
        </div>
      </div>
    </div>
  );
}
