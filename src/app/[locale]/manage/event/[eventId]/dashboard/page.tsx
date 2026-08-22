'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../../../../i18n/routing';
import { useData } from '../../../../../../context/DataContext';
import { StatCard } from '../../../../../../components/common/StatCard';
import { Badge } from '../../../../../../components/common/Badge';
import { getLocalizedText, formatEventDate, formatCurrency } from '../../../../../../lib/localeUtils';
import {
  DollarSign,
  Ticket,
  ShoppingBag,
  Users,
  CheckCircle2,
  ExternalLink,
  Plus,
  ArrowRight,
  ArrowLeft,
  Mail,
  Copy
} from 'lucide-react';

export default function EventDashboardPage() {
  const t = useTranslations('eventDashboard');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data } = useData();

  const event = data.events.find((e) => e.id === eventId) || data.events[0];
  const eventTickets = useMemo(() => data.tickets.filter((t) => t.event_id === eventId), [data.tickets, eventId]);
  const eventOrders = useMemo(() => data.orders.filter((o) => o.event_id === eventId), [data.orders, eventId]);
  const eventAttendees = useMemo(() => data.attendees.filter((a) => a.event_id === eventId), [data.attendees, eventId]);

  // Derived metrics
  const totalRevenue = useMemo(
    () => eventOrders.filter((o) => o.status === 'COMPLETED').reduce((acc, o) => acc + (o.total_gross || 0), 0),
    [eventOrders]
  );
  const totalSold = useMemo(
    () => eventTickets.reduce((acc, t) => acc + (t.quantity_sold || 0), 0),
    [eventTickets]
  );
  const checkedInCount = useMemo(
    () => eventAttendees.filter((a) => a.checked_in).length,
    [eventAttendees]
  );
  const checkInRate = eventAttendees.length > 0 ? Math.round((checkedInCount / eventAttendees.length) * 100) : 0;

  const title = getLocalizedText(event.title, locale);
  const summary = getLocalizedText(event.summary, locale) || getLocalizedText(event.description, locale);
  const formattedDate = formatEventDate(event.start_date, locale);
  const publicUrl = `/e/${event.id}/${event.slug}`;

  const copyPublicUrl = () => {
    const fullUrl = `${window.location.origin}${publicUrl}`;
    navigator.clipboard.writeText(fullUrl);
    alert(tCommon('copied'));
  };

  return (
    <div className="space-y-8">
      {/* Event Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md">
              {event.format}
            </span>
            <span className="text-xs text-blue-100">
              {formattedDate}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">{title}</h1>
          <p className="text-xs text-blue-100/80 max-w-xl line-clamp-1">{summary}</p>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={copyPublicUrl}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-semibold text-white transition border border-white/10"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{tCommon('copyLink')}</span>
          </button>
          <Link
            href={publicUrl}
            target="_blank"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-bold shadow-md transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{t('viewPublicPage')}</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title={t('totalRevenue')}
          value={formatCurrency(totalRevenue, event.currency, locale)}
          icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
          trend={{ value: isRtl ? '+18.4% نمو' : '+18.4% vs last week', isPositive: true }}
        />
        <StatCard
          title={t('ticketsSold')}
          value={`${totalSold} / ${event.capacity}`}
          icon={<Ticket className="w-5 h-5 text-blue-500" />}
          subtitle={isRtl ? `متبقي ${event.capacity - totalSold} تذكرة` : `${event.capacity - totalSold} tickets remaining`}
        />
        <StatCard
          title={t('ordersCount')}
          value={eventOrders.length}
          icon={<ShoppingBag className="w-5 h-5 text-indigo-500" />}
          subtitle={isRtl ? `${eventOrders.filter((o) => o.status === 'COMPLETED').length} مكتمل` : `${eventOrders.filter((o) => o.status === 'COMPLETED').length} successful`}
        />
        <StatCard
          title={t('checkInRate')}
          value={`${checkInRate}%`}
          icon={<Users className="w-5 h-5 text-purple-500" />}
          subtitle={isRtl ? `تم تسجيل ${checkedInCount} من ${eventAttendees.length}` : `${checkedInCount} of ${eventAttendees.length} checked in`}
        />
      </div>

      {/* Main Grid: Ticket Sales Breakdown & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Sales by Ticket Tier (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {t('salesBreakdown')}
                </h3>
                <p className="text-xs text-slate-500">{isRtl ? 'السعة والإيرادات المباشرة لكل فئة' : 'Live ticket tier capacity and revenue'}</p>
              </div>
              <Link
                href={`/manage/event/${eventId}/products`}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>{tCommon('edit')}</span>
                {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {eventTickets.map((ticket) => {
                const percentSold =
                  ticket.quantity_total > 0
                    ? Math.min(100, Math.round((ticket.quantity_sold / ticket.quantity_total) * 100))
                    : 0;
                const tierRevenue = ticket.quantity_sold * ticket.price;
                const ticketTitle = getLocalizedText(ticket.title, locale);

                return (
                  <div key={ticket.id} className="py-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {ticketTitle}
                        </span>
                        <span className="mx-2 text-slate-400 font-semibold">
                          {formatCurrency(ticket.price, ticket.currency, locale)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {ticket.quantity_sold} / {ticket.quantity_total}
                        </span>
                        <span className="mx-2 text-emerald-600 font-bold">
                          ({formatCurrency(tierRevenue, ticket.currency, locale)})
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentSold}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t('recentOrders')}
              </h3>
              <Link
                href={`/manage/event/${eventId}/orders`}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>{isRtl ? 'عرض جميع الطلبات' : 'View All Orders'}</span>
                {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium">
                    <th className="py-2.5 px-3">{isRtl ? 'رقم الطلب' : 'Order'}</th>
                    <th className="py-2.5 px-3">{isRtl ? 'العميل' : 'Customer'}</th>
                    <th className="py-2.5 px-3">{isRtl ? 'الحالة' : 'Status'}</th>
                    <th className="py-2.5 px-3 text-right">{isRtl ? 'المبلغ' : 'Amount'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {eventOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="py-3 px-3 font-semibold text-blue-600 dark:text-blue-400">
                        {order.short_id}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {order.first_name} {order.last_name}
                        </p>
                        <p className="text-[11px] text-slate-400">{order.email}</p>
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={
                            order.status === 'COMPLETED'
                              ? 'success'
                              : order.status === 'REFUNDED'
                              ? 'danger'
                              : 'warning'
                          }
                          size="sm"
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white">
                        {formatCurrency(order.total_gross, order.currency, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t('quickActions')}
            </h3>

            <div className="space-y-2">
              <Link
                href={`/manage/event/${eventId}/products`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Plus className="w-4 h-4 text-blue-500" />
                  <span>{isRtl ? 'إضافة فئة تذاكر' : 'Add Ticket Tier'}</span>
                </div>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5 text-slate-400" /> : <ArrowRight className="w-3.5 h-3.5 text-slate-400" />}
              </Link>

              <Link
                href={`/manage/event/${eventId}/check-in`}
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition text-xs font-semibold text-emerald-900 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/40"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('openCheckInApp')}</span>
                </div>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5 text-emerald-600" /> : <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />}
              </Link>

              <Link
                href={`/manage/event/${eventId}/messages`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-purple-500" />
                  <span>{isRtl ? 'مراسلة الحضور' : 'Email Attendees'}</span>
                </div>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5 text-slate-400" /> : <ArrowRight className="w-3.5 h-3.5 text-slate-400" />}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
