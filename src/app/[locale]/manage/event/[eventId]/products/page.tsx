'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { TicketProduct, TicketType } from '../../../../../../types';
import { Badge } from '../../../../../../components/common/Badge';
import { Modal } from '../../../../../../components/common/Modal';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import {
  Plus,
  Ticket,
  DollarSign,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Layers
} from 'lucide-react';

export default function ProductsPage() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data, createTicket, updateTicket, deleteTicket } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketProduct | null>(null);

  const eventTickets = useMemo(
    () => data.tickets.filter((t) => t.event_id === eventId),
    [data.tickets, eventId]
  );

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    price: 99,
    currency: 'USD',
    type: 'PAID' as TicketType,
    quantity_total: 100,
    max_per_order: 5,
    min_per_order: 1,
    is_active: true
  });

  const handleOpenCreate = () => {
    setEditingTicket(null);
    setFormState({
      title: '',
      description: '',
      price: 99,
      currency: 'USD',
      type: 'PAID',
      quantity_total: 100,
      max_per_order: 5,
      min_per_order: 1,
      is_active: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ticket: TicketProduct) => {
    setEditingTicket(ticket);
    const titleStr = typeof ticket.title === 'object' ? ticket.title.en || ticket.title.ar || '' : ticket.title;
    const descStr = typeof ticket.description === 'object' ? ticket.description.en || ticket.description.ar || '' : ticket.description;
    setFormState({
      title: titleStr,
      description: descStr,
      price: ticket.price,
      currency: ticket.currency,
      type: ticket.type,
      quantity_total: ticket.quantity_total,
      max_per_order: ticket.max_per_order,
      min_per_order: ticket.min_per_order,
      is_active: ticket.is_active
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTicket) {
      updateTicket(editingTicket.id, {
        title: formState.title,
        description: formState.description,
        price: formState.type === 'FREE' ? 0 : Number(formState.price),
        type: formState.type,
        quantity_total: Number(formState.quantity_total),
        max_per_order: Number(formState.max_per_order),
        min_per_order: Number(formState.min_per_order),
        is_active: formState.is_active
      });
    } else {
      createTicket({
        event_id: eventId,
        title: formState.title,
        description: formState.description,
        price: formState.type === 'FREE' ? 0 : Number(formState.price),
        currency: formState.currency,
        type: formState.type,
        quantity_total: Number(formState.quantity_total),
        quantity_sold: 0,
        max_per_order: Number(formState.max_per_order),
        min_per_order: Number(formState.min_per_order),
        is_active: formState.is_active,
        order_index: eventTickets.length
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
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
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addTicket')}</span>
        </button>
      </div>

      {/* Tickets List */}
      {eventTickets.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
          <Ticket className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('noTickets')}</h3>
          <p className="text-xs text-slate-500 mt-1">Add tickets so attendees can register.</p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            {t('addTicket')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventTickets.map((ticket) => {
            const percentSold =
              ticket.quantity_total > 0
                ? Math.min(100, Math.round((ticket.quantity_sold / ticket.quantity_total) * 100))
                : 0;
            const ticketTitle = getLocalizedText(ticket.title, locale);
            const ticketDesc = getLocalizedText(ticket.description, locale);

            return (
              <div
                key={ticket.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                        {ticket.type}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                        {ticketTitle}
                      </h3>
                    </div>
                    <Badge variant={ticket.is_active ? 'success' : 'gray'}>
                      {ticket.is_active ? t('active') : tCommon('inactive')}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {ticketDesc}
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {ticket.type === 'FREE' ? t('free') : `$${ticket.price}`}
                    </span>
                    <span className="text-xs text-slate-400">{ticket.currency}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{t('quantitySold')}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {ticket.quantity_sold} / {ticket.quantity_total}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${percentSold}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleOpenEdit(ticket)}
                    className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition"
                    title={tCommon('edit')}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(tCommon('confirmDelete'))) {
                        deleteTicket(ticket.id);
                      }
                    }}
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
                    title={tCommon('delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Ticket CRUD */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTicket ? t('editTicket') : t('addTicket')}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('ticketName')} *
            </label>
            <input
              type="text"
              required
              dir="auto"
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Type
              </label>
              <select
                value={formState.type}
                onChange={(e) => setFormState({ ...formState, type: e.target.value as TicketType })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="PAID">{t('paid')}</option>
                <option value="FREE">{t('free')}</option>
                <option value="DONATION">Donation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('price')} ($)
              </label>
              <input
                type="number"
                disabled={formState.type === 'FREE'}
                value={formState.type === 'FREE' ? 0 : formState.price}
                onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('quantityTotal')} *
              </label>
              <input
                type="number"
                required
                value={formState.quantity_total}
                onChange={(e) => setFormState({ ...formState, quantity_total: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('maxPerOrder')}
              </label>
              <input
                type="number"
                value={formState.max_per_order}
                onChange={(e) => setFormState({ ...formState, max_per_order: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('description')}
            </label>
            <textarea
              rows={2}
              dir="auto"
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formState.is_active}
              onChange={(e) => setFormState({ ...formState, is_active: e.target.checked })}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('active')}
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              {tCommon('cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20"
            >
              {editingTicket ? tCommon('save') : tCommon('create')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
