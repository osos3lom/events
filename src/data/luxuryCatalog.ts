import { LuxuryProduct } from '../types/booking';
import { asset } from '@/lib/basePath';

export const luxuryCatalog: LuxuryProduct[] = [
  // ==========================================
  // 1. EVENT TICKETS (فعاليات)
  // ==========================================
  {
    id: 'evt-abdullah-almanea',
    category: 'events',
    slug: 'tarab-session-abdullah-al-manea',
    title: {
      en: 'Tarab Night with Abdullah Al-Manea',
      ar: 'جلسة طرب مع عبدالله المانع',
    },
    tagline: {
      en: 'Authentic Tarab & melodies by the sea',
      ar: 'طرب وألحان ساحلية أصيلة على شاطئ البحر',
    },
    description: {
      en: 'An unforgettable shoreline musical evening featuring artist Abdullah Al-Manea performing classic Tarab and acoustic melodies under the Jeddah night sky.',
      ar: 'أمسية طربية ساحرة مع الفنان عبدالله المانع، يقدم فيها أجمل الأغاني والمقامات الأصيلة بين نسيم البحر وأضواء جدة الهادئة.',
    },
    locationName: {
      en: 'Oia Beach Amphitheater, North Obhur',
      ar: 'مسرح أويا الشاطئي، أبحر الشمالية',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 350,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: '2026-11-20',
    rating: 5.0,
    reviewsCount: 94,
    badge: {
      en: 'Featured Tarab Night',
      ar: 'جلسة طرب حصرية',
    },
    tiers: [
      {
        id: 'tier-manea-gold',
        name: { en: 'Gold Seating', ar: 'المقاعد الذهبية' },
        description: { en: 'Seaside seat with complimentary Arabic coffee & hospitality.', ar: 'مقعد شاطئي مع قهوة سعودية وضيافة راقية.' },
        price: 350,
        capacityTotal: 150,
        capacityRemaining: 24,
        perks: [
          { en: 'Direct stage view', ar: 'إطلالة مباشرة على المسرح' },
          { en: 'Arabic coffee & sweets', ar: 'قهوة سعودية وحلويات شرقية' },
        ],
      },
      {
        id: 'tier-manea-vip',
        name: { en: 'VIP Front Row Lounge', ar: 'جلسة VIP الصف الأول' },
        description: { en: 'Front row majlis with luxury dinner & valet parking.', ar: 'مجلس الصف الأول مع عشاء فاخر ومواقف VIP.' },
        price: 850,
        capacityTotal: 40,
        capacityRemaining: 8,
        popular: true,
        perks: [
          { en: 'Front row private sofa', ar: 'أريكة مريحة في الصف الأول' },
          { en: 'Buffet & drinks', ar: 'بوفيه عشاء ومشروبات طازجة' },
          { en: 'Valet parking', ar: 'خدمة إيقاف السيارات' },
        ],
      },
    ],
  },
  {
    id: 'evt-beach-nights',
    category: 'events',
    slug: 'beach-nights-jeddah',
    title: {
      en: 'Beach Nights',
      ar: 'ليالي الشاطئ',
    },
    tagline: {
      en: 'Live music & tranquil coastal vibes',
      ar: 'موسيقى حية وأجواء استجمام ساحلية هادئة',
    },
    description: {
      en: 'Sunset acoustic performances, beachfront fire pits, and ambient music crafted for relaxation by the Red Sea waves.',
      ar: 'أمسيات استجمام على الشاطئ مع مواقد نار دافئة، موسيقى حية هادئة، وأجواء ليلية مريحة أمام أمواج البحر.',
    },
    locationName: {
      en: 'Jeddah Waterfront Beach Pier',
      ar: 'رصيف الواجهة البحرية، جدة',
    },
    marinaOrArea: 'corniche',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 280,
    currency: 'SAR',
    privacyType: 'family',
    dateOrSchedule: '2026-11-27',
    rating: 4.9,
    reviewsCount: 112,
    badge: {
      en: 'Relaxed Seaside Vibes',
      ar: 'أجواء استجمام هادئة',
    },
    tiers: [
      {
        id: 'tier-beach-access',
        name: { en: 'Beach Entry & Beanbag', ar: 'دخول شاطئي وجلسة رملية' },
        description: { en: 'Beach lounge seat with welcome drink.', ar: 'جلسة شاطئية مع مشروب ترحيبي.' },
        price: 280,
        capacityTotal: 200,
        capacityRemaining: 45,
        perks: [
          { en: 'Beach access & live music', ar: 'دخول الشاطئ والاستمتاع بالموسيقى' },
          { en: '1 Welcome mocktail', ar: 'مشروب استوائي ترحيبي' },
        ],
      },
      {
        id: 'tier-beach-cabana',
        name: { en: 'Private Pergola (4 Guests)', ar: 'كابانا خاصة (4 ضيوف)' },
        description: { en: 'Dedicated pergola with seafood platter & fire pit.', ar: 'كابانا خاصة مع موقد نار وطبق مقبلات بحرية.' },
        price: 1200,
        capacityTotal: 15,
        capacityRemaining: 3,
        popular: true,
        perks: [
          { en: 'Private pergola for 4', ar: 'كابانا خاصة تتسع لـ 4 أشخاص' },
          { en: 'Appetizers & warm drinks', ar: 'مقبلات ومشروبات ساخنة' },
        ],
      },
    ],
  },
  {
    id: 'evt-symphony-waves',
    category: 'events',
    slug: 'jeddah-symphony-under-the-stars',
    title: {
      en: 'Symphony Under the Stars',
      ar: 'سيمفونية تحت النجوم',
    },
    tagline: {
      en: 'Classical Arabic strings & Red Sea waves',
      ar: 'أوركسترا الآلات الشرقية وأمواج البحر',
    },
    description: {
      en: 'An enchanting open-air classical musical night held right on the private pier of Jeddah Yacht Club.',
      ar: 'ليلة موسيقية كلاسيكية ساحرة على الرصيف المائي لنادي اليخوت بجدة بين نسيم البحر والأضواء الهادئة.',
    },
    locationName: {
      en: 'Jeddah Yacht Club Pier, Corniche',
      ar: 'رصيف نادي اليخوت بجدة، الكورنيش',
    },
    marinaOrArea: 'jeddah_yacht_club',
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 380,
    currency: 'SAR',
    privacyType: 'family',
    dateOrSchedule: '2026-12-05',
    rating: 4.95,
    reviewsCount: 89,
    badge: {
      en: 'Classical Gala',
      ar: 'أمسية كلاسيكية',
    },
    tiers: [
      {
        id: 'tier-sym-gold',
        name: { en: 'Gold Pier Seating', ar: 'المقاعد الذهبية' },
        description: { en: 'Pier seat with welcome drink.', ar: 'مقعد على الرصيف مع مشروب ترحيبي.' },
        price: 380,
        capacityTotal: 120,
        capacityRemaining: 18,
        perks: [
          { en: 'Direct pier acoustic view', ar: 'إطلالة صوتية وبصرية مباشرة' },
          { en: 'Complimentary mocktail', ar: 'مشروب فاخر مجاني' },
        ],
      },
    ],
  },

  // ==========================================
  // 2. SEA VOYAGES & CHARTERS (رحلات)
  // ==========================================
  {
    id: 'voy-bayada-catamaran',
    category: 'voyages',
    slug: 'bayada-island-luxury-catamaran-day-sail',
    title: {
      en: 'Bayada Reef Sail',
      ar: 'رحلة شعاب بياضة',
    },
    tagline: {
      en: 'Crystal turquoise waters & private snorkeling',
      ar: 'مياه وغوص في المالديف السعودية',
    },
    description: {
      en: 'Sail aboard a luxury 52ft sailing catamaran to the famous turquoise waters of Bayada Reef. Includes snorkeling gear and fresh lunch.',
      ar: 'إبحار ممتع على متن كتماران فاخر بطول 52 قدماً إلى مياه شعاب بياضة الساحرة، شامل معدات الغوص والماء.',
    },
    locationName: {
      en: 'Bayada Reef, Red Sea (Departs Al-Ahlam Marina)',
      ar: 'شعاب بياضة (الانطلاق من مرسى الأحلام)',
    },
    marinaOrArea: 'north_obhur',
    coverImage: asset('/images/bayadha.png'),
    galleryImages: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 580,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Daily Departures (08:30 AM & 02:00 PM)',
    rating: 4.92,
    reviewsCount: 164,
    badge: {
      en: 'Coast Guard Pre-Cleared',
      ar: 'يتطلب تصريح من حرس الحدود',
    },
    vesselSpecs: {
      vesselName: 'Lagoon 52 "Aura of the Sea"',
      lengthFt: 52,
      maxSpeedKnots: 14,
      guestCapacity: 20,
      crewCount: 3,
      captainName: 'Capt. Tariq Al-Ghamdi',
      amenities: [
        { en: 'Shaded Trampoline Lounge & Sun Deck', ar: 'منطقة استرخاء مظللة وسطح شمسي' },
        { en: 'Snorkelling Gear & Paddleboards Onboard', ar: 'معدات غطس وألواح تجديف على متن اليخت' },
        { en: 'Chilled Seafood Lunch & Refreshments', ar: 'غداء بحري بارد ومشروبات منعشة' },
        { en: 'Freshwater Deck Shower & Changing Room', ar: 'دش مياه عذبة وغرفة تبديل ملابس' },
      ],
    },
    tiers: [
      {
        id: 'tier-cata-individual',
        name: { en: 'Day Sail Ticket (Per Guest)', ar: 'تذكرة إبحار نهارية (للشخص)' },
        description: { en: '6-hour shared cruise with lunch & snorkeling gear.', ar: 'رحلة إبحار 6 ساعات مع الغداء ومعدات الغوص.' },
        price: 580,
        capacityTotal: 20,
        capacityRemaining: 6,
        popular: true,
        perks: [
          { en: '6-hour sailing cruise', ar: '6 ساعات إبحار ممتعة' },
          { en: 'Snorkeling equipment', ar: 'معدات غوص كاملة' },
          { en: 'Seafood lunch buffet', ar: 'وجبة غداء بحرية طازجة' },
        ],
      },
    ],
  },
  {
    id: 'voy-sunset-obhur-charter',
    category: 'voyages',
    slug: 'obhur-sunset-private-yacht-cruise',
    title: {
      en: 'Sunset Motor Yacht Charter',
      ar: 'رحلة يخت الغروب الخاصة بأبحر',
    },
    tagline: {
      en: 'Private 3-hour sunset cruise & hospitality',
      ar: 'إبحار خاص لـ 3 ساعات وقت الغروب مع الضيافة',
    },
    description: {
      en: 'Private luxury motor yacht cruise along the serene Obhur creek during the golden sunset hour.',
      ar: 'رحلة يخت خاصة وراقية في خور أبحر للاستمتاع بمنظر الغروب الذهبي والضيافة المميزة.',
    },
    locationName: {
      en: 'Jeddah Yacht Club Marina, Obhur',
      ar: 'مارينا نادي اليخوت، أبحر',
    },  
    marinaOrArea: 'jeddah_yacht_club',
    coverImage: asset('/images/obhur-sunset-yacht-dj.jpg'),
    galleryImages: [
      asset('/images/azimut-yacht-main.jpg'),
    ],
    basePrice: 2400,
    currency: 'SAR',
    privacyType: 'family',
    dateOrSchedule: 'Daily 04:30 PM - 07:30 PM',
    rating: 4.96,
    reviewsCount: 88,
    badge: {
      en: 'Private Charter',
      ar: 'يخت خاص بالكامل',
    },
    vesselSpecs: {
      vesselName: 'Majesty 48 "Wavecrest"',
      lengthFt: 48,
      maxSpeedKnots: 22,
      guestCapacity: 12,
      crewCount: 2,
      captainName: 'Capt. Faisal Al-Zahrani',
      amenities: [
        { en: 'Private Flybridge & Sunset Seating', ar: 'سطح علوي خاص وجلسات لمشاهدة الغروب' },
        { en: 'Arabic Coffee, Dates & Canapé Service', ar: 'قهوة عربية وتمور وضيافة خفيفة' },
        { en: 'Onboard Sound System & Mood Lighting', ar: 'نظام صوتي وإضاءة مخصصة على متن اليخت' },
        { en: 'Dedicated Crew & Marina Valet Parking', ar: 'طاقم مخصص وخدمة صف السيارات في المارينا' },
      ],
    },
    tiers: [
      {
        id: 'tier-sunset-full',
        name: { en: 'Private 3-Hour Charter', ar: 'استئجار اليخت كاملاً (3 ساعات)' },
        description: { en: 'Includes up to 10 guests with cold drinks & snacks.', ar: 'يشمل حتى 10 أشخاص مع المشروبات والوجبات الخفيفة.' },
        price: 2400,
        capacityTotal: 2,
        capacityRemaining: 1,
        popular: true,
        perks: [
          { en: 'Exclusive yacht for up to 10 guests', ar: 'يخت خاص بالكامل حتى 10 ضيوف' },
          { en: 'Professional captain & deckhand', ar: 'قبطان محترف وطاقم خدمة' },
        ],
      },
    ],
  },

  // ==========================================
  // 3. MEMBERSHIPS & PACKAGES (عضويات)
  // ==========================================
  {
    id: 'pkg-4-friends',
    category: 'real-estate',
    slug: '4-friends-package',
    title: {
      en: '4 Friends Package',
      ar: 'باقة 4 أصدقاء',
    },
    tagline: {
      en: 'Private beach cabana & dining credits for 4',
      ar: 'كابانا شاطئية خاصة ورصيد للمأكولات لـ 4 أشخاص',
    },
    description: {
      en: 'A private full-day beach retreat package for 4 friends, featuring a private beachfront cabana, 4 sunbeds, and a SAR 400 dining voucher.',
      ar: 'باقة استجمام يومية متكاملة لـ 4 أشخاص تشمل كابانا خاصة مطلة على البحر، 4 أسرة استرخاء، وقسيمة طعام ومشروبات بقيمة 400 ر.س.',
    },
    locationName: {
      en: 'Oia Beach & Cabana Club, North Obhur',
      ar: 'شاطئ ونادي أويا، أبحر الشمالية',
    },
    marinaOrArea: 'north_obhur',
    coverImage: asset('/images/oia-beach-cabana-gallery.jpg'),
    galleryImages: [
      asset('/images/oia-beach-sunbed-cover.jpg'),
    ],
    basePrice: 1200,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Valid for Any Selected Day',
    rating: 4.98,
    reviewsCount: 145,
    badge: {
      en: 'Popular Group Pass',
      ar: 'الباقة الأكثر طلباً',
    },
    realEstateSpecs: {
      sqft: 250,
      bedrooms: 1,
      bathrooms: 1,
      privateBeachMeters: 10,
      monthlyRate: 1200,
      annualRate: 14400,
      securityDeposit: 0,
      amenities: [
        { en: 'Private Beach Cabana & Sunbeds', ar: 'كابانا شاطئية خاصة وأسرة استرخاء' },
        { en: 'SAR 400 Dining & Beverage Credit', ar: 'رصيد للمأكولات والمشروبات بقيمة 400 ر.س' },
        { en: 'Complimentary Beach Towels & Service', ar: 'مناشف وخدمة ضيافة شاطئية مجانية' },
        { en: 'Valet Parking for 2 Cars', ar: 'مواقف خاصة لسيارتين' },
      ],
    },
    tiers: [
      {
        id: 'tier-pkg-4-standard',
        name: { en: '4 Friends All-Day Pass', ar: 'باقة اليوم الكامل لـ 4 أصدقاء' },
        description: { en: 'Includes private cabana, 4 day passes, and SAR 400 dining credit.', ar: 'يشمل كابانا خاصة، دخول لـ 4 أشخاص، ورصيد طعام 400 ر.س.' },
        price: 1200,
        capacityTotal: 10,
        capacityRemaining: 4,
        popular: true,
        perks: [
          { en: 'Full day access for 4 guests', ar: 'دخول كامل طوال اليوم لـ 4 ضيوف' },
          { en: 'Private beach cabana & sunbeds', ar: 'كابانا شاطئية خاصة وأسرة استجمام' },
          { en: 'SAR 400 food & beverage voucher', ar: 'قسيمة مطاعم ومشروبات بقيمة 400 ر.س' },
        ],
      },
    ],
  },
  {
    id: 'mem-vip-annual',
    category: 'real-estate',
    slug: 'vip-membership',
    title: {
      en: 'VIP Membership',
      ar: 'عضوية VIP',
    },
    tagline: {
      en: 'Year-round unlimited resort access & concierge',
      ar: 'دخول سنوي غير محدود وامتيازات حصرية 24/7',
    },
    description: {
      en: 'Exclusive annual membership offering unlimited year-round access to premier private beach clubs, yacht mooring privileges, and dedicated 24/7 concierge assistance.',
      ar: 'عضوية سنوية راقية تمنحك دخولاً غير محدود لأرقى النوادي الشاطئية في جدة، أولوية في مراسي اليخوت، وخدمة كونسيرج ومساعد شخصي على مدار الساعة.',
    },
    locationName: {
      en: 'Across All Red Sea Waterfront Properties, Jeddah',
      ar: 'في جميع مرافق ومنتجعات البحر الأحمر، جدة',
    },
    marinaOrArea: 'south_obhur',
    coverImage: asset('/images/azimut-yacht-interior.jpg'),
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 45000,
    currency: 'SAR',
    privacyType: 'vip_exclusive',
    dateOrSchedule: '365-Day Annual Membership',
    rating: 5.0,
    reviewsCount: 68,
    badge: {
      en: 'Annual VIP Pass',
      ar: 'عضوية سنوية حصرية',
    },
    realEstateSpecs: {
      sqft: 1200,
      bedrooms: 2,
      bathrooms: 2,
      privateBeachMeters: 40,
      monthlyRate: 4500,
      annualRate: 45000,
      securityDeposit: 0,
      amenities: [
        { en: 'Unlimited 4-Resort Beach Club Access', ar: 'دخول غير محدود لـ 4 منتجعات شاطئية' },
        { en: 'Priority Marina Yacht Berth Allocation', ar: 'أولوية حجز مراسي اليخوت' },
        { en: 'Dedicated 24/7 VIP Concierge & Guest Services', ar: 'خدمة كونسيرج ومساعد شخصي 24/7' },
        { en: 'Complimentary Seasonal Concert Tickets', ar: 'تذاكر مجانية لأبرز الحفلات السنوية' },
      ],
    },
    tiers: [
      {
        id: 'tier-mem-vip-full',
        name: { en: 'Annual VIP Membership', ar: 'العضوية السنوية VIP' },
        description: { en: 'Unlimited access for member + 2 guests, yacht berth allocation, and 24/7 concierge.', ar: 'دخول غير محدود للعضو مع ضيفين، أولوية حجز المراسي، وكونسيرج خاص.' },
        price: 45000,
        capacityTotal: 25,
        capacityRemaining: 3,
        popular: true,
        perks: [
          { en: 'Unlimited access to 4 beach resorts', ar: 'دخول غير محدود لـ 4 منتجعات شاطئية' },
          { en: 'Priority yacht mooring & event tickets', ar: 'أولوية حجز المراسي وتذاكر الحفلات' },
          { en: 'Dedicated 24/7 VIP concierge', ar: 'مساعد شخصي وكونسيرج على مدار الساعة' },
        ],
      },
    ],
  },
  {
    id: 'pkg-yoga-session',
    category: 'real-estate',
    slug: 'beach-yoga-session',
    title: {
      en: 'Beach Yoga Session',
      ar: 'جلسة يوغا الشاطئ',
    },
    tagline: {
      en: 'Mindful sunrise or sunset beach yoga on the sand',
      ar: 'جلسة يوغا وتأمل عند الشروق أو الغروب على الرمال',
    },
    description: {
      en: 'A tranquil 75-minute beachfront yoga and meditation class led by certified instructors. Includes yoga mat, cold towel, and refreshing organic detox drinks.',
      ar: 'جلسة يوغا وتأمل لمدة 75 دقيقة على شاطئ البحر الأحمر مع مدربين معتمدين، تشمل سجادة يوغا ومشروبات ديتوكس عضوية منعشة.',
    },
    locationName: {
      en: 'Oia Beach & Wellness Deck, North Obhur',
      ar: 'منصة الاستجمام بشاطئ أويا، أبحر الشمالية',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 150,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Daily Sunrise (06:30 AM) & Sunset (05:30 PM)',
    rating: 4.97,
    reviewsCount: 76,
    badge: {
      en: 'Mind & Body Pass',
      ar: 'استرخاء وتأمل',
    },
    realEstateSpecs: {
      sqft: 100,
      bedrooms: 0,
      bathrooms: 1,
      privateBeachMeters: 20,
      monthlyRate: 150,
      annualRate: 1800,
      securityDeposit: 0,
      amenities: [
        { en: '75-Min Certified Yoga Session', ar: 'جلسة يوغا 75 دقيقة مع مدرب معتمد' },
        { en: 'Premium Yoga Mat & Towel', ar: 'سجادة يوغا فاخرة ومناشف منعشة' },
        { en: 'Organic Cold-Pressed Detox Drink', ar: 'عصير ديتوكس عضوي طازج' },
        { en: 'Direct Beach & Shower Access', ar: 'دخول مباشر للشاطئ ومرافق الاستحمام' },
      ],
    },
    tiers: [
      {
        id: 'tier-yoga-single',
        name: { en: 'Single Yoga Session', ar: 'جلسة يوغا فردية' },
        description: { en: '75-min beachfront yoga class with mat & detox drink.', ar: 'جلسة يوغا شاطئية 75 دقيقة مع السجادة والمشروب.' },
        price: 150,
        capacityTotal: 25,
        capacityRemaining: 12,
        popular: true,
        perks: [
          { en: '75-min guided mindfulness & yoga', ar: '75 دقيقة يوغا وتأمل بإشراف مدرب' },
          { en: 'Yoga mat & beach towel provided', ar: 'توفير سجادة اليوغا والمنشفة' },
          { en: 'Complimentary fresh detox drink', ar: 'مشروب ديتوكس طازج مجاني' },
        ],
      },
    ],
  },
];
