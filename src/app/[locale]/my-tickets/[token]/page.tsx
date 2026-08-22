'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../../i18n/routing';
import { useData } from '../../../../context/DataContext';
import { LanguageSwitcher } from '../../../../components/common/LanguageSwitcher';
import { ThemeToggle } from '../../../../components/common/ThemeToggle';
import { Badge } from '../../../../components/common/Badge';
import { getLocalizedText } from '../../../../lib/localeUtils';
import {
  Ticket,
  Calendar,
  MapPin,
  QrCode
} from 'lucide-react';

export default function MyTicketsPortalPage() {
  const params = useParams();
  const token = String(params?.token || '');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const { data } = useData();

  const attendees = data.attendees.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/manage/events" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-0.5 shadow-xs shrink-0">
              <img src="/brand/logo-icon.png" alt="jeddah Events" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white tracking-tight text-base">
              jeddah Events
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isRtl ? 'تذاكري المسجلة' : 'My Registered Tickets'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isRtl ? 'استعراض وتحميل تصاريح الدخول للفعاليات القادمة.' : 'Access, present, and download your passes for upcoming events.'}
          </p>
        </div>

        <div className="space-y-4">
          {attendees.map((attendee) => {
            const event = data.events.find((e) => e.id === attendee.event_id) || data.events[0];
            const eventTitle = getLocalizedText(event.title, locale);
            const ticketTitle = getLocalizedText(attendee.ticket_title, locale);
            const venueName = getLocalizedText(event.location_venue_name, locale) || (isRtl ? 'عبر الإنترنت' : 'Online');

            return (
              <div
                key={attendee.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-md transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={attendee.checked_in ? 'success' : 'blue'}>
                      {attendee.checked_in ? (isRtl ? 'تم الدخول' : 'Checked In') : (isRtl ? 'تذكرة نشطة' : 'Active Pass')}
                    </Badge>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {ticketTitle}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {eventTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(event.start_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{venueName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/product/${event.id}/${attendee.short_id}`}
                    target="_blank"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>{isRtl ? 'عرض الباركود والتصريح' : 'View Pass & Barcode'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="p-4 text-center text-xs text-slate-500">
        Hi.Events Attendee Portal
      </footer>
    </div>
  );
}
