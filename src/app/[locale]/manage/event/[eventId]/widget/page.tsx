'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import { Code, Copy, Check, ExternalLink } from 'lucide-react';

export default function EventWidgetPage() {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data } = useData();

  const event = data.events.find((e) => e.id === eventId) || data.events[0];
  const [copied, setCopied] = useState(false);

  const eventTitle = getLocalizedText(event.title, locale);
  const eventSummary = getLocalizedText(event.summary, locale) || getLocalizedText(event.description, locale);

  const embedCode = `<iframe
  src="${typeof window !== 'undefined' ? window.location.origin : 'https://hi.events'}/checkout/${event.id}"
  width="100%"
  height="650"
  frameborder="0"
  allow="payment"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {tNav('widget')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Embed ticket purchasing directly into your existing website, blog, or WordPress.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              HTML Embed Snippet
            </h2>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? tCommon('copied') : 'Copy Code'}</span>
          </button>
        </div>

        <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800" dir="ltr">
          {embedCode}
        </pre>
      </div>

      {/* Interactive Preview Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          Widget Live Preview
        </h3>
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/40">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 max-w-md mx-auto shadow-sm space-y-4 text-center">
            <h4 className="font-bold text-base text-slate-900 dark:text-white">{eventTitle}</h4>
            <p className="text-xs text-slate-500">{eventSummary}</p>
            <div className="py-3 px-4 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-blue-700 dark:text-blue-300 font-bold text-xs">
              Tickets starting at ${data.tickets.filter((t) => t.event_id === eventId)[0]?.price || 99}
            </div>
            <a
              href={`/checkout/${event.id}`}
              className="inline-block w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-700"
            >
              Get Tickets
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
