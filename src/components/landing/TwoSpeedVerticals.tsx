'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { asset } from '@/lib/basePath';

interface TwoSpeedVerticalsProps {
  locale: string;
}

export function TwoSpeedVerticals({ locale }: TwoSpeedVerticalsProps) {
  const isArabic = locale === 'ar';
  const prefersReduced = useReducedMotion() ?? false;

  const reveal = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const experiences = [
    {
      id: 'retreats',
      href: '#day-passes',
      titleEn: 'Private Beach Retreats',
      titleAr: 'شواطئ وكبائن خاصة',
      descEn: 'Sunbeds, private cabanas, and dining credits along crystal-blue waters.',
      descAr: 'تصريح دخول لجلسات الشاطئ بخصوصية للسيدات والعائلات.',
      ctaEn: 'Explore',
      ctaAr: 'حجز الدخول',
    },
    {
      id: 'charters',
      href: '#voyages',
      titleEn: 'Private Sea Charters',
      titleAr: 'رحلات اليخوت الخاصة',
      descEn: 'Sunset catamaran cruises, private yachts, and vibrant coastal voyages.',
      descAr: 'إبحار وقت الغروب، ويخوت خاصة ومغامرات بحرية لا تُنسى.',
      ctaEn: 'Explore',
      ctaAr: 'احجز رحلتك',
    },
    {
      id: 'yoga',
      href: '#events',
      titleEn: 'Beach Yoga & Wellness',
      titleAr: 'يوغا الشاطئ',
      descEn: 'Mindful sunrise and sunset yoga sessions directly on the serene sand.',
      descAr: 'جلسات يوغا وتأمل عند شروق الشمس وغروبها على الرمال.',
      ctaEn: 'Join',
      ctaAr: 'انضمي للجلسات',
    },
    {
      id: 'concerts',
      href: '#events',
      titleEn: 'Shoreline Concerts',
      titleAr: 'حفلات وأمسيات',
      descEn: 'Intimate coastal music nights, DJ sunset sessions, and live entertainment.',
      descAr: 'أمسيات موسيقية حية، وسهرات ساحرة.',
      ctaEn: 'Explore',
      ctaAr: 'استكشف',
    },
  ];

  return (
    <section className="relative isolate overflow-hidden w-full min-h-[100dvh] flex items-center justify-center py-12 sm:py-16 text-white">
      {/* ---------- Full Screen Video Background ---------- */}
      <div className="absolute inset-0 -z-10 overflow-hidden w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src={asset('/experiance.mp4')} type="video/mp4" />
        </video>

        {/* Shadow overlays blending seamlessly with hero above */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-50 dark:from-[#040C0E] via-slate-50/50 dark:via-[#040C0E]/50 to-transparent pointer-events-none" />
      </div>

      {/* ---------- Content Container ---------- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        
        {/* Header */}
        <motion.div {...reveal(0)} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-black/40 border border-white/20 text-[11px] font-medium text-[#F5D982] shadow-sm drop-shadow">
            <span>{isArabic ? 'حيث يلتقي الهدوء بالمغامرة' : 'Where Serenity Meets Adventure'}</span>
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            {isArabic ? (
              <>
                ملاذك <span className="font-medium bg-gradient-to-r from-[#F5D982] via-[#D4AF37] to-[#E07A5F] bg-clip-text text-transparent">لأجمل اللحظات</span>
              </>
            ) : (
              <>
                Seaside Paradise, <span className="font-medium italic font-serif bg-gradient-to-r from-white via-[#F5D982] to-[#D4AF37] bg-clip-text text-transparent">Endless Calm 🏖️</span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-100 font-light leading-relaxed max-w-md mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
            {isArabic
              ? 'من أمواج البحر إلى الاستجمام وجهة تجلب الراحة وتعيد النشاط'
              : 'From crystal-blue waters to serene moments on the sand.'}
          </p>
        </motion.div>

        {/* 4 Minimal Compact Cards (No icons, no tags) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {experiences.map((exp, idx) => (
            <motion.article
              key={exp.id}
              {...reveal(0.06 * (idx + 1))}
              className="group relative flex flex-col justify-between rounded-2xl bg-black/35 hover:bg-black/55 border border-white/20 hover:border-white/40 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg drop-shadow"
            >
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#F5D982] transition-colors drop-shadow">
                  {isArabic ? exp.titleAr : exp.titleEn}
                </h3>
                <p className="text-xs text-slate-200/90 font-light leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  {isArabic ? exp.descAr : exp.descEn}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href={exp.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5D982] group-hover:text-white transition-colors drop-shadow"
                >
                  <span>{isArabic ? exp.ctaAr : exp.ctaEn}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
