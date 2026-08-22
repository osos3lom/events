export type SupportedLocales = 'en' | 'ar';

export type LocalizedField =
  | string
  | {
      en: string;
      ar: string;
      [key: string]: string;
    };

export type EventStatus = 'DRAFT' | 'LIVE' | 'PAST' | 'ARCHIVED';
export type EventFormat = 'IN_PERSON' | 'ONLINE' | 'HYBRID';
export type TicketType = 'PAID' | 'FREE' | 'DONATION';
export type OrderStatus = 'COMPLETED' | 'PENDING' | 'REFUNDED' | 'CANCELLED';
export type AttendeeStatus = 'ACTIVE' | 'CANCELLED';
export type DiscountType = 'PERCENTAGE' | 'FIXED';
export type QuestionType = 'TEXT' | 'SELECT' | 'CHECKBOX' | 'TEXTAREA';

export interface Event {
  id: string;
  title: LocalizedField;
  slug: string;
  description: LocalizedField;
  summary: LocalizedField;
  status: EventStatus;
  start_date: string;
  end_date: string;
  timezone: string;
  currency: string;
  format: EventFormat;
  location_venue_name?: LocalizedField;
  location_address?: LocalizedField;
  online_details?: LocalizedField;
  cover_image_url: string;
  organizer_id: string;
  organizer_name: LocalizedField;
  categories: string[];
  capacity: number;
  created_at: string;
  updated_at: string;
  settings: {
    show_remaining_tickets: boolean;
    require_attendee_info: boolean;
    support_email: string;
    custom_color: string;
    default_locale?: SupportedLocales;
  };
}

export interface TicketProduct {
  id: string;
  event_id: string;
  title: LocalizedField;
  description: LocalizedField;
  price: number;
  currency: string;
  type: TicketType;
  quantity_total: number;
  quantity_sold: number;
  max_per_order: number;
  min_per_order: number;
  is_active: boolean;
  sales_start_date?: string;
  sales_end_date?: string;
  order_index: number;
}

export interface OrderItem {
  ticket_id: string;
  ticket_title: LocalizedField;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  short_id: string;
  event_id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: OrderStatus;
  total_gross: number;
  total_tax: number;
  total_fee: number;
  currency: string;
  promo_code?: string;
  discount_amount?: number;
  payment_method: string;
  created_at: string;
  items: OrderItem[];
  answers?: Record<string, string>;
}

export interface Attendee {
  id: string;
  short_id: string;
  order_id: string;
  event_id: string;
  ticket_id: string;
  ticket_title: LocalizedField;
  first_name: string;
  last_name: string;
  email: string;
  status: AttendeeStatus;
  checked_in: boolean;
  checked_in_at?: string | null;
  barcode: string;
  seat?: string;
  created_at: string;
  answers?: Record<string, string>;
}

export interface PromoCode {
  id: string;
  event_id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  max_uses: number;
  current_uses: number;
  expiry_date?: string;
  is_active: boolean;
}

export interface Question {
  id: string;
  event_id: string;
  title: LocalizedField;
  type: QuestionType;
  options?: string[];
  required: boolean;
  belongs_to: 'ORDER' | 'ATTENDEE';
}

export interface CheckInList {
  id: string;
  short_id: string;
  event_id: string;
  name: LocalizedField;
  description?: LocalizedField;
  ticket_ids: string[];
  is_active: boolean;
}

export interface Organization {
  id: string;
  name: LocalizedField;
  slug: string;
  email: string;
  phone?: string;
  website?: string;
  logo_url?: string;
  currency: string;
  timezone: string;
  tax_rate: number;
  fee_rate: number;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'ADMIN' | 'ORGANIZER' | 'STAFF';
  avatar_url?: string;
}

export interface BroadcastMessage {
  id: string;
  event_id: string;
  subject: string;
  body: string;
  recipient_filter: 'ALL' | 'TICKET_TIER';
  target_ticket_id?: string;
  sent_at: string;
  recipients_count: number;
}

export interface AppDataState {
  events: Event[];
  tickets: TicketProduct[];
  orders: Order[];
  attendees: Attendee[];
  promoCodes: PromoCode[];
  questions: Question[];
  checkInLists: CheckInList[];
  messages: BroadcastMessage[];
  organization: Organization;
  user: User;
}
