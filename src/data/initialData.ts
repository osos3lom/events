import { AppDataState } from '../types';

export const initialData: AppDataState = {
  user: {
    id: 'usr-sa-101',
    first_name: 'Faisal',
    last_name: 'Al-Ghamdi',
    email: 'faisal.ghamdi@redseaexperiences.sa',
    role: 'ORGANIZER',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  organization: {
    id: 'org-jeddah-marina',
    name: {
      en: 'Red Sea Marine & Coastal Experiences',
      ar: 'تجارب البحر الأحمر للفعاليات والرحلات البحرية'
    },
    slug: 'red-sea-marina-jeddah',
    email: 'ahlan@redseaexperiences.sa',
    phone: '+966 12 654 8899',
    website: 'https://redseaexperiences.sa',
    logo_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&auto=format&fit=crop&q=80',
    currency: 'SAR',
    timezone: 'Asia/Riyadh',
    tax_rate: 15.0,
    fee_rate: 2.5
  },
  events: [
    {
      id: '1',
      title: {
        en: 'Obhur Sunset Yacht Cruise & Red Sea DJ Session',
        ar: 'رحلة يخت وغروب أبحر مع أمسية موسيقية على البحر الأحمر'
      },
      slug: 'obhur-sunset-yacht-cruise-2026',
      summary: {
        en: 'Exclusive luxury 70ft yacht cruise across North Obhur with live sunset house DJ set, Red Sea mocktails, and floating lounge.',
        ar: 'رحلة بحرية فاخرة على يخت 70 قدم في أبحر الشمالية مع جلسة دي جي عند الغروب، موكتيلات منعشة، وجلسات عائمة.'
      },
      description: {
        en: `Sail into the golden hour of the Red Sea aboard our premier 70-foot luxury motor yacht in North Obhur, Jeddah.
      
Experience Highlights:
- 4-Hour Cruise across North Obhur Creek & Open Red Sea waters
- Live Sunset Organic House & Afro Beats by top Saudi guest DJs
- Gourmet Red Sea fusion finger bites & signature cold mocktail bar
- Floating swimming net & paddleboards under ambient water deck lights
- Licensed Coast Guard safety compliance & professional maritime crew

Dress Code: Coastal Chic / White & Marine Blue Linen.`,
        ar: `استمتع بأجمل لحظات الغروب على مياه البحر الأحمر على متن يختنا الفاخر بطول 70 قدماً في خليج أبحر الشمالية بجدة.

أبرز تفاصيل التجربة:
- رحلة بحرية لمدة 4 ساعات في خور أبحر والمياه المفتوحة للبحر الأحمر
- جلسة دي جي حية مع أنغام الهاوس والموسيقى العالمية الهادئة
- بوفيه مقبلات بحرية فاخرة ومشروبات موكتيل استوائية منعشة
- جلسات سباحة عائمة وبادل بورد تحت إضاءات اليخت الليلية
- طاقم بحري سعودي محترف وتصاريح رسمية معتمدة من حرس الحدود

الزي المقترح: أناقة شاطئية / كتان أبيض وأزرق بحري.`
      },
      status: 'LIVE',
      start_date: '2026-10-23T16:00:00Z',
      end_date: '2026-10-23T20:30:00Z',
      timezone: 'Asia/Riyadh',
      currency: 'SAR',
      format: 'IN_PERSON',
      location_venue_name: {
        en: 'Jeddah Yacht Club & Marina - Pier B',
        ar: 'نادي اليخوت والمارينا جدة - الرصيف B'
      },
      location_address: {
        en: 'Ash Shati, Corniche Road, Jeddah 23613, Saudi Arabia',
        ar: 'طريق الكورنيش، حي الشاطئ، جدة 23613، المملكة العربية السعودية'
      },
      online_details: '',
      cover_image_url: '/images/obhur-sunset-yacht-dj.jpg',
      organizer_id: 'org-jeddah-marina',
      organizer_name: {
        en: 'Red Sea Marine & Coastal Experiences',
        ar: 'تجارب البحر الأحمر للفعاليات والرحلات البحرية'
      },
      categories: ['Yacht & Boat Parties', 'Obhur Cruises', 'Nightlife & Music'],
      capacity: 65,
      created_at: '2026-01-10T12:00:00Z',
      updated_at: '2026-02-01T15:30:00Z',
      settings: {
        show_remaining_tickets: true,
        require_attendee_info: true,
        support_email: 'yachts@redseaexperiences.sa',
        custom_color: '#0284c7'
      }
    },
    {
      id: '2',
      title: {
        en: 'Bayada Island Maldives Escape & Coral Reef Snorkel',
        ar: 'رحلة مالديف جدة: مغامرة جزيرة بياضة والسنوركلينج بين الشعاب'
      },
      slug: 'bayada-island-maldives-escape',
      summary: {
        en: 'Full-day catamaran expedition to Jeddah\'s turquoise Bayada coral reef with paddleboarding, seabob water sleds, and fresh seafood BBQ.',
        ar: 'رحلة كروز نهارية إلى جزيرة بياضة الفيروزية مع تجارب التجديف بالبادل بورد، ألعاب السيبوب المائية، ومأكولات بحرية طازجة.'
      },
      description: {
        en: `Escape to the famous "Maldives of Jeddah" – Bayada Island reef! Crystal clear shallow turquoise waters, vibrant marine biodiversity, and ultimate sun-soaked relaxation.

Included in Your Expedition:
- High-speed luxury catamaran transfer from Durrat Al Arus Marina
- Guided snorkeling tours around untouched virgin coral reefs
- Stand-up paddleboarding (SUP), inflatable sea floats & Seabob underwater scooters
- Fresh Red Sea catch BBQ lunch grilled live onboard
- Full marine safety jackets, certified PADI divemaster & lifeguard support`,
        ar: `انطلق معنا إلى بياضة "مالديف جدة" الساحرة ذات المياه الفيروزية الضحلة والرمال البيضاء المرجانية وسط البحر الأحمر!

تشمل الرحلة:
- الإبحار على متن كتماران سريع ومكيف من مارينا درة العروس
- جولات سنوركلينج برفقة مرشدين محترفين بين أجمل الشعاب المرجانية
- قوارب تجديف (بادل بورد)، ألعاب طافية، وزلاجات سيبوب مائية
- وجبة غداء مشاوي بحرية طازجة تحضر مباشرة على متن القارب
- سترات نجاة حديثة، غواص إنقاذ معتمد، ومعدات سنوركلينج معقمة بالكامل`
      },
      status: 'LIVE',
      start_date: '2026-11-06T08:30:00Z',
      end_date: '2026-11-06T16:30:00Z',
      timezone: 'Asia/Riyadh',
      currency: 'SAR',
      format: 'IN_PERSON',
      location_venue_name: {
        en: 'Durrat Al Arus Marina - Bayada Departure Gate',
        ar: 'مارينا درة العروس - بوابة رحلات بياضة'
      },
      location_address: {
        en: 'Durrat Al Arus, Dahaban 23831, Jeddah, Saudi Arabia',
        ar: 'درة العروس، ذهبان 23831، جدة، المملكة العربية السعودية'
      },
      online_details: '',
      cover_image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
      organizer_id: 'org-jeddah-marina',
      organizer_name: {
        en: 'Red Sea Marine & Coastal Experiences',
        ar: 'تجارب البحر الأحمر للفعاليات والرحلات البحرية'
      },
      categories: ['Sea Voyages & Excursions', 'Bayada Island', 'Snorkeling & Diving'],
      capacity: 90,
      created_at: '2026-01-15T10:00:00Z',
      updated_at: '2026-02-10T11:00:00Z',
      settings: {
        show_remaining_tickets: true,
        require_attendee_info: true,
        support_email: 'bayada@redseaexperiences.sa',
        custom_color: '#0d9488'
      }
    },
    {
      id: '3',
      title: {
        en: 'Red Sea Waves Beach Club & Acoustic Shoreline Night',
        ar: 'ليالي أمواج البحر الأحمر: حفلة البيتش كلوب والجلسات الطربية الشاطئية'
      },
      slug: 'red-sea-waves-beach-club-night',
      summary: {
        en: 'High-energy open-air beach party by the Red Sea shoreline featuring regional Arabic fusion artists and seaside fire-pit lounges.',
        ar: 'أمسية شاطئية حماسية مفتوحة على شاطئ البحر الأحمر تجمع بين الألحان الشرقية المعاصرة والجلسات الشاطئية الفاخرة.'
      },
      description: {
        en: `Feel the rhythm of the waves and live acoustic music under the stars at Jeddah's elite Oia Beach Club.
      
Event Highlights:
- Live Arabic indie-fusion & acoustic violin beachfront performances
- Private shoreline cabanas with plush bean bags and ambient fire pits
- Artisanal wood-fired pizzas, fresh coconut mocktails, and specialty coffee
- Direct beach access and sea breeze sunset chillout lounge`,
        ar: `عش سحر الليالي البحرية مع صوت الأمواج والأنغام الطربية الحية تحت نجوم سماء جدة في منتجع أويا الشاطئي.

أبرز مميزات الأمسية:
- عروض موسيقية حية (كمان وعود بطابع مودرن) على الشاطئ مباشرة
- جلسات كباينخاصة حول مواقد النار الشاطئية الفاخرة
- أفران بيتزا حطبية طازجة، عصائر جوز الهند الطبيعية، وقهوة مختصة
- إمكانية التجول على الرمل والاستمتاع بنسيم البحر العليل`
      },
      status: 'LIVE',
      start_date: '2026-11-13T19:00:00Z',
      end_date: '2026-11-14T01:30:00Z',
      timezone: 'Asia/Riyadh',
      currency: 'SAR',
      format: 'IN_PERSON',
      location_venue_name: {
        en: 'Oia Beach Resort & Private Cove',
        ar: 'منتجع وشاطئ أويا الخاص - أبحر'
      },
      location_address: {
        en: 'Prince Abdullah Al Faisal St, North Obhur, Jeddah 23812',
        ar: 'شارع الأمير عبد الله الفيصل، أبحر الشمالية، جدة 23812'
      },
      online_details: '',
      cover_image_url: '/images/oia-beach-sunbed-cover.jpg',
      organizer_id: 'org-jeddah-marina',
      organizer_name: {
        en: 'Red Sea Marine & Coastal Experiences',
        ar: 'تجارب البحر الأحمر للفعاليات والرحلات البحرية'
      },
      categories: ['Coastal Concerts & Festivals', 'Beach Club', 'Music & Dining'],
      capacity: 350,
      created_at: '2026-02-01T08:00:00Z',
      updated_at: '2026-02-15T09:00:00Z',
      settings: {
        show_remaining_tickets: true,
        require_attendee_info: false,
        support_email: 'events@redseaexperiences.sa',
        custom_color: '#f59e0b'
      }
    },
    {
      id: '4',
      title: {
        en: 'Soleil Ladies-Only Private Beach Retreat & Sunset Yoga',
        ar: 'يوم السيدات الشاطئي الخاص في سول: استرخاء ويوغا الغروب'
      },
      slug: 'soleil-ladies-only-beach-retreat',
      summary: {
        en: '100% private ladies sanctuary with seaside infinity pool, sound healing meditation, aqua fitness, and gourmet Red Sea dining.',
        ar: 'مساحة خاصة للسيدات بخصوصية تامة 100%، مسبح إنفينيتي مطل على البحر، جلسات استرخاء بالصوت، وأطباق بحرية فاخرة.'
      },
      description: {
        en: `Indulge in a day of serene privacy, wellness, and beachside luxury curated exclusively for ladies at Indigo Private Resort.
      
What Awaits You:
- Complete 100% privacy with female-only staff and security
- Sunset Vinyasa Yoga & Tibetan Sound Healing session by the shoreline
- Unlimited access to the private beach cove & heated infinity pool
- Refreshing cold-pressed juices, matcha bar, and wholesome Mediterranean buffet`,
        ar: `دللي نفسك في يوم شاطئي متكامل مخصص حصرياً للسيدات بخصوصية تامة 100% وأجواء استرخاء فاخرة في منتجع إنديجو.

ما ينتظرك في هذه التجربة:
- خصوصية تامة مع كادر نسائي متكامل من أمن وخدمة وضيافة
- جلسة يوغا الغروب وتمارين التأمل بالصوت على رمال الشاطئ
- استخدام مفتوح لشاطئ المنتجع الخاص ومسبح الإنفينيتي المطل على البحر
- بوفيه طعام صحي متوسطي، بار ماتشا وعصائر طازجة طوال اليوم`
      },
      status: 'LIVE',
      start_date: '2026-11-27T10:00:00Z',
      end_date: '2026-11-27T19:00:00Z',
      timezone: 'Asia/Riyadh',
      currency: 'SAR',
      format: 'IN_PERSON',
      location_venue_name: {
        en: 'Indigo Private Resort & Beach',
        ar: 'منتجع وشاطئ إنديجو الخاص - أبحر الشمالية'
      },
      location_address: {
        en: 'North Obhur, Jeddah 23811, Saudi Arabia',
        ar: 'أبحر الشمالية، جدة 23811، المملكة العربية السعودية'
      },
      online_details: '',
      cover_image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80',
      organizer_id: 'org-jeddah-marina',
      organizer_name: {
        en: 'Red Sea Marine & Coastal Experiences',
        ar: 'تجارب البحر الأحمر للفعاليات والرحلات البحرية'
      },
      categories: ['Ladies-Only Days', 'Wellness & Spa', 'Private Beach'],
      capacity: 120,
      created_at: '2026-02-05T09:00:00Z',
      updated_at: '2026-02-18T10:00:00Z',
      settings: {
        show_remaining_tickets: true,
        require_attendee_info: true,
        support_email: 'ladies@redseaexperiences.sa',
        custom_color: '#ec4899'
      }
    },
    {
      id: '5',
      title: {
        en: 'Jeddah Jet Ski Cup & Red Sea Flyboard Showcase',
        ar: 'كأس جدة للسباقات المائية واستعراض الفلاي بورد في الكورنيش'
      },
      slug: 'jeddah-jet-ski-cup-2026',
      summary: {
        en: 'Adrenaline-packed Red Sea speed show featuring professional jet ski heats, night-light flyboard acrobatics, and spectator food trucks.',
        ar: 'أقوى عروض السرعة والإثارة المائية على كورنيش جدة مع سباقات الجت سكي واستعراضات الفلاي بورد الليلية المضيئة.'
      },
      description: {
        en: `Witness world-class hydro-flight athletes and top jet ski racers compete along Jeddah's iconic waterfront!
      
Event Highlights:
- Professional Jet Ski Slalom & Freestyle Championship
- Night-time LED Flyboard acrobatic stunts shooting 15m in the air
- Waterfront VIP bleachers with direct view of the start/finish buoy line
- Interactive maritime expo, simulator stations, and top Saudi food trucks`,
        ar: `شاهد أقوى منافسات الرياضات المائية واستعراضات الطيران المائي (فلاي بورد) على الواجهة البحرية لكورنيش جدة الجديد!

فعاليات الحدث:
- بطولة المحترفين لسباقات الجت سكي والمناورات الاستعراضية
- عروض فلاي بورد استعراضية ليلية مع أضواء LED على ارتفاع 15 متراً
- مدرجات VIP شاطئية مع إطلالة بانورامية مباشرة على خط البداية والنهاية
- منطقة ألعاب ومحاكاة مائية، وشاحنات طعام مميزة على ممشى الكورنيش`
      },
      status: 'LIVE',
      start_date: '2026-12-04T15:00:00Z',
      end_date: '2026-12-04T22:00:00Z',
      timezone: 'Asia/Riyadh',
      currency: 'SAR',
      format: 'IN_PERSON',
      location_venue_name: {
        en: 'Jeddah Waterfront - Al Nawras Bay',
        ar: 'واجهة جدة البحرية - خليج ساحة النورس'
      },
      location_address: {
        en: 'New Jeddah Corniche, Al Shatie District, Jeddah 23511',
        ar: 'كورنيش جدة الجديد، حي الشاطئ، جدة 23511'
      },
      online_details: '',
      cover_image_url: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&auto=format&fit=crop&q=80',
      organizer_id: 'org-jeddah-marina',
      organizer_name: {
        en: 'Red Sea Marine & Coastal Experiences',
        ar: 'تجارب البحر الأحمر للفعاليات والرحلات البحرية'
      },
      categories: ['Water Sports & Adventure', 'Jet Ski & Flyboard', 'Jeddah Waterfront'],
      capacity: 1200,
      created_at: '2026-02-10T11:00:00Z',
      updated_at: '2026-02-20T12:00:00Z',
      settings: {
        show_remaining_tickets: true,
        require_attendee_info: false,
        support_email: 'watersports@redseaexperiences.sa',
        custom_color: '#06b6d4'
      }
    }
  ],
  tickets: [
    // Event 1: Obhur Yacht
    {
      id: 't-obh-101',
      event_id: '1',
      title: {
        en: 'Upper Deck Sunset Pass',
        ar: 'تصريح الجلسة العلوية باليخت مع الغروب'
      },
      description: {
        en: 'Includes 4-hour cruise, sunset DJ set, floating swim session, gourmet canapés, and mocktails.',
        ar: 'يشمل جولة بحرية 4 ساعات، أمسية الـ DJ، جلسة السباحة العائمة، مقبلات بحرية وموكتيلات طازجة.'
      },
      price: 550,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 40,
      quantity_sold: 34,
      max_per_order: 4,
      min_per_order: 1,
      is_active: true,
      order_index: 0
    },
    {
      id: 't-obh-102',
      event_id: '1',
      title: {
        en: 'VIP Sunbed & Master Bow Lounge',
        ar: 'كباينVIP ومقاعد مقدمة اليخت الفاخرة'
      },
      description: {
        en: 'Premium forward sunbed seating, dedicated crew service, caviar platter, and priority boarding.',
        ar: 'مقاعد متميزة في مقدمة اليخت، خدمة ضيافة مخصصة، طبق كافيار بحري، ودخول مسار سريع.'
      },
      price: 1250,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 15,
      quantity_sold: 12,
      max_per_order: 2,
      min_per_order: 1,
      is_active: true,
      order_index: 1
    },
    {
      id: 't-obh-103',
      event_id: '1',
      title: {
        en: 'Private Captain Table (Group of 6)',
        ar: 'طاولة القبطان الخاصة لكبار الشخصيات (6 أشخاص)'
      },
      description: {
        en: 'Full private lounge section on the yacht for 6 guests with private steward & customized catering.',
        ar: 'جلسة صالون خاصة كاملة لـ 6 ضيوف مع مضيف خاص وتنسيق بوفيه بحري حسب الطلب.'
      },
      price: 4500,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 2,
      quantity_sold: 2,
      max_per_order: 1,
      min_per_order: 1,
      is_active: true,
      order_index: 2
    },

    // Event 2: Bayada Island
    {
      id: 't-bay-201',
      event_id: '2',
      title: {
        en: 'All-Day Bayada Explorer + Snorkel Gear',
        ar: 'تصريح مغامرة بياضة الكاملة + معدات السنوركلينج'
      },
      description: {
        en: 'Catamaran cruise, paddleboard access, guided coral snorkel, fresh grilled seafood BBQ, and beverages.',
        ar: 'رحلة الكتماران، استخدام البادل بورد، جولة سنوركلينج مع مرشد، وجبة مشاوي بحرية ومشروبات.'
      },
      price: 650,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 60,
      quantity_sold: 48,
      max_per_order: 6,
      min_per_order: 1,
      is_active: true,
      order_index: 0
    },
    {
      id: 't-bay-202',
      event_id: '2',
      title: {
        en: 'Bayada Certified Scuba Dive Pass (2 Tanks)',
        ar: 'تصريح غوص بياضة للمرخصين (أسطوانتان + مرافق)'
      },
      description: {
        en: 'Deep reef dive guided by PADI Master, full gear rental, nitrox tanks, and underwater photo pack.',
        ar: 'غوص في أعماق بياضة مع مرشد PADI معتمد، تأجير كامل المعدات، وباقة تصوير احترافي تحت الماء.'
      },
      price: 950,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 20,
      quantity_sold: 14,
      max_per_order: 3,
      min_per_order: 1,
      is_active: true,
      order_index: 1
    },

    // Event 3: Oia Beach Club
    {
      id: 't-oia-301',
      event_id: '3',
      title: {
        en: 'General Shoreline Entry & Lounge Pass',
        ar: 'دخول الشاطئ العام وجلسات الساحل'
      },
      description: {
        en: 'Includes access to beachfront concert stage, beach bean bags, 1 welcome tropical mocktail, and beach towel.',
        ar: 'يشمل دخول المسرح الشاطئي، الجلسات الرملية، مشروب ترحيبي استوائي، ومنشفة شاطئية.'
      },
      price: 350,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 250,
      quantity_sold: 180,
      max_per_order: 6,
      min_per_order: 1,
      is_active: true,
      order_index: 0
    },
    {
      id: 't-oia-302',
      event_id: '3',
      title: {
        en: 'Seaside Firepit Cabana (Up to 6 Guests)',
        ar: 'كباينشاطئية خاصة مع موقد نار (تتسع لـ 6 ضيوف)'
      },
      description: {
        en: 'Private cabana with fire pit by the water, pizza & tapas platter, and dedicated butler service.',
        ar: 'كباينخاصة مطلة على مياه البحر مع موقد نار، تشكيلة بيتزا ومقبلات فاخرة، وخدمة نادل خاصة.'
      },
      price: 2400,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 12,
      quantity_sold: 9,
      max_per_order: 1,
      min_per_order: 1,
      is_active: true,
      order_index: 1
    },

    // Event 4: Soleil Ladies Beach
    {
      id: 't-sol-401',
      event_id: '4',
      title: {
        en: 'Ladies Day Retreat Pass & Sunset Yoga',
        ar: 'تصريح يوم السيدات الشاطئي + يوغا الغروب'
      },
      description: {
        en: 'Full access to private beach, infinity pool, sound healing class, sunset yoga, and health buffet.',
        ar: 'دخول كامل للشاطئ الخاص، مسبح الإنفينيتي، جلسة التأمل الصوتي، يوغا الغروب، والبوفيه الصحي.'
      },
      price: 480,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 80,
      quantity_sold: 62,
      max_per_order: 4,
      min_per_order: 1,
      is_active: true,
      order_index: 0
    },
    {
      id: 't-sol-402',
      event_id: '4',
      title: {
        en: 'VIP Sunbed & 45-Min Beachside Massage',
        ar: 'سرير شاطئي VIP + جلسة مساج بحري 45 دقيقة'
      },
      description: {
        en: 'Reserved luxury oceanfront lounger, 45-min aroma massage, and private fruit & matcha service.',
        ar: 'سرير استرخاء محجوز في الصف الأول على البحر، جلسة مساج عطري 45 دقيقة، وضيافة فواكه وماتشا.'
      },
      price: 980,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 25,
      quantity_sold: 21,
      max_per_order: 2,
      min_per_order: 1,
      is_active: true,
      order_index: 1
    },

    // Event 5: Jet Ski Cup
    {
      id: 't-jet-501',
      event_id: '5',
      title: {
        en: 'Corniche Grandstand Bleacher Pass',
        ar: 'تذكرة مدرجات الكورنيش المطلة على السباق'
      },
      description: {
        en: 'Shaded seat in the main spectator stands overlooking the turn buoys and live announcer commentary.',
        ar: 'مقعد مظلل في المدرج الرئيسي مع إطلالة واضحة على منعطفات السباق وتعليق صوتي مباشر.'
      },
      price: 120,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 800,
      quantity_sold: 640,
      max_per_order: 10,
      min_per_order: 1,
      is_active: true,
      order_index: 0
    },
    {
      id: 't-jet-502',
      event_id: '5',
      title: {
        en: 'VIP Marina Paddock & Rider Lounge',
        ar: 'تصريح بادوك المتسابقين وضيافة كبار الشخصيات'
      },
      description: {
        en: 'Access to the jet ski mechanical pits, rider meet & greet, air-conditioned hospitality tent, and catering.',
        ar: 'دخول منطقة كراجات وصيانة الجت سكي، لقاء المتسابقين، خيمة الضيافة المكيفة، وبوفيه فاخر.'
      },
      price: 650,
      currency: 'SAR',
      type: 'PAID',
      quantity_total: 100,
      quantity_sold: 85,
      max_per_order: 4,
      min_per_order: 1,
      is_active: true,
      order_index: 1
    }
  ],
  orders: [
    {
      id: 'ord-jed-8821',
      short_id: 'RED-8821',
      event_id: '1',
      first_name: 'Tariq',
      last_name: 'Al-Shehri',
      email: 'tariq.shehri@aramco.com',
      status: 'COMPLETED',
      total_gross: 1100,
      total_tax: 165,
      total_fee: 27.5,
      currency: 'SAR',
      payment_method: 'Mada Debit Card (**** 6011)',
      created_at: '2026-02-14T14:22:00Z',
      items: [
        {
          ticket_id: 't-obh-101',
          ticket_title: {
            en: 'Upper Deck Sunset Pass',
            ar: 'تصريح الجلسة العلوية باليخت مع الغروب'
          },
          quantity: 2,
          unit_price: 550,
          total_price: 1100
        }
      ]
    },
    {
      id: 'ord-jed-9942',
      short_id: 'RED-9942',
      event_id: '2',
      first_name: 'Nouf',
      last_name: 'Al-Otaibi',
      email: 'nouf.otaibi@saudia.com',
      status: 'COMPLETED',
      total_gross: 1300,
      total_tax: 195,
      total_fee: 32.5,
      currency: 'SAR',
      promo_code: 'REDSEA2026',
      discount_amount: 130,
      payment_method: 'Apple Pay (Mada **** 3412)',
      created_at: '2026-02-16T11:05:00Z',
      items: [
        {
          ticket_id: 't-bay-201',
          ticket_title: {
            en: 'All-Day Bayada Explorer + Snorkel Gear',
            ar: 'تصريح مغامرة بياضة الكاملة + معدات السنوركلينج'
          },
          quantity: 2,
          unit_price: 650,
          total_price: 1300
        }
      ]
    }
  ],
  attendees: [
    {
      id: 'att-sea-101A',
      short_id: 'ATT-OBH-1',
      order_id: 'ord-jed-8821',
      event_id: '1',
      ticket_id: 't-obh-101',
      ticket_title: {
        en: 'Upper Deck Sunset Pass',
        ar: 'تصريح الجلسة العلوية باليخت مع الغروب'
      },
      first_name: 'Tariq',
      last_name: 'Al-Shehri',
      email: 'tariq.shehri@aramco.com',
      status: 'ACTIVE',
      checked_in: true,
      checked_in_at: '2026-10-23T15:45:00Z',
      barcode: '8821-OBH-101A',
      seat: 'Upper Deck - Starboard 04',
      created_at: '2026-02-14T14:22:00Z',
      answers: {
        'رقم الهوية الوطنية / الإقامة': '1088492011',
        'مستوى السباحة': 'Advanced Swimmer / سباح متمكن',
        'المتطلبات الغذائية': 'Seafood Only / مأكولات بحرية فقط'
      }
    },
    {
      id: 'att-sea-101B',
      short_id: 'ATT-OBH-2',
      order_id: 'ord-jed-8821',
      event_id: '1',
      ticket_id: 't-obh-101',
      ticket_title: {
        en: 'Upper Deck Sunset Pass',
        ar: 'تصريح الجلسة العلوية باليخت مع الغروب'
      },
      first_name: 'Reem',
      last_name: 'Al-Shehri',
      email: 'reem.shehri@aramco.com',
      status: 'ACTIVE',
      checked_in: false,
      checked_in_at: null,
      barcode: '8821-OBH-101B',
      seat: 'Upper Deck - Starboard 05',
      created_at: '2026-02-14T14:22:00Z',
      answers: {
        'رقم الهوية الوطنية / الإقامة': '1099238411',
        'مستوى السباحة': 'Intermediate / متوسط',
        'المتطلبات الغذائية': 'None'
      }
    },
    {
      id: 'att-sea-202A',
      short_id: 'ATT-BAY-1',
      order_id: 'ord-jed-9942',
      event_id: '2',
      ticket_id: 't-bay-201',
      ticket_title: {
        en: 'All-Day Bayada Explorer + Snorkel Gear',
        ar: 'تصريح مغامرة بياضة الكاملة + معدات السنوركلينج'
      },
      first_name: 'Nouf',
      last_name: 'Al-Otaibi',
      email: 'nouf.otaibi@saudia.com',
      status: 'ACTIVE',
      checked_in: true,
      checked_in_at: '2026-11-06T08:15:00Z',
      barcode: '9942-BAY-202A',
      seat: 'Catamaran Main Saloon #12',
      created_at: '2026-02-16T11:05:00Z',
      answers: {
        'رقم الهوية الوطنية / الإقامة': '1044819203',
        'مستوى السباحة': 'Intermediate / متوسط',
        'مقاس سترة النجاة': 'Standard Adult (M/L)'
      }
    }
  ],
  promoCodes: [
    {
      id: 'p-jed-1',
      event_id: '1',
      code: 'REDSEA10',
      discount_type: 'PERCENTAGE',
      discount_value: 10,
      max_uses: 100,
      current_uses: 38,
      expiry_date: '2026-11-01T23:59:59Z',
      is_active: true
    },
    {
      id: 'p-jed-2',
      event_id: '1',
      code: 'OBHURVIP',
      discount_type: 'FIXED',
      discount_value: 150,
      max_uses: 30,
      current_uses: 14,
      expiry_date: '2026-11-30T23:59:59Z',
      is_active: true
    },
    {
      id: 'p-jed-3',
      event_id: '2',
      code: 'BAYADA2026',
      discount_type: 'PERCENTAGE',
      discount_value: 15,
      max_uses: 50,
      current_uses: 22,
      expiry_date: '2026-12-01T23:59:59Z',
      is_active: true
    }
  ],
  questions: [
    {
      id: 'q-sea-1',
      event_id: '1',
      title: {
        en: 'National ID / Iqama / Passport Number (Coast Guard Clearance)',
        ar: 'رقم الهوية الوطنية / الإقامة / الجواز (لمصلحة تصاريح حرس الحدود)'
      },
      type: 'TEXT',
      required: true,
      belongs_to: 'ATTENDEE'
    },
    {
      id: 'q-sea-2',
      event_id: '1',
      title: {
        en: 'Swimming Proficiency & Water Safety Level',
        ar: 'مستوى إجادة السباحة والسلامة المائية'
      },
      type: 'SELECT',
      options: [
        'Advanced Swimmer / سباح متمكن',
        'Intermediate / متوسط',
        'Beginner / مبتدئ',
        'Non-Swimmer / لا أجيد السباحة (سترة نجاة إلزامية)'
      ],
      required: true,
      belongs_to: 'ATTENDEE'
    },
    {
      id: 'q-sea-3',
      event_id: '1',
      title: {
        en: 'Life Vest Size & Sea Sickness Precaution',
        ar: 'مقاس سترة النجاة واحتياطات دوار البحر'
      },
      type: 'SELECT',
      options: [
        'Standard Adult (M/L) / قياسي للبالغين',
        'Extra Large (XL/2XL) / كبير جداً',
        'Junior / سترة أطفال',
        'Motion Sickness Tablet Requested / يرجى توفير حبوب دوار البحر'
      ],
      required: false,
      belongs_to: 'ATTENDEE'
    }
  ],
  checkInLists: [
    {
      id: 'ck-jed-1',
      short_id: 'list-obhur-pier-b',
      event_id: '1',
      name: {
        en: 'Jeddah Yacht Club Marina - Pier Gate B',
        ar: 'نادي اليخوت والمارينا جدة - بوابة الرصيف B'
      },
      description: {
        en: 'All Yacht Passengers & VIP Bow Guests',
        ar: 'جميع ركاب اليخت وضيوف كباينكبار الشخصيات'
      },
      ticket_ids: ['t-obh-101', 't-obh-102', 't-obh-103'],
      is_active: true
    },
    {
      id: 'ck-jed-2',
      short_id: 'list-durrah-bayada',
      event_id: '2',
      name: {
        en: 'Durrat Al Arus Catamaran Boarding Gate',
        ar: 'بوابة صعود كتماران بياضة - مارينا درة العروس'
      },
      description: {
        en: 'Bayada Island explorers & Scuba divers',
        ar: 'مستكشفو جزيرة بياضة وغواصو الأعماق'
      },
      ticket_ids: ['t-bay-201', 't-bay-202'],
      is_active: true
    }
  ],
  messages: [
    {
      id: 'msg-sea-1',
      event_id: '1',
      subject: 'معلومات الانطلاق وتصاريح الإبحار - رحلة غروب أبحر باليخت',
      body: 'أهلاً بكم على متن تجارب البحر الأحمر!\n\nنود تذكيركم بالحضور إلى نادي اليخوت والمارينا جدة (الرصيف B) قبل موعد الإبحار بـ 30 دقيقة، مع إحضار أصل الهوية الوطنية أو الإقامة لإجراءات حرس الحدود.\n\nنتمنى لكم رحلة بحرية ساحرة لا تُنسى!\nطاقم تجارب البحر الأحمر',
      recipient_filter: 'ALL',
      sent_at: '2026-02-20T10:00:00Z',
      recipients_count: 48
    }
  ]
};
