import type { HomepageData } from '@/types/cms';

export const seedData: HomepageData = {
  hero: {
    eyebrow: 'TAMIZHAN TRAVELS',
    headline: 'Every Journey Begins With Trust.',
    subheading:
      'Experience premium travel across South India with comfort, luxury and unforgettable memories.',
    ctaPrimary: { label: 'Book Now', href: '#booking' },
    ctaSecondary: { label: 'Explore Fleet', href: '#fleet' },
    featuredVehicles: [
      {
        name: 'Tempo Traveller',
        tag: '12 Seater · Luxury',
        image: {
          _type: 'image',
          placeholderUrl:
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&auto=format&fit=crop&q=80',
        },
      },
      {
        name: 'Mini Bus',
        tag: '18 Seater · Executive',
        image: {
          _type: 'image',
          placeholderUrl:
            'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=1200&auto=format&fit=crop&q=80',
        },
      },
      {
        name: 'Premium Cab',
        tag: '4 Seater · Premium',
        image: {
          _type: 'image',
          placeholderUrl:
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&auto=format&fit=crop&q=80',
        },
      },
    ],
  },
  fleet: [
    {
      _id: 'v1',
      slug: { current: 'crysta-premium-cab' },
      name: 'Toyota Crysta',
      type: 'Premium Cab',
      comfortLevel: 'Luxury',
      capacity: 6,
      ac: true,
      musicSystem: true,
      luxurySeating: true,
      features: ['Leather Seats', 'Charging Ports', 'Ample Luggage', 'WiFi Ready'],
      image: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1400&auto=format&fit=crop&q=80',
      },
    },
    {
      _id: 'v2',
      slug: { current: 'ertiga-cab' },
      name: 'Maruti Ertiga',
      type: 'Premium Cab',
      comfortLevel: 'Premium',
      capacity: 7,
      ac: true,
      musicSystem: true,
      luxurySeating: true,
      features: ['Spacious Cabin', 'Reclining Seats', 'Ice Cold AC'],
      image: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&auto=format&fit=crop&q=80',
      },
    },
    {
      _id: 'v3',
      slug: { current: 'innova-hycross' },
      name: 'Innova Hycross',
      type: 'Premium Cab',
      comfortLevel: 'Luxury',
      capacity: 7,
      ac: true,
      musicSystem: true,
      luxurySeating: true,
      features: ['Captain Seats', 'Panoramic Roof', 'Premium Audio'],
      image: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1400&auto=format&fit=crop&q=80',
      },
    },
    {
      _id: 'v4',
      slug: { current: 'tempo-traveller-12' },
      name: 'Tempo Traveller 12S',
      type: 'Tempo Traveller',
      comfortLevel: 'Luxury',
      capacity: 12,
      ac: true,
      musicSystem: true,
      luxurySeating: true,
      features: ['Recliner Seats', 'Individual AC Vents', 'LED TV', 'Mic'],
      image: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1400&auto=format&fit=crop&q=80',
      },
    },
    {
      _id: 'v5',
      slug: { current: 'tempo-traveller-17' },
      name: 'Tempo Traveller 17S',
      type: 'Tempo Traveller',
      comfortLevel: 'Executive',
      capacity: 17,
      ac: true,
      musicSystem: true,
      luxurySeating: true,
      features: ['Pushback Seats', 'Luggage Carrier', 'First Aid Kit'],
      image: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1400&auto=format&fit=crop&q=80',
      },
    },
    {
      _id: 'v6',
      slug: { current: 'mini-bus-18' },
      name: 'Mini Bus 18 Seater',
      type: 'Mini Bus',
      comfortLevel: 'Executive',
      capacity: 18,
      ac: true,
      musicSystem: true,
      luxurySeating: true,
      features: ['Wide Seats', 'Overhead Storage', 'Rear Camera'],
      image: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=1400&auto=format&fit=crop&q=80',
      },
    },
    {
      _id: 'v7',
      slug: { current: 'mini-bus-26' },
      name: 'Mini Bus 26 Seater',
      type: 'Mini Bus',
      comfortLevel: 'Executive',
      capacity: 26,
      ac: true,
      musicSystem: true,
      luxurySeating: false,
      features: ['Corporate Ready', 'Group Tours', 'Estate Suspension'],
      image: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1400&auto=format&fit=crop&q=80',
      },
    },
    {
      _id: 'v8',
      slug: { current: 'etios-sedan' },
      name: 'Toyota Etios',
      type: 'Premium Cab',
      comfortLevel: 'Premium',
      capacity: 4,
      ac: true,
      musicSystem: true,
      luxurySeating: false,
      features: ['Airport Ready', 'Sedan Comfort', 'City + Hills'],
      image: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1400&auto=format&fit=crop&q=80',
      },
    },
  ],
  destinations: [
    {
      _id: 'd1',
      slug: { current: 'kerala' },
      name: 'Kerala',
      tagline: 'God\u2019s Own Country · Backwaters & Hills',
      hero: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80',
      },
      mapPosition: { x: 34, y: 66 },
      highlights: ['Alleppey Houseboats', 'Munnar Tea Hills', 'Wayanad', 'Kovalam Beach'],
    },
    {
      _id: 'd2',
      slug: { current: 'ooty' },
      name: 'Ooty',
      tagline: 'Queen of Hill Stations · Nilgiris',
      hero: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1591122947157-26bad3a117d4?w=1200&auto=format&fit=crop&q=80',
      },
      mapPosition: { x: 48, y: 46 },
      highlights: ['Botanical Gardens', 'Ooty Lake', 'Nilgiri Mountain Rail'],
    },
    {
      _id: 'd3',
      slug: { current: 'kodaikanal' },
      name: 'Kodaikanal',
      tagline: 'Princess of Hills · Mist & Pines',
      hero: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop&q=80',
      },
      mapPosition: { x: 56, y: 54 },
      highlights: ['Kodai Lake', 'Coaker\u2019s Walk', 'Pine Forests'],
    },
    {
      _id: 'd4',
      slug: { current: 'mysore' },
      name: 'Mysore',
      tagline: 'Royal Heritage City · Palaces & Gardens',
      hero: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop&q=80',
      },
      mapPosition: { x: 36, y: 38 },
      highlights: ['Mysore Palace', 'Brindavan Gardens', 'Chamundi Hills'],
    },
    {
      _id: 'd5',
      slug: { current: 'rameswaram' },
      name: 'Rameswaram',
      tagline: 'Sacred Dham · Pilgrimage by the Sea',
      hero: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80',
      },
      mapPosition: { x: 74, y: 76 },
      highlights: ['Ramanathaswamy Temple', 'Pamban Bridge', 'Dhanushkodi'],
    },
    {
      _id: 'd6',
      slug: { current: 'kanyakumari' },
      name: 'Kanyakumari',
      tagline: 'Land\u2019s End · Sunrise & Sunset',
      hero: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop&q=80',
      },
      mapPosition: { x: 72, y: 92 },
      highlights: ['Triveni Sangam', 'Vivekananda Rock', 'Thiruvalluvar Statue'],
    },
    {
      _id: 'd7',
      slug: { current: 'yercaud' },
      name: 'Yercaud',
      tagline: 'Jewel of the South · Gentle Hills',
      hero: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop&q=80',
      },
      mapPosition: { x: 52, y: 34 },
      highlights: ['Emerald Lake', 'Pagoda Point', 'Coffee Estates'],
    },
    {
      _id: 'd8',
      slug: { current: 'coimbatore' },
      name: 'Coimbatore',
      tagline: 'Manchester of South · Gateway to Nilgiris',
      hero: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop&q=80',
      },
      mapPosition: { x: 46, y: 44 },
      highlights: ['Marudhamalai', 'Isha Yoga', 'VOC Park'],
    },
    {
      _id: 'd9',
      slug: { current: 'madurai' },
      name: 'Madurai',
      tagline: 'Athens of the East · Temple City',
      hero: {
        _type: 'image',
        placeholderUrl:
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80',
      },
      mapPosition: { x: 62, y: 74 },
      highlights: ['Meenakshi Amman Temple', 'Thirumalai Nayakar Palace', 'Vaigai River'],
    },
  ],
  collections: [
    {
      _id: 'c1',
      title: 'Kerala Family Trip — Jan 2024',
      category: 'Trip Memories',
      date: '2024-01-15',
      cover: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=75' },
      media: [
        { _key: 'm1', kind: 'image', caption: 'Alleppey Backwaters', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=75' } },
        { _key: 'm2', kind: 'image', caption: 'Munnar Tea Hills',    imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=75' } },
        { _key: 'm3', kind: 'image', caption: 'Wayanad Forest',      imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=75' } },
        { _key: 'm4', kind: 'image', caption: 'Houseboat Stay',      imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=75' } },
      ],
    },
    {
      _id: 'c2',
      title: 'Rameswaram Pilgrimage — Feb 2024',
      category: 'Pilgrimages',
      date: '2024-02-10',
      cover: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=75' },
      media: [
        { _key: 'm5', kind: 'image', caption: 'Ramanathaswamy Temple', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=75' } },
        { _key: 'm6', kind: 'image', caption: 'Pamban Bridge',         imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=75' } },
        { _key: 'm7', kind: 'image', caption: 'Kanyakumari Sunrise',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=75' } },
      ],
    },
    {
      _id: 'c3',
      title: 'Ooty Hill Station — Mar 2024',
      category: 'Trip Memories',
      date: '2024-03-05',
      cover: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1591122947157-26bad3a117d4?w=800&auto=format&fit=crop&q=75' },
      media: [
        { _key: 'm8',  kind: 'image', caption: 'Nilgiri Hills',       imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1591122947157-26bad3a117d4?w=800&auto=format&fit=crop&q=75' } },
        { _key: 'm9',  kind: 'image', caption: 'Botanical Gardens',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=75' } },
        { _key: 'm10', kind: 'image', caption: 'Mountain Road Drive',  imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=75' } },
      ],
    },
    {
      _id: 'c4',
      title: 'Coimbatore to Mysore — Apr 2024',
      category: 'On The Road',
      date: '2024-04-20',
      cover: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=75' },
      media: [
        { _key: 'm11', kind: 'image', caption: 'Tempo Traveller Group', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=75' } },
        { _key: 'm12', kind: 'image', caption: 'Mysore Palace',         imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=75' } },
        { _key: 'm13', kind: 'image', caption: 'Highway Night Drive',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&auto=format&fit=crop&q=75' } },
      ],
    },
  ] as HomepageData['collections'],
  gallery: [
    { _id: 'g0',  kind: 'image', title: 'Alleppey Backwaters — Family Trip',      category: 'Trip Memories', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g1',  kind: 'image', title: 'Munnar Tea Estate — Group Tour',          category: 'Trip Memories', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g2',  kind: 'image', title: 'Meenakshi Temple — Pilgrimage Tour',      category: 'Pilgrimages',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g3',  kind: 'image', title: 'Ooty Nilgiris — Hill Station Escape',     category: 'Trip Memories', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1591122947157-26bad3a117d4?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g4',  kind: 'image', title: 'Kodaikanal Mist — Honeymoon Trip',        category: 'Trip Memories', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g5',  kind: 'image', title: 'Kanyakumari Sunrise — Sacred Journey',    category: 'Pilgrimages',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g6',  kind: 'image', title: 'Rameswaram Dham — Pilgrimage Circuit',    category: 'Pilgrimages',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g7',  kind: 'image', title: 'Mysore Palace — Heritage Tour',           category: 'Trip Memories', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g8',  kind: 'image', title: 'Mountain Road — Sunrise Drive',           category: 'On The Road',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g9',  kind: 'image', title: 'Wayanad Forest — Nature Retreat',         category: 'Trip Memories', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g10', kind: 'image', title: 'Highway Night Drive — Long Route',        category: 'On The Road',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g11', kind: 'image', title: 'Alleppey Houseboat — Backwater Stay',     category: 'Trip Memories', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g12', kind: 'image', title: 'Tempo Traveller — Group Departure',       category: 'On The Road',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g13', kind: 'image', title: 'Mini Bus — Wedding Party Transfer',       category: 'On The Road',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g14', kind: 'image', title: 'Yercaud Hills — Weekend Getaway',         category: 'Trip Memories', imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g15', kind: 'image', title: 'Coimbatore to Ooty — Hill Road',          category: 'On The Road',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g16', kind: 'image', title: 'Innova Crysta — Corporate Transfer',      category: 'On The Road',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=75' } },
    { _id: 'g17', kind: 'image', title: 'Palani Temple — Pilgrimage Group',        category: 'Pilgrimages',   imageAsset: { _type: 'image', placeholderUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=75' } },
  ] as HomepageData['gallery'],
  testimonials: [
    {
      _id: 't1',
      name: 'Senthil Kumar',
      place: 'Tiruppur',
      rating: 5,
      quote:
        'Amazing very good service. The vehicle was spotless, the driver was courteous and punctual throughout our Kerala trip.',
      googleReview: true,
    },
    {
      _id: 't2',
      name: 'Priya Ramesh',
      place: 'Coimbatore',
      rating: 5,
      quote:
        'Best place to book cabs for families. The Tempo Traveller was extremely comfortable. Highly recommended.',
      googleReview: true,
    },
    {
      _id: 't3',
      name: 'Mohanlal K.',
      place: 'Erode',
      rating: 5,
      quote:
        'We booked a Mini Bus for a wedding party. Professional service, on-time pickup, and everything went smoothly.',
    },
    {
      _id: 't4',
      name: 'Deepa Venkat',
      place: 'Chennai',
      rating: 4,
      quote:
        'Rameswaram pilgrimage with family was beautifully organized. The drivers knew the routes and took great care.',
      googleReview: true,
    },
    {
      _id: 't5',
      name: 'Karthick S.',
      place: 'Salem',
      rating: 5,
      quote:
        'Luxury travel at honest pricing. Ooty trip in the Crysta was the most comfortable ride we have had.',
    },
  ],
  features: [
    { _id: 'f1', order: 1, iconName: 'Clock', title: '24/7 Availability', description: 'Day or night, holidays or festivals — we are always a call away.' },
    { _id: 'f2', order: 2, iconName: 'UserCheck', title: 'Experienced Drivers', description: 'Licensed, courteous and route-smart drivers with 10+ years on South Indian roads.' },
    { _id: 'f3', order: 3, iconName: 'Gem', title: 'Affordable Luxury', description: 'Premium comfort at transparent and honest pricing — no hidden charges.' },
    { _id: 'f4', order: 4, iconName: 'Sparkles', title: 'Clean Vehicles', description: 'Pristine, sanitized and well-maintained vehicles for every journey.' },
    { _id: 'f5', order: 5, iconName: 'Heart', title: 'Customer Satisfaction', description: '4.7★ rated on Google and trusted by 5000+ happy travellers.' },
    { _id: 'f6', order: 6, iconName: 'ShieldCheck', title: 'Safe Journey', description: 'GPS tracked, insured and strictly safety-first on every trip.' },
    { _id: 'f7', order: 7, iconName: 'Briefcase', title: 'Professional Service', description: 'From first call to final drop-off, a polished and premium experience.' },
  ],
  contact: {
    businessName: 'TAMIZHAN TRAVELS',
    phone: '09944498909',
    whatsapp: '919944498909',
    addressLines: [
      '1/1B Sakthi Nagar',
      'Koundanayakkanpalayam',
      'MS Nagar East',
      'Bharathi Nagar Road',
      'Mannarai',
    ],
    city: 'Tiruppur',
    state: 'Tamil Nadu',
    pincode: '641607',
    openHours: '24 Hours',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Tiruppur+Mannarai+Bharathi+Nagar+Road&output=embed',
  },
};

export const SEED_GOOGLE_REVIEWS = { rating: 4.7, count: 29 };
