'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { PromoCode, DiscountType } from '../../../../../../types';
import { Badge } from '../../../../../../components/common/Badge';
import { Modal } from '../../../../../../components/common/Modal';
import { Plus, Tag, Trash2, Calendar, Percent, DollarSign } from 'lucide-react';

export default function EventPromoCodesPage() {
  const t = useTranslations('promoCodes');
  const tCommon = useTranslations('common');
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data, createPromoCode, deletePromoCode } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'PERCENTAGE' as DiscountType,
    discount_value: 15,
    max_uses: 100,
    expiry_date: '2026-12-31T23:59',
    is_active: true
  });

  const eventPromoCodes = useMemo(
    () => data.promoCodes.filter((p) => p.event_id === eventId),
    [data.promoCodes, eventId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPromoCode({
      event_id: eventId,
      code: formData.code.toUpperCase().trim(),
      discount_type: formData.discount_type,
      discount_value: Number(formData.discount_value),
      max_uses: Number(formData.max_uses),
      expiry_date: formData.expiry_date ? new Date(formData.expiry_date).toISOString() : undefined,
      is_active: formData.is_active
    });
    setIsModalOpen(false);
    setFormData({
      code: '',
      discount_type: 'PERCENTAGE',
      discount_value: 15,
      max_uses: 100,
      expiry_date: '2026-12-31T23:59',
      is_active: true
    });
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
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addPromo')}</span>
        </button>
      </div>

      {eventPromoCodes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
          <Tag className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('noPromoCodes')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create your first coupon code to offer special discounts to VIPs or partners.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('addPromo')}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventPromoCodes.map((promo) => (
            <div
              key={promo.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant={promo.is_active ? 'success' : 'gray'}>
                    {promo.is_active ? tCommon('active') : tCommon('inactive')}
                  </Badge>
                  <button
                    onClick={() => {
                      if (confirm(tCommon('confirmDelete'))) {
                        deletePromoCode(promo.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition"
                    title={tCommon('delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3">
                  <div className="inline-block px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-sm font-black tracking-wider text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700">
                    {promo.code}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                    {promo.discount_type === 'PERCENTAGE'
                      ? `${promo.discount_value}% Off`
                      : `$${promo.discount_value} Off`}
                  </h3>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>{t('usedCount')}:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {promo.current_uses} / {promo.max_uses}
                  </span>
                </div>
                {promo.expiry_date && (
                  <div className="flex justify-between">
                    <span>{t('expiryDate')}:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {new Date(promo.expiry_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Promo Code Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('addPromo')}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('code')} *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. VIP2026"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm uppercase font-mono font-bold focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('discountType')}
              </label>
              <select
                value={formData.discount_type}
                onChange={(e) =>
                  setFormData({ ...formData, discount_type: e.target.value as DiscountType })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="PERCENTAGE">{t('percentage')}</option>
                <option value="FIXED">{t('fixedAmount')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('discountValue')} *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('maxUses')}
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.max_uses}
                onChange={(e) => setFormData({ ...formData, max_uses: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('expiryDate')}
              </label>
              <input
                type="datetime-local"
                value={formData.expiry_date}
                onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
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
