'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '../../../../../../i18n/routing';
import { useData } from '../../../../../../context/DataContext';
import { EventStatus, EventFormat } from '../../../../../../types';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import { Settings, Trash2, Check, AlertTriangle } from 'lucide-react';

export default function EventSettingsPage() {
  const t = useTranslations('settings');
  const tEvents = useTranslations('events');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const eventId = String(params?.eventId || '1');
  const { data, updateEvent, deleteEvent } = useData();

  const event = data.events.find((e) => e.id === eventId) || data.events[0];

  const initialTitle = typeof event?.title === 'object' ? event.title.en || event.title.ar || '' : event?.title || '';
  const initialSummary = typeof event?.summary === 'object' ? event.summary.en || event.summary.ar || '' : event?.summary || '';
  const initialDesc = typeof event?.description === 'object' ? event.description.en || event.description.ar || '' : event?.description || '';
  const initialVenue = typeof event?.location_venue_name === 'object' ? event.location_venue_name.en || event.location_venue_name.ar || '' : event?.location_venue_name || '';
  const initialAddress = typeof event?.location_address === 'object' ? event.location_address.en || event.location_address.ar || '' : event?.location_address || '';
  const initialOnline = typeof event?.online_details === 'object' ? event.online_details.en || event.online_details.ar || '' : event?.online_details || '';

  const [formData, setFormData] = useState({
    title: initialTitle,
    slug: event?.slug || '',
    summary: initialSummary,
    description: initialDesc,
    status: (event?.status || 'LIVE') as EventStatus,
    format: (event?.format || 'IN_PERSON') as EventFormat,
    start_date: event?.start_date ? event.start_date.slice(0, 16) : '2026-10-15T09:00',
    end_date: event?.end_date ? event.end_date.slice(0, 16) : '2026-10-17T18:00',
    location_venue_name: initialVenue,
    location_address: initialAddress,
    online_details: initialOnline,
    cover_image_url: event?.cover_image_url || '',
    capacity: event?.capacity || 500
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent(eventId, {
      ...formData,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      capacity: Number(formData.capacity)
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    if (confirm(t('deleteWarning'))) {
      deleteEvent(eventId);
      router.push('/manage/events');
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t('title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Details */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('general')}
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {tEvents('eventTitle')} *
            </label>
            <input
              type="text"
              required
              dir="auto"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {tCommon('status')}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="LIVE">{tEvents('statusLive')}</option>
                <option value="DRAFT">{tEvents('statusDraft')}</option>
                <option value="PAST">{tEvents('statusPast')}</option>
                <option value="ARCHIVED">{tEvents('statusArchived')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {tEvents('format')}
              </label>
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value as EventFormat })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="IN_PERSON">{tEvents('inPerson')}</option>
                <option value="ONLINE">{tEvents('online')}</option>
                <option value="HYBRID">{tEvents('hybrid')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {tEvents('summary')}
            </label>
            <input
              type="text"
              dir="auto"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {tEvents('description')}
            </label>
            <textarea
              rows={4}
              dir="auto"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {tEvents('coverImage')}
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.cover_image_url}
              onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>

        {/* Location & Dates */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            {t('locationAndDates')}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {tEvents('startDate')}
              </label>
              <input
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {tEvents('endDate')}
              </label>
              <input
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>

          {formData.format !== 'ONLINE' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {tEvents('venueName')}
                </label>
                <input
                  type="text"
                  dir="auto"
                  value={formData.location_venue_name}
                  onChange={(e) => setFormData({ ...formData, location_venue_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {tEvents('venueAddress')}
                </label>
                <input
                  type="text"
                  dir="auto"
                  value={formData.location_address}
                  onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? t('settingsSaved') : t('saveSettings')}</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/50 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">
              {t('dangerZone')}
            </h3>
          </div>
          <p className="text-xs text-rose-700 dark:text-rose-400">
            {t('deleteWarning')}
          </p>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('deleteEvent')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
