'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { StatCard } from '../../../../../../components/common/StatCard';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import {
  DollarSign,
  Ticket,
  TrendingUp,
  CreditCard,
  BarChart2,
  PieChart
} from 'lucide-react';

export default function ReportsPage() {
  const t = useTranslations('reports');
  const locale = useLocale();
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data } = useData();

  const eventOrders = useMemo(
    () => data.orders.filter((o) => o.event_id === eventId && o.status === 'COMPLETED'),
    [data.orders, eventId]
  );
  const eventTickets = useMemo(
    () => data.tickets.filter((t) => t.event_id === eventId),
    [data.tickets, eventId]
  );

  const grossSales = useMemo(
    () => eventOrders.reduce((acc, o) => acc + o.total_gross, 0),
    [eventOrders]
  );
  const totalTax = useMemo(
    () => eventOrders.reduce((acc, o) => acc + o.total_tax, 0),
    [eventOrders]
  );
  const totalFee = useMemo(
    () => eventOrders.reduce((acc, o) => acc + o.total_fee, 0),
    [eventOrders]
  );
  const netRevenue = grossSales - totalTax - totalFee;
  const ticketsSold = useMemo(
    () => eventTickets.reduce((acc, t) => acc + t.quantity_sold, 0),
    [eventTickets]
  );
  const avgOrderValue = eventOrders.length > 0 ? Math.round(grossSales / eventOrders.length) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t('title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('subtitle')}
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title={t('grossSales')}
          value={`$${grossSales.toLocaleString()}`}
          icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
        />
        <StatCard
          title={t('netRevenue')}
          value={`$${netRevenue.toLocaleString()}`}
          icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
          subtitle={`After $${totalTax + totalFee} fees/taxes`}
        />
        <StatCard
          title={t('totalTicketsSold')}
          value={ticketsSold}
          icon={<Ticket className="w-5 h-5 text-purple-500" />}
        />
        <StatCard
          title={t('avgOrderValue')}
          value={`$${avgOrderValue}`}
          icon={<CreditCard className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Breakdown by Tier */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {t('salesByTier')}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3 px-4">Tier Name</th>
                <th className="py-3 px-4 text-center">Sold</th>
                <th className="py-3 px-4 text-center">Total Capacity</th>
                <th className="py-3 px-4 text-right rtl:text-left">Gross Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {eventTickets.map((ticket) => {
                const tierGross = ticket.quantity_sold * ticket.price;
                const ticketTitle = getLocalizedText(ticket.title, locale);
                return (
                  <tr key={ticket.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {ticketTitle}
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-800 dark:text-slate-200">
                      {ticket.quantity_sold}
                    </td>
                    <td className="py-3.5 px-4 text-center text-slate-500">
                      {ticket.quantity_total}
                    </td>
                    <td className="py-3.5 px-4 text-right rtl:text-left font-bold text-emerald-600 dark:text-emerald-400">
                      ${tierGross.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
