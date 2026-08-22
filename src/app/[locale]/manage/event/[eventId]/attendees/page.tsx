'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { Badge } from '../../../../../../components/common/Badge';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import {
  Search,
  Download,
  CheckCircle2,
  XCircle,
  QrCode,
  Users,
  Filter
} from 'lucide-react';

export default function AttendeesPage() {
  const t = useTranslations('attendees');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data, checkInAttendee } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicketFilter, setSelectedTicketFilter] = useState('ALL');

  const eventAttendees = useMemo(
    () => data.attendees.filter((a) => a.event_id === eventId),
    [data.attendees, eventId]
  );

  const eventTickets = useMemo(
    () => data.tickets.filter((t) => t.event_id === eventId),
    [data.tickets, eventId]
  );

  const filteredAttendees = useMemo(() => {
    return eventAttendees.filter((attendee) => {
      const name = `${attendee.first_name} ${attendee.last_name}`.toLowerCase();
      const email = attendee.email.toLowerCase();
      const barcode = attendee.barcode.toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch = name.includes(q) || email.includes(q) || barcode.includes(q);
      const matchesTicket =
        selectedTicketFilter === 'ALL' || attendee.ticket_id === selectedTicketFilter;

      return matchesSearch && matchesTicket;
    });
  }, [eventAttendees, searchQuery, selectedTicketFilter]);

  const handleExportCSV = () => {
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Ticket', 'Status', 'Checked In', 'Barcode', 'Seat'];
    const rows = filteredAttendees.map((a) => [
      a.short_id,
      a.first_name,
      a.last_name,
      a.email,
      getLocalizedText(a.ticket_title, locale),
      a.status,
      a.checked_in ? 'YES' : 'NO',
      a.barcode,
      a.seat || ''
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `attendees-event-${eventId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>{tCommon('export')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedTicketFilter}
            onChange={(e) => setSelectedTicketFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200"
          >
            <option value="ALL">{tCommon('all')}</option>
            {eventTickets.map((t) => (
              <option key={t.id} value={t.id}>
                {getLocalizedText(t.title, locale)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className={`w-4 h-4 text-slate-400 absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
          <input
            type="text"
            placeholder={tCommon('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-hidden dark:text-white`}
          />
        </div>
      </div>

      {/* Attendees Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3 px-4">{t('attendeeName')}</th>
                <th className="py-3 px-4">{t('ticketType')}</th>
                <th className="py-3 px-4">{t('barcode')}</th>
                <th className="py-3 px-4">{t('checkInStatus')}</th>
                <th className="py-3 px-4 text-center">{tCommon('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    {t('noAttendees')}
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((attendee) => {
                  const ticketTitle = getLocalizedText(attendee.ticket_title, locale);
                  return (
                    <tr
                      key={attendee.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                    >
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900 dark:text-white">
                          {attendee.first_name} {attendee.last_name}
                        </p>
                        <p className="text-[11px] text-slate-400" dir="ltr">{attendee.email}</p>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        {ticketTitle}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500" dir="ltr">
                        {attendee.barcode}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={attendee.checked_in ? 'success' : 'gray'}>
                          {attendee.checked_in ? t('checkedIn') : t('notCheckedIn')}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => checkInAttendee(attendee.id, !attendee.checked_in)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition inline-flex items-center gap-1 ${
                            attendee.checked_in
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                          }`}
                        >
                          {attendee.checked_in ? (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>{t('undoCheckIn')}</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{t('checkInBtn')}</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
