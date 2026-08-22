import { LuxuryProduct } from '../types/booking';

export const luxuryCatalog: LuxuryProduct[] = [
  // ==========================================
  // 1. EVENT TICKETS
  // ==========================================
  {
    id: 'evt-sunset-groove',
    category: 'events',
    slug: 'red-sea-sunset-groove-concert',
    title: {
      en: 'Red Sea Sunset Groove: Afro-House & Organic Beats',
      ar: 'أمسية غروب البحر الأحمر: إيقاعات الأفرورهاوس والموسيقى العالمية',
    },
    tagline: {
      en: 'A golden hour musical celebration on the shores of North Obhur',
      ar: 'احتفالية موسيقية عند المغيب على شواطئ أبحر الشمالية',
    },
    description: {
      en: 'Immerse yourself in world-class electronic sounds by internationally acclaimed DJs and top Saudi producers against the backdrop of a flaming Red Sea sunset. Includes beachfront fire pits, artisanal dining, and ambient shoreline light installations.',
      ar: 'عش تجربة موسيقية استثنائية مع كبار منسقي الأغاني العالميين والمحليين على وقع غروب شمس البحر الأحمر الساحر، مع مواقد شاطئية وأطباق طازجة وإضاءات ليلية بديعة.',
    },
    locationName: {
      en: 'Oia Beach Amphitheater, North Obhur, Jeddah',
      ar: 'مسرح أويا الشاطئي، أبحر الشمالية، جدة',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 450,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: '2026-10-30',
    rating: 4.9,
    reviewsCount: 142,
    badge: {
      en: 'Selling Fast • 88% Sold',
      ar: 'أوشكت التذاكر على النفاد • 88% بيعت',
    },
    tiers: [
      {
        id: 'tier-ga',
        name: { en: 'Shoreline General Access', ar: 'دخول عام للشاطئ والمسرح' },
        description: {
          en: 'Beachfront stage access, 1 complimentary mocktail, and beach bean bag lounge access.',
          ar: 'دخول الساحة الشاطئية، مشروب ترحيبي فاخر، واستخدام الجلسات الرملية.',
        },
        price: 450,
        capacityTotal: 400,
        capacityRemaining: 38,
        perks: [
          { en: 'Direct beach stage access', ar: 'دخول مباشر للمسرح الشاطئي' },
          { en: 'Signature welcome mocktail', ar: 'مشروب استوائي ترحيبي' },
          { en: 'Free valet drop-off', ar: 'خدمة إيقاف سيارات' },
        ],
      },
      {
        id: 'tier-vip',
        name: { en: 'Sunset VIP High-Deck Lounge', ar: 'منصة الـ VIP العلوية الفاخرة' },
        description: {
          en: 'Elevated panoramic platform, open tapas buffet, dedicated mixology bar, and private fast-track entry.',
          ar: 'منصة مرتفعة بإطلالة بانورامية كاملة، بوفيه مقبلات مفتوح، وبار موكتيل خاص مع مسار دخول سريع.',
        },
        price: 1100,
        capacityTotal: 100,
        capacityRemaining: 14,
        popular: true,
        perks: [
          { en: 'Elevated VIP platform & dedicated bar', ar: 'منصة VIP خاصة مع خدمة ضيافة راقية' },
          { en: 'Unlimited gourmet tapas & mocktails', ar: 'بوفيه مقبلات ومشروبات غير محدود' },
          { en: 'Fast-track gate check-in', ar: 'دخول سريع بدون انتظار' },
        ],
      },
      {
        id: 'tier-vvip-table',
        name: { en: 'VVIP Shoreline Majlis (8 Guests)', ar: 'مجلس VVIP الشاطئي الملكي (8 ضيوف)' },
        description: {
          en: 'Private luxury cabana next to the DJ stage with personal butler, customized seafood sushi platter, and bottle service.',
          ar: 'كباينشاطئية ملكية بجوار المسرح مع مضيف خاص، طبق سوشي ومأكولات بحرية فاخرة، وخدمة VIP كاملة.',
        },
        price: 7500,
        capacityTotal: 6,
        capacityRemaining: 2,
        perks: [
          { en: 'Private beachfront cabana for 8', ar: 'كباينملكية خاصة لـ 8 ضيوف' },
          { en: 'Dedicated butler & sushi master', ar: 'مضيف خاص وشيف سوشي مخصص' },
          { en: 'Valet priority parking for 4 vehicles', ar: 'مواقف مخصصة لـ 4 سيارات' },
        ],
      },
    ],
    availableAddOns: [
      {
        id: 'addon-fast-valet',
        title: { en: 'Priority Marina Valet', ar: 'موقف سيارات VIP سريع' },
        description: { en: 'Express car collection at main Obhur gate', ar: 'استلام فوري للسيارة عند البوابة الرئيسية' },
        price: 150,
        category: 'concierge',
      },
      {
        id: 'addon-seafood-box',
        title: { en: 'Red Sea Caviar & Oyster Platter', ar: 'طبق محار وكافيار البحر الأحمر' },
        description: { en: 'Served chilled at your table during the sunset hour', ar: 'يقدم طازجاً وبارداً عند الغروب' },
        price: 480,
        category: 'catering',
      },
    ],
  },
  {
    id: 'evt-symphony-waves',
    category: 'events',
    slug: 'jeddah-symphony-under-the-stars',
    title: {
      en: 'Symphony Under the Stars: Arabic Strings & Red Sea Waves',
      ar: 'سيمفونية تحت النجوم: أوركسترا الآلات الشرقية وأمواج البحر',
    },
    tagline: {
      en: 'A 40-piece live orchestra blending classical Saudi heritage with ocean symphony',
      ar: 'أوركسترا حية تضم 40 عازفاً تمزج التراث السعودي الساحلي بالألحان العالمية',
    },
    description: {
      en: 'An enchanting open-air classical musical night held right on the private pier of Jeddah Yacht Club. Enjoy acoustic masterpieces curated exclusively for maritime romance.',
      ar: 'ليلة كلاسيكية ساحرة على الرصيف المائي لنادي اليخوت بجدة، تمتع بأعذب المعزوفات الموسيقية بين نسيم البحر والأضواء الهادئة.',
    },
    locationName: {
      en: 'Jeddah Yacht Club Pier A, Corniche',
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
    dateOrSchedule: '2026-11-14',
    rating: 4.95,
    reviewsCount: 89,
    badge: {
      en: 'Exclusive Gala Night',
      ar: 'أمسية احتفالية حصرية',
    },
    tiers: [
      {
        id: 'tier-sym-gold',
        name: { en: 'Gold Pier Seating', ar: 'المقاعد الذهبية على الرصيف المائي' },
        description: { en: 'Center view seating with welcome Arabic coffee and artisan dates.', ar: 'مقاعد أمامية مع ضيافة قهوة سعودية وتمور فاخرة.' },
        price: 380,
        capacityTotal: 150,
        capacityRemaining: 24,
        perks: [{ en: 'Reserved prime orchestra view', ar: 'مقعد مميز مطل على الأوركسترا' }],
      },
      {
        id: 'tier-sym-royal',
        name: { en: 'Royal Overwater Table (4 Guests)', ar: 'طاولة ملكية عائمة (4 ضيوف)' },
        description: { en: 'Floating overwater table with 4-course gourmet dinner.', ar: 'طاولة فوق الماء مباشرة مع عشاء فاخر مكون من 4 أطباق.' },
        price: 3200,
        capacityTotal: 10,
        capacityRemaining: 3,
        perks: [{ en: '4-Course Gourmet Chef Dinner', ar: 'عشاء فاخر من إعداد الشيف التنفيذي' }],
      },
    ],
  },

  // ==========================================
  // 2. DAY PASSES & CABANAS
  // ==========================================
  {
    id: 'pass-indigo-ladies',
    category: 'day-passes',
    slug: 'indigo-sanctuary-ladies-only-day-pass',
    title: {
      en: 'Indigo Sanctuary: 100% Private Ladies-Only Beach Day',
      ar: 'شاطئ إنديجو: يوم السيدات الشاطئي الخاص بخصوصية تامة 100%',
    },
    tagline: {
      en: 'Complete seclusion, infinity pool over the Red Sea, and serene wellness',
      ar: 'خصوصية مطلقة، مسبح إنفينيتي مطل على البحر، وتجارب استرخاء وعافية',
    },
    description: {
      en: 'Experience absolute tranquility at Indigo Private Cove. Fully guarded and serviced exclusively by an all-female hospitality and lifeguard team. Features sunset yoga, sound healing, paddleboarding, and organic beachfront dining.',
      ar: 'استمتعي بالخصوصية التامة والهدوء في منتجع إنديجو مع طاقم نسائي كامل 100%. يشمل مسبحاً دافئاً، شاطئاً رملياً بكراً، جلسات يوغا الغروب، وأطباقاً متوسطية صحية.',
    },
    locationName: {
      en: 'Indigo Private Cove, North Obhur, Jeddah',
      ar: 'منتجع إنديجو الخاص، أبحر الشمالية، جدة',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 520,
    currency: 'SAR',
    privacyType: 'ladies_only',
    dateOrSchedule: 'Every Tuesday & Saturday',
    rating: 5.0,
    reviewsCount: 210,
    badge: {
      en: '100% Female Staff & Security',
      ar: 'طاقم نسائي وأمني 100%',
    },
    tiers: [
      {
        id: 'tier-ladies-standard',
        name: { en: 'Full-Day Resort & Pool Pass', ar: 'دخول المنتجع والمسبح ليوم كامل' },
        description: {
          en: 'Full access to cove beach, infinity pool, sound bath session, beach towel, and locker.',
          ar: 'استخدام كامل للشاطئ، المسبح، جلسة التأمل الصوتي، منشفة وخزانة خاصة.',
        },
        price: 520,
        capacityTotal: 60,
        capacityRemaining: 8,
        perks: [
          { en: 'Private beach & infinity pool access', ar: 'دخول الشاطئ والمسبح الخاص' },
          { en: 'Sunset Yoga & Sound Healing', ar: 'حضور جلسة يوغا الغروب' },
          { en: 'Plush towel & locker amenity kit', ar: 'منشفة فاخرة وخزانة أمانات' },
        ],
      },
      {
        id: 'tier-ladies-cabana',
        name: { en: 'Private Royal Beach Cabana (Up to 4)', ar: 'كباينرويال الشاطئية الخاصة (حتى 4 سيدات)' },
        description: {
          en: 'Dedicated shaded luxury daybed with fan, fresh fruit platter, coconut water, and private butler.',
          ar: 'سرير نهاري فندقي مظلل، طبق فواكه استوائية، ماء جوز هند، وخدمة نادلة خاصة.',
        },
        price: 2400,
        capacityTotal: 8,
        capacityRemaining: 2,
        popular: true,
        perks: [
          { en: 'Private daybed cabana for 4 ladies', ar: 'كباينفندقية خاصة لـ 4 سيدات' },
          { en: 'Tropical fruit & cold pressed juice bar', ar: 'ضيافة فواكه استوائية وعصائر طازجة' },
          { en: '4x 30-min express scalp/shoulder massage', ar: '4 جلسات مساج استرخائي للأكتاف' },
        ],
      },
    ],
    availableAddOns: [
      {
        id: 'addon-massage-60',
        title: { en: '60-Min Seaside Aromatherapy Massage', ar: 'جلسة مساج بحري 60 دقيقة بالزيوت الطبيعية' },
        description: { en: 'Performed by certified wellness therapists in a private overwater pavilion', ar: 'في جناح الاسترخاء البحري الخاص' },
        price: 450,
        category: 'amenity',
      },
      {
        id: 'addon-matcha-buffet',
        title: { en: 'Gourmet Healthy Mediterranean Lunch', ar: 'بوفيه غداء صحي متوسطي فاخر' },
        description: { en: 'Seafood salads, artisan bowls, and ceremonial matcha drinks', ar: 'سلطات بحرية ومشروبات ماتشا عضوية' },
        price: 180,
        category: 'catering',
      },
    ],
  },
  {
    id: 'pass-oia-luxury-sunbed',
    category: 'day-passes',
    slug: 'oia-beach-resort-vip-day-pass',
    title: {
      en: 'Oia Beach Resort: VIP Oceanfront Sunbed & Day Lounge',
      ar: 'منتجع أويا الشاطئي: تصريح السرير الشاطئي الفاخر والدخول اليومي',
    },
    tagline: {
      en: 'Greek-island inspired coastal luxury on the Red Sea waters',
      ar: 'أجواء جزر البحر المتوسط بطابع الفخامة على شواطئ البحر الأحمر',
    },
    description: {
      en: 'Relax on premium plush daybeds right by the turquoise water. Includes swimming lagoon access, paddleboard rental, gourmet mocktails, and fresh wood-fired pizza service direct to your lounger.',
      ar: 'استرخ على أرقى الأسرة الشاطئية أمام مياه البحر النقية، مع قوارب بادل بورد، عصائر استوائية، وخدمة تقديم المأكولات مباشرة إلى سريرك الشاطئي.',
    },
    locationName: {
      en: 'Oia Beach Resort, Prince Abdullah Al Faisal St, Jeddah',
      ar: 'منتجع أويا الشاطئي، شارع الأمير عبدالله الفيصل، جدة',
    },
    marinaOrArea: 'north_obhur',
    coverImage: '/images/oia-beach-sunbed-cover.jpg',
    galleryImages: [
      '/images/oia-beach-cabana-gallery.jpg',
    ],
    basePrice: 350,
    currency: 'SAR',
    privacyType: 'family',
    dateOrSchedule: 'Daily 09:00 AM - 07:00 PM',
    rating: 4.85,
    reviewsCount: 165,
    badge: {
      en: 'Includes 100 SAR Dining Credit',
      ar: 'يشمل قسيمة طعام بقيمة 100 ريال',
    },
    tiers: [
      {
        id: 'tier-oia-single',
        name: { en: 'Front-Row Single Sunbed', ar: 'سرير استرخاء مفرد في الصف الأول' },
        description: { en: 'Oceanfront sunbed, towel service, and 100 SAR food/drink voucher.', ar: 'سرير مطل مباشرة على البحر، منشفة، ورصيد طعام 100 ريال.' },
        price: 350,
        capacityTotal: 40,
        capacityRemaining: 11,
        perks: [{ en: '100 SAR Dining voucher included', ar: 'يشمل 100 ريال رصيد للأطعمة والمشروبات' }],
      },
      {
        id: 'tier-oia-family-cabana',
        name: { en: 'Family Pergola Cabana (6 Guests)', ar: 'كابين العائلة المظللة (6 أشخاص)' },
        description: { en: 'Large private pergola, freshwater dip shower, dining table, and 400 SAR food credit.', ar: 'كباينمظللة فسيحة مع طاولة طعام خاصة ورصيد 400 ريال للمطاعم.' },
        price: 1800,
        capacityTotal: 10,
        capacityRemaining: 3,
        perks: [{ en: '400 SAR Dining voucher included', ar: 'يشمل 400 ريال رصيد للمطاعم' }],
      },
    ],
  },

  // ==========================================
  // 3. SEA VOYAGES & CHARTERS
  // ==========================================
  {
    id: 'voyage-bayada-catamaran',
    category: 'voyages',
    slug: 'bayada-island-coral-catamaran-expedition',
    title: {
      en: 'Bayada Reef Maldives Expedition: Luxury Catamaran & Water Sports',
      ar: 'رحلة كتماران بياضة: استكشاف مالديف جدة والألعاب المائية والشعاب المرجانية',
    },
    tagline: {
      en: 'Sail to Jeddah’s pristine turquoise sandbank with Seabob underwater scooters',
      ar: 'أبحر إلى جزيرة بياضة الفيروزية الساحرة مع سكوترات الغوص والسنوركلينج والمشاوي البحرية',
    },
    description: {
      en: 'A 6-hour high-luxury voyage aboard a 55ft sailing catamaran to the crystal-clear shallow reefs of Bayada. Includes guided snorkeling, Seabob water sleds, transparent sea kayaks, and a live grilled seafood BBQ prepared fresh by our onboard chef.',
      ar: 'رحلة بحرية فاخرة لمدة 6 ساعات على متن كتماران 55 قدماً إلى مياه جزيرة بياضة النقية. تشمل جولات سنوركلينج، زلاجات سيبوب مائية، قوارب كاياك شفافة، وبوفيه مشاوي بحرية طازجة يحضرها الشيف على متن القارب.',
    },
    locationName: {
      en: 'Durrat Al Arus Marina, Departure Pier C',
      ar: 'مارينا درة العروس، رصيف المغادرة C',
    },
    marinaOrArea: 'durrat_al_arus',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      '/images/obhur-sunset-yacht-dj.jpg',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 650,
    currency: 'SAR',
    privacyType: 'all',
    dateOrSchedule: 'Daily Departures: 08:30 AM & 02:00 PM',
    timeSlots: ['08:30 AM - 02:30 PM (Morning Coral Dive)', '02:30 PM - 08:00 PM (Sunset & Twilight Sail)'],
    rating: 4.98,
    reviewsCount: 340,
    badge: {
      en: 'Saudi Coast Guard Certified',
      ar: 'مرخص ومعتمد من حرس الحدود',
    },
    vesselSpecs: {
      vesselName: 'Red Sea Voyager 55 Catamaran',
      lengthFt: 55,
      maxSpeedKnots: 22,
      guestCapacity: 28,
      crewCount: 4,
      captainName: 'Capt. Tariq Al-Ghamdi (Master 200GT)',
      amenities: [
        { en: 'Air-conditioned main salon & deck', ar: 'صالون داخلي مكيف بالكامل وسطح شمسي' },
        { en: '2 Freshwater ocean dip showers', ar: 'شاورات مياه عذبة للاستحمام' },
        { en: 'High-end marine sound system', ar: 'نظام صوتي بحري احترافي' },
        { en: 'PADI certified divemaster onboard', ar: 'مدرب غوص PADI معتمد على متن القارب' },
      ],
    },
    tiers: [
      {
        id: 'tier-bayada-individual',
        name: { en: 'Individual Explorer Pass', ar: 'تصريح المسافر الفردي' },
        description: {
          en: 'Includes catamaran sail, snorkel gear, Seabob test run, and fresh seafood BBQ.',
          ar: 'يشمل الإبحار، معدات السنوركلينج، تجربة السيبوب، ووجبة الغداء البحرية.',
        },
        price: 650,
        capacityTotal: 28,
        capacityRemaining: 7,
        perks: [
          { en: 'Full snorkel gear & buoyancy jacket', ar: 'معدات سنوركلينج وسترة طفو كاملة' },
          { en: 'Live Seafood BBQ lunch', ar: 'غداء مشاوي بحرية طازج' },
          { en: 'Seabob underwater scooter access', ar: 'تجربة سكوتر سيبوب تحت الماء' },
        ],
      },
      {
        id: 'tier-bayada-private-charter',
        name: { en: 'Full Private Catamaran Charter (Up to 24 Guests)', ar: 'استئجار الكتماران بالكامل خاص (حتى 24 ضيفاً)' },
        description: {
          en: 'Exclusive private yacht charter for your family or corporate group with custom route and timing.',
          ar: 'استئجار خاص بالكامل مع مسار وتوقيت مخصص وضيافة ملكية كاملة.',
        },
        price: 9800,
        capacityTotal: 1,
        capacityRemaining: 1,
        perks: [
          { en: 'Exclusive vessel for your private group', ar: 'القارب بالكامل مخصص لمجموعتك' },
          { en: 'Custom itinerary & snorkeling reef stops', ar: 'تحديد مسار الرحلة ونقاط التوقف الخاصة' },
          { en: 'Private chef live cooking', ar: 'شيف خاص للطهي المباشر' },
        ],
      },
    ],
    availableAddOns: [
      {
        id: 'addon-scuba-tank',
        title: { en: 'Guided PADI Scuba Dive (2 Tanks)', ar: 'غوص سكوبا للمرخصين (أسطوانتان + مرافق)' },
        description: { en: 'Explore virgin coral drop-offs with certified divemaster', ar: 'استكشاف جدران المرجان العميقة مع مرشد غوص' },
        price: 450,
        category: 'equipment',
      },
      {
        id: 'addon-gopro-pro',
        title: { en: '4K Drone & Underwater GoPro Photo Pack', ar: 'باقة تصوير درون وفيديو تحت الماء بدقة 4K' },
        description: { en: 'Delivered digitally within 2 hours after docking', ar: 'تسليم فوري للمحتوى المعدل عبر الرابط السحابي' },
        price: 350,
        category: 'concierge',
      },
    ],
  },
  {
    id: 'voyage-azimut-superyacht',
    category: 'voyages',
    slug: 'azimut-85ft-luxury-yacht-private-charter',
    title: {
      en: 'Azimut 85ft Superyacht: Private Ultra-Luxury Charter',
      ar: 'يخت أزيموت 85 قدماً الفاخر: استئجار خاص لرحلات كبار الشخصيات',
    },
    tagline: {
      en: 'Italian craftsmanship meets Red Sea opulence with 2 onboard jet skis and private chef',
      ar: 'قمة الفخامة الإيطالية في مياه البحر الأحمر مع دراجات مائية وشيف خاص',
    },
    description: {
      en: 'Step aboard the crown jewel of Jeddah Marina. An 85-foot Azimut luxury motor yacht complete with 4 staterooms, expansive flybridge Jacuzzi, 2 Yamaha Jet Skis, and white-glove silver service catering.',
      ar: 'اصعد على متن اليخت الفاخر بطول 85 قدماً مع 4 أجنحة فندقية، جاكوزي على السطح العلوي، دراجتين مائيتين جت سكي، وطاقم ضيافة متميز لتجربة بحرية لا تُنسى.',
    },
    locationName: {
      en: 'Jeddah Yacht Club & Marina, Pier VIP',
      ar: 'نادي اليخوت والمارينا بجدة، رصيف كبار الشخصيات',
    },
    marinaOrArea: 'jeddah_yacht_club',
    coverImage: '/images/azimut-yacht-main.jpg',
    galleryImages: [
      '/images/azimut-yacht-interior.jpg',
      '/images/azimut-yacht-main.jpg',
    ],
    basePrice: 14500,
    currency: 'SAR',
    privacyType: 'vip_exclusive',
    dateOrSchedule: 'Available Daily (4-Hour or 8-Hour Charters)',
    timeSlots: ['09:00 AM - 01:00 PM (Morning Royal Cruise)', '04:00 PM - 08:00 PM (Sunset Golden Cruise)', '08:30 PM - 12:30 AM (Starlight Stargaze)'],
    rating: 5.0,
    reviewsCount: 78,
    badge: {
      en: 'Ultra-Luxury Fleet',
      ar: 'أسطول النخبة الفاخر',
    },
    vesselSpecs: {
      vesselName: 'Azimut Grande 85 "Red Pearl"',
      lengthFt: 85,
      maxSpeedKnots: 28,
      guestCapacity: 16,
      crewCount: 5,
      captainName: 'Capt. Mansour Al-Harbi',
      amenities: [
        { en: 'Flybridge heated Jacuzzi with sea view', ar: 'جاكوزي دافئ على السطح العلوي بإطلالة بحرية' },
        { en: '2x 2026 Yamaha WaveRunner Jet Skis', ar: 'دراجتان جت سكي ياماها موديل 2026' },
        { en: 'Full master stateroom with en-suite marble bath', ar: 'جناح رئيسي فاخر مع حمام رخامي متكامل' },
        { en: 'Dedicated executive chef & butler team', ar: 'شيف تنفيذي وطاقم ضيافة مخصص' },
      ],
    },
    tiers: [
      {
        id: 'tier-azimut-4hr',
        name: { en: '4-Hour VIP Sunset Charter', ar: 'رحلة الغروب (4 ساعات)' },
        description: { en: 'Full charter of the 85ft Azimut yacht, jet ski fuel, gourmet canapés, and non-alcoholic champagne.', ar: 'استئجار اليخت كاملاً لـ 4 ساعات مع الجت سكي والضيافة الفاخرة.' },
        price: 14500,
        capacityTotal: 1,
        capacityRemaining: 1,
        perks: [
          { en: 'Up to 16 guests included', ar: 'يتسع حتى 16 ضيفاً' },
          { en: '2x Jet Skis & Seabobs included', ar: 'دراجتان جت سكي وسيبوب مائي مجاناً' },
          { en: 'Caviar & Seafood Gourmet Canape service', ar: 'ضيافة كافيار ومقبلات بحرية فاخرة' },
        ],
      },
      {
        id: 'tier-azimut-8hr',
        name: { en: '8-Hour Full-Day Coral Expedition', ar: 'رحلة اليوم الكامل للجزر والشعب (8 ساعات)' },
        description: { en: 'Deep sea voyage to private offshore coral reefs with 5-course lunch and dinner.', ar: 'رحلة بحرية للأعماق مع وجبتي غداء وعشاء 5 أطباق من إعداد الشيف.' },
        price: 24000,
        capacityTotal: 1,
        capacityRemaining: 1,
        perks: [
          { en: 'Full 8 hours open water luxury voyage', ar: '8 ساعات إبحار كاملة في أعماق البحر الأحمر' },
          { en: 'Full 5-course dining experience', ar: 'تجربة عشاء ملكي مكون من 5 أطباق' },
          { en: 'Coast Guard expedited VIP port departure', ar: 'تصريح خروج سريع ومعتمد من المارينا' },
        ],
      },
    ],
  },

  // ==========================================
  // 4. MEMBERSHIPS & BEACHFRONT REAL ESTATE
  // ==========================================
  {
    id: 'prop-royal-overwater-chalet',
    category: 'real-estate',
    slug: 'bayada-view-royal-overwater-chalet-lease',
    title: {
      en: 'The Royal Overwater Chalet: 12-Month Private Coastal Lease',
      ar: 'شاليه الرويال العائم: عقد إيجار ساحلي سنوي فاخر في أبحر',
    },
    tagline: {
      en: 'Direct private beach dock, private infinity pool, and 24/7 marina concierge',
      ar: 'مرسى يخت خاص، مسبح إنفينيتي مطل، وخدمة كونسيرج على مدار الساعة',
    },
    description: {
      en: 'An ultra-exclusive beachfront residence situated on the prime waterfront strip of North Obhur. Featuring Floor-to-ceiling glass architecture with panoramic Red Sea views, private boat mooring dock up to 60ft, Italian designer furniture, and smart home automation.',
      ar: 'فيلا شاطئية وشاليه فاخر في أرقى مواقع أبحر الشمالية مع واجهات زجاجية بالكامل على البحر الأحمر، مرسى خاص لليخوت حتى 60 قدماً، مسبح خاص، وتأثيث إيطالي فاخر من كبرى الدور العالمية.',
    },
    locationName: {
      en: 'The Dunes Waterfront Enclave, North Obhur, Jeddah',
      ar: 'مجمع الكثبان الساحلي، أبحر الشمالية، جدة',
    },
    marinaOrArea: 'north_obhur',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 38000,
    currency: 'SAR',
    privacyType: 'vip_exclusive',
    dateOrSchedule: 'Immediate Move-In or 2026/2027 Season',
    rating: 5.0,
    reviewsCount: 32,
    badge: {
      en: 'Includes 60ft Boat Mooring',
      ar: 'يشمل مرسى يخت خاص بطول 60 قدماً',
    },
    realEstateSpecs: {
      sqft: 4850,
      bedrooms: 4,
      bathrooms: 5,
      privateBeachMeters: 35,
      monthlyRate: 38000,
      annualRate: 420000,
      securityDeposit: 25000,
      floorPlanUrl: '/floorplans/chalet-royal.pdf',
      amenities: [
        { en: 'Private 60ft Boat Mooring Berth', ar: 'مرسى قوارب خاص بطول 60 قدماً' },
        { en: 'Heated Sea-Facing Infinity Pool', ar: 'مسبح إنفينيتي دافئ بإطلالة بحرية مباشرة' },
        { en: 'Smart Home Automation & Keyless Access', ar: 'نظام منزلي ذكي متكامل ودخول بالبصمة' },
        { en: '24/7 Gated Security & Golf Cart Concierge', ar: 'حراسة أمنية 24/7 وخدمة عربات الجولف' },
      ],
    },
    tiers: [
      {
        id: 'tier-lease-annual',
        name: { en: '12-Month Annual Lease (Best Value)', ar: 'عقد إيجار سنوي 12 شهراً (القيمة الأفضل)' },
        description: {
          en: 'Includes private boat slip, full property maintenance, 24/7 concierge, and VIP Beach Club pass.',
          ar: 'يشمل مرسى القارب، صيانة شاملة دورية، خدمة كونسيرج على مدار الساعة، وعضوية النادي الشاطئي.',
        },
        price: 420000,
        capacityTotal: 2,
        capacityRemaining: 1,
        popular: true,
        perks: [
          { en: '12 Months exclusive residence', ar: 'إقامة حصرية كاملة لمدة 12 شهراً' },
          { en: 'Complimentary VIP Yacht Club membership', ar: 'عضوية VIP مجانية في نادي اليخوت' },
          { en: 'Bi-weekly private pool & garden maintenance', ar: 'صيانة دورية مرتين أسبوعياً للمسبح' },
        ],
      },
      {
        id: 'tier-lease-monthly',
        name: { en: 'Seasonal Monthly Lease (Winter Season)', ar: 'عقد إيجار موسمي شهري (الموسم الشتوي)' },
        description: {
          en: 'Flexible monthly luxury stay for the peak winter Red Sea season with all utilities included.',
          ar: 'إقامة شهرية مرنة خلال موسم الشتاء المميز مع تغطية شاملة لجميع الخدمات والصيانة.',
        },
        price: 38000,
        capacityTotal: 3,
        capacityRemaining: 1,
        perks: [
          { en: 'Full turnkey Italian designer furnishing', ar: 'تأثيث كامل فاخر من كبرى الدور الإيطالية' },
          { en: 'All utilities & high-speed fiber included', ar: 'شامل فواتير الكهرباء والمياه والإنترنت السريع' },
        ],
      },
    ],
  },
  {
    id: 'mem-gold-key-club',
    category: 'real-estate',
    slug: 'jeddah-marina-gold-key-vip-club-membership',
    title: {
      en: 'The Gold Key: Annual VIP Beach Club & Marina Membership',
      ar: 'المفتاح الذهبي: العضوية السنوية للنوادي الشاطئية والمارينا',
    },
    tagline: {
      en: 'Unlimited year-round access to 4 premier private beaches, yacht berths, and VIP events',
      ar: 'دخول سنوي غير محدود لأرقى 4 شواطئ خاصة ومراسي اليخوت وتذاكر الفعاليات الحصرية',
    },
    description: {
      en: 'Join the most prestigious coastal community in the Kingdom. The Gold Key membership bestows unlimited access for you and your family to 4 private beach resorts in Obhur, priority yacht mooring reservations, complimentary seasonal concert tickets, and invitation-only gala access.',
      ar: 'انضم إلى مجتمع النخبة في عروس البحر الأحمر. تمنحك عضوية المفتاح الذهبي دخولا غير محدود لـ 4 منتجعات شاطئية فاخرة في أبحر لك ولعائلتك، أولوية حجز مراسي اليخوت، وتذاكر مجانية لأبرز الحفلات السنوية.',
    },
    locationName: {
      en: 'Across All Red Sea Premium Properties (Obhur & Corniche)',
      ar: 'في جميع منتجعات ومرافق البحر الأحمر الفاخرة (أبحر والكورنيش)',
    },
    marinaOrArea: 'south_obhur',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
    ],
    basePrice: 65000,
    currency: 'SAR',
    privacyType: 'vip_exclusive',
    dateOrSchedule: 'Annual 365-Day Membership (Renewable)',
    rating: 5.0,
    reviewsCount: 54,
    badge: {
      en: 'Invitation & Vetted KYC Only',
      ar: 'عضوية معتمدة عبر التدقيق والترشيح',
    },
    tiers: [
      {
        id: 'tier-mem-individual-gold',
        name: { en: 'Gold Key Individual VIP Membership', ar: 'عضوية المفتاح الذهبي الفردية VIP' },
        description: { en: 'Unlimited access for primary member + 2 guests to all 4 resorts, pools, and member lounges.', ar: 'دخول غير محدود للعضو الرئيسي مع ضيفين لجميع المنتجعات الأربعة وصالات الأعضاء.' },
        price: 65000,
        capacityTotal: 50,
        capacityRemaining: 6,
        perks: [
          { en: 'Unlimited access to 4 private beach resorts', ar: 'دخول غير محدود لـ 4 شواطئ ومنتجعات خاصة' },
          { en: '4x Complimentary luxury yacht cruises per year', ar: '4 رحلات يخوت فاخرة مجانية سنوياً' },
          { en: 'Priority VIP access to all concert & gala stages', ar: 'أولوية حجز تذاكر الحفلات والمهرجانات' },
        ],
      },
      {
        id: 'tier-mem-family-royal',
        name: { en: 'Royal Family & Mooring Membership', ar: 'العضوية العائلية مع مرسى اليخت' },
        description: { en: 'Full family membership (Primary + Spouse + Children) with dedicated 45ft boat slip included.', ar: 'عضوية عائلية كاملة (العضو والزوجة والأبناء) مع مرسى يخت مخصص حتى 45 قدماً.' },
        price: 110000,
        capacityTotal: 20,
        capacityRemaining: 2,
        popular: true,
        perks: [
          { en: 'Full family unlimited access (up to 6 members)', ar: 'دخول عائلي غير محدود حتى 6 أفراد' },
          { en: 'Dedicated 45ft marina boat berth included', ar: 'مرسى قارب مخصص بطول 45 قدماً مشمول' },
          { en: '24/7 Private coastal concierge', ar: 'خدمة كونسيرج ومساعد شخصي على مدار الساعة' },
        ],
      },
    ],
  },
];
