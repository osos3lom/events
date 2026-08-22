'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '../../../../../i18n/routing';
import { useData } from '../../../../../context/DataContext';
import { LanguageSwitcher } from '../../../../../components/common/LanguageSwitcher';
import { Badge } from '../../../../../components/common/Badge';
import { getLocalizedText } from '../../../../../lib/localeUtils';
import {
  QrCode,
  Calendar,
  MapPin,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export default function AttendeeProductPassPage() {
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const attendeeShortId = String(params?.attendeeShortId || '');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const { data } = useData();

  const event = data.events.find((e) => e.id === eventId) || data.events[0];
  const attendee = useMemo(
    () =>
      data.attendees.find(
        (a) =>
          a.short_id.toUpperCase() === attendeeShortId.toUpperCase() ||
          a.id === attendeeShortId
      ) || data.attendees[0],
    [data.attendees, attendeeShortId]
  );

  if (!attendee) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center text-sm">
        Pass not found.
      </div>
    );
  }

  const startDate = new Date(event.start_date);
  const eventTitle = getLocalizedText(event.title, locale);
  const ticketTitle = getLocalizedText(attendee.ticket_title, locale);
  const venueName = getLocalizedText(event.location_venue_name, locale) || (isRtl ? 'عبر الإنترنت' : 'Online');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6">
      {/* Header */}
      <div className="w-full max-w-sm flex items-center justify-between py-2">
        <Link
          href={`/e/${event.id}/${event.slug}`}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isRtl ? 'معلومات الفعالية' : 'Event Info'}</span>
        </Link>
        <LanguageSwitcher />
      </div>

      {/* Digital Mobile Pass Card */}
      <div className="w-full max-w-sm bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 my-auto">
        {/* Cover Banner */}
        <div className="relative h-36 bg-gradient-to-tr from-blue-700 to-indigo-600 overflow-hidden">
          <img
            src={event.cover_image_url}
            alt={eventTitle}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] font-black tracking-widest uppercase bg-blue-600 text-white px-2.5 py-0.5 rounded-full inline-block mb-1">
              {ticketTitle}
            </span>
            <h2 className="text-white font-black text-sm line-clamp-1 leading-snug">
              {eventTitle}
            </h2>
          </div>
        </div>

        {/* Pass Body */}
        <div className="p-6 space-y-5 text-center">
          {/* QR Code Container */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner">
            <QrCode className="w-40 h-40 text-slate-900 mx-auto" />
            <span className="font-mono text-xs font-bold text-slate-600 tracking-wider block mt-2" dir="ltr">
              {attendee.barcode}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
              {isRtl ? 'حامل التصريح' : 'Ticket Holder'}
            </span>
            <h3 className="font-black text-xl text-slate-900 mt-0.5">
              {attendee.first_name} {attendee.last_name}
            </h3>
            <p className="text-xs text-slate-500" dir="ltr">{attendee.email}</p>
          </div>

          <div className="pt-3 border-t border-dashed border-slate-200 grid grid-cols-2 gap-3 text-left rtl:text-right text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                {isRtl ? 'الموعد' : 'Date & Time'}
              </span>
              <p className="font-bold text-slate-800">
                {startDate.toLocaleDateString(locale === 'ar' ? 'ar-EG' : undefined, { month: 'short', day: 'numeric' })}
              </p>
              <p className="text-[11px] text-slate-500">
                {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                {isRtl ? 'المكان' : 'Venue'}
              </span>
              <p className="font-bold text-slate-800 truncate">
                {venueName}
              </p>
              <p className="text-[11px] text-slate-500">{attendee.seat || 'GA'}</p>
            </div>
          </div>

          <div className="pt-2">
            <Badge variant={attendee.checked_in ? 'success' : 'blue'}>
              {attendee.checked_in ? (isRtl ? 'تم تسجيل الدخول' : 'Already Checked In') : (isRtl ? 'تصريح دخول صالح' : 'Valid Entry Pass')}
            </Badge>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500 py-3">
        {isRtl ? 'يرجى إبراز رمز الباركود عند بوابات الدخول للتحقق الفوري.' : 'Present this barcode at the entrance gates for quick verification.'}
      </div>
    </div>
  );
}
