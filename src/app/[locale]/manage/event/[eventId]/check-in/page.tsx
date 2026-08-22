'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../../../../i18n/routing';
import { useData } from '../../../../../../context/DataContext';
import { Badge } from '../../../../../../components/common/Badge';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import {
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  QrCode,
  Users,
  Percent,
  Check
} from 'lucide-react';

export default function CheckInManagementPage() {
  const t = useTranslations('checkIn');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data, checkInAttendee } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const eventAttendees = useMemo(
    () => data.attendees.filter((a) => a.event_id === eventId && a.status === 'ACTIVE'),
    [data.attendees, eventId]
  );

  const checkedInCount = useMemo(
    () => eventAttendees.filter((a) => a.checked_in).length,
    [eventAttendees]
  );
  const remainingCount = eventAttendees.length - checkedInCount;
  const percentage =
    eventAttendees.length > 0
      ? Math.round((checkedInCount / eventAttendees.length) * 100)
      : 0;

  const filteredAttendees = useMemo(() => {
    return eventAttendees.filter((a) => {
      const name = `${a.first_name} ${a.last_name}`.toLowerCase();
      const email = a.email.toLowerCase();
      const barcode = a.barcode.toLowerCase();
      const q = searchQuery.toLowerCase();
      return name.includes(q) || email.includes(q) || barcode.includes(q);
    });
  }, [eventAttendees, searchQuery]);

  const handleCheckInToggle = (attendeeId: string, name: string, willCheckIn: boolean) => {
    checkInAttendee(attendeeId, willCheckIn);
    setSuccessToast(
      willCheckIn
        ? t('checkedInSuccess', { name })
        : t('undoSuccess', { name })
    );
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('subtitle')}
          </p>
        </div>

        <Link
          href={`/check-in/list-main-entrance`}
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition self-start sm:self-auto"
        >
          <QrCode className="w-4 h-4" />
          <span>Launch Fullscreen Gate App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Toast */}
      {successToast && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 p-4 rounded-xl flex items-center gap-2 text-sm font-semibold animate-fade-in shadow-xs">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">
              {t('checkedInRatio')}
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {checkedInCount} / {eventAttendees.length}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">
              {t('remainingCount')}
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {remainingCount}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-950 text-purple-600 rounded-xl">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">
              Turnout Rate
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {percentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Live Search and Check In List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-xs">
        <div className="relative">
          <Search className={`w-5 h-5 text-slate-400 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white`}
          />
        </div>

        {/* Attendee rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredAttendees.map((att) => {
            const ticketTitle = getLocalizedText(att.ticket_title, locale);
            return (
              <div
                key={att.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-2 rounded-xl transition"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {att.first_name} {att.last_name}
                    </h4>
                    <Badge variant={att.checked_in ? 'success' : 'gray'} size="sm">
                      {att.checked_in ? 'Checked In' : 'Not Checked In'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {ticketTitle}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[11px]" dir="ltr">{att.barcode}</span>
                    <span>•</span>
                    <span dir="ltr">{att.email}</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleCheckInToggle(
                      att.id,
                      `${att.first_name} ${att.last_name}`,
                      !att.checked_in
                    )
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 self-start sm:self-auto ${
                    att.checked_in
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  {att.checked_in ? (
                    <>
                      <XCircle className="w-4 h-4" />
                      <span>{t('undoCheckIn')}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('checkInBtn')}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
