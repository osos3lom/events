'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '../../../../i18n/routing';
import { useData } from '../../../../context/DataContext';
import { LogIn, UserCheck, Shield, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { data, updateUser } = useData();

  const [email, setEmail] = useState('alex.morgan@eventspot.io');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/manage/events');
    }, 400);
  };

  const handleQuickLogin = (role: 'ADMIN' | 'ORGANIZER' | 'ATTENDEE') => {
    setLoading(true);
    if (role === 'ADMIN') {
      updateUser({ role: 'ADMIN', first_name: 'Super', last_name: 'Admin', email: 'admin@hi.events' });
      router.push('/admin');
    } else if (role === 'ORGANIZER') {
      updateUser({ role: 'ORGANIZER', first_name: 'Alex', last_name: 'Morgan', email: 'alex.morgan@eventspot.io' });
      router.push('/manage/events');
    } else {
      updateUser({ role: 'STAFF', first_name: 'Elena', last_name: 'Rostova', email: 'elena.rostova@techcorp.io' });
      router.push('/e/1/global-tech-summit-2026');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('welcomeBack')}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t('loginSubtitle')}
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t('email')}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:text-white transition"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('password')}
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('forgotPassword')}
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:text-white transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>{loading ? tCommon('loading') : t('login')}</span>
        </button>
      </form>

      {/* Quick Demo Sign-in section */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t('quickLogin')}
          </span>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleQuickLogin('ORGANIZER')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition text-slate-800 dark:text-slate-200"
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-500" />
              <span>{t('loginAsOrganizer')}</span>
            </div>
            <span className="text-[10px] text-slate-400">Alex Morgan</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('ADMIN')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition text-slate-800 dark:text-slate-200"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-500" />
              <span>{t('loginAsAdmin')}</span>
            </div>
            <span className="text-[10px] text-slate-400">Super Admin</span>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 dark:text-slate-400">
        {t('dontHaveAccount')}{' '}
        <Link href="/auth/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          {t('register')}
        </Link>
      </div>
    </div>
  );
}
