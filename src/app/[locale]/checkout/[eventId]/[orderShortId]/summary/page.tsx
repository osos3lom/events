'use client';

import React, { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../../../../i18n/routing';
import { useData } from '../../../../../../context/DataContext';
import { LanguageSwitcher } from '../../../../../../components/common/LanguageSwitcher';
import { ThemeToggle } from '../../../../../../components/common/ThemeToggle';
import { Badge } from '../../../../../../components/common/Badge';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import confetti from 'canvas-confetti';
import { asset } from '@/lib/basePath';
import {
  CheckCircle2,
  Calendar,
  Printer,
  QrCode,
  ArrowRight,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

export default function OrderSummaryPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const orderShortId = String(params?.orderShortId || '');
  const { data } = useData();

  const event = data.events.find((e) => e.id === eventId) || data.events[0];
  const order = useMemo(
    () =>
      data.orders.find(
        (o) => o.short_id.toUpperCase() === orderShortId.toUpperCase() || o.id === orderShortId
      ) || data.orders[0],
    [data.orders, orderShortId]
  );

  const orderAttendees = useMemo(
    () => data.attendees.filter((a) => a.order_id === order?.id),
    [data.attendees, order?.id]
  );

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-slate-500">Order not found.</p>
          <Link href="/manage/events" className="mt-4 inline-block text-blue-600 underline text-xs">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const startDate = new Date(event.start_date);
  const eventTitle = getLocalizedText(event.title, locale);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/manage/events" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-0.5 shadow-xs shrink-0">
              <img src={asset('/brand/logo-icon.png')} alt="jeddah Events" className="w-full h-full object-contain" />
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

      {/* Main Confirmation Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Success Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              {isRtl ? 'تم تأكيد الحجز بنجاح' : 'Registration Successful'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {t('orderConfirmed')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              {t('orderSuccessMsg', { email: order.email })}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-xs font-bold text-slate-700 dark:text-slate-300" dir="ltr">
            <span>Ref:</span>
            <span className="text-blue-600 dark:text-blue-400">{order.short_id}</span>
          </div>
        </div>

        {/* Event Quick Info */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <img
              src={event.cover_image_url}
              alt={eventTitle}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {eventTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {startDate.toLocaleDateString(locale === 'ar' ? 'ar-EG' : undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/order/${event.id}/${order.short_id}/print`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition"
            >
              <Printer className="w-4 h-4" />
              <span>{isRtl ? 'طباعة الإيصال' : 'Print Receipt'}</span>
            </Link>
          </div>
        </div>

        {/* Issued Passes Grid */}
        <div className="space-y-4">
          <h3 className="font-black text-lg text-slate-900 dark:text-white">
            {isRtl ? `تصاريح الدخول الرقمية (${orderAttendees.length})` : `Your Digital Event Passes (${orderAttendees.length})`}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orderAttendees.map((attendee, idx) => {
              const ticketTitle = getLocalizedText(attendee.ticket_title, locale);
              return (
                <div
                  key={attendee.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md flex flex-col justify-between space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full">
                        {isRtl ? `تصريح #${idx + 1}` : `Pass #${idx + 1}`}
                      </span>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white mt-2">
                        {ticketTitle}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {isRtl ? 'الاسم:' : 'Holder:'} {attendee.first_name} {attendee.last_name}
                      </p>
                    </div>
                    <Badge variant={attendee.checked_in ? 'success' : 'gray'}>
                      {attendee.checked_in ? (isRtl ? 'تم الدخول' : 'Checked In') : (isRtl ? 'تصريح صالح' : 'Valid Pass')}
                    </Badge>
                  </div>

                  <div className="py-3 flex flex-col items-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4">
                    <div className="p-3 bg-white rounded-xl shadow-xs inline-block">
                      <QrCode className="w-24 h-24 text-slate-900" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 font-bold mt-2" dir="ltr">
                      {attendee.barcode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-400">{isRtl ? 'المقعد:' : 'Seat:'} {attendee.seat || 'GA'}</span>
                    <Link
                      href={`/product/${event.id}/${attendee.short_id}`}
                      target="_blank"
                      className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>{isRtl ? 'عرض التذكرة' : 'View Mobile Ticket'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back to Events Navigation */}
        <div className="text-center pt-4">
          <Link
            href={`/e/${event.id}/${event.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>{isRtl ? 'العودة لصفحة الفعالية' : 'Return to Event Page'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </main>
    </div>
  );
}
