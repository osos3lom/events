'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { Question, QuestionType } from '../../../../../../types';
import { Badge } from '../../../../../../components/common/Badge';
import { Modal } from '../../../../../../components/common/Modal';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import {
  Plus,
  HelpCircle,
  Trash2,
  ListFilter,
  CheckSquare
} from 'lucide-react';

export default function QuestionsPage() {
  const t = useTranslations('questions');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data, createQuestion, deleteQuestion } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: 'TEXT' as QuestionType,
    optionsStr: '',
    required: true,
    belongs_to: 'ATTENDEE' as const
  });

  const eventQuestions = useMemo(
    () => data.questions.filter((q) => q.event_id === eventId),
    [data.questions, eventId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createQuestion({
      event_id: eventId,
      title: form.title,
      type: form.type,
      options:
        form.type === 'SELECT'
          ? form.optionsStr.split(',').map((s) => s.trim()).filter(Boolean)
          : undefined,
      required: form.required,
      belongs_to: form.belongs_to
    });
    setIsModalOpen(false);
    setForm({
      title: '',
      type: 'TEXT',
      optionsStr: '',
      required: true,
      belongs_to: 'ATTENDEE'
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
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
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addQuestion')}</span>
        </button>
      </div>

      {eventQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
          <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('noQuestions')}
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            {t('addQuestion')}
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
          {eventQuestions.map((q) => {
            const questionTitle = getLocalizedText(q.title, locale);
            return (
              <div
                key={q.id}
                className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {questionTitle}
                    </h3>
                    <Badge variant={q.required ? 'blue' : 'gray'} size="sm">
                      {q.required ? t('required') : 'Optional'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium">{q.type}</span>
                    {q.options && q.options.length > 0 && (
                      <>
                        <span>•</span>
                        <span>{q.options.join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm(tCommon('confirmDelete'))) {
                      deleteQuestion(q.id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('addQuestion')}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('questionTitle')} *
            </label>
            <input
              type="text"
              required
              dir="auto"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('fieldType')}
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as QuestionType })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              <option value="TEXT">{t('text')}</option>
              <option value="TEXTAREA">{t('textarea')}</option>
              <option value="SELECT">{t('select')}</option>
              <option value="CHECKBOX">{t('checkbox')}</option>
            </select>
          </div>

          {form.type === 'SELECT' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('options')}
              </label>
              <input
                type="text"
                dir="auto"
                placeholder="Vegetarian, Vegan, Gluten-Free, Halal"
                value={form.optionsStr}
                onChange={(e) => setForm({ ...form, optionsStr: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="req"
              checked={form.required}
              onChange={(e) => setForm({ ...form, required: e.target.checked })}
              className="rounded text-blue-600"
            />
            <label htmlFor="req" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('required')}
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
              {tCommon('create')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
