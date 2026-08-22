'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useData } from '../../../../context/DataContext';
import { getLocalizedText } from '../../../../lib/localeUtils';
import { Building2, Save, Check } from 'lucide-react';

export default function AccountSettingsPage() {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const { data, updateOrganization } = useData();

  const orgNameInitial = typeof data.organization.name === 'object' ? data.organization.name.en || data.organization.name.ar || '' : data.organization.name;

  const [form, setForm] = useState({
    name: orgNameInitial,
    email: data.organization.email,
    phone: data.organization.phone || '',
    website: data.organization.website || '',
    currency: data.organization.currency,
    timezone: data.organization.timezone,
    tax_rate: data.organization.tax_rate,
    fee_rate: data.organization.fee_rate
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrganization(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {tNav('account')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl ? 'إعدادات المؤسسة المنظمة، الضرائب والرسوم، ومعلومات التواصل.' : 'Manage your organization profile, taxation policies, and contact details.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {isRtl ? 'ملف المؤسسة' : 'Organization Profile'}
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isRtl ? 'اسم المؤسسة' : 'Organization Name'} *
            </label>
            <input
              type="text"
              required
              dir="auto"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {tCommon('email')} *
              </label>
              <input
                type="email"
                required
                dir="ltr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white text-left"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {tCommon('phone')}
              </label>
              <input
                type="text"
                dir="ltr"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white text-left"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isRtl ? 'الموقع الإلكتروني' : 'Website'}
            </label>
            <input
              type="url"
              dir="ltr"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white text-left"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isRtl ? 'نسبة الضريبة (%)' : 'Tax Rate (%)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={form.tax_rate}
                onChange={(e) => setForm({ ...form, tax_rate: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isRtl ? 'رسوم الخدمة (%)' : 'Fee Rate (%)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={form.fee_rate}
                onChange={(e) => setForm({ ...form, fee_rate: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? tCommon('success') : tCommon('save')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
