'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '../../../../../i18n/routing';
import { useData } from '../../../../../context/DataContext';
import { LanguageSwitcher } from '../../../../../components/common/LanguageSwitcher';
import { ThemeToggle } from '../../../../../components/common/ThemeToggle';
import { DemoResetButton } from '../../../../../components/common/DemoResetButton';
import { Badge } from '../../../../../components/common/Badge';
import { getLocalizedText, formatEventDate, formatEventTime, formatCurrency } from '../../../../../lib/localeUtils';
import { asset } from '@/lib/basePath';
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Ticket,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

export default function PublicEventPage() {
  const t = useTranslations('events');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const params = useParams();
  const router = useRouter();
  const eventId = String(params?.eventId || '1');
  const { data } = useData();

  const event = data.events.find((e) => e.id === eventId) || data.events[0];
  const eventTickets = useMemo(
    () => data.tickets.filter((t) => t.event_id === event.id && t.is_active),
    [data.tickets, event.id]
  );

  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({});

  const totalSelectedTickets = Object.values(ticketQuantities).reduce((a, b) => a + b, 0);

  const handleQuantityChange = (ticketId: string, delta: number, max: number) => {
    const current = ticketQuantities[ticketId] || 0;
    const next = Math.max(0, Math.min(max, current + delta));
    setTicketQuantities((prev) => ({
      ...prev,
      [ticketId]: next
    }));
  };

  const handleCheckoutRedirect = () => {
    router.push(`/checkout/${event.id}`);
  };

  const title = getLocalizedText(event.title, locale);
  const summary = getLocalizedText(event.summary, locale);
  const description = getLocalizedText(event.description, locale);
  const organizerName = getLocalizedText(event.organizer_name, locale);
  const venueName = getLocalizedText(event.location_venue_name, locale);
  const venueAddress = getLocalizedText(event.location_address, locale);
  const onlineDetails = getLocalizedText(event.online_details, locale);

  const formattedDate = formatEventDate(event.start_date, locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedStartTime = formatEventTime(event.start_date, locale);
  const formattedEndTime = formatEventTime(event.end_date, locale);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Public Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/manage/events" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-0.5 shadow-xs shrink-0">
              <img src={asset('/brand/logo-icon.png')} alt="jeddah Events" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white tracking-tight text-base">
              jeddah Events
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <DemoResetButton />
            <ThemeToggle />
            <LanguageSwitcher />
            <Link
              href={`/manage/event/${event.id}/dashboard`}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              {isRtl ? 'لوحة تحكم المنظم' : 'Organizer Portal'}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Banner */}
      <div className="relative w-full h-72 sm:h-96 bg-slate-900 overflow-hidden">
        <img
          src={event.cover_image_url || asset('/images/obhur-sunset-yacht-dj.jpg')}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = asset('/images/obhur-sunset-yacht-dj.jpg');
          }}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 max-w-6xl mx-auto px-4 sm:px-6 pb-8 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm">
              {event.format === 'IN_PERSON' ? t('inPerson') : event.format === 'ONLINE' ? t('online') : t('hybrid')}
            </span>
            <span className="text-xs font-semibold text-slate-200 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
              {organizerName}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight max-w-3xl leading-snug">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-medium leading-relaxed">
            {summary}
          </p>
        </div>
      </div>

      {/* Content Layout (2 cols) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Event Description, Schedule, Venue info (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Facts Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isRtl ? 'التاريخ والوقت' : 'Date & Time'}
                </h4>
                <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {formattedDate}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formattedStartTime} - {formattedEndTime} ({event.timezone})
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isRtl ? 'الموقع الجغرافي' : 'Location'}
                </h4>
                <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {venueName || (isRtl ? 'بث مباشر عبر الإنترنت' : 'Online Stream')}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {venueAddress || onlineDetails || (isRtl ? 'يتم إرسال الرابط فور تأكيد التسجيل.' : 'Access link provided upon registration.')}
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {isRtl ? 'عن هذه الفعالية' : 'About This Event'}
            </h2>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {description}
            </div>
          </div>

          {/* Organizer Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4">
              <img
                src={data.organization.logo_url}
                alt={organizerName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isRtl ? `تنظيم: ${organizerName}` : `Organized by ${organizerName}`}
                </h3>
                <p className="text-xs text-slate-500">{data.organization.website}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
              <span>{isRtl ? 'منظم موثق' : 'Verified Organizer'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Selection Box */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-black text-lg text-slate-900 dark:text-white">
                  {isRtl ? 'التذاكر والحجوزات' : 'Tickets & Passes'}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {eventTickets.map((ticket) => {
                const isSoldOut = ticket.quantity_sold >= ticket.quantity_total;
                const qty = ticketQuantities[ticket.id] || 0;
                const ticketTitle = getLocalizedText(ticket.title, locale);
                const ticketDesc = getLocalizedText(ticket.description, locale);

                return (
                  <div
                    key={ticket.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {ticketTitle}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                          {ticketDesc}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-base text-slate-900 dark:text-white">
                          {ticket.type === 'FREE' ? (isRtl ? 'مجاناً' : 'Free') : formatCurrency(ticket.price, ticket.currency, locale)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-[11px] text-slate-400">
                        {isSoldOut
                          ? (isRtl ? 'نفدت الكمية' : 'Sold Out')
                          : isRtl
                          ? `متبقي ${ticket.quantity_total - ticket.quantity_sold} تذكرة`
                          : `${ticket.quantity_total - ticket.quantity_sold} left`}
                      </span>

                      {!isSoldOut ? (
                        <div className="flex items-center gap-2" dir="ltr">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(ticket.id, -1, ticket.max_per_order)}
                            disabled={qty === 0}
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-bold text-xs">{qty}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(ticket.id, 1, ticket.max_per_order)}
                            disabled={qty >= ticket.max_per_order}
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-amber-600">
                          {isRtl ? 'نفدت الكمية' : 'Sold Out'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleCheckoutRedirect}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              <span>{isRtl ? 'الانتقال إلى إتمام الشراء' : 'Proceed to Checkout'}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
