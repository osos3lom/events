'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import { Mail, Send, CheckCircle2, Users, Check } from 'lucide-react';

export default function MessagesPage() {
  const t = useTranslations('messages');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data, sendBroadcastMessage } = useData();

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipientFilter, setRecipientFilter] = useState<'ALL' | 'TICKET_TIER'>('ALL');
  const [targetTicketId, setTargetTicketId] = useState('');
  const [sentToast, setSentToast] = useState<string | null>(null);

  const eventMessages = useMemo(
    () => data.messages.filter((m) => m.event_id === eventId),
    [data.messages, eventId]
  );

  const eventTickets = useMemo(
    () => data.tickets.filter((t) => t.event_id === eventId),
    [data.tickets, eventId]
  );

  const attendeeCount = useMemo(() => {
    if (recipientFilter === 'ALL') {
      return data.attendees.filter((a) => a.event_id === eventId).length;
    }
    return data.attendees.filter(
      (a) => a.event_id === eventId && a.ticket_id === targetTicketId
    ).length;
  }, [data.attendees, eventId, recipientFilter, targetTicketId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendBroadcastMessage({
      event_id: eventId,
      subject,
      body,
      recipient_filter: recipientFilter,
      target_ticket_id: recipientFilter === 'TICKET_TIER' ? targetTicketId : undefined,
      recipients_count: attendeeCount
    });

    setSentToast(t('messageSent', { count: attendeeCount }));
    setSubject('');
    setBody('');
    setTimeout(() => setSentToast(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t('title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('subtitle')}
        </p>
      </div>

      {sentToast && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 p-4 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-xs">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>{sentToast}</span>
        </div>
      )}

      {/* Composer Form */}
      <form onSubmit={handleSend} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t('sendMessage')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('recipientGroup')}
            </label>
            <select
              value={recipientFilter}
              onChange={(e) => setRecipientFilter(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-purple-500 dark:text-white"
            >
              <option value="ALL">{t('allAttendees')}</option>
              <option value="TICKET_TIER">{t('specificTier')}</option>
            </select>
          </div>

          {recipientFilter === 'TICKET_TIER' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select Ticket Tier
              </label>
              <select
                value={targetTicketId}
                onChange={(e) => setTargetTicketId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-purple-500 dark:text-white"
              >
                <option value="">Choose a ticket...</option>
                {eventTickets.map((tk) => (
                  <option key={tk.id} value={tk.id}>
                    {getLocalizedText(tk.title, locale)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t('subject')} *
          </label>
          <input
            type="text"
            required
            dir="auto"
            placeholder="Important Event Logistics & Entry Pass Information"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-purple-500 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t('messageBody')} *
          </label>
          <textarea
            rows={5}
            required
            dir="auto"
            placeholder="Write your announcement or instructions to attendees..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-purple-500 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Users className="w-4 h-4 text-purple-600" />
            <span>
              Target Recipients: <strong>{attendeeCount}</strong>
            </span>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/20 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('sendBroadcast')}</span>
          </button>
        </div>
      </form>

      {/* Broadcast History */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          {t('sentHistory')}
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {eventMessages.map((msg) => (
            <div key={msg.id} className="py-4 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {msg.subject}
                </h4>
                <span className="text-slate-400">
                  {new Date(msg.sent_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{msg.body}</p>
              <div className="text-[11px] text-purple-600 font-semibold pt-1">
                Delivered to {msg.recipients_count} attendees
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
