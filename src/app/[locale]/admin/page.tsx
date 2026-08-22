'use client';

import React, { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../i18n/routing';
import { useData } from '../../../context/DataContext';
import { StatCard } from '../../../components/common/StatCard';
import { Badge } from '../../../components/common/Badge';
import { getLocalizedText } from '../../../lib/localeUtils';
import {
  ShieldAlert,
  Building2,
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function PlatformAdminPage() {
  const t = useTranslations('admin');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const { data } = useData();

  const totalVolume = useMemo(
    () =>
      data.orders
        .filter((o) => o.status === 'COMPLETED')
        .reduce((acc, o) => acc + (o.total_gross || 0), 0),
    [data.orders]
  );

  const activeEventsCount = useMemo(
    () => data.events.filter((e) => e.status === 'LIVE').length,
    [data.events]
  );

  const orgName = getLocalizedText(data.organization.name, locale);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('title')}
          </h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title={t('totalVolume')}
          value={`$${totalVolume.toLocaleString()}`}
          icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
          trend={{ value: '+24.5%', isPositive: true }}
        />
        <StatCard
          title={t('activeEvents')}
          value={activeEventsCount}
          icon={<Calendar className="w-5 h-5 text-blue-500" />}
          subtitle={`${data.events.length} total events`}
        />
        <StatCard
          title={t('totalUsers')}
          value={data.attendees.length + 5}
          icon={<Users className="w-5 h-5 text-purple-500" />}
          subtitle="Registered accounts"
        />
        <StatCard
          title={t('organizations')}
          value="1"
          icon={<Building2 className="w-5 h-5 text-amber-500" />}
          subtitle="Primary tenant"
        />
      </div>

      {/* Organizations Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t('organizations')}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3 px-4">{t('orgName')}</th>
                <th className="py-3 px-4">{tCommon('email')}</th>
                <th className="py-3 px-4">{t('eventsCount')}</th>
                <th className="py-3 px-4 text-right rtl:text-left">{t('revenue')}</th>
                <th className="py-3 px-4 text-center">{tCommon('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <img
                    src={data.organization.logo_url}
                    alt={orgName}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span>{orgName}</span>
                </td>
                <td className="py-3.5 px-4 text-slate-500" dir="ltr">{data.organization.email}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                  {data.events.length}
                </td>
                <td className="py-3.5 px-4 text-right rtl:text-left font-bold text-emerald-600 dark:text-emerald-400">
                  ${totalVolume.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <Link
                    href="/manage/events"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                  >
                    <span>{isRtl ? 'إدارة' : 'Manage'}</span>
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
