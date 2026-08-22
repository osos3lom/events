'use client';

import React from 'react';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { DemoResetButton } from '../common/DemoResetButton';
import { ThemeToggle } from '../common/ThemeToggle';
import { Link } from '../../i18n/routing';
import { QrCode } from 'lucide-react';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Form Panel */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative z-10 bg-white dark:bg-[#0c1a2c]">
        {/* Header / Logo */}
        <div className="flex items-center justify-between w-full">
          <Link href="/manage/events" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition shrink-0">
              <img src="/brand/logo-icon.png" alt="jeddah Events" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-foreground tracking-tight text-lg leading-none">
                jeddah Events
              </span>
              <span className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mt-0.5">
                Calm • Coastal • Voyages
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2.5">
            <DemoResetButton />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Form Content Area */}
        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-[420px]">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/60">
          &copy; {new Date().getFullYear()} Hi.Events Platform. All rights reserved.
        </div>
      </div>

      {/* Right Hero & Ticket Showcase Panel (Desktop) */}
      <div className="hidden lg:flex lg:w-[50%] xl:w-[55%] relative overflow-hidden bg-gradient-to-b from-[#181126] to-[#0e071c] text-white flex-col justify-between p-12 xl:p-16">
        {/* Orbital Background Rings */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-white/10" />
        </div>

        {/* Hero Title */}
        <div className="relative z-10 animate-hi-rise">
          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight">
            Events built for <br />
            <span className="text-accent font-light italic font-serif">extraordinary</span> experiences.
          </h2>
        </div>

        {/* Floating Ticket Scene */}
        <div className="relative z-10 my-auto py-8 flex justify-center items-center">
          {/* Shadow Ghost Card */}
          <div className="absolute w-[400px] h-[210px] rounded-[18px] bg-white/5 border border-white/10 -rotate-6 -translate-x-4 translate-y-4 pointer-events-none" />

          {/* Main Floating Ticket */}
          <div className="relative w-[420px] rounded-[18px] shadow-ticket animate-hi-float hi-ticket-mask bg-gradient-to-b from-white to-[#f6f4f9] text-[#181126] p-0 overflow-hidden">
            <div className="grid grid-cols-[1fr_118px]">
              {/* Main Ticket Body */}
              <div className="p-5 pr-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-1">
                    <span>VIP PASS</span>
                    <span>#HI-89201</span>
                  </div>
                  <h3 className="font-black text-xl tracking-tight text-primary leading-tight truncate">
                    Global Tech Summit 2026
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Metropolitan Arena • Hall A
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 my-3">
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">DATE</span>
                    <strong className="text-xs font-bold text-primary">OCT 14, 2026</strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">DOORS OPEN</span>
                    <strong className="text-xs font-bold text-primary">09:00 AM</strong>
                  </div>
                </div>

                {/* Barcode Graphic */}
                <div className="h-6 w-4/5 opacity-80 bg-[repeating-linear-gradient(90deg,#181126_0_2px,transparent_2px_5px),repeating-linear-gradient(90deg,#181126_0_1px,transparent_1px_8px)]" />
              </div>

              {/* Ticket Stub with QR */}
              <div className="border-l-[1.5px] border-dashed border-black/20 p-4 flex flex-col items-center justify-between text-center bg-[#faf9fc]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">GATE 02</span>
                <QrCode className="w-14 h-14 text-primary opacity-90 my-1" />
                <span className="font-mono text-[9px] font-bold tracking-wider text-primary">SEAT A-12</span>
              </div>
            </div>

            {/* Authentic Stamp */}
            <div className="absolute top-[28%] right-[22%] z-20 px-3 py-1 border-4 border-double border-accent text-accent bg-accent/10 rounded-lg font-black text-xs uppercase tracking-widest -rotate-12 animate-hi-stamp shadow-xs">
              CONFIRMED
            </div>
          </div>
        </div>

        {/* Live Marquee Ticker */}
        <div className="relative z-10 border-t border-white/10 pt-4 flex items-center overflow-hidden">
          <div className="flex items-center gap-8 animate-hi-ticker whitespace-nowrap text-[11px] font-mono tracking-widest uppercase text-white/50">
            <span>• REAL-TIME CHECK-IN</span>
            <span>• ZERO PLATFORM FEES</span>
            <span>• SELF-HOSTED PRIVACY</span>
            <span>• CUSTOM TICKET DESIGNER</span>
            <span>• MULTI-CURRENCY CHECKOUT</span>
            <span>• QR CODE SCANNER</span>
            <span>• REAL-TIME CHECK-IN</span>
            <span>• ZERO PLATFORM FEES</span>
          </div>
        </div>
      </div>
    </div>
  );
};
