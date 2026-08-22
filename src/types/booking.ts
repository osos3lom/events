export type ServiceCategory = 'events' | 'day-passes' | 'voyages' | 'real-estate';

export type SaudiIdentityType = 'national_id' | 'iqama' | 'passport' | 'gcc_id';

export type PrivacyFilterType = 'all' | 'ladies_only' | 'family' | 'vip_exclusive';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface GuestManifestEntry {
  id: string;
  fullName: string;
  idType: SaudiIdentityType;
  idNumber: string;
  nationality: string;
  dateOfBirth?: string;
  emergencyContact?: string;
}

export interface ProductAddOn {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  price: number; // In SAR
  category: 'concierge' | 'amenity' | 'equipment' | 'catering';
  selected?: boolean;
  quantity?: number;
}

export interface TierOption {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number; // In SAR
  capacityTotal: number;
  capacityRemaining: number;
  perks: LocalizedString[];
  popular?: boolean;
}

export interface VesselSpecs {
  vesselName: string;
  lengthFt: number;
  maxSpeedKnots: number;
  guestCapacity: number;
  crewCount: number;
  captainName: string;
  amenities: LocalizedString[];
}

export interface RealEstateSpecs {
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  privateBeachMeters: number;
  amenities: LocalizedString[];
  floorPlanUrl?: string;
  monthlyRate: number; // In SAR
  annualRate: number;  // In SAR
  securityDeposit: number;
}

export interface LuxuryProduct {
  id: string;
  category: ServiceCategory;
  slug: string;
  title: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  locationName: LocalizedString;
  marinaOrArea: 'north_obhur' | 'south_obhur' | 'jeddah_yacht_club' | 'corniche' | 'bayada_reef' | 'durrat_al_arus';
  coverImage: string;
  galleryImages: string[];
  basePrice: number; // in SAR
  currency: string;
  privacyType?: PrivacyFilterType;
  dateOrSchedule?: string;
  timeSlots?: string[];
  rating: number;
  reviewsCount: number;
  badge?: LocalizedString;
  tiers?: TierOption[];
  availableAddOns?: ProductAddOn[];
  vesselSpecs?: VesselSpecs;
  realEstateSpecs?: RealEstateSpecs;
}

export interface CartItem {
  id: string;
  productId: string;
  category: ServiceCategory;
  title: LocalizedString;
  coverImage: string;
  locationName: LocalizedString;
  selectedDate: string;
  selectedTimeSlot?: string;
  tier?: {
    id: string;
    name: LocalizedString;
    price: number;
  };
  quantity: number;
  unitPrice: number; // SAR
  addOns: {
    id: string;
    title: LocalizedString;
    price: number;
    quantity: number;
  }[];
  leasePlan?: 'monthly' | 'annual';
}

export interface BookingCustomer {
  fullName: string;
  email: string;
  phone: string;
  idType: SaudiIdentityType;
  idNumber: string;
  specialRequests?: string;
}

export interface BookingState {
  cart: CartItem[];
  customer: BookingCustomer;
  maritimeManifest: GuestManifestEntry[];
  paymentMethod: 'mada' | 'apple_pay' | 'stc_pay' | 'credit_card' | 'tamara' | 'tabby';
  appliedPromoCode?: string;
  discountAmount: number;
  vatRate: number; // 0.15
}
