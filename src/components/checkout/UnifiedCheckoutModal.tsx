'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Check,
  CreditCard,
  UserCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  Lock,
  Anchor,
  QrCode as QrIcon,
  Download,
  CheckCircle2,
  ChevronRight,
  Smartphone,
  Share2,
  FileText,
  AlertCircle,
  Clock,
  ShieldAlert,
  Flame,
  CheckCircle,
} from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { useBookingStore } from '../../lib/bookingStore';
import { SaudiIdentityType, ServiceCategory } from '../../types/booking';
import { validateSaudiCustomer, formatSaudiPhoneNumber } from '../../lib/validation/checkoutValidation';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface UnifiedCheckoutModalProps {
  locale?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function UnifiedCheckoutModal({
  locale = 'en',
  isOpen,
  onClose,
}: UnifiedCheckoutModalProps) {
  const isArabic = locale === 'ar';
  const {
    state,
    isCheckoutOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateCartItemQuantity,
    toggleCartAddOn,
    applyPromoCode,
    removePromoCode,
    syncLeadBookerToManifest,
    updateCustomer,
    addMaritimeGuest,
    removeMaritimeGuest,
    setPaymentMethod,
    pricing,
    clearCart,
    hasVoyages,
  } = useBookingStore();

  const activeIsOpen = isOpen !== undefined ? isOpen : isCheckoutOpen;
  const handleClose = () => {
    if (onClose) onClose();
    else setIsCheckoutOpen(false);
  };

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [orderRef, setOrderRef] = useState<string>('');
  const [applePayLoading, setApplePayLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Validation & Errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [privacyAgreed, setPrivacyAgreed] = useState(true);
  const [postBookingManifest, setPostBookingManifest] = useState(false);

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Card Simulator inputs
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('999');
  const [stcPhone, setStcPhone] = useState(state.customer.phone || '+966 5');

  // Maritime Guest input state for Step 2
  const [guestName, setGuestName] = useState('');
  const [guestIdType, setGuestIdType] = useState<SaudiIdentityType>('national_id');
  const [guestIdNumber, setGuestIdNumber] = useState('');
  const [guestError, setGuestError] = useState('');

  // Determine categories in cart
  const cartCategories = useMemo(() => {
    const set = new Set<ServiceCategory>();
    state.cart.forEach((i) => set.add(i.category));
    return Array.from(set);
  }, [state.cart]);

  // Contextual Upsells Catalog
  const contextualUpsells = useMemo(() => {
    const list: Array<{
      id: string;
      category: ServiceCategory;
      titleEn: string;
      titleAr: string;
      descEn: string;
      descAr: string;
      price: number;
      badgeEn?: string;
      badgeAr?: string;
    }> = [];

    if (cartCategories.includes('voyages') || cartCategories.length === 0) {
      list.push({
        id: 'up-jetski',
        category: 'voyages',
        titleEn: '30-Min Yamaha Jet Ski Rental',
        titleAr: 'دراجة مائية جت سكي ياماها (٣٠ دقيقة)',
        descEn: 'Delivered directly to your yacht at Bayada Reef',
        descAr: 'توصيل مباشر إلى يختك في خليج بياضة',
        price: 400,
        badgeEn: 'Most Popular',
        badgeAr: 'الأكثر طلباً',
      });
      list.push({
        id: 'up-caviar',
        category: 'voyages',
        titleEn: 'Private Onboard Chef & Seafood Platter',
        titleAr: 'شيف خاص ومأكولات بحرية مثلجة',
        descEn: 'Fresh Red Sea catch prepared live on deck',
        descAr: 'صيد البحر الأحمر الطازج يُعد مباشرة أمامك',
        price: 550,
      });
    }

    if (cartCategories.includes('day-passes')) {
      list.push({
        id: 'up-cabana',
        category: 'day-passes',
        titleEn: 'VIP Private Beach Cabana Upgrade',
        titleAr: 'ترقية كباينشاطئية خاصة VIP',
        descEn: 'Dedicated sunbed, mini-bar, and personal attendant',
        descAr: 'سرير تشميس خاص وميني بار وخادم شخصي',
        price: 350,
        badgeEn: 'VIP Access',
        badgeAr: 'ترقية فاخرة',
      });
      list.push({
        id: 'up-towels',
        category: 'day-passes',
        titleEn: 'Luxury Egyptian Towel & Sun Care Kit',
        titleAr: 'طقم مناشف قطنية فاخرة وواقي شمس',
        descEn: 'Sanitized organic towels with organic sun care',
        descAr: 'مناشف معقمة فاخرة مع مستحضرات حماية عضوية',
        price: 60,
      });
    }

    if (cartCategories.includes('events')) {
      list.push({
        id: 'up-valet',
        category: 'events',
        titleEn: 'VIP Marina Gate Valet Parking',
        titleAr: 'موقف سيارات كبار الشخصيات السريع',
        descEn: 'Fast-track priority parking at Jeddah Yacht Club',
        descAr: 'مواقف مخصصة سريعة عند مدخل نادي جدة لليخوت',
        price: 150,
      });
      list.push({
        id: 'up-fasttrack',
        category: 'events',
        titleEn: 'Golden Fast-Track Entry Pass',
        titleAr: 'المسار الذهبي للدخول الفوري بدون انتظار',
        descEn: 'Direct gate entry without queuing',
        descAr: 'دخول مباشر للبوابة بدون طوابير الانتظار',
        price: 120,
        badgeEn: 'Fast Pass',
        badgeAr: 'دخول سريع',
      });
    }

    if (cartCategories.includes('real-estate')) {
      list.push({
        id: 'up-butler',
        category: 'real-estate',
        titleEn: '24/7 Dedicated Private Villa Butler',
        titleAr: 'خدمة خادم خاص للفيلا على مدار الساعة',
        descEn: 'Full concierge, luggage, and dining service',
        descAr: 'خدمات الضيافة والكونسيرج الكاملة طوال إقامتك',
        price: 1200,
      });
    }

    return list;
  }, [cartCategories]);

  // Handle Promo Code submission
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'REDSEA10' || code === 'JEDDAH10') {
      const discount = Math.round(pricing.subtotal * 0.1);
      applyPromoCode(code, discount);
      setPromoMessage({
        text: isArabic ? `تم تطبيق خصم 10% بنجاح (${discount.toLocaleString()})` : `10% discount applied (${discount.toLocaleString()} off)`,
        isError: false,
      });
    } else if (code === 'VIP500') {
      const discount = 500;
      applyPromoCode(code, discount);
      setPromoMessage({
        text: isArabic ? 'تم تطبيق خصم بقيمة 500' : '500 VIP discount applied',
        isError: false,
      });
    } else {
      setPromoMessage({
        text: isArabic ? 'رمز الخصم غير صالح أو منتهي الصلاحية' : 'Invalid or expired promo code',
        isError: true,
      });
    }
  };

  // Step 2 Validation handler
  const handleProceedToPayment = () => {
    const validation = validateSaudiCustomer({
      fullName: state.customer.fullName,
      email: state.customer.email,
      phone: state.customer.phone,
      idType: state.customer.idType,
      idNumber: state.customer.idNumber,
      privacyAgreed,
      requiresPrivacyAgreement: true,
    });

    if (!validation.isValid) {
      const mappedErrors: Record<string, string> = {};
      Object.entries(validation.errors).forEach(([field, msg]) => {
        mappedErrors[field] = isArabic ? msg.ar : msg.en;
      });
      setFormErrors(mappedErrors);
      return;
    }

    setFormErrors({});

    // If voyages, automatically sync lead booker to manifest entry #1 if not already there
    if (hasVoyages) {
      syncLeadBookerToManifest();
    }

    setStep(3);
  };

  // Add Maritime Companion Guest
  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setGuestError(isArabic ? 'يرجى إدخال اسم المرافق' : 'Please enter guest name');
      return;
    }
    if (!guestIdNumber.trim()) {
      setGuestError(isArabic ? 'يرجى إدخال رقم الهوية / الجواز' : 'Please enter ID / Passport number');
      return;
    }

    addMaritimeGuest({
      fullName: guestName.trim(),
      idType: guestIdType,
      idNumber: guestIdNumber.trim(),
      nationality: 'Saudi',
    });

    setGuestName('');
    setGuestIdNumber('');
    setGuestError('');
  };

  // 1-Click Apple Pay Express Checkout Trigger
  const handleExpressApplePay = async () => {
    setApplePayLoading(true);
    setPaymentMethod('apple_pay');

    // Auto-fill minimal defaults if empty
    if (!state.customer.fullName) {
      updateCustomer({
        fullName: 'Apple Pay Guest',
        email: 'guest@applepay.sa',
        phone: '+966500000000',
        idType: 'national_id',
        idNumber: '1000000000',
      });
    }

    setTimeout(async () => {
      setApplePayLoading(false);
      await executeOrderSuccess();
    }, 1200);
  };

  // Final Payment Processing & Pass Issuance
  const executeOrderSuccess = async () => {
    setIsProcessing(true);
    const generatedOrderRef = `RED-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedOrderRef);

    // ZATCA QR Compliant Payload
    const qrPayload = JSON.stringify({
      ref: generatedOrderRef,
      org: 'Red Sea Marine & Luxury Experiences Jeddah',
      vatNumber: '310928371900003',
      timestamp: new Date().toISOString(),
      total: pricing.grandTotal,
      vat: pricing.vatAmount,
      customer: state.customer.fullName || 'VIP Guest',
      passType: 'OFFICIAL_FAST_TRACK_PERMIT',
    });

    try {
      const url = await QRCode.toDataURL(qrPayload, {
        width: 300,
        margin: 2,
        color: { dark: '#071E26', light: '#FFFFFF' },
      });
      setQrCodeUrl(url);
    } catch (e) {
      console.error('Failed to generate QR code', e);
    }

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#E07A5F', '#06b6d4', '#10b981'],
        });
      } catch (e) {
        // safe fallback
      }
    }, 800);
  };

  if (!activeIsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#071E26] border border-slate-200 dark:border-[#D4AF37]/40 shadow-2xl text-slate-900 dark:text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Header with Progress Steps & Close Button */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
            {[
              { num: 1, labelEn: '1. Review & Add-ons', labelAr: '١. السلة والترقيات' },
              { num: 2, labelEn: '2. Guest & KYC', labelAr: '٢. بيانات الضيف والتصريح' },
              { num: 3, labelEn: '3. Payment & Pass', labelAr: '٣. الدفع والتصريح' },
            ].map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/30 ring-2 ring-[#D4AF37]/40'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      isActive ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {isArabic ? s.labelAr : s.labelEn}
                  </span>
                  {s.num < 3 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-white/20 rtl:rotate-180" />}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* ==================================================================== */}
          {/* STEP 1: CART REVIEW, EXPRESS APPLE PAY & CONTEXTUAL UPSELLS */}
          {/* ==================================================================== */}
          {step === 1 && !isCompleted && (
            <div className="space-y-5">
              {/* 1-Click Apple Pay Express Banner */}
              {state.cart.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-black via-slate-900 to-black text-white border border-white/15 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-base">
                      
                    </div>
                    <div>
                      <p className="text-xs font-bold">
                        {isArabic ? 'الدفع السريع بنقرة واحدة عبر Apple Pay' : '1-Click Express Checkout with Apple Pay'}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        {isArabic ? 'تخطي النماذج وإصدار التصريح الفوري بحركة واحدة' : 'Skip the forms and get your gate pass immediately'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleExpressApplePay}
                    disabled={applePayLoading}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-black hover:bg-slate-100 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                  >
                    {applePayLoading ? (
                      <span>{isArabic ? 'جاري التحقق...' : 'Authenticating...'}</span>
                    ) : (
                      <>
                        <span>Pay</span>
                        <span>{isArabic ? 'ادفع الآن' : 'Fast Checkout'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#b8860b] dark:text-[#D4AF37]" />
                    <span>{isArabic ? 'مراجعة الحجز والترقيات الحصرية' : 'Review Booking & VIP Upgrades'}</span>
                  </h3>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'شامل ١٥٪ ضريبة القيمة المضافة' : '15% ZATCA VAT Included'}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {isArabic
                    ? 'تأكد من اختياراتك وأضف باقات الضيافة والخدمات المميزة قبل المتابعة'
                    : 'Verify your reservations and personalize with bespoke Red Sea concierge upgrades'}
                </p>
              </div>

              {/* Cart Items List */}
              {state.cart.length === 0 ? (
                <div className="py-12 text-center text-slate-500 dark:text-slate-400 space-y-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
                  <Anchor className="w-10 h-10 mx-auto text-[#b8860b] dark:text-[#D4AF37]/60 animate-pulse" />
                  <p className="text-sm font-medium">{isArabic ? 'سلة الحجز فارغة حالياً' : 'Your booking cart is currently empty'}</p>
                  <p className="text-xs text-slate-400">{isArabic ? 'اختر تجربة من الصفحة الرئيسية للمتابعة' : 'Select an experience from the homepage to proceed'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {state.cart.map((item) => {
                    const itemAddOnsTotal = item.addOns.reduce((s, a) => s + a.price * (a.quantity || 1), 0);
                    const itemTotal = item.unitPrice * item.quantity + itemAddOnsTotal;

                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col gap-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.coverImage}
                              alt={item.title[isArabic ? 'ar' : 'en']}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-white/10 shrink-0"
                            />
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                                {item.title[isArabic ? 'ar' : 'en']}
                              </h4>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2 mt-0.5 font-medium">
                                <span>📅 {item.selectedDate}</span>
                                {item.selectedTimeSlot && <span>• ⏰ {item.selectedTimeSlot}</span>}
                                {item.tier && (
                                  <span className="text-[#b8860b] dark:text-[#D4AF37] font-semibold">
                                    • {item.tier.name[isArabic ? 'ar' : 'en']}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quantity & Unit Total */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-slate-200 dark:border-white/5 pt-2 sm:pt-0">
                            <div className="flex items-center gap-2 bg-slate-200/80 dark:bg-white/10 rounded-xl px-2 py-1">
                              <button
                                onClick={() => updateCartItemQuantity(item.id, -1)}
                                className="p-1 hover:text-[#b8860b] dark:hover:text-[#D4AF37] text-slate-700 dark:text-slate-300"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold text-slate-900 dark:text-white px-1">{item.quantity}</span>
                              <button
                                onClick={() => updateCartItemQuantity(item.id, 1)}
                                className="p-1 hover:text-[#b8860b] dark:hover:text-[#D4AF37] text-slate-700 dark:text-slate-300"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-right rtl:text-left min-w-[90px]">
                              <span className="inline-flex items-center gap-1 text-sm font-bold text-[#b8860b] dark:text-[#D4AF37]">
                                <span>{itemTotal.toLocaleString()}</span>
                                <SaudiRiyalSymbol size="xs" />
                              </span>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Attached Add-ons badges if any */}
                        {item.addOns.length > 0 && (
                          <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-2 text-[11px]">
                            {item.addOns.map((add) => (
                              <span
                                key={add.id}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-[#D4AF37] font-semibold"
                              >
                                <span className="inline-flex items-center gap-1">
                                  <span>✓ {add.title[isArabic ? 'ar' : 'en']} (+{add.price}</span>
                                  <SaudiRiyalSymbol size="xs" />
                                  <span>)</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => toggleCartAddOn(item.id, { id: add.id, title: add.title, price: add.price })}
                                  className="text-rose-500 hover:text-rose-700 ml-1 font-bold"
                                >
                                  ✕
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VIP Contextual Upsells Recommended Box */}
              {state.cart.length > 0 && contextualUpsells.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span>{isArabic ? 'ترقيات وخدمات مضافة مخصصة لحجزك' : 'Recommended VIP Add-Ons for Your Experience'}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {isArabic ? 'تضاف مباشرة لتصريح الدخول' : 'Directly synced with gate pass'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {contextualUpsells.map((upsell) => {
                      const primaryCartItem = state.cart[0];
                      const isAdded = primaryCartItem?.addOns.some((a) => a.id === upsell.id);

                      return (
                        <div
                          key={upsell.id}
                          className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                            isAdded
                              ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-[#D4AF37]'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-amber-500/40 dark:hover:border-[#D4AF37]/40'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-slate-900 dark:text-white">
                                {isArabic ? upsell.titleAr : upsell.titleEn}
                              </p>
                              {upsell.badgeAr && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#b8860b] dark:text-[#D4AF37]">
                                  {isArabic ? upsell.badgeAr : upsell.badgeEn}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {isArabic ? upsell.descAr : upsell.descEn}
                            </p>
                            <p className="text-[11px] text-[#b8860b] dark:text-[#D4AF37] font-bold inline-flex items-center gap-1">
                              <span>+{upsell.price.toLocaleString()}</span>
                              <SaudiRiyalSymbol size="xs" />
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (primaryCartItem) {
                                toggleCartAddOn(primaryCartItem.id, {
                                  id: upsell.id,
                                  title: { en: upsell.titleEn, ar: upsell.titleAr },
                                  price: upsell.price,
                                });
                              }
                            }}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shrink-0 cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 dark:bg-white/10 hover:bg-[#D4AF37] hover:text-slate-950 text-slate-800 dark:text-white'
                            }`}
                          >
                            {isAdded ? (isArabic ? '✓ مضاف' : '✓ Added') : isArabic ? '+ إضافة' : '+ Add'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================================== */}
          {/* STEP 2: GUEST DETAILS, COMPLIANCE & SAUDI COAST GUARD MANIFEST */}
          {/* ==================================================================== */}
          {step === 2 && !isCompleted && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#b8860b] dark:text-[#D4AF37]" />
                  <span>{isArabic ? 'بيانات الضيف ومطابقة حرس الحدود' : 'Guest KYC & Saudi Maritime Clearance'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {isArabic
                    ? 'وفق الأنظمة السعودية لإصدار الفواتير الضريبية وتصاريح الإبحار وتذاكر البوابة الرسمية.'
                    : 'Required by Saudi Coast Guard for marine gate passes and ZATCA tax invoice verification.'}
                </p>
              </div>

              {/* Primary Contact Info Form */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#b8860b] dark:text-[#D4AF37] uppercase tracking-wider block">
                    {isArabic ? 'بيانات الحاجز الرئيسي (المسؤول)' : 'Primary Booker Details'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {isArabic ? '* جميع الحقول مطلوبة' : '* All fields required'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                      {isArabic ? 'الاسم الثلاثي (مطابق للهوية) *' : 'Full Name (as in National ID) *'}
                    </label>
                    <input
                      type="text"
                      value={state.customer.fullName}
                      onChange={(e) => updateCustomer({ fullName: e.target.value })}
                      placeholder={isArabic ? 'مثال: فيصل بن خالد الغامدي' : 'e.g. Faisal Al-Ghamdi'}
                      className={`w-full bg-white dark:bg-white/5 border rounded-xl p-2.5 text-slate-900 dark:text-white outline-none ${
                        formErrors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10 focus:border-[#D4AF37]'
                      }`}
                    />
                    {formErrors.fullName && <p className="text-[10px] text-rose-500 mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                      {isArabic ? 'نوع الهوية *' : 'Identity Type *'}
                    </label>
                    <select
                      value={state.customer.idType}
                      onChange={(e) => updateCustomer({ idType: e.target.value as SaudiIdentityType })}
                      className="w-full bg-white dark:bg-[#071E26] border border-slate-200 dark:border-white/10 focus:border-[#D4AF37] rounded-xl p-2.5 text-slate-900 dark:text-white outline-none cursor-pointer"
                    >
                      <option value="national_id">{isArabic ? 'هوية وطنية سعودية (10 أرقام)' : 'Saudi National ID (10 Digits)'}</option>
                      <option value="iqama">{isArabic ? 'إقامة نظامية للمقيمين (10 أرقام)' : 'Saudi Iqama Resident (10 Digits)'}</option>
                      <option value="gcc_id">{isArabic ? 'هوية مواطني دول الخليج' : 'GCC National ID'}</option>
                      <option value="passport">{isArabic ? 'جواز سفر دولي للزوار' : 'International Passport'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                      {isArabic ? 'رقم الهوية / الإقامة / الجواز *' : 'ID / Iqama / Passport Number *'}
                    </label>
                    <input
                      type="text"
                      value={state.customer.idNumber}
                      onChange={(e) => updateCustomer({ idNumber: e.target.value })}
                      placeholder={state.customer.idType === 'national_id' ? '1XXXXXXXXX' : state.customer.idType === 'iqama' ? '2XXXXXXXXX' : 'Document Number'}
                      className={`w-full bg-white dark:bg-white/5 border rounded-xl p-2.5 text-slate-900 dark:text-white outline-none ${
                        formErrors.idNumber ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10 focus:border-[#D4AF37]'
                      }`}
                    />
                    {formErrors.idNumber && <p className="text-[10px] text-rose-500 mt-1">{formErrors.idNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                      {isArabic ? 'رقم الجوال السعودي (+966 لإرسال التصريح) *' : 'Mobile Phone (for OTP & Digital Pass) *'}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={state.customer.phone}
                      onChange={(e) => updateCustomer({ phone: formatSaudiPhoneNumber(e.target.value) })}
                      placeholder="+966 50 123 4567"
                      className={`w-full bg-white dark:bg-white/5 border rounded-xl p-2.5 text-slate-900 dark:text-white outline-none text-left ${
                        formErrors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10 focus:border-[#D4AF37]'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[10px] text-rose-500 mt-1">{formErrors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                      {isArabic ? 'البريد الإلكتروني للفاتورة الضريبية وتذكرة Apple Wallet *' : 'Email for ZATCA Tax Invoice & Apple Pass *'}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={state.customer.email}
                      onChange={(e) => updateCustomer({ email: e.target.value })}
                      placeholder="name@domain.sa"
                      className={`w-full bg-white dark:bg-white/5 border rounded-xl p-2.5 text-slate-900 dark:text-white outline-none text-left ${
                        formErrors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10 focus:border-[#D4AF37]'
                      }`}
                    />
                    {formErrors.email && <p className="text-[10px] text-rose-500 mt-1">{formErrors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Saudi Coast Guard Maritime Passenger Manifest (Conditional for Voyages) */}
              {hasVoyages && (
                <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Anchor className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span className="text-xs font-bold text-cyan-900 dark:text-cyan-200">
                        {isArabic ? 'بيان ركاب الإبحار (حرس الحدود السعودي)' : 'Coast Guard Maritime Passenger Manifest'}
                      </span>
                    </div>
                    <span className="text-[10px] text-cyan-800 dark:text-cyan-300 font-bold bg-cyan-200/80 dark:bg-cyan-900/50 px-2 py-0.5 rounded-full w-fit">
                      {state.maritimeManifest.length} {isArabic ? 'ركاب مسجلين' : 'Passengers Logged'}
                    </span>
                  </div>

                  {/* Toggle: Add companion guests now vs Share Link post checkout */}
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-black/40 border border-cyan-200 dark:border-cyan-500/20 text-xs flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {isArabic ? 'إرسال رابط إكمال بيانات المرافقين عبر الواتساب لاحقاً' : 'Share companion manifest link via WhatsApp later'}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isArabic ? 'يمكنك إتمام الحجز الآن وإدخال بيانات باقي الضيوف قبل موعد الرحلة' : 'Complete booking now and let your guests submit their IDs before departure'}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={postBookingManifest}
                      onChange={(e) => setPostBookingManifest(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500 cursor-pointer shrink-0"
                    />
                  </div>

                  {!postBookingManifest && (
                    <>
                      {/* Form to add companion guest */}
                      <form onSubmit={handleAddGuest} className="space-y-2 pt-1">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                          <input
                            type="text"
                            placeholder={isArabic ? 'اسم المرافق' : 'Companion Full Name'}
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg p-2 text-slate-900 dark:text-white"
                          />
                          <select
                            value={guestIdType}
                            onChange={(e) => setGuestIdType(e.target.value as SaudiIdentityType)}
                            className="bg-white dark:bg-[#071E26] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-slate-900 dark:text-white"
                          >
                            <option value="national_id">{isArabic ? 'هوية وطنية' : 'National ID'}</option>
                            <option value="iqama">{isArabic ? 'إقامة' : 'Iqama'}</option>
                            <option value="passport">{isArabic ? 'جواز سفر' : 'Passport'}</option>
                          </select>
                          <input
                            type="text"
                            placeholder={isArabic ? 'رقم الهوية / الجواز' : 'ID / Passport Number'}
                            value={guestIdNumber}
                            onChange={(e) => setGuestIdNumber(e.target.value)}
                            className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg p-2 text-slate-900 dark:text-white"
                          />
                          <button
                            type="submit"
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg p-2 text-xs transition-colors cursor-pointer"
                          >
                            {isArabic ? '+ إضافة مرافق' : '+ Add Companion'}
                          </button>
                        </div>
                        {guestError && <p className="text-[10px] text-rose-500">{guestError}</p>}
                      </form>

                      {/* Added Guests Badges */}
                      {state.maritimeManifest.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-cyan-200 dark:border-cyan-500/20">
                          {state.maritimeManifest.map((g) => (
                            <span
                              key={g.id}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-900/60 border border-cyan-300 dark:border-cyan-400/30 text-xs text-cyan-900 dark:text-white"
                            >
                              <span>{g.fullName} ({g.idNumber})</span>
                              <button
                                type="button"
                                onClick={() => removeMaritimeGuest(g.id)}
                                className="text-rose-600 dark:text-rose-300 hover:text-rose-800 dark:hover:text-rose-100 font-bold"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Privacy and Entry Terms Acknowledgement */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="privacy-terms"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#D4AF37] rounded border-slate-300 focus:ring-[#D4AF37] cursor-pointer shrink-0"
                />
                <label htmlFor="privacy-terms" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  {isArabic
                    ? 'أوافق على سياسة الخصوصية والشروط والأحكام واللوائح المعتمدة للفعاليات والرحلات البحرية.'
                    : 'I agree to the privacy policy, gate entry regulations, and maritime safety terms.'}
                </label>
              </div>
              {formErrors.privacyAgreed && (
                <p className="text-[10px] text-rose-500">{formErrors.privacyAgreed}</p>
              )}
            </div>
          )}

          {/* ==================================================================== */}
          {/* STEP 3: SAUDI PAYMENT INTEGRATION & ZATCA TAX BREAKDOWN */}
          {/* ==================================================================== */}
          {step === 3 && !isCompleted && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#b8860b] dark:text-[#D4AF37]" />
                  <span>{isArabic ? 'طريقة الدفع والتفاصيل المالية المعتمدة' : 'Payment & ZATCA Tax Breakdown'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {isArabic ? 'دفع إلكتروني فوري وآمن 100% مع إصدار فوري للتذاكر وتصاريح البوابة' : 'Instant 100% encrypted checkout with real-time digital pass generation'}
                </p>
              </div>

              {/* Promo Code Input Box */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="REDSEA10"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs uppercase font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 dark:bg-white/10 hover:bg-[#D4AF37] hover:text-slate-950 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    {isArabic ? 'تطبيق الخصم' : 'Apply Code'}
                  </button>
                </form>
                {promoMessage && (
                  <p className={`text-[11px] font-semibold mt-1.5 ${promoMessage.isError ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Itemized Price Breakdown Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>{isArabic ? 'المجموع الفرعي للخدمات' : 'Subtotal'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">
                    <span>{pricing.subtotal.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="xs" />
                  </span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>{isArabic ? `خصم الكوبون (${state.appliedPromoCode})` : `Promo Discount (${state.appliedPromoCode})`}</span>
                    <span className="inline-flex items-center gap-1">
                      <span>- {pricing.discountAmount.toLocaleString()}</span>
                      <SaudiRiyalSymbol size="xs" />
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <span>{isArabic ? 'ضريبة القيمة المضافة (15% ZATCA)' : 'Saudi VAT (15% ZATCA Compliant)'}</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">ضريبي</span>
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">
                    <span>{pricing.vatAmount.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="xs" />
                  </span>
                </div>
                <div className="pt-2.5 border-t border-slate-200 dark:border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{isArabic ? 'المبلغ الإجمالي المستحق' : 'Total Amount Due'}</span>
                  <span className="text-xl font-black text-[#b8860b] dark:text-[#D4AF37] inline-flex items-center gap-1">
                    <span>{pricing.grandTotal.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="sm" />
                  </span>
                </div>
              </div>

              {/* Saudi Payment Methods Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  {isArabic ? 'اختر وسيلة الدفع الإلكتروني' : 'Select Saudi Payment Method'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {[
                    { id: 'mada', label: 'Mada', logo: '/payments/Mada_Logo.png' },
                    { id: 'apple_pay', label: 'Apple Pay', logo: '/payments/Apple_Pay.png' },
                    { id: 'stc_pay', label: 'STC Pay', logo: '/payments/Stc_pay.png' },
                    { id: 'credit_card', label: 'Visa / MC', logo: '/payments/Visa_Logo.png' },
                    { id: 'tamara', label: 'Tamara', logo: '/payments/taamara.png' },
                    { id: 'tabby', label: 'Tabby', logo: '/payments/tabby-logo.png' },
                  ].map((method) => {
                    const isSelected = state.paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative bg-white dark:bg-white/5 ${
                          isSelected
                            ? 'border-cyan-500 ring-2 ring-cyan-500 shadow-md shadow-cyan-500/20 scale-102'
                            : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="h-6 w-full flex items-center justify-center">
                          <img src={method.logo} alt={method.label} className="max-h-5 max-w-[50px] object-contain" />
                        </div>
                        <span className="text-[10px] text-slate-700 dark:text-slate-200 font-semibold">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Input Simulator by Method */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                {state.paymentMethod === 'apple_pay' && (
                  <div className="text-center py-3 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto text-2xl">
                      
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {isArabic ? 'سيتم تفعيل Apple Pay مباشرة عند تأكيد الدفع' : 'Apple Pay Sheet will prompt on confirmation'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isArabic ? 'تأكيد ببصمة الوجه أو الإصبع Face ID / Touch ID' : 'Authenticate securely with Face ID or Touch ID'}
                    </p>
                  </div>
                )}

                {state.paymentMethod === 'stc_pay' && (
                  <div className="space-y-2 text-xs">
                    <label className="block text-slate-600 dark:text-slate-400 font-semibold">
                      {isArabic ? 'رقم جوال حساب STC Pay المسجل' : 'Registered STC Pay Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={stcPhone}
                      onChange={(e) => setStcPhone(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-white outline-none text-left"
                    />
                    <p className="text-[10px] text-slate-400">
                      {isArabic ? 'سيصلك إشعار دفع فوري على تطبيق STC Pay للموافقة.' : 'You will receive an instant payment request in your STC Pay app.'}
                    </p>
                  </div>
                )}

                {(state.paymentMethod === 'mada' || state.paymentMethod === 'credit_card') && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-600 dark:text-slate-400 font-semibold">
                          {isArabic ? 'رقم البطاقة البنكية' : 'Card Number'}
                        </label>
                        {state.paymentMethod === 'mada' && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            بطاقة مدى معتمدة
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        dir="ltr"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white outline-none text-left"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">{isArabic ? 'تاريخ الانتهاء' : 'Expiry Date'}</label>
                        <input
                          type="text"
                          dir="ltr"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white outline-none text-left"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">{isArabic ? 'رمز الأمان (CVV)' : 'CVV Code'}</label>
                        <input
                          type="text"
                          dir="ltr"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white outline-none text-left"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Security & Guarantee Badges */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-emerald-900 dark:text-emerald-300">
                    {isArabic ? 'إصدار فوري لتصريح الدخول وفاتورة ZATCA المعتمدة' : 'Instant Gate Pass & ZATCA Compliant Invoice'}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">
                    {isArabic
                      ? 'فور إتمام الدفع، يتم تفعيل باركود البوابة وحفظ التذكرة في محفظة Apple Wallet مباشرة.'
                      : 'Your secure gate barcode and Apple Wallet pass will be ready immediately upon payment.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* SUCCESSFUL CONFIRMATION VIEW (DIGITAL PASS & SHARING) */}
          {/* ==================================================================== */}
          {isCompleted && (
            <div className="space-y-6 text-center py-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-500 animate-in zoom-in-75 duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {isArabic ? 'تم تأكيد الحجز وإصدار التصريح بنجاح!' : 'Booking Confirmed & Gate Pass Issued!'}
                </h3>
                <p className="text-xs text-[#b8860b] dark:text-[#D4AF37] font-bold">
                  {isArabic ? `رقم المرجع: ${orderRef}` : `Order Reference: ${orderRef}`}
                </p>
              </div>

              {/* Official Digital Gate Pass Card */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 text-center space-y-4">
                <div className="border-b border-slate-200 pb-3 flex flex-col items-center">
                  <img src="/brand/logo-icon.png" alt="jeddah Events" className="w-10 h-10 object-contain mb-1.5" />
                  <span className="text-[10px] font-bold tracking-widest text-cyan-800 uppercase block">
                    RED SEA LUXURY EXPERIENCES • OFFICIAL PASS
                  </span>
                  <h4 className="text-base font-extrabold text-slate-950 mt-1">
                    {state.customer.fullName || 'VIP Guest Pass'}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {state.customer.idNumber && `ID: ${state.customer.idNumber} • `}
                    {new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                  </p>
                </div>

                {/* QR Code Canvas */}
                {qrCodeUrl && (
                  <div className="flex justify-center p-3 bg-slate-50 rounded-2xl border border-slate-200 inline-block mx-auto shadow-inner">
                    <img src={qrCodeUrl} alt="Gate Pass QR" className="w-44 h-44 mx-auto" />
                  </div>
                )}

                <div className="text-[11px] text-slate-500 space-y-1">
                  <p className="font-semibold text-emerald-700">✓ Valid for Gate Fast-Track & Coast Guard Inspection</p>
                  <p className="inline-flex items-center justify-center gap-1">
                    <span>Total Paid: {pricing.grandTotal.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="xs" />
                    <span>(incl. 15% ZATCA VAT)</span>
                  </p>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => alert('Apple Wallet Pass (.pkpass) downloaded successfully!')}
                    className="py-2.5 px-3 rounded-xl bg-black hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-white" />
                    <span>{isArabic ? 'محفظة Apple Wallet' : 'Add to Apple Wallet'}</span>
                  </button>

                  <button
                    onClick={() => alert('ZATCA Tax Invoice PDF downloaded!')}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-300 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-slate-700" />
                    <span>{isArabic ? 'الفاتورة الضريبية' : 'ZATCA Tax PDF'}</span>
                  </button>
                </div>

                {/* Share Manifest / Companion Link */}
                {hasVoyages && (
                  <button
                    onClick={() => {
                      const shareText = `https://jeddahevents.sa/manifest/${orderRef}`;
                      navigator.clipboard.writeText(shareText);
                      alert(isArabic ? 'تم نسخ رابط بيان الركاب لمشاركته عبر الواتساب!' : 'Passenger manifest link copied for WhatsApp!');
                    }}
                    className="w-full py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-900 font-bold text-xs flex items-center justify-center gap-1.5 border border-cyan-200 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'مشاركة رابط تسجيل المرافقين عبر WhatsApp' : 'Share Companion KYC Link via WhatsApp'}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between gap-3">
          {!isCompleted ? (
            <>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((step - 1) as any)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  {isArabic ? 'السابق' : 'Back'}
                </button>
              ) : (
                <div />
              )}

              {step === 1 && (
                <button
                  type="button"
                  disabled={state.cart.length === 0}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a02a] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/30 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <span>{isArabic ? 'المتابعة لبيانات الضيف' : 'Continue to Guest KYC'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a02a] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/30 transition-transform active:scale-95 cursor-pointer"
                >
                  <span>{isArabic ? 'المتابعة لخطوة الدفع' : 'Proceed to Payment'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              )}

              {step === 3 && (
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={executeOrderSuccess}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E07A5F] hover:from-[#c5a02a] hover:to-[#ce6c52] text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-[#D4AF37]/30 transition-transform hover:scale-102 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span className="inline-flex items-center gap-1">
                    {isProcessing ? (
                      <span>{isArabic ? 'جاري المعالجة والتشفير...' : 'Processing Secure Payment...'}</span>
                    ) : isArabic ? (
                      <>
                        <span>ادفع {pricing.grandTotal.toLocaleString()}</span>
                        <SaudiRiyalSymbol size="xs" />
                        <span>وأصدر التصريح</span>
                      </>
                    ) : (
                      <>
                        <span>Pay {pricing.grandTotal.toLocaleString()}</span>
                        <SaudiRiyalSymbol size="xs" />
                        <span>& Get Pass</span>
                      </>
                    )}
                  </span>
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                clearCart();
                setIsCompleted(false);
                setStep(1);
                handleClose();
              }}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs cursor-pointer shadow-md hover:bg-[#c5a02a]"
            >
              {isArabic ? 'إغلاق والعودة لتصفح التجارب' : 'Done & Return to Experiences'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
