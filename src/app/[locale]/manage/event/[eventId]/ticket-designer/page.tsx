'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import { FileBadge, QrCode, Sparkles, Check } from 'lucide-react';

export default function TicketDesignerPage() {
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data } = useData();

  const event = data.events.find((e) => e.id === eventId) || data.events[0];
  const ticket = data.tickets.find((t) => t.event_id === eventId) || data.tickets[0];

  const [accentColor, setAccentColor] = useState('#2563eb');
  const [showQr, setShowQr] = useState(true);
  const [showLogo, setShowLogo] = useState(true);

  const eventTitle = getLocalizedText(event.title, locale);
  const ticketTitle = getLocalizedText(ticket?.title, locale) || 'General Admission';
  const venueName = getLocalizedText(event.location_venue_name, locale) || 'Main Hall';

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {tNav('ticketDesigner')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize the visual styling of digital passes and printable PDF tickets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Controls Column */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Design Controls
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200"
              />
              <span className="font-mono text-xs text-slate-600 dark:text-slate-300 uppercase">
                {accentColor}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={showQr}
                onChange={(e) => setShowQr(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>Display QR Verification Code</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={showLogo}
                onChange={(e) => setShowLogo(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>Show Event Cover Banner</span>
            </label>
          </div>
        </div>

        {/* Live Ticket Pass Preview (2 cols) */}
        <div className="md:col-span-2 flex items-center justify-center p-6 bg-slate-100 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            {showLogo && (
              <div className="h-32 bg-slate-200 relative overflow-hidden">
                <img
                  src={event.cover_image_url}
                  alt={eventTitle}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute bottom-0 inset-x-0 h-2"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            )}

            <div className="p-6 space-y-4 text-center">
              <div>
                <span
                  className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white inline-block mb-2"
                  style={{ backgroundColor: accentColor }}
                >
                  {ticketTitle}
                </span>
                <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                  {eventTitle}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(event.start_date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {showQr && (
                <div className="py-2 flex flex-col items-center">
                  <div className="p-3 bg-white rounded-2xl shadow-xs border border-slate-100 inline-block">
                    <QrCode className="w-28 h-28 text-slate-900" />
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 mt-2 font-bold tracking-wider">
                    PASS-7311-202A
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-xs text-left grid grid-cols-2 gap-2 text-slate-500">
                <div>
                  <span className="text-[10px] text-slate-400 block">Attendee:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Alex Morgan</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Venue:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                    {venueName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
