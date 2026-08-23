'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Compass, ShoppingBag, Sparkles, Anchor, Ticket, Home, Globe, PhoneCall, Shield, ArrowRight } from 'lucide-react';
import { useBookingStore } from '../../lib/bookingStore';
import { ThemeToggle } from '../common/ThemeToggle';

interface LuxuryNavbarProps {
  locale?: string;
  onOpenCart?: () => void;
}

export function LuxuryNavbar({ locale = 'en', onOpenCart }: LuxuryNavbarProps) {
  const isArabic = locale === 'ar';
  const pathname = usePathname();
  const router = useRouter();
  const { pricing, setIsCheckoutOpen } = useBookingStore();

  const switchLocale = (newLocale: 'en' | 'ar') => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath || `/${newLocale}`);
  };

  // Simplified one-word navigation items
  const navLinks = [
    {
      href: `/${locale}/events`,
      labelEn: 'Events',
      labelAr: 'فعاليات',
      icon: <Ticket className="w-4 h-4 text-amber-500 dark:text-amber-400" />
    },
    {
      href: `/${locale}/voyages`,
      labelEn: 'Voyages',
      labelAr: 'رحلات',
      icon: <Anchor className="w-4 h-4 text-sky-600 dark:text-sky-400" />
    },
    {
      href: `/${locale}/memberships`,
      labelEn: 'Memberships',
      labelAr: 'عضويات',
      icon: <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
  ];

  const handleCartClick = () => {
    if (onOpenCart) onOpenCart();
    else setIsCheckoutOpen(true);
  };

  return (
    <>
      {/* ==================================================================== */}
      {/* TOP FLOATING GLASSMORPHISM NAVBAR (DESKTOP & TABLET) */}
      {/* ==================================================================== */}
      <div className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
        <header className="max-w-7xl mx-auto pointer-events-auto rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-xl shadow-cyan-950/5 dark:shadow-black/50 text-slate-900 dark:text-white px-3.5 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300">
          {/* Left: Brand Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/15 via-sky-500/20 to-teal-500/15 dark:bg-white/10 border border-white/60 dark:border-white/20 flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/brand/logo-icon.png"
                alt="Jeddah Sea Events"
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm sm:text-base tracking-wider bg-gradient-to-r from-slate-950 via-cyan-900 to-cyan-700 dark:from-white dark:via-cyan-100 dark:to-cyan-400 bg-clip-text text-transparent uppercase">
                {isArabic ? 'اسم البراند' : 'JEDDAH SEA'}
              </span>
              <span className="text-[9px] tracking-widest text-cyan-700 dark:text-cyan-300 uppercase font-extrabold hidden sm:block">
                {isArabic ? 'تجارب ساحلية' : 'COASTAL VOYAGES'}
              </span>
            </div>
          </Link>

          {/* Center: Clean 1-Word Link Items with Smooth Hover Opacity */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-300 opacity-80 hover:opacity-100 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200"
              >
                {link.icon}
                <span>{isArabic ? link.labelAr : link.labelEn}</span>
              </Link>
            ))}
          </nav>

          {/* Right: Actions & Glowing Call-to-Action */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* VIP Concierge Phone */}
            <a
              href="tel:+966126548899"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 hover:border-cyan-500/40 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-[11px] font-semibold">{isArabic ? 'VIP' : 'VIP'}</span>
            </a>

            {/* Theme Toggle (Light / Dark) */}
            <ThemeToggle className="bg-white/40 dark:bg-white/10 border-white/50 dark:border-white/15 text-slate-700 dark:text-slate-200" />

            {/* Language Switcher */}
            <button
              onClick={() => switchLocale(isArabic ? 'en' : 'ar')}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 border border-white/50 dark:border-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-[11px]">{isArabic ? 'EN' : 'عربي'}</span>
            </button>

            {/* Glowing Call-to-Action Button */}
            <button
              onClick={handleCartClick}
              className="relative group overflow-hidden px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-[#D4AF37] hover:from-cyan-400 hover:to-[#dfbe47] text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/40 hover:shadow-cyan-400/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            >
              {/* Subtle glowing ambient aura */}
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <ShoppingBag className="w-4 h-4 text-slate-950 shrink-0" />
              <span className="relative z-10 hidden sm:inline">{isArabic ? 'احجز الآن' : 'Book Now'}</span>

              {pricing.totalItemCount > 0 && (
                <span className="relative z-10 w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center border-2 border-white dark:border-slate-950 animate-bounce">
                  {pricing.totalItemCount}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* ==================================================================== */}
      {/* BOTTOM FLOATING GLASSMORPHISM NAV (SMALL SCREENS / MOBILE) */}
      {/* ==================================================================== */}
      <nav className="fixed bottom-4 left-3 right-3 sm:left-6 sm:right-6 z-50 md:hidden pointer-events-auto">
        <div className="max-w-md mx-auto rounded-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-2xl shadow-cyan-950/25 dark:shadow-black/70 text-slate-900 dark:text-white px-3 py-2 flex items-center justify-between gap-1 transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center py-1 px-2 rounded-2xl text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 active:scale-95 transition-all"
            >
              <div className="p-1 rounded-xl bg-white/30 dark:bg-white/5 mb-0.5">
                {link.icon}
              </div>
              <span className="truncate">{isArabic ? link.labelAr : link.labelEn}</span>
            </Link>
          ))}

          {/* Quick Mobile Cart Floating Trigger */}
          <button
            onClick={handleCartClick}
            className="relative p-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-[#D4AF37] text-slate-950 shadow-lg shadow-cyan-500/40 hover:scale-105 active:scale-90 transition-transform cursor-pointer"
            aria-label="Cart and Checkout"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            {pricing.totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-black text-[9px] flex items-center justify-center border-2 border-white dark:border-slate-950">
                {pricing.totalItemCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
