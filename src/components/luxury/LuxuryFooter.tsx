'use client';

import React from 'react';
import Link from 'next/link';
import { Anchor, ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { asset } from '@/lib/basePath';

export function LuxuryFooter({ locale = 'en' }: { locale?: string }) {
  const isArabic = locale === 'ar';

  return (
    <footer className="w-full bg-slate-100 dark:bg-[#020709] border-t border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      {/* Top Banner: Saudi Hospitality & Trust */}
      <div className="border-b border-slate-200 dark:border-white/5 py-8 bg-slate-200/50 dark:bg-[#040E13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-[#b8860b]/30 dark:border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#b8860b] dark:text-[#D4AF37]" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-xs">{isArabic ? 'تصاريح حرس الحدود' : 'Coast Guard Permitted'}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{isArabic ? 'تصاريح إبحار فورية ومعتمدة' : 'Instant maritime manifest approval'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-xs">{isArabic ? 'فواتير ضريبية نظامية' : 'ZATCA Phase 2 E-Invoicing'}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{isArabic ? 'شفافية ضريبية 15% كاملة' : 'Transparent 15% VAT & QR receipt'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-xs">{isArabic ? 'ضيافة فاخرة موثوقة' : 'Certified Luxury Fleet'}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{isArabic ? 'طواقم بحرية وفندقية مرخصة' : 'Master 200GT captains & VIP crew'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
              <Anchor className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-xs">{isArabic ? 'رؤية 2030 للسياحة البحرية' : 'Saudi Vision 2030'}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{isArabic ? 'تطوير وتنشيط شواطئ عروس البحر' : 'Championing Red Sea eco-tourism'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Bio */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/10 via-sky-500/20 to-teal-500/10 dark:bg-white/5 border border-cyan-500/20 dark:border-white/10 flex items-center justify-center p-1 shrink-0">
              <img src={asset('/brand/logo-icon.png')} alt="jeddah Events" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-wider">
              {isArabic ? 'فعاليات' : 'jeddah EVENTS'}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
            {isArabic
              ? 'المنصة الرائدة لحجز الفعاليات الساحلية، الشواطئ الخاصة، اليخوت الفاخرة، والعقارات الشاطئية في جدة والمملكة.'
              : 'The premier luxury portal for coastal concerts, private beach retreats, superyacht charters, and beachfront residential leases across Jeddah.'}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#b8860b] dark:text-[#D4AF37] font-semibold">
              CR: 4030298102
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-semibold">
              VAT: 310928371900003
            </span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs tracking-wider uppercase">
            {isArabic ? 'الأقسام والتجارب' : 'Experience Verticals'}
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href={`/${locale}/#events`} className="hover:text-[#b8860b] dark:hover:text-[#D4AF37] transition-colors">{isArabic ? 'حفلات ومهرجانات الشاطئ' : 'Concerts & Coastal Festivals'}</Link></li>
            <li><Link href={`/${locale}/#day-passes`} className="hover:text-[#b8860b] dark:hover:text-[#D4AF37] transition-colors">{isArabic ? 'أيام السيدات والشواطئ الخاصة' : 'Ladies-Only Days & Day Passes'}</Link></li>
            <li><Link href={`/${locale}/#voyages`} className="hover:text-[#b8860b] dark:hover:text-[#D4AF37] transition-colors">{isArabic ? 'رحلات بياضة وتأجير اليخوت' : 'Bayada Reef & Yacht Charters'}</Link></li>
            <li><Link href={`/${locale}/#real-estate`} className="hover:text-[#b8860b] dark:hover:text-[#D4AF37] transition-colors">{isArabic ? 'عضويات VIP وشاليهات للإيجار' : 'VIP Memberships & Chalet Leases'}</Link></li>
          </ul>
        </div>

        {/* Marinas & Ports */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs tracking-wider uppercase">
            {isArabic ? 'المراسي والمواقع' : 'Marinas & Locations'}
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><span className="text-slate-600 dark:text-slate-300">Jeddah Yacht Club & Marina (الكورنيش)</span></li>
            <li><span className="text-slate-600 dark:text-slate-300">North Obhur Waterfront (أبحر الشمالية)</span></li>
            <li><span className="text-slate-600 dark:text-slate-300">Durrat Al Arus Pier (درة العروس)</span></li>
            <li><span className="text-slate-600 dark:text-slate-300">Bayada Island Coral Reef (جزيرة بياضة)</span></li>
          </ul>
        </div>

        {/* Payment Methods & Legal */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs tracking-wider uppercase">
            {isArabic ? 'طرق الدفع المعتمدة' : 'Accepted Saudi Payments'}
          </h4>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {[
              { name: 'Mada', src: asset('/payments/Mada_Logo.png') },
              { name: 'Apple Pay', src: asset('/payments/Apple_Pay.png') },
              { name: 'Visa', src: asset('/payments/Visa_Logo.png') },
              { name: 'Mastercard', src: asset('/payments/Mastercard-Logo.png') },
              { name: 'STC Pay', src: asset('/payments/Stc_pay.png') },
              { name: 'Tamara', src: asset('/payments/taamara.png') },
              { name: 'Tabby', src: asset('/payments/tabby-logo.png') },
            ].map((p) => (
              <div
                key={p.name}
                className="h-8 px-2.5 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center transition-transform hover:scale-105"
                title={p.name}
              >
                <img src={p.src} alt={p.name} className="h-4.5 max-w-[52px] object-contain" />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
            {isArabic
              ? 'جميع المعاملات المالية مشفرة وفق أعلى معايير الأمان المصرفي والبنك المركزي السعودي (ساما).'
              : 'All transactions are 256-bit SSL encrypted and compliant with Saudi Central Bank (SAMA) standards.'}
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-200 dark:border-white/5 py-4 text-center text-[10px] text-slate-500 dark:text-slate-400">
        <p>© 2026 Red Sea Marine & Luxury Coastal Experiences Platform. All rights reserved. Kingdom of Saudi Arabia.</p>
      </div>
    </footer>
  );
}
