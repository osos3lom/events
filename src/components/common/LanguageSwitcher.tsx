'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/routing';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = (nextLocale: 'en' | 'ar') => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className={`inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-sm border border-slate-200 dark:border-slate-700 ${className}`}>
      <Globe className="w-3.5 h-3.5 mx-1 text-slate-500" />
      <button
        onClick={() => toggleLanguage('en')}
        disabled={isPending}
        className={`px-2 py-1 rounded font-medium text-xs transition-all ${
          locale === 'en'
            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggleLanguage('ar')}
        disabled={isPending}
        className={`px-2 py-1 rounded font-medium text-xs transition-all ${
          locale === 'ar'
            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
        }`}
      >
        عربي
      </button>
    </div>
  );
};
