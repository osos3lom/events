'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../../i18n/routing';
import { useData } from '../../../../context/DataContext';
import { LanguageSwitcher } from '../../../../components/common/LanguageSwitcher';
import { getLocalizedText } from '../../../../lib/localeUtils';
import {
  Search,
  XCircle,
  Check,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export default function StandaloneDoorCheckInPage() {
  const t = useTranslations('checkIn');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const params = useParams();
  const listShortId = String(params?.checkInListShortId || '');
  const { data, checkInAttendee } = useData();

  const [query, setQuery] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeEvent = data.events[0];
  const allAttendees = useMemo(
    () => data.attendees.filter((a) => a.event_id === activeEvent.id && a.status === 'ACTIVE'),
    [data.attendees, activeEvent.id]
  );

  const checkedInCount = useMemo(
    () => allAttendees.filter((a) => a.checked_in).length,
    [allAttendees]
  );
  const remainingCount = allAttendees.length - checkedInCount;

  const filteredAttendees = useMemo(() => {
    if (!query.trim()) return allAttendees;
    return allAttendees.filter(
      (a) =>
        `${a.first_name} ${a.last_name}`.toLowerCase().includes(query.toLowerCase()) ||
        a.email.toLowerCase().includes(query.toLowerCase()) ||
        a.barcode.toLowerCase().includes(query.toLowerCase()) ||
        a.short_id.toLowerCase().includes(query.toLowerCase())
    );
  }, [allAttendees, query]);

  const handleCheckIn = (attendeeId: string, name: string, willCheckIn: boolean) => {
    checkInAttendee(attendeeId, willCheckIn);
    setSuccessToast(willCheckIn ? `Checked In: ${name}` : `Undone: ${name}`);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const eventTitle = getLocalizedText(activeEvent.title, locale);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Staff Navbar */}
      <header className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/manage/event/${activeEvent.id}/check-in`}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </Link>
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
              {isRtl ? 'محطة فحص الدخول المباشر' : 'Door Check-In Terminal'}
            </span>
            <h1 className="font-bold text-sm text-white">{eventTitle}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium">
              {isRtl ? 'تم الدخول' : 'Checked In'}
            </span>
            <p className="font-black text-lg text-emerald-400" dir="ltr">
              {checkedInCount} / {allAttendees.length}
            </p>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Terminal Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Success Banner */}
        {successToast && (
          <div className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl animate-bounce">
            <Check className="w-5 h-5" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Big Search Scanner Box */}
        <div className="relative">
          <Search className={`w-6 h-6 text-slate-500 absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2`} />
          <input
            ref={inputRef}
            type="text"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full ${isRtl ? 'pr-14 pl-4' : 'pl-14 pr-4'} py-4 rounded-2xl bg-slate-900 border-2 border-slate-800 text-lg font-bold text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 transition shadow-xl`}
          />
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">
              {isRtl ? 'تم تسجيلهم' : 'Checked In'}
            </span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{checkedInCount}</p>
          </div>
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">
              {isRtl ? 'المتبقي' : 'Remaining'}
            </span>
            <p className="text-2xl font-black text-blue-400 mt-1">{remainingCount}</p>
          </div>
        </div>

        {/* Live Attendee Stream */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 divide-y divide-slate-800 space-y-2 max-h-[50vh] overflow-y-auto">
          {filteredAttendees.map((att) => {
            const ticketTitle = getLocalizedText(att.ticket_title, locale);
            return (
              <div
                key={att.id}
                className="pt-2 first:pt-0 flex items-center justify-between gap-3 p-3 rounded-2xl hover:bg-slate-800/60 transition"
              >
                <div className="space-y-0.5">
                  <h3 className="font-bold text-base text-white">
                    {att.first_name} {att.last_name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">{ticketTitle}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] text-slate-500" dir="ltr">{att.barcode}</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleCheckIn(att.id, `${att.first_name} ${att.last_name}`, !att.checked_in)
                  }
                  className={`px-5 py-3 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-md ${
                    att.checked_in
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                  }`}
                >
                  {att.checked_in ? (
                    <>
                      <XCircle className="w-4 h-4" />
                      <span>{isRtl ? 'تراجع' : 'Undo'}</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{isRtl ? 'تسجيل دخول' : 'Check In'}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="p-4 text-center text-xs text-slate-600">
        Hi.Events Gate Terminal • Auto-syncs with LocalStorage
      </footer>
    </div>
  );
}
