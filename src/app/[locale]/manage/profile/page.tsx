'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useData } from '../../../../context/DataContext';
import { User, Check, Shield } from 'lucide-react';

export default function ManageProfilePage() {
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  const { data, updateUser } = useData();

  const [firstName, setFirstName] = useState(data.user.first_name);
  const [lastName, setLastName] = useState(data.user.last_name);
  const [email, setEmail] = useState(data.user.email);
  const [avatarUrl, setAvatarUrl] = useState(data.user.avatar_url || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      first_name: firstName,
      last_name: lastName,
      email,
      avatar_url: avatarUrl
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {tNav('profile')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal account credentials and profile display info.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-xs">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <img
            src={avatarUrl || data.user.avatar_url}
            alt={firstName}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-sm"
          />
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {firstName} {lastName}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-purple-500" />
              <span>{data.user.role}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Avatar Image URL
          </label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-end pt-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? tCommon('saved', { defaultValue: 'Saved!' }) : tCommon('save')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
