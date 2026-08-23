'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface RelaxedVideoHeroProps {
  locale: string;
}

const PHRASES = {
  ar: [
    {
      prefix: 'استرخِ مع',
      suffix: 'هدوء البحر',
      subtitle: 'ملاذ هادئ، شواطئ استكنان',
    },
    {
      prefix: 'عِش سكينة',
      suffix: 'أمواج جدة',
      subtitle: 'شواطئ خاصة للسيدات والعائلات',
    },
    {
      prefix: 'تنفّس نقاء',
      suffix: 'أفق البحر الأحمر',
      subtitle: 'يخوت استثنائية، رحلات بحرية ولحظات غروب لا تُنسى.',
    },
  ],
  en: [
    {
      prefix: 'Find Your Calm',
      suffix: 'on the Water.',
      subtitle: 'Private beach sanctuaries, peaceful charters, and serene coastal escapes in Jeddah.',
    },
    {
      prefix: 'Breathe the Silence',
      suffix: 'of the Red Sea.',
      subtitle: 'Ladies-only retreats, overwater cabanas, and infinity pools on the shore.',
    },
    {
      prefix: 'Embrace Serenity',
      suffix: 'along the Coast.',
      subtitle: 'Catamaran reef expeditions, superyacht voyages, and starlit sea breezes.',
    },
  ],
};

export function RelaxedVideoHero({ locale }: RelaxedVideoHeroProps) {
  const isArabic = locale === 'ar';
  const prefersReduced = useReducedMotion() ?? false;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth 3-phrase relaxing loop cycle — slow and serene (10-second interval)
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 3);
    }, 6000);

    return () => clearInterval(interval);
  }, [prefersReduced]);

  const activePhrases = isArabic ? PHRASES.ar : PHRASES.en;
  const currentPhrase = activePhrases[currentIndex];

  const fade = (delay: number) => ({
    initial: prefersReduced ? undefined : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center text-white">
      {/* ---------- Full Height Looping Wave Video Background ---------- */}
      <div className="absolute inset-0 -z-10 overflow-hidden w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>

        {/* Soft tranquil ocean tint with light shadow and seamless bottom blend */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Top spacer to balance the floating navbar */}
      <div className="w-full h-20 sm:h-24 shrink-0" aria-hidden="true" />

      {/* ---------- Ultra-Clean Hero Content (Vertically Centered) ---------- */}
      <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8 w-full">
          {/* Subtle Tagline */}
          <motion.p
            {...fade(0.1)}
            className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium"
          >
            {isArabic ? 'أبحر البحر الأحمر • جدة' : 'Red Sea • Jeddah'}
          </motion.p>

          {/* Deep Relaxing Headline & Subtitle with Very Slow Calm Fade Loop */}
          <div className="min-h-[200px] sm:min-h-[230px] md:min-h-[260px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={prefersReduced ? undefined : { opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -10, filter: 'blur(10px)' }}
                transition={{
                  duration: 2.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center space-y-4 sm:space-y-5"
              >
                {/* Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-tight text-white flex flex-col items-center">
                  <span className="block font-thin">{currentPhrase.prefix}</span>
                  <span className="font-medium bg-gradient-to-r from-white via-[#F5D982] to-[#D4AF37] bg-clip-text text-transparent">
                    {currentPhrase.suffix}
                  </span>
                </h1>

                {/* Synchronized Calm Subtitle */}
                <p className="text-sm sm:text-base text-slate-300 font-light max-w-lg leading-relaxed text-balance">
                  {currentPhrase.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Simple CTA */}
          <motion.div {...fade(0.4)} className="pt-2">
            <Link
              href="#day-passes"
              className="group inline-flex items-center gap-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md px-8 py-3.5 text-sm font-medium text-white transition-all hover:scale-105"
            >
              <span>{isArabic ? 'استكشف التجارب' : 'Explore Beaches'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ---------- Bottom Discreet Scroll Down Indicator ---------- */}
      <motion.div
        {...fade(0.6)}
        className="w-full pb-6 sm:pb-8 flex justify-center shrink-0"
      >
        <Link
          href="#day-passes"
          aria-label="Scroll down"
          className="text-slate-400 hover:text-white transition-colors animate-pulse p-2"
        >
          <ChevronDown className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}
