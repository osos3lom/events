'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, Tag, Gift, Flame } from 'lucide-react';
import { AllocationRow, tierUrl, totalTierCount, fastLaneEntryPrice } from '../../lib/allocation';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';
import { CircularPieTin } from '../common/CircularPieTin';

/** Tabby and Tamara split into four. Only offered where the ticket price makes sense. */
const BNPL_CEILING_SAR = 5000;

interface AllocationBoardProps {
  rows: AllocationRow[];
  locale: string;
}

export function AllocationBoard({ rows, locale }: AllocationBoardProps) {
  const isArabic = locale === 'ar';
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <motion.aside
      initial={prefersReduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-3xl border border-[#D4AF37]/30 bg-[#031015]/85 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] overflow-hidden"
      aria-labelledby="allocation-board-heading"
    >
      {/* Gold top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

      {/* Header — Limited Offers */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 pt-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-3 h-3" />
          </div>
          <h2
            id="allocation-board-heading"
            className="text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] text-[#D4AF37]"
          >
            {isArabic ? 'عروض وتجارب محدودة' : 'Limited Offers'}
          </h2>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
          <span className="relative flex h-1.5 w-1.5">
            {!prefersReduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
          </span>
          {isArabic ? 'مزايا حصرية' : 'Exclusive Deals'}
        </span>
      </div>

      {/* Rows */}
      <ul className="divide-y divide-white/[0.07]">
        {rows.map((row, index) => (
          <BoardRow
            key={row.tier.id}
            row={row}
            locale={locale}
            index={index}
            prefersReduced={prefersReduced}
          />
        ))}
      </ul>

      {/* Footer */}
      <Link
        href={`#events`}
        className="group flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-t border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-inset"
      >
        <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
          {isArabic
            ? `جميع العروض المحدودة (${totalTierCount()}) — تبدأ من ${fastLaneEntryPrice()}`
            : `All ${totalTierCount()} limited offers — from ${fastLaneEntryPrice()}`}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37]">
          <SaudiRiyalSymbol size="xs" />
          <ChevronRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
        </span>
      </Link>
    </motion.aside>
  );
}

interface BoardRowProps {
  row: AllocationRow;
  locale: string;
  index: number;
  prefersReduced: boolean;
}

function BoardRow({ row, locale, index, prefersReduced }: BoardRowProps) {
  const isArabic = locale === 'ar';
  const { product, tier, remaining, total, ratio } = row;

  const soldPercent = Math.round((1 - ratio) * 100);
  const isCritical = ratio <= 0.15;
  const accent = isCritical ? 'text-rose-300' : 'text-amber-300';

  const showSplit = tier.price <= BNPL_CEILING_SAR;
  const splitAmount = Math.ceil(tier.price / 4);

  // Extract special perk highlight for Limited Offer display
  const primaryPerk = tier.perks?.[0]?.[isArabic ? 'ar' : 'en'] || product.badge?.[isArabic ? 'ar' : 'en'];

  return (
    <li>
      <Link
        href={tierUrl(locale, row)}
        className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 gap-y-2 px-4 sm:px-5 py-3.5 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-inset"
      >
        {/* Leftmost Column: Circular Pie Tin Radial Dial */}
        <div className="shrink-0 pt-0.5">
          <CircularPieTin
            percentage={soldPercent}
            size={38}
            strokeWidth={3.8}
            isCritical={isCritical}
            showPercentInside={true}
          />
        </div>

        {/* Center: Product, Tier & Special Offer Badge */}
        <div className="min-w-0">
          <p className="text-[13px] sm:text-sm font-bold text-white leading-snug truncate">
            {tier.name[isArabic ? 'ar' : 'en']}
          </p>

          <p className="text-[11px] text-slate-400 leading-snug truncate mt-0.5">
            {product.title[isArabic ? 'ar' : 'en']}
          </p>

          {/* Featured Perk / Offer Tag */}
          {primaryPerk && (
            <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-400/10 text-amber-200 border border-amber-400/25 truncate max-w-full">
              <Gift className="w-2.5 h-2.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{primaryPerk}</span>
            </div>
          )}
        </div>

        {/* Right: Price & Quota */}
        <div className="text-end shrink-0">
          <p className={`text-[11px] font-black tabular-nums ${accent} leading-none`}>
            {isArabic ? `بقي ${remaining} فقط` : `Only ${remaining} left`}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-none">
            {isArabic ? `${total} مقعد متاح` : `of ${total} total`}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-white tabular-nums">
            {tier.price.toLocaleString('en-US')}
            <SaudiRiyalSymbol size="xs" />
          </p>
          {showSplit && (
            <p className="text-[10px] text-slate-400 mt-0.5 tabular-nums">
              {isArabic ? `أو ٤ × ${splitAmount}` : `or 4 × ${splitAmount}`}
            </p>
          )}
        </div>

        {/* Action Button */}
        <span className="col-span-3 sm:col-span-1 sm:col-start-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#E07A5F] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-950 group-hover:opacity-90 transition-all shadow-sm">
          {isArabic ? 'احجز العرض' : 'Claim Offer'}
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
        </span>
      </Link>
    </li>
  );
}
