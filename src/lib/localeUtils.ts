import { LocalizedField, SupportedLocales } from '../types';

/**
 * Resolves a field that might be either a plain string or a bilingual dictionary { en: string, ar: string }
 */
export function getLocalizedText(
  field: LocalizedField | undefined | null,
  locale: string,
  fallback = ''
): string {
  if (!field) return fallback;
  if (typeof field === 'string') return field;
  const targetLocale = (locale === 'ar' ? 'ar' : 'en') as SupportedLocales;
  return field[targetLocale] || field['en'] || field['ar'] || fallback;
}

/**
 * Formats dates according to locale conventions (Arabic vs English)
 */
export function formatEventDate(
  dateStr: string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const date = new Date(dateStr);
    const resolvedLocale = locale === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.DateTimeFormat(resolvedLocale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      ...options
    }).format(date);
  } catch (e) {
    return dateStr;
  }
}

/**
 * Formats time according to locale
 */
export function formatEventTime(
  dateStr: string,
  locale: string
): string {
  try {
    const date = new Date(dateStr);
    const resolvedLocale = locale === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.DateTimeFormat(resolvedLocale, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (e) {
    return '';
  }
}

/**
 * Formats currency amount based on active locale (Defaults to Saudi Riyal SAR)
 */
export function formatCurrency(
  amount: number,
  currency = 'SAR',
  locale: string = 'en'
): string {
  try {
    const resolvedLocale = locale === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(resolvedLocale, {
      style: 'currency',
      currency: currency || 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  } catch (e) {
    return `${amount} SAR`;
  }
}

/**
 * Generates an SEO friendly slug supporting Arabic transliteration
 */
export function generateSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
