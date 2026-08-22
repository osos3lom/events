export type SaudiIdentityType = 'national_id' | 'iqama' | 'passport' | 'gcc_id';

export interface CustomerValidationInput {
  fullName: string;
  email: string;
  phone: string;
  idType: SaudiIdentityType;
  idNumber: string;
  privacyAgreed?: boolean;
  requiresPrivacyAgreement?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, { en: string; ar: string }>;
}

export function formatSaudiPhoneNumber(value: string): string {
  let cleaned = value.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('00966')) {
    cleaned = '+966' + cleaned.slice(5);
  } else if (cleaned.startsWith('05')) {
    cleaned = '+966' + cleaned.slice(1);
  } else if (cleaned.startsWith('5') && !cleaned.startsWith('+')) {
    cleaned = '+966' + cleaned;
  }
  return cleaned;
}

export function validateSaudiCustomer(
  data: CustomerValidationInput
): ValidationResult {
  const errors: Record<string, { en: string; ar: string }> = {};

  // Full Name: at least two names
  const nameParts = data.fullName.trim().split(/\s+/).filter(Boolean);
  if (nameParts.length < 2) {
    errors.fullName = {
      en: 'Please enter your full name (first and family name).',
      ar: 'يرجى كتابة الاسم كاملاً (الاسم الأول واسم العائلة).',
    };
  }

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = {
      en: 'Please enter a valid email address.',
      ar: 'يرجى إدخال بريد إلكتروني صحيح.',
    };
  }

  // Saudi Mobile Number: +9665XXXXXXXX or 05XXXXXXXX
  const cleanedPhone = data.phone.replace(/[\s\-_]/g, '');
  const saudiPhoneRegex = /^(?:\+9665|009665|05|5)\d{8}$/;
  if (!saudiPhoneRegex.test(cleanedPhone)) {
    errors.phone = {
      en: 'Enter a valid Saudi mobile number (e.g. +966 50 123 4567).',
      ar: 'يرجى إدخال رقم جوال سعودي صالح (مثال: 0501234567 أو +966 5X...).',
    };
  }

  // ID Validation based on type
  const cleanId = data.idNumber.trim().replace(/\s/g, '');
  if (!cleanId) {
    errors.idNumber = {
      en: 'Identity / document number is required.',
      ar: 'رقم الهوية أو الوثيقة مطلوب لإصدار التصريح.',
    };
  } else if (data.idType === 'national_id') {
    if (!/^1\d{9}$/.test(cleanId)) {
      errors.idNumber = {
        en: 'Saudi National ID must be 10 digits starting with 1.',
        ar: 'الهوية الوطنية السعودية يجب أن تتكون من 10 أرقام وتبدأ بالرقم 1.',
      };
    }
  } else if (data.idType === 'iqama') {
    if (!/^2\d{9}$/.test(cleanId)) {
      errors.idNumber = {
        en: 'Saudi Iqama must be 10 digits starting with 2.',
        ar: 'رقم الإقامة يجب أن يتكون من 10 أرقام ويبدأ بالرقم 2.',
      };
    }
  } else if (data.idType === 'gcc_id') {
    if (cleanId.length < 6 || cleanId.length > 16) {
      errors.idNumber = {
        en: 'GCC ID number must be between 6 and 16 characters.',
        ar: 'رقم الهوية الخليجية يجب أن يكون بين 6 إلى 16 خانة.',
      };
    }
  } else if (data.idType === 'passport') {
    if (cleanId.length < 5 || cleanId.length > 15) {
      errors.idNumber = {
        en: 'Passport number must be between 5 and 15 characters.',
        ar: 'رقم جواز السفر يجب أن يكون بين 5 إلى 15 خانة.',
      };
    }
  }

  // Privacy Agreement (for Ladies-only or private events)
  if (data.requiresPrivacyAgreement && !data.privacyAgreed) {
    errors.privacyAgreed = {
      en: 'You must agree to the privacy policy and entry guidelines.',
      ar: 'يجب الموافقة على سياسة الخصوصية والشروط للدخول.',
    };
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
