'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Phone, User, Calendar, MessageSquare, Award, Clock } from 'lucide-react';
import { LuxuryProduct } from '../../types/booking';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface ConciergeInquiryModalProps {
  product: LuxuryProduct | null;
  isOpen: boolean;
  onClose: () => void;
  locale?: string;
}

export function ConciergeInquiryModal({
  product,
  isOpen,
  onClose,
  locale = 'en',
}: ConciergeInquiryModalProps) {
  const isArabic = locale === 'ar';
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+966 ',
    idNumber: '',
    preferredDate: '',
    notes: '',
  });

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRefCode(`JED-VIP-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setRefCode('');
    setFormData({
      fullName: '',
      phone: '+966 ',
      idNumber: '',
      preferredDate: '',
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 text-white border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden my-8">
        {/* Ambient Gold Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                <Award className="w-4 h-4" />
                <span>{isArabic ? 'استشارة الكونسيرج الخاص • فحص الهوية' : 'VIP Concierge Consultation • KYC Vetted'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {product.title[isArabic ? 'ar' : 'en']}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {isArabic
                  ? 'يرجى تقديم بياناتك المعتمدة ليقوم مستشار النخبة الخاص بالتواصل معك وترتيب الزيارة أو المعاينة الخاصة.'
                  : 'Submit your credentials for direct liaison with our Senior Maritime & Estate Concierge for private viewing.'}
              </p>
            </div>

            {/* Asset Highlights Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">{isArabic ? 'القيمة / العقد' : 'Asset Valuation / Lease'}</span>
                <span className="text-base font-black text-[#D4AF37] inline-flex items-center gap-1">
                  <span>{product.basePrice.toLocaleString()}</span>
                  <SaudiRiyalSymbol size="xs" />
                  {product.category === 'real-estate' && (
                    <span className="text-[10px] text-slate-400 font-normal">
                      {isArabic ? '/ سنوياً' : '/ year'}
                    </span>
                  )}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isArabic ? 'عقد موثق' : 'KYC Protocol'}</span>
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isArabic ? 'الاسم الكامل (وفق الهوية / الإقامة)' : 'Full Name (As on National ID / Passport)'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder={isArabic ? 'سلطان بن عبدالعزيز آل سعود' : 'Sultan Al-Saud'}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isArabic ? 'رقم الجوال السعودي' : 'Saudi Mobile Number'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+966 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isArabic ? 'رقم الهوية الوطنية / الإقامة' : 'National ID / Iqama Number'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="10XXXXXXXX"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isArabic ? 'موعد المعاينة أو الاتصال المفضل' : 'Preferred Consultation & Viewing Date'}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isArabic ? 'ملاحظات خاصة أو تفضيلات المرسى' : 'Special Preferences (Yacht Berthing, Helipad)'}
                </label>
                <textarea
                  rows={2}
                  placeholder={isArabic ? 'طلب مرسى إضافي ليخت 90 قدم...' : 'Require berth for 90ft vessel...'}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#E07A5F] text-slate-950 font-bold text-sm shadow-xl hover:opacity-95 active:scale-98 transition cursor-pointer"
              >
                {isArabic ? 'تأكيد طلب الاستشارة الخاصة' : 'Submit VIP Consultation Request'}
              </button>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">
                {isArabic ? 'تم استلام طلب المعاينة والاستشارة بنجاح' : 'VIP Consultation Registered'}
              </h4>
              <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                {isArabic
                  ? `شكراً لك، سيتواصل معك مدير علاقات كبار الشخصيات خلال 60 دقيقة لترتيب المعاينة وتفاصيل العقد.`
                  : `Our Senior Private Concierge will contact you within 60 minutes with the bespoke prospectus and security pass.`}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#D4AF37]">
              REF: {refCode || 'JED-VIP-88421'}
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
            >
              {isArabic ? 'إغلاق' : 'Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
