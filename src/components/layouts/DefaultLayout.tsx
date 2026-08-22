'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '../../i18n/routing';
import { useData } from '../../context/DataContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { DemoResetButton } from '../common/DemoResetButton';
import { ThemeToggle } from '../common/ThemeToggle';
import { getLocalizedText } from '../../lib/localeUtils';
import {
  Calendar,
  Building2,
  User,
  ShieldAlert,
  Menu,
  X,
} from 'lucide-react';

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const { data } = useData();
  const [mobileOpen, setMobileOpen] = useState(false);

  const orgName = getLocalizedText(data.organization.name, locale);

  const navItems = [
    { label: tNav('events'), href: '/manage/events', icon: Calendar },
    { label: tNav('account'), href: '/manage/account', icon: Building2 },
    { label: tNav('profile'), href: '/manage/profile', icon: User },
    { label: tNav('admin'), href: '/admin', icon: ShieldAlert }
  ];

  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col">
      {/* Top Header with Red Sea Maritime System */}
      <header className="sticky top-0 z-30 bg-[#0d1e34] dark:bg-[#070e17] text-white border-b border-cyan-500/10 shadow-topbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Org Selector */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/manage/events" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition shrink-0">
                <img src="/brand/logo-icon.png" alt="jeddah Events" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white tracking-tight text-base leading-none">
                  jeddah Events
                </span>
                <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider mt-0.5">
                  Maritime Management
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 mx-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow-xs border border-cyan-400/30'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.07]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-white/60" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <DemoResetButton className="hidden sm:inline-flex bg-white/10 text-white hover:bg-white/20 border-white/10" />
            <LanguageSwitcher />
            <ThemeToggle className="bg-white/10 text-white hover:bg-white/20 border-white/10" />

            {/* User Dropdown Preview */}
            <div className="flex items-center gap-2.5 px-2">
              <img
                src={data.user.avatar_url}
                alt={data.user.first_name}
                className="w-8 h-8 rounded-full object-cover border border-cyan-400/30 shadow-2xs"
              />
              <div className="hidden sm:flex flex-col text-start text-xs">
                <span className="font-semibold text-white leading-tight">
                  {data.user.first_name} {data.user.last_name}
                </span>
                <span className="text-cyan-300/70 text-[11px] leading-tight">
                  {orgName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3 bg-[#181126] space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-white/10">
              <DemoResetButton className="w-full justify-center bg-white/10 text-white hover:bg-white/20 border-white/10" />
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
