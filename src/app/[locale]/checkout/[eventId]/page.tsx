'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '../../../../i18n/routing';
import { useData } from '../../../../context/DataContext';
import { LanguageSwitcher } from '../../../../components/common/LanguageSwitcher';
import { ThemeToggle } from '../../../../components/common/ThemeToggle';
import { getLocalizedText, formatCurrency } from '../../../../lib/localeUtils';
import { validateSaudiCustomer, formatSaudiPhoneNumber, SaudiIdentityType } from '../../../../lib/validation/checkoutValidation';
import { SaudiRiyalSymbol } from '../../../../components/common/SaudiRiyalSymbol';
import {
  Ticket,
  User,
  CreditCard,
  CheckCircle2,
  Tag,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  Check,
  ShieldCheck,
  Smartphone,
  Download,
  QrCode,
  Flame,
} from 'lucide-react';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const params = useParams();
  const router = useRouter();
  const eventId = String(params?.eventId || '1');
  const { data, createOrder } = useData();

  const event = data.events.find((e) => e.id === eventId) || data.events[0];
  const eventTickets = useMemo(
    () => data.tickets.filter((t) => t.event_id === event.id && t.is_active),
    [data.tickets, event.id]
  );
  const eventQuestions = useMemo(
    () => data.questions.filter((q) => q.event_id === event.id),
    [data.questions, event.id]
  );

  const currency = event.currency || 'SAR';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    if (eventTickets.length > 0) {
      initial[eventTickets[0].id] = 1;
    }
    return initial;
  });

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    type: 'PERCENTAGE' | 'FIXED';
    value: number;
  } | null>(null);
  const [promoError, setPromoError] = useState(false);

  // Buyer form state
  const [buyerInfo, setBuyerInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '+966 ',
    id_type: 'national_id' as SaudiIdentityType,
    id_number: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'mada' | 'apple_pay' | 'stc_pay' | 'credit_card'>('mada');

  const [attendeeAnswers, setAttendeeAnswers] = useState<Record<number, Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate ticket items
  const selectedItems = useMemo(() => {
    return Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([ticketId, qty]) => {
        const ticket = eventTickets.find((t) => t.id === ticketId);
        return {
          ticket_id: ticketId,
          ticket_title: ticket?.title || 'Pass',
          quantity: qty,
          unit_price: ticket?.price || 0,
          total_price: (ticket?.price || 0) * qty,
        };
      });
  }, [quantities, eventTickets]);

  const totalAttendeeCount = useMemo(
    () => selectedItems.reduce((acc, item) => acc + item.quantity, 0),
    [selectedItems]
  );

  const subtotal = useMemo(
    () => selectedItems.reduce((acc, item) => acc + item.total_price, 0),
    [selectedItems]
  );

  const discountAmount = useMemo(() => {
    if (!appliedPromo || subtotal <= 0) return 0;
    if (appliedPromo.type === 'PERCENTAGE') {
      return (subtotal * appliedPromo.value) / 100;
    }
    return Math.min(subtotal, appliedPromo.value);
  }, [appliedPromo, subtotal]);

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  // Saudi Standard 15% ZATCA VAT
  const vatRate = 0.15;
  const taxAmount = Math.round(discountedSubtotal * vatRate * 100) / 100;
  const totalDue = discountedSubtotal + taxAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const match = data.promoCodes.find(
      (p) =>
        p.event_id === event.id &&
        p.code.toUpperCase() === promoCodeInput.trim().toUpperCase() &&
        p.is_active
    );
    if (match) {
      setAppliedPromo({
        code: match.code,
        type: match.discount_type,
        value: match.discount_value,
      });
      setPromoError(false);
    } else {
      setPromoError(true);
      setAppliedPromo(null);
    }
  };

  const handleValidateStep2 = () => {
    const validation = validateSaudiCustomer({
      fullName: `${buyerInfo.first_name} ${buyerInfo.last_name}`.trim(),
      email: buyerInfo.email,
      phone: buyerInfo.phone,
      idType: buyerInfo.id_type,
      idNumber: buyerInfo.id_number,
    });

    if (!validation.isValid) {
      const mapped: Record<string, string> = {};
      Object.entries(validation.errors).forEach(([k, v]) => {
        mapped[k] = isRtl ? v.ar : v.en;
      });
      setFormErrors(mapped);
      return;
    }

    setFormErrors({});
    setStep(3);
  };

  const handleCompleteOrder = () => {
    setIsSubmitting(true);

    const attendeesPayload: Array<{
      event_id: string;
      ticket_id: string;
      ticket_title: any;
      first_name: string;
      last_name: string;
      email: string;
      status: 'ACTIVE';
      seat?: string;
      answers?: Record<string, string>;
    }> = [];

    let attendeeIdx = 0;
    selectedItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        const answers = attendeeAnswers[attendeeIdx] || {
          'Dietary Requirement': 'None',
          Company: 'VIP Guest',
        };
        attendeesPayload.push({
          event_id: event.id,
          ticket_id: item.ticket_id,
          ticket_title: item.ticket_title,
          first_name: buyerInfo.first_name || (isRtl ? 'ضيف' : 'Guest'),
          last_name: buyerInfo.last_name || (isRtl ? 'كريم' : 'VIP'),
          email: buyerInfo.email || 'guest@jeddahevents.sa',
          status: 'ACTIVE',
          seat: `VIP Section - Pass #${attendeeIdx + 1}`,
          answers,
        });
        attendeeIdx++;
      }
    });

    setTimeout(() => {
      const { order } = createOrder(
        {
          event_id: event.id,
          first_name: buyerInfo.first_name || 'Guest',
          last_name: buyerInfo.last_name || 'VIP',
          email: buyerInfo.email || 'guest@jeddahevents.sa',
          status: 'COMPLETED',
          total_gross: Math.round(totalDue * 100) / 100,
          total_tax: Math.round(taxAmount * 100) / 100,
          total_fee: 0,
          currency: 'SAR',
          promo_code: appliedPromo?.code,
          discount_amount: Math.round(discountAmount * 100) / 100,
          payment_method:
            totalDue > 0
              ? selectedPaymentMethod === 'apple_pay'
                ? 'Apple Pay'
                : selectedPaymentMethod === 'mada'
                ? 'Mada (مدى)'
                : selectedPaymentMethod === 'stc_pay'
                ? 'STC Pay'
                : 'Credit Card (**** 4242)'
              : isRtl
              ? 'تسجيل مجاني'
              : 'Free Registration',
          items: selectedItems,
        },
        attendeesPayload
      );

      setIsSubmitting(false);
      router.push(`/checkout/${event.id}/${order.short_id}/summary`);
    }, 800);
  };

  const eventTitle = getLocalizedText(event.title, locale);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#071E26] text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Checkout Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#071E26]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href={`/e/${event.id}/${event.slug}`}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span className="hidden sm:inline">{isRtl ? 'العودة للفعالية' : 'Back to Event'}</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center p-0.5 shadow-xs shrink-0">
              <img src="/brand/logo-icon.png" alt="jeddah Events" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-sm tracking-tight line-clamp-1">{eventTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Checkout Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
          {[
            { stepNum: 1, label: t('selectTickets'), icon: Ticket },
            { stepNum: 2, label: isRtl ? 'بيانات الضيف' : 'Guest KYC', icon: User },
            { stepNum: 3, label: t('payment'), icon: CreditCard },
          ].map((item) => {
            const Icon = item.icon;
            const isDone = step > item.stepNum;
            const isCurrent = step === item.stepNum;

            return (
              <div key={item.stepNum} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/30 ring-4 ring-[#D4AF37]/20'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-500'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : item.stepNum}
                </div>
                <span
                  className={`text-xs font-bold hidden sm:inline ${
                    isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
                {item.stepNum < 3 && <div className="w-6 h-px bg-slate-200 dark:border-white/10 mx-1" />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Form Area (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* STEP 1: Select Tickets */}
            {step === 1 && (
              <div className="bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {t('selectTickets')}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {isRtl ? 'حدد عدد ونوع التذاكر التي ترغب في حجزها.' : 'Choose the ticket tiers and quantities for your registration.'}
                    </p>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/30">
                    {isRtl ? 'شامل ١٥٪ ضريبة' : '15% VAT Included'}
                  </span>
                </div>

                <div className="space-y-4">
                  {eventTickets.map((ticket) => {
                    const isSoldOut = ticket.quantity_sold >= ticket.quantity_total;
                    const qty = quantities[ticket.id] || 0;
                    const ticketTitle = getLocalizedText(ticket.title, locale);
                    const ticketDesc = getLocalizedText(ticket.description, locale);

                    return (
                      <div
                        key={ticket.id}
                        className={`p-4 rounded-2xl border transition ${
                          qty > 0
                            ? 'border-[#D4AF37] bg-amber-50/20 dark:bg-amber-950/20'
                            : 'border-slate-200 dark:border-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {ticketTitle}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">{ticketDesc}</p>
                          </div>
                          <span className="font-black text-base text-[#b8860b] dark:text-[#D4AF37]">
                            {ticket.type === 'FREE'
                              ? isRtl
                                ? 'مجاناً'
                                : 'Free'
                              : formatCurrency(ticket.price, currency, locale)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-white/10">
                          <span className="text-[11px] text-slate-400">
                            {isSoldOut
                              ? isRtl
                                ? 'نفدت الكمية'
                                : 'Sold Out'
                              : isRtl
                              ? `متبقي ${ticket.quantity_total - ticket.quantity_sold} تذكرة`
                              : `${ticket.quantity_total - ticket.quantity_sold} available`}
                          </span>

                          {!isSoldOut ? (
                            <div className="flex items-center gap-2" dir="ltr">
                              <button
                                type="button"
                                onClick={() =>
                                  setQuantities((prev) => ({
                                    ...prev,
                                    [ticket.id]: Math.max(0, (prev[ticket.id] || 0) - 1),
                                  }))
                                }
                                disabled={qty === 0}
                                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold disabled:opacity-30 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-bold text-sm">{qty}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setQuantities((prev) => ({
                                    ...prev,
                                    [ticket.id]: Math.min(ticket.max_per_order, (prev[ticket.id] || 0) + 1),
                                  }))
                                }
                                disabled={qty >= ticket.max_per_order}
                                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold disabled:opacity-30 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-amber-600">
                              {isRtl ? 'نفدت الكمية' : 'Sold Out'}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={totalAttendeeCount === 0}
                    className="px-6 py-3 bg-[#D4AF37] hover:bg-[#c5a02a] text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-[#D4AF37]/30 transition flex items-center gap-2 disabled:opacity-40 cursor-pointer"
                  >
                    <span>{isRtl ? 'المتابعة لبيانات الحضور' : 'Continue to Guest Details'}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Attendee Information */}
            {step === 2 && (
              <div className="bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isRtl ? 'بيانات الضيف ومطابقة الهوية' : 'Guest Information & Identity Verification'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isRtl
                      ? 'يرجى إدخال البيانات المعتمدة لإصدار الفاتورة الضريبية وتصريح الدخول الرسمي.'
                      : 'Please provide valid details to generate your ZATCA tax invoice and official pass.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isRtl ? 'الاسم الأول *' : 'First Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'فيصل' : 'Faisal'}
                      value={buyerInfo.first_name}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, first_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/20 text-sm focus:ring-2 focus:ring-[#D4AF37] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isRtl ? 'اسم العائلة *' : 'Last Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'الغامدي' : 'Al-Ghamdi'}
                      value={buyerInfo.last_name}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, last_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/20 text-sm focus:ring-2 focus:ring-[#D4AF37] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isRtl ? 'نوع الوثيقة *' : 'Identity Document *'}
                    </label>
                    <select
                      value={buyerInfo.id_type}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, id_type: e.target.value as SaudiIdentityType })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071E26] text-sm focus:ring-2 focus:ring-[#D4AF37] dark:text-white cursor-pointer"
                    >
                      <option value="national_id">{isRtl ? 'هوية وطنية سعودية' : 'Saudi National ID'}</option>
                      <option value="iqama">{isRtl ? 'إقامة نظامية' : 'Saudi Iqama'}</option>
                      <option value="gcc_id">{isRtl ? 'هوية خليجية' : 'GCC National ID'}</option>
                      <option value="passport">{isRtl ? 'جواز سفر' : 'International Passport'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isRtl ? 'رقم الهوية / الإقامة *' : 'ID / Iqama Number *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={buyerInfo.id_type === 'national_id' ? '1XXXXXXXXX' : buyerInfo.id_type === 'iqama' ? '2XXXXXXXXX' : 'ID Number'}
                      value={buyerInfo.id_number}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, id_number: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/20 text-sm focus:ring-2 focus:ring-[#D4AF37] dark:text-white"
                    />
                    {formErrors.idNumber && <p className="text-[10px] text-rose-500 mt-1">{formErrors.idNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isRtl ? 'رقم الجوال (+966 لإرسال التذاكر) *' : 'Mobile Phone (for OTP & Pass) *'}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      required
                      placeholder="+966 50 123 4567"
                      value={buyerInfo.phone}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: formatSaudiPhoneNumber(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/20 text-sm focus:ring-2 focus:ring-[#D4AF37] dark:text-white text-left"
                    />
                    {formErrors.phone && <p className="text-[10px] text-rose-500 mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      dir="ltr"
                      placeholder="name@domain.sa"
                      value={buyerInfo.email}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/20 text-sm focus:ring-2 focus:ring-[#D4AF37] dark:text-white text-left"
                    />
                    {formErrors.email && <p className="text-[10px] text-rose-500 mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                {/* Custom Questionnaire Fields if any */}
                {eventQuestions.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-4">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {isRtl ? 'معلومات إضافية مطلوبة' : 'Additional Information'}
                    </h3>

                    {eventQuestions.map((q) => {
                      const qTitle = getLocalizedText(q.title, locale);
                      return (
                        <div key={q.id}>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            {qTitle} {q.required && '*'}
                          </label>
                          {q.type === 'SELECT' ? (
                            <select
                              defaultValue={q.options?.[0] || ''}
                              onChange={(e) =>
                                setAttendeeAnswers((prev) => ({
                                  ...prev,
                                  0: { ...(prev[0] || {}), [qTitle]: e.target.value },
                                }))
                              }
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#D4AF37] dark:text-white"
                            >
                              {q.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              dir="auto"
                              placeholder={qTitle}
                              onChange={(e) =>
                                setAttendeeAnswers((prev) => ({
                                  ...prev,
                                  0: { ...(prev[0] || {}), [qTitle]: e.target.value },
                                }))
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#D4AF37] dark:text-white"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl cursor-pointer"
                  >
                    {tCommon('back')}
                  </button>
                  <button
                    onClick={handleValidateStep2}
                    className="px-6 py-3 bg-[#D4AF37] hover:bg-[#c5a02a] text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-[#D4AF37]/30 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>{isRtl ? 'المتابعة لخطوة الدفع' : 'Proceed to Payment'}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Saudi Payment Methods */}
            {step === 3 && (
              <div className="bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t('payment')}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isRtl ? 'اختر وسيلة الدفع المعتمدة لإتمام طلبك فورياً.' : 'Select your preferred Saudi payment method to finalize your booking.'}
                  </p>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'mada', label: 'Mada (مدى)', icon: '💳' },
                    { id: 'apple_pay', label: 'Apple Pay', icon: '🍏' },
                    { id: 'stc_pay', label: 'STC Pay', icon: '📱' },
                    { id: 'credit_card', label: 'Visa / Master', icon: '🔒' },
                  ].map((m) => {
                    const isSelected = selectedPaymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedPaymentMethod(m.id as any)}
                        className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/30 scale-102'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xl">{m.icon}</span>
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div className="text-xs text-emerald-900 dark:text-emerald-200">
                    <strong>{isRtl ? 'معالجة مشفرة وآمنة وفق معايير هيئة الزكاة والضريبة' : 'ZATCA & PCI-DSS Encrypted Gateway'}</strong>
                    <p className="text-[11px] opacity-85">
                      {isRtl ? 'إصدار فوري لتصريح الدخول وفاتورة إلكترونية معتمدة.' : 'Instant gate pass and compliant electronic invoice generation.'}
                    </p>
                  </div>
                </div>

                {/* Form fields simulator for card */}
                {selectedPaymentMethod !== 'apple_pay' && selectedPaymentMethod !== 'stc_pay' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {isRtl ? 'رقم البطاقة (مدى / فيزا)' : 'Card Number (Mada / Visa)'}
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        defaultValue="4242 •••• •••• 4242"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/20 text-sm font-mono focus:ring-2 focus:ring-[#D4AF37] dark:text-white text-left"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {isRtl ? 'تاريخ الانتهاء' : 'Expiry Date'}
                        </label>
                        <input
                          type="text"
                          dir="ltr"
                          defaultValue="12/28"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/20 text-sm font-mono focus:ring-2 focus:ring-[#D4AF37] dark:text-white text-left"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {isRtl ? 'رمز الأمان (CVC)' : 'CVC'}
                        </label>
                        <input
                          type="text"
                          dir="ltr"
                          defaultValue="999"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/20 text-sm font-mono focus:ring-2 focus:ring-[#D4AF37] dark:text-white text-left"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'apple_pay' && (
                  <div className="text-center py-4 space-y-2 border border-dashed border-slate-300 dark:border-white/20 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto text-2xl">
                      
                    </div>
                    <p className="text-xs font-bold">
                      {isRtl ? 'سيتم تأكيد الدفع السريع عبر Apple Pay' : 'Ready for Instant Apple Pay Authentication'}
                    </p>
                  </div>
                )}

                {selectedPaymentMethod === 'stc_pay' && (
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                    <label className="block font-semibold">{isRtl ? 'رقم جوال STC Pay' : 'STC Pay Mobile Number'}</label>
                    <input
                      type="tel"
                      dir="ltr"
                      defaultValue={buyerInfo.phone}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/20"
                    />
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl cursor-pointer"
                  >
                    {tCommon('back')}
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#c5a02a] text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-[#D4AF37]/30 transition flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{t('processing')}</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{t('payNow', { amount: formatCurrency(totalDue, currency, locale) })}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar (1 col) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-md space-y-5">
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                {t('summary')}
              </h3>

              <div className="space-y-2 divide-y divide-slate-100 dark:divide-white/10 text-xs">
                {selectedItems.map((item) => {
                  const ticketTitle = getLocalizedText(item.ticket_title, locale);
                  return (
                    <div key={item.ticket_id} className="pt-2 first:pt-0 flex justify-between">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {ticketTitle}
                        </span>
                        <span className="text-slate-400 mx-1">x{item.quantity}</span>
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {formatCurrency(item.total_price, currency, locale)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Input Box */}
              <form onSubmit={handleApplyPromo} className="pt-3 border-t border-slate-100 dark:border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="EARLY10"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs uppercase font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-black/20 focus:ring-2 focus:ring-[#D4AF37] dark:text-white text-left"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                  >
                    {t('apply')}
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {appliedPromo.type === 'PERCENTAGE'
                        ? t('promoApplied', { discount: appliedPromo.value })
                        : t('promoFixedApplied', { discount: appliedPromo.value })}
                    </span>
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1">
                    {t('invalidPromo')}
                  </p>
                )}
              </form>

              {/* Cost Calculation Lines */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between items-center">
                  <span>{t('subtotal')}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                    <span>{subtotal.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="xs" />
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 font-semibold">
                    <span>{t('discount')}</span>
                    <span className="inline-flex items-center gap-1">
                      <span>-{discountAmount.toLocaleString()}</span>
                      <SaudiRiyalSymbol size="xs" />
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <span>{isRtl ? 'ضريبة القيمة المضافة (15% ZATCA)' : '15% Saudi VAT'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                    <span>{taxAmount.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="xs" />
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex justify-between items-baseline font-black text-slate-900 dark:text-white text-base">
                  <span>{t('totalDue')}</span>
                  <span className="text-[#b8860b] dark:text-[#D4AF37] inline-flex items-center gap-1">
                    <span>{totalDue.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="sm" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
