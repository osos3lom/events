'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '../../i18n/routing';
import { useData } from '../../context/DataContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { DemoResetButton } from '../common/DemoResetButton';
import { ThemeToggle } from '../common/ThemeToggle';
import { Badge } from '../common/Badge';
import { getLocalizedText } from '../../lib/localeUtils';
import {
  ArrowLeft,
  ArrowRight,
  LayoutDashboard,
  Ticket,
  ShoppingBag,
  Users,
  CheckSquare,
  Tag,
  HelpCircle,
  BarChart3,
  Mail,
  Settings,
  Code,
  FileBadge,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

export const EventLayout: React.FC<{
  eventId: string;
  children: React.ReactNode;
}> = ({ eventId, children }) => {
  const tNav = useTranslations('nav');
  const tEvents = useTranslations('events');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const pathname = usePathname();
  const { data } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const event = data.events.find((e) => e.id === eventId) || data.events[0];

  const subNavItems = [
    { label: tNav('dashboard'), href: `/manage/event/${eventId}/dashboard`, icon: LayoutDashboard },
    { label: tNav('tickets'), href: `/manage/event/${eventId}/products`, icon: Ticket },
    { label: tNav('orders'), href: `/manage/event/${eventId}/orders`, icon: ShoppingBag },
    { label: tNav('attendees'), href: `/manage/event/${eventId}/attendees`, icon: Users },
    { label: tNav('checkIn'), href: `/manage/event/${eventId}/check-in`, icon: CheckSquare },
    { label: tNav('promoCodes'), href: `/manage/event/${eventId}/promo-codes`, icon: Tag },
    { label: tNav('questions'), href: `/manage/event/${eventId}/questions`, icon: HelpCircle },
    { label: tNav('reports'), href: `/manage/event/${eventId}/reports`, icon: BarChart3 },
    { label: tNav('messages'), href: `/manage/event/${eventId}/messages`, icon: Mail },
    { label: tNav('settings'), href: `/manage/event/${eventId}/settings`, icon: Settings },
    { label: tNav('widget'), href: `/manage/event/${eventId}/widget`, icon: Code },
    { label: tNav('ticketDesigner'), href: `/manage/event/${eventId}/ticket-designer`, icon: FileBadge }
  ];

  if (!event) {
    return (
      <div className="p-8 text-center bg-canvas min-h-screen">
        <p className="text-muted-foreground">{tEvents('noEvents')}</p>
        <Link href="/manage/events" className="mt-4 inline-block text-primary font-medium underline">
          {tNav('backToEvents')}
        </Link>
      </div>
    );
  }

  const title = getLocalizedText(event.title, locale);
  const publicUrl = `/e/${event.id}/${event.slug}`;

  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0d1e34] dark:bg-[#070e17] text-white border-b border-cyan-500/10 shadow-topbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/manage/events"
              className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span className="hidden sm:inline">{tNav('backToEvents')}</span>
            </Link>

            <div className="h-5 w-px bg-white/20" />

            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg text-white truncate max-w-xs sm:max-w-sm md:max-w-md">
                {title}
              </h1>
              <Badge variant={event.status === 'LIVE' ? 'success' : 'gray'} size="sm">
                {event.status}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={publicUrl}
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-white/15 rounded-lg hover:bg-white/25 transition border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{tNav('publicPreview')}</span>
            </Link>
            <DemoResetButton className="hidden sm:inline-flex bg-white/10 text-white hover:bg-white/20 border-white/10" />
            <LanguageSwitcher />
            <ThemeToggle className="bg-white/10 text-white hover:bg-white/20 border-white/10" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Secondary Horizontal Navigation Bar */}
        <div className="hidden lg:block bg-card border-t border-border border-b text-foreground shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-1 rtl:space-x-reverse overflow-x-auto scrollbar-none py-2">
              {subNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                      isActive
                        ? 'bg-primary text-white shadow-xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3 bg-[#181126] grid grid-cols-2 gap-1.5">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive
                      ? 'bg-primary text-white font-semibold'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="col-span-2 pt-2 border-t border-white/10">
              <Link
                href={publicUrl}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-white bg-white/15 rounded-lg hover:bg-white/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{tNav('publicPreview')}</span>
              </Link>
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
