'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '../../../../i18n/routing';
import { useData } from '../../../../context/DataContext';
import { Event, EventFormat, EventStatus } from '../../../../types';
import { Badge } from '../../../../components/common/Badge';
import { Modal } from '../../../../components/common/Modal';
import { getLocalizedText, formatEventDate, formatCurrency, generateSlug } from '../../../../lib/localeUtils';
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Globe,
  Ticket,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Trash2,
  ExternalLink
} from 'lucide-react';

export default function EventsManagementPage() {
  const t = useTranslations('events');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const router = useRouter();
  const { data, createEvent, deleteEvent } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'LIVE' | 'DRAFT' | 'PAST'>('ALL');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New Event Form State with Bilingual Input Support
  const [inputLangTab, setInputLangTab] = useState<'ar' | 'en'>(locale === 'ar' ? 'ar' : 'en');
  const [formTitles, setFormTitles] = useState({ en: '', ar: '' });
  const [formSummaries, setFormSummaries] = useState({ en: '', ar: '' });
  const [formDescriptions, setFormDescriptions] = useState({ en: '', ar: '' });
  const [slug, setSlug] = useState('');

  const [formData, setFormData] = useState({
    status: 'LIVE' as EventStatus,
    format: 'IN_PERSON' as EventFormat,
    start_date: '2026-11-15T16:00',
    end_date: '2026-11-15T21:00',
    timezone: 'Asia/Riyadh',
    currency: 'SAR',
    location_venue_name: '',
    location_address: '',
    online_details: '',
    capacity: 100,
    cover_image_url:
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?w=1200&auto=format&fit=crop&q=80'
  });

  const eventsWithStats = useMemo(() => {
    return data.events.map((event) => {
      const eventTickets = data.tickets.filter((t) => t.event_id === event.id);
      const eventOrders = data.orders.filter((o) => o.event_id === event.id && o.status === 'COMPLETED');
      const ticketsSold = eventTickets.reduce((acc, t) => acc + (t.quantity_sold || 0), 0);
      const grossRevenue = eventOrders.reduce((acc, o) => acc + (o.total_gross || 0), 0);

      return {
        ...event,
        ticketsSold,
        grossRevenue,
        ticketCount: eventTickets.length
      };
    });
  }, [data.events, data.tickets, data.orders]);

  const filteredEvents = useMemo(() => {
    return eventsWithStats.filter((event) => {
      const title = getLocalizedText(event.title, locale).toLowerCase();
      const summary = getLocalizedText(event.summary, locale).toLowerCase();
      const venue = getLocalizedText(event.location_venue_name, locale).toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch = title.includes(q) || summary.includes(q) || venue.includes(q);

      if (!matchesSearch) return false;
      if (activeTab === 'ALL') return true;
      return event.status === activeTab;
    });
  }, [eventsWithStats, searchQuery, activeTab, locale]);

  const handleTitleChange = (val: string) => {
    setFormTitles((prev) => ({ ...prev, [inputLangTab]: val }));
    if (!slug || slug.startsWith('event-')) {
      setSlug(generateSlug(val) || `event-${Date.now()}`);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const primaryTitle = formTitles[inputLangTab] || formTitles.en || formTitles.ar || 'New Event';
    const primarySummary = formSummaries[inputLangTab] || formSummaries.en || formSummaries.ar || '';
    const primaryDesc = formDescriptions[inputLangTab] || formDescriptions.en || formDescriptions.ar || '';

    const newEvent = createEvent({
      title: formTitles.ar && formTitles.en ? formTitles : primaryTitle,
      slug: slug || `event-${Date.now()}`,
      summary: formSummaries.ar && formSummaries.en ? formSummaries : primarySummary,
      description: formDescriptions.ar && formDescriptions.en ? formDescriptions : primaryDesc,
      status: formData.status,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      timezone: formData.timezone,
      currency: formData.currency,
      format: formData.format,
      location_venue_name: formData.location_venue_name,
      location_address: formData.location_address,
      online_details: formData.online_details,
      cover_image_url: formData.cover_image_url,
      organizer_id: data.organization.id,
      organizer_name: data.organization.name,
      categories: ['General'],
      capacity: Number(formData.capacity) || 100,
      settings: {
        show_remaining_tickets: true,
        require_attendee_info: true,
        support_email: data.organization.email,
        custom_color: '#3b82f6',
        default_locale: locale as any
      }
    });

    setIsCreateOpen(false);
    router.push(`/manage/event/${newEvent.id}/dashboard`);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('subtitle')}
          </p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/20 transition self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('createEvent')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
          {[
            { key: 'ALL', label: t('allEvents') },
            { key: 'LIVE', label: t('statusLive') },
            { key: 'DRAFT', label: t('statusDraft') },
            { key: 'PAST', label: t('statusPast') }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeTab === tab.key
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className={`w-4 h-4 text-slate-400 absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
          <input
            type="text"
            placeholder={tCommon('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:text-white`}
          />
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
          <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('noEvents')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {t('createFirstEvent')}
          </p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('createEvent')}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const formattedDate = formatEventDate(event.start_date, locale);
            const title = getLocalizedText(event.title, locale);
            const summary = getLocalizedText(event.summary, locale) || getLocalizedText(event.description, locale);
            const venue = getLocalizedText(event.location_venue_name, locale) || getLocalizedText(event.location_address, locale);

            return (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col group"
              >
                {/* Cover Image Header */}
                <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={event.cover_image_url || '/images/obhur-sunset-yacht-dj.jpg'}
                    alt={title}
                    onError={(e) => {
                      e.currentTarget.src = '/images/obhur-sunset-yacht-dj.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'}`}>
                    <Badge
                      variant={
                        event.status === 'LIVE'
                          ? 'success'
                          : event.status === 'DRAFT'
                          ? 'warning'
                          : 'gray'
                      }
                    >
                      {event.status === 'LIVE' ? t('statusLive') : event.status === 'DRAFT' ? t('statusDraft') : event.status}
                    </Badge>
                  </div>
                  <div className={`absolute bottom-3 ${isRtl ? 'right-3' : 'left-3'} bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white flex items-center gap-1.5`}>
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{formattedDate}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {summary}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      {event.format === 'ONLINE' ? (
                        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                          <Globe className="w-3.5 h-3.5" />
                          <span>{t('online')}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">
                            {venue || (event.format === 'IN_PERSON' ? t('inPerson') : t('hybrid'))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        {t('ticketsSold')}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {event.ticketsSold} / {event.capacity}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        {t('grossRevenue')}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(event.grossRevenue, event.currency || 'SAR', locale)}
                      </span>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href={`/e/${event.id}/${event.slug}`}
                      target="_blank"
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{tNav('publicPreview')}</span>
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (confirm(tCommon('confirmDelete'))) {
                            deleteEvent(event.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                        title={tCommon('delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/manage/event/${event.id}/dashboard`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
                      >
                        <span>{tNav('dashboard')}</span>
                        {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Event Modal with Bilingual Tabs */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title={t('createEvent')}
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {/* Language Selection Tabs for authoring */}
          <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              {isRtl ? 'لغة إدخال بيانات الفعالية:' : 'Content Language:'}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setInputLangTab('ar')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  inputLangTab === 'ar'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                العربية (AR)
              </button>
              <button
                type="button"
                onClick={() => setInputLangTab('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  inputLangTab === 'en'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('eventTitle')} ({inputLangTab.toUpperCase()}) *
            </label>
            <input
              type="text"
              required
              placeholder={inputLangTab === 'ar' ? 'مثال: القمة العالمية للذكاء الاصطناعي 2026' : 'e.g. AI Innovation Summit 2026'}
              dir="auto"
              value={formTitles[inputLangTab]}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('eventSlug')}
            </label>
            <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-3 text-xs text-slate-400" dir="ltr">
              <span>hi.events/e/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-transparent py-2 px-1 text-slate-800 dark:text-slate-200 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('format')}
              </label>
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value as EventFormat })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="IN_PERSON">{t('inPerson')}</option>
                <option value="ONLINE">{t('online')}</option>
                <option value="HYBRID">{t('hybrid')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('capacity')}
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>

          {formData.format !== 'ONLINE' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('venueName')}
                </label>
                <input
                  type="text"
                  placeholder={inputLangTab === 'ar' ? 'مركز المؤتمرات والمعارض' : 'Grand Tech Auditorium'}
                  dir="auto"
                  value={formData.location_venue_name}
                  onChange={(e) => setFormData({ ...formData, location_venue_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('venueAddress')}
                </label>
                <input
                  type="text"
                  placeholder={inputLangTab === 'ar' ? 'طريق الملك فهد، الرياض' : '100 Innovation Way, San Francisco, CA'}
                  dir="auto"
                  value={formData.location_address}
                  onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('startDate')}
              </label>
              <input
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('endDate')}
              </label>
              <input
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('summary')} ({inputLangTab.toUpperCase()})
            </label>
            <input
              type="text"
              dir="auto"
              placeholder={inputLangTab === 'ar' ? 'ملخص ترويجي موجز يظهر على بطاقة الفعالية والتذاكر' : 'Short headline summary for tickets and cards'}
              value={formSummaries[inputLangTab]}
              onChange={(e) => setFormSummaries({ ...formSummaries, [inputLangTab]: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('description')} ({inputLangTab.toUpperCase()})
            </label>
            <textarea
              rows={3}
              dir="auto"
              placeholder={inputLangTab === 'ar' ? 'اكتب تفاصيل الفعالية، المتحدثين، والجدول الزمني...' : 'Full event description, agenda, speakers, etc.'}
              value={formDescriptions[inputLangTab]}
              onChange={(e) => setFormDescriptions({ ...formDescriptions, [inputLangTab]: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('coverImage')}
            </label>
            <input
              type="url"
              dir="ltr"
              value={formData.cover_image_url}
              onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              {tCommon('cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20"
            >
              {tCommon('create')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
