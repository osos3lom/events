'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useData } from '../../context/DataContext';
import { RotateCcw, Check } from 'lucide-react';

export const DemoResetButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const t = useTranslations('common');
  const { resetData } = useData();
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    resetData();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2000);
  };

  return (
    <button
      onClick={handleReset}
      title={t('resetDemo')}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
        resetDone
          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-700 dark:text-emerald-300'
          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
      } ${className}`}
    >
      {resetDone ? <Check className="w-3.5 h-3.5" /> : <RotateCcw className="w-3.5 h-3.5" />}
      <span>{resetDone ? t('success') : t('resetDemo')}</span>
    </button>
  );
};
