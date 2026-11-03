import { PrismaClient, Role, PubStatus, RoomStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Royal Blue Heaven database...')

  // ── Super Admin ──────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('Admin@RBH2024!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@royalblueheaven.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@royalblueheaven.com',
      passwordHash,
      role: Role.SUPER_ADMIN,
      phone: '+919999999999',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // ── Site Settings / Branding ─────────────────────────────────────────────
  await prisma.siteSetting.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      data: {
        hotelName: 'Royal Blue Heaven',
        tagline: 'Where Royalty Meets Serenity',
        address: 'DD Nagar, Gwalior, Madhya Pradesh 474011, India',
        phone: '+91 98765 43210',
        email: 'info@royalblueheaven.com',
        whatsapp: '+919876543210',
        gstNumber: '23XXXXX1234X1ZX',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.9!2d78.1828!3d26.2183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDD+Nagar%2C+Gwalior!5e0!3m2!1sen!2sin!4v1234567890',
        socials: {
          facebook: 'https://facebook.com/royalblueheaven',
          instagram: 'https://instagram.com/royalblueheaven',
          twitter: 'https://twitter.com/royalblueheaven',
          youtube: '',
        },
        theme: {
          primary: '#1A3FA3',
          primaryDark: '#0B1B3A',
          accent: '#C9A24B',
          champagne: '#F4E9CD',
          ivory: '#FBF8F1',
          charcoal: '#1C1C1E',
          maroon: '#6B0F1A',
        },
        fonts: {
          heading: 'Cormorant Garamond',
          body: 'Inter',
          accent: 'Great Vibes',
        },
        buttonStyle: 'rounded', // square | rounded
        headerStyle: 'transparent', // transparent | solid
        logoLight: '/images/logo-light.png',
        logoDark: '/images/logo-dark.png',
        favicon: '/favicon.ico',
        preloaderLogo: '/images/logo-preloader.png',
        announcement: {
          enabled: true,
          text: '🎉 Special offer: Book 3 nights, get 20% off! Use code ROYAL20',
          link: '/offers',
        },
        seo: {
          title: 'Royal Blue Heaven | Luxury Hotel in Gwalior',
          description: 'Experience royalty at Royal Blue Heaven, a premier luxury hotel in DD Nagar, Gwalior. Exquisite rooms, fine dining, spa, and events.',
          ogImage: '/images/og-default.jpg',
        },
        taxes: {
          gstSlabs: [
            { minTariff: 0, maxTariff: 1000, gst: 0 },
            { minTariff: 1001, maxTariff: 7500, gst: 12 },
            { minTariff: 7501, maxTariff: 99999, gst: 18 },
          ],
        },
        policies: {
          checkInTime: '14:00',
          checkOutTime: '12:00',
          cancellation: [
            { hoursBeforeCheckIn: 48, chargePercent: 0 },
            { hoursBeforeCheckIn: 24, chargePercent: 50 },
            { hoursBeforeCheckIn: 0, chargePercent: 100 },
          ],
          advancePaymentPercent: 30,
          paymentModes: { full: true, advance: true, enquiry: true },
        },
        checkIn: '14:00',
        checkOut: '12:00',
        copyright: '© 2024 Royal Blue Heaven. All rights reserved.',
        footer: {
          description: 'A sanctuary of royal luxury in the heart of Gwalior.',
          links: [],
        },
        maintenanceMode: false,
      },
    },
  })
  console.log('✅ Site settings created')

  // ── Room Types ────────────────────────────────────────────────────────────
  const roomTypes = [
    {
      name: 'Deluxe Room',
      slug: 'deluxe-room',
      description: 'An elegant sanctuary featuring a royal blue headboard with gold piping, plush ivory linens, and a city view. Perfect for discerning travelers who seek comfort and style.',
      shortDesc: 'Elegant comfort with a city view.',
      size: 350,
      maxAdults: 2,
      maxChildren: 1,
      bedType: 'King',
      view: 'City View',
      baseRate: 5500,
      amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'Air Conditioning', 'In-room Safe', 'Tea/Coffee Maker', 'Iron & Board', 'Luxury Toiletries', 'Daily Housekeeping'],
      images: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
        'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
      ],
      policies: { extraBed: true, extraBedCharge: 1000, smoking: false, pets: false },
      order: 1,
    },
    {
      name: 'Premier Suite',
      slug: 'premier-suite',
      description: 'Spacious and sophisticated, the Premier Suite features a separate living area, carved wooden furniture, navy drapes with gold tassels, and a private balcony overlooking the gardens.',
      shortDesc: 'Spacious suite with private balcony.',
      size: 600,
      maxAdults: 3,
      maxChildren: 2,
      bedType: 'King',
      view: 'Garden View',
      baseRate: 9500,
      amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'Air Conditioning', 'Private Balcony', 'Living Area', 'Bathtub', 'Walk-in Shower', 'Nespresso Machine', 'Butler Service', 'Evening Turndown'],
      images: [
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200',
        'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=1200',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
      ],
      policies: { extraBed: true, extraBedCharge: 1500, smoking: false, pets: false },
      order: 2,
    },
    {
      name: 'Royal Suite',
      slug: 'royal-suite',
      description: 'A palatial retreat adorned with sapphire velvet chairs, gold-framed mirrors, and a blue-gold Mughal carpet. The Royal Suite features a four-poster bed, chandelier, Mughal-inspired wall art, and a marble bathroom.',
      shortDesc: 'Palatial luxury with Mughal grandeur.',
      size: 900,
      maxAdults: 4,
      maxChildren: 2,
      bedType: 'King Four-Poster',
      view: 'Palace View',
      baseRate: 18000,
      amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Full Bar', '24/7 Butler', 'Air Conditioning', 'Private Balcony', 'Separate Living & Dining', 'Marble Bathroom', 'Freestanding Bathtub', 'Rain Shower', 'Nespresso & Tea Station', 'Evening Turndown', 'Welcome Amenities', 'Chandelier'],
      images: [
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
        'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=1200',
      ],
      policies: { extraBed: false, smoking: false, pets: false },
      order: 3,
    },
    {
      name: 'Presidential Suite',
      slug: 'presidential-suite',
      description: 'The pinnacle of opulence. A massive multi-room suite with blue marble walls and gold inlay, a grand living room, dining table for six, a grand piano, and floor-to-ceiling panoramic views.',
      shortDesc: 'The ultimate luxury experience.',
      size: 1800,
      maxAdults: 4,
      maxChildren: 2,
      bedType: 'King California Super King',
      view: 'Panoramic City View',
      baseRate: 35000,
      amenities: ['Free Wi-Fi', 'Multiple Flat-screen TVs', 'Full Bar & Pantry', '24/7 Dedicated Butler', 'Air Conditioning', 'Grand Piano', 'Dining Room (seats 6)', 'Study', 'Two Marble Bathrooms', 'Private Steam Room', 'Jacuzzi', 'Smart Home Controls', 'Private Dressing Room', 'Welcome Champagne & Flowers'],
      images: [
        'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
        'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200',
      ],
      policies: { extraBed: false, smoking: false, pets: true, petCharge: 500 },
      order: 4,
    },
    {
      name: 'Heritage Villa Room',
      slug: 'heritage-villa-room',
      description: 'A private villa-style room with a personal courtyard, blue jaali screens with gold lamps, antique furniture, and a plunge pool. An immersive heritage experience like no other.',
      shortDesc: 'Private courtyard villa with plunge pool.',
      size: 1200,
      maxAdults: 3,
      maxChildren: 1,
      bedType: 'King',
      view: 'Courtyard & Garden',
      baseRate: 25000,
      amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Mini Bar', '24/7 Butler', 'Private Plunge Pool', 'Courtyard', 'Outdoor Shower', 'Vintage Furniture', 'Blue Jaali Screens', 'Hammock', 'Evening Bonfire (on request)', 'Private Dining Available'],
      images: [
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      ],
      policies: { extraBed: true, extraBedCharge: 2000, smoking: false, pets: true, petCharge: 500 },
      order: 5,
    },
  ]

  const createdRoomTypes: any[] = []
  for (const rt of roomTypes) {
    const roomType = await prisma.roomType.upsert({
      where: { slug: rt.slug },
      update: {},
      create: rt,
    })
    createdRoomTypes.push(roomType)
  }
  console.log('✅ Room types created:', createdRoomTypes.map((r) => r.name).join(', '))

  // ── Individual Rooms (20 total) ───────────────────────────────────────────
  const roomData = [
    // Deluxe (8 rooms): 101-108
    ...Array.from({ length: 8 }, (_, i) => ({
      number: `${101 + i}`,
      roomTypeId: createdRoomTypes[0].id,
      floor: 1,
    })),
    // Premier Suite (5 rooms): 201-205
    ...Array.from({ length: 5 }, (_, i) => ({
      number: `${201 + i}`,
      roomTypeId: createdRoomTypes[1].id,
      floor: 2,
    })),
    // Royal Suite (3 rooms): 301-303
    ...Array.from({ length: 3 }, (_, i) => ({
      number: `${301 + i}`,
      roomTypeId: createdRoomTypes[2].id,
      floor: 3,
    })),
    // Presidential Suite (2 rooms): 401, 402
    ...Array.from({ length: 2 }, (_, i) => ({
      number: `${401 + i}`,
      roomTypeId: createdRoomTypes[3].id,
      floor: 4,
    })),
    // Heritage Villa (2 rooms): V1, V2
    ...Array.from({ length: 2 }, (_, i) => ({
      number: `V${i + 1}`,
      roomTypeId: createdRoomTypes[4].id,
      floor: 0,
    })),
  ]

  for (const room of roomData) {
    await prisma.room.upsert({
      where: { number: room.number },
      update: {},
      create: room as any,
    })
  }
  console.log('✅ 20 rooms created')

  // ── Rate Rules ────────────────────────────────────────────────────────────
  const peakSeasonStart = new Date('2024-12-20')
  const peakSeasonEnd = new Date('2025-01-10')
  const summerEnd = new Date('2025-06-30')
  const summerStart = new Date('2025-04-01')

  for (const rt of createdRoomTypes) {
    await prisma.rateRule.createMany({
      data: [
        {
          roomTypeId: rt.id,
          name: 'Weekend Premium',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2025-12-31'),
          daysOfWeek: [5, 6], // Fri, Sat
          adjustType: 'percent',
          adjustValue: 20,
          priority: 1,
        },
        {
          roomTypeId: rt.id,
          name: 'Peak Season (Dec-Jan)',
          startDate: peakSeasonStart,
          endDate: peakSeasonEnd,
          daysOfWeek: [],
          adjustType: 'percent',
          adjustValue: 35,
          priority: 2,
        },
        {
          roomTypeId: rt.id,
          name: 'Summer Discount',
          startDate: summerStart,
          endDate: summerEnd,
          daysOfWeek: [],
          adjustType: 'percent',
          adjustValue: -15,
          priority: 1,
        },
      ],
    })
  }
  console.log('✅ Rate rules created')

  // ── Add-ons ───────────────────────────────────────────────────────────────
  await prisma.addon.createMany({
    data: [
      { name: 'Breakfast (Per Person)', price: 750, unit: 'per_person', icon: '🍳', order: 1 },
      { name: 'Airport Pickup', price: 1500, unit: 'per_booking', icon: '🚗', order: 2 },
      { name: 'Spa Session (60 min)', price: 3500, unit: 'per_person', icon: '💆', order: 3 },
      { name: 'Room Decoration (Anniversary/Birthday)', price: 2500, unit: 'per_booking', icon: '🌸', order: 4 },
      { name: 'Extra Bed', price: 1200, unit: 'per_night', icon: '🛏️', order: 5 },
      { name: 'Late Check-out (up to 4 PM)', price: 1500, unit: 'per_booking', icon: '⏰', order: 6 },
      { name: 'Candlelight Dinner', price: 4500, unit: 'per_booking', icon: '🕯️', order: 7 },
      { name: 'Welcome Cake', price: 800, unit: 'per_booking', icon: '🎂', order: 8 },
    ],
  })
  console.log('✅ Add-ons created')

  // ── Coupons ───────────────────────────────────────────────────────────────
  await prisma.coupon.createMany({
    data: [
      {
        code: 'ROYAL20',
        type: 'percent',
        value: 20,
        minNights: 3,
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2025-12-31'),
        usageLimit: 100,
        isActive: true,
      },
      {
        code: 'WELCOME10',
        type: 'percent',
        value: 10,
        minNights: 1,
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2025-06-30'),
        usageLimit: 500,
        isActive: true,
      },
      {
        code: 'FLAT2000',
        type: 'flat',
        value: 2000,
        minNights: 2,
        minAmount: 10000,
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2025-03-31'),
        usageLimit: 50,
        isActive: true,
      },
    ],
  })
  console.log('✅ Coupons created')

  // ── Reviews ───────────────────────────────────────────────────────────────
  const reviews = [
    { name: 'Rahul Sharma', rating: 5, title: 'A Royal Experience!', comment: 'Royal Blue Heaven exceeded every expectation. The Presidential Suite was magnificent — the blue marble with gold inlay, the panoramic view, the impeccable service. We will return for our anniversary every year!', source: 'WEBSITE', status: 'APPROVED', featured: true },
    { name: 'Priya & Vikram Mehta', rating: 5, title: 'Perfect Wedding Anniversary', comment: 'Our stay in the Royal Suite was pure magic. The room decoration team set up rose petals and candles — it was breathtaking. The dining was world-class and the staff treated us like royalty. Highly recommended!', source: 'WEBSITE', status: 'APPROVED', featured: true },
    { name: 'Aditya Kapoor', rating: 5, title: 'Best Business Hotel in Gwalior', comment: 'Travelled for work and upgraded to the Premier Suite — worth every rupee. Fast Wi-Fi, excellent breakfast, professional staff. The conference facilities are top-notch too. My go-to whenever I visit Gwalior.', source: 'GOOGLE', status: 'APPROVED', featured: true },
    { name: 'Sneha & Raj Gupta', rating: 5, title: 'Honeymoon made in Heaven', comment: 'Every detail was perfect. The Heritage Villa with its private plunge pool and courtyard was romantic beyond words. The evening bonfire under the stars was unforgettable. Thank you RBH team!', source: 'WEBSITE', status: 'APPROVED', featured: true },
    { name: 'Meera Iyer', rating: 4, title: 'Stunning property, great location', comment: 'Beautiful interiors and wonderfully trained staff. The Mughal-inspired decor is unlike anything in Gwalior. Docking one star only because the spa was fully booked during my stay. Will plan better next time!', source: 'TRIPADVISOR', status: 'APPROVED', featured: false },
    { name: 'Suresh Agarwal', rating: 5, title: 'Impeccable Service', comment: 'From check-in to checkout, the service was flawless. The butler in the Royal Suite anticipated every need. The rooftop dining under the stars was the highlight. Gwalior\'s finest, without question.', source: 'WEBSITE', status: 'APPROVED', featured: true },
    { name: 'Naina & Arjun Verma', rating: 5, title: 'Magical Family Getaway', comment: 'Came with family for Diwali celebrations. The hotel was beautifully decorated, the food spread was exceptional, and the kids loved the pool. The Experiences team organized a Gwalior Fort tour — absolutely loved it!', source: 'GOOGLE', status: 'APPROVED', featured: false },
    { name: 'Dr. Rajan Pillai', rating: 4, title: 'Luxury at its finest', comment: 'Stayed for a medical conference nearby. Opted for the Deluxe Room which was spacious and beautifully appointed. Excellent sleep quality, great soundproofing. Breakfast buffet was outstanding.', source: 'WEBSITE', status: 'APPROVED', featured: false },
    { name: 'Anjali Desai', rating: 5, title: 'The spa is heaven!', comment: 'The Ayurvedic spa treatments here are truly therapeutic. The therapists are highly skilled and the atmosphere is serene. Paired with the gorgeous room, I left feeling completely rejuvenated. Already planning my return!', source: 'WEBSITE', status: 'APPROVED', featured: true },
    { name: 'Kabir & Zoya Khan', rating: 5, title: 'Our Wedding Venue — Perfect!', comment: 'Hosted our wedding at Royal Blue Heaven and it was a dream come true. The banquet hall with crystal chandeliers and the lawn for the baraat were spectacular. The event team was professional and attentive to every detail.', source: 'WEBSITE', status: 'APPROVED', featured: true },
    { name: 'Rishabh Jain', rating: 4, title: 'Great value for luxury', comment: 'Compared to similar luxury properties, RBH offers exceptional value. The rooms are grand, the food is excellent, and the location is convenient for exploring Gwalior\'s heritage sites. The Gwalior Fort view from the rooftop is stunning!', source: 'TRIPADVISOR', status: 'APPROVED', featured: false },
    { name: 'Sunita Bhatt', rating: 5, title: 'Exceeded all expectations', comment: 'Booked the Deluxe Room for my parents\' anniversary trip and the hotel went above and beyond. They set up a special surprise with flowers and sweets. My parents were moved to tears. This is what true hospitality looks like. 10/10!', source: 'WEBSITE', status: 'APPROVED', featured: false },
  ]

  for (const review of reviews) {
    await prisma.review.create({ data: review })
  }
  console.log('✅ 12 reviews created')

  // ── FAQs ──────────────────────────────────────────────────────────────────
  await prisma.faq.createMany({
    data: [
      // Booking & Reservations
      { question: 'How do I make a reservation?', answer: 'You can book directly on our website through the Booking section, call us at +91 98765 43210, WhatsApp us, or email info@royalblueheaven.com. Direct bookings receive the best rates.', category: 'Booking & Reservations', order: 1 },
      { question: 'Is it safe to pay online?', answer: 'Absolutely. We use Razorpay, a RBI-regulated payment gateway with 256-bit SSL encryption. Your card details are never stored on our servers.', category: 'Booking & Reservations', order: 2 },
      { question: 'Can I modify or cancel my booking?', answer: 'Yes. Log in to your Guest Portal or use Booking Lookup with your booking code and registered mobile number. Cancellations are free up to 48 hours before check-in; charges apply thereafter as per our Cancellation Policy.', category: 'Booking & Reservations', order: 3 },
      { question: 'Do you offer group bookings?', answer: 'Yes, for groups of 5+ rooms, please contact our reservations team at groups@royalblueheaven.com or call us for customized rates and packages.', category: 'Booking & Reservations', order: 4 },
      // Check-in & Check-out
      { question: 'What are check-in and check-out times?', answer: 'Standard check-in is 2:00 PM and check-out is 12:00 PM noon. Early check-in and late check-out are available based on availability for an additional charge.', category: 'Check-in & Check-out', order: 1 },
      { question: 'What ID documents do I need at check-in?', answer: 'All guests must present a valid government-issued photo ID (Aadhaar, Passport, Driving License, Voter ID) at check-in. Foreign nationals must present their Passport and Visa.', category: 'Check-in & Check-out', order: 2 },
      // Facilities
      { question: 'Is the swimming pool open throughout the year?', answer: 'Yes, our pool is heated and available year-round. Pool hours are 6:00 AM – 10:00 PM daily. Children must be accompanied by adults.', category: 'Facilities', order: 1 },
      { question: 'Is parking available?', answer: 'We offer complimentary valet parking for all hotel guests. We can accommodate up to 50 vehicles.', category: 'Facilities', order: 2 },
      { question: 'Do you have a gym?', answer: 'Yes, our state-of-the-art fitness centre is open 24/7 for hotel guests and is equipped with modern cardio and strength equipment.', category: 'Facilities', order: 3 },
      // Dining
      { question: 'What are the dining options available?', answer: 'We have the Maharaja Fine Dining Restaurant (Indian & Continental), the Zaffran Rooftop Bar & Lounge (cocktails and light bites, evenings), and 24/7 In-Room Dining. Breakfast is served 7:00 AM – 10:30 AM in the main restaurant.', category: 'Dining', order: 1 },
      // Policies
      { question: 'Is the hotel pet-friendly?', answer: 'Pets are welcome in our Heritage Villa Rooms and Presidential Suite with prior notice. A pet charge of ₹500/night applies. Pets are not permitted in the restaurant, pool, and spa areas.', category: 'Policies', order: 1 },
      { question: 'Do you have a no-smoking policy?', answer: 'Royal Blue Heaven is a non-smoking property. Smoking is only permitted in designated outdoor areas. A deep-cleaning fee of ₹5,000 will be charged for smoking in rooms.', category: 'Policies', order: 2 },
    ],
  })
  console.log('✅ FAQs created')

  // ── Gallery Items ─────────────────────────────────────────────────────────
  await prisma.galleryItem.createMany({
    data: [
      { category: 'exterior', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200', type: 'image', caption: 'Grand Hotel Facade at Golden Hour', order: 1 },
      { category: 'exterior', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200', type: 'image', caption: 'Hotel at Blue Hour', order: 2 },
      { category: 'lobby', url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200', type: 'image', caption: 'Opulent Lobby', order: 1 },
      { category: 'rooms', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200', type: 'image', caption: 'Deluxe Room', order: 1 },
      { category: 'rooms', url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200', type: 'image', caption: 'Royal Suite', order: 2 },
      { category: 'rooms', url: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200', type: 'image', caption: 'Presidential Suite', order: 3 },
      { category: 'dining', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200', type: 'image', caption: 'Maharaja Fine Dining', order: 1 },
      { category: 'dining', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200', type: 'image', caption: 'Zaffran Rooftop Lounge', order: 2 },
      { category: 'events', url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200', type: 'image', caption: 'Grand Wedding Banquet Hall', order: 1 },
      { category: 'events', url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200', type: 'image', caption: 'Outdoor Wedding Lawn', order: 2 },
      { category: 'spa', url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200', type: 'image', caption: 'Serenity Spa', order: 1 },
      { category: 'pool', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200', type: 'image', caption: 'Infinity Pool at Sunrise', order: 1 },
    ],
  })
  console.log('✅ Gallery items created')

  // ── Team Members ──────────────────────────────────────────────────────────
  await prisma.teamMember.createMany({
    data: [
      { name: 'Rajendra Singh Chauhan', role: 'General Manager', bio: 'With over 20 years of luxury hospitality experience across India and Europe, Rajendra leads the Royal Blue Heaven team with passion and precision.', order: 1 },
      { name: 'Chef Vikram Anand', role: 'Executive Chef', bio: 'A James Beard Award nominee and alumni of Taj Hotels, Chef Vikram brings the finest of Indian culinary traditions to every plate with a contemporary twist.', order: 2 },
      { name: 'Nidhi Sharma', role: 'Director of Guest Relations', bio: 'Nidhi\'s warm hospitality philosophy has earned Royal Blue Heaven a 4.9-star guest satisfaction rating. She ensures every guest feels like royalty.', order: 3 },
      { name: 'Karan Oberoi', role: 'Spa Director', bio: 'A certified Ayurvedic wellness practitioner with training from Kerala\'s renowned Kairali Institute, Karan curates transformative wellness experiences.', order: 4 },
    ],
  })
  console.log('✅ Team members created')

  // ── Menu Items ────────────────────────────────────────────────────────────
  await prisma.menuItem.createMany({
    data: [
      // Starters
      { category: 'starters', name: 'Galouti Kebab', description: 'Lucknawi minced lamb patties, rose petal chutney, laccha paratha', price: 650, isVeg: false, isSignature: true, order: 1 },
      { category: 'starters', name: 'Paneer Tikka Royal', description: 'Cottage cheese marinated in saffron and royal spices, tandoor-grilled', price: 550, isVeg: true, isSignature: true, order: 2 },
      { category: 'starters', name: 'Dum Ke Shammi', description: 'Slow-cooked lamb patties, mint aioli', price: 600, isVeg: false, order: 3 },
      // Mains
      { category: 'mains', name: 'Royal Dum Biryani', description: 'Saffron-infused aged Basmati, slow-cooked with slow-braised mutton, served with raita and shorba', price: 850, isVeg: false, isSignature: true, order: 1 },
      { category: 'mains', name: 'Dal Maharani', description: 'Black lentils slow-cooked for 12 hours, finished with fresh cream and butter', price: 450, isVeg: true, isSignature: true, order: 2 },
      { category: 'mains', name: 'Raan-e-Awadh', description: 'Whole roasted leg of lamb, marinated overnight in yoghurt and aromatic spices', price: 2200, isVeg: false, order: 3 },
      { category: 'mains', name: 'Safed Maas', description: 'Royal Rajasthani white mutton curry, cashew sauce, fragrant rice', price: 1100, isVeg: false, order: 4 },
      // Desserts
      { category: 'desserts', name: 'Shahi Tukda', description: 'Saffron-soaked bread, rabri, rose syrup, edible silver leaf', price: 350, isVeg: true, isSignature: true, order: 1 },
      { category: 'desserts', name: 'Gulab Ki Kheer', description: 'Rose-infused rice pudding, pistachio crumble', price: 300, isVeg: true, order: 2 },
      // Beverages
      { category: 'beverages', name: 'Royal Blue Mocktail', description: 'Blue pea flower, lemon, ginger, sparkling water — our signature drink', price: 350, isVeg: true, isSignature: true, order: 1 },
      { category: 'beverages', name: 'Kesar Thandai', description: 'Traditional chilled saffron milk with dry fruits', price: 250, isVeg: true, order: 2 },
    ],
  })
  console.log('✅ Menu items created')

  // ── Experiences ───────────────────────────────────────────────────────────
  await prisma.experience.createMany({
    data: [
      { title: 'Gwalior Fort', description: 'One of the most impregnable fortresses in India, housing spectacular Gujari Mahal, Man Singh Palace, and stunning Jain rock sculptures carved into the cliff face.', distance: '3.5 km', duration: '2–3 hours', category: 'heritage', order: 1 },
      { title: 'Jai Vilas Palace & Museum', description: 'The magnificent residence of the Scindia royal family, featuring the world\'s largest chandelier in the Darbar Hall and the famous gold-plated dining car.', distance: '4 km', duration: '2 hours', category: 'heritage', order: 2 },
      { title: 'Sas-Bahu Temples', description: '11th-century twin temples dedicated to Lord Vishnu, known for their intricate carvings and architectural brilliance — a UNESCO World Heritage nominee.', distance: '4.5 km', duration: '1 hour', category: 'heritage', order: 3 },
      { title: 'Tansen Tomb', description: 'The memorial of the legendary Mughal court musician Tansen, one of the Nine Gems of Akbar\'s court. The annual Tansen Music Festival is held here.', distance: '5 km', duration: '45 minutes', category: 'heritage', order: 4 },
      { title: 'Gujari Mahal Museum', description: 'A 15th-century palace built by Raja Man Singh for his beloved queen Mrignayani, now an archaeological museum with rare artifacts from the region.', distance: '3.5 km', duration: '1 hour', category: 'heritage', order: 5 },
      { title: 'Sun Temple', description: 'A stunning temple inspired by Konark, featuring intricate stone carvings and set in peaceful gardens — a photographer\'s paradise.', distance: '8 km', duration: '1 hour', category: 'heritage', order: 6 },
    ],
  })
  console.log('✅ Experiences created')

  // ── Blog Posts ────────────────────────────────────────────────────────────
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Exploring Gwalior: A Heritage Lover\'s Complete Guide',
        slug: 'gwalior-heritage-guide',
        excerpt: 'From the majestic Gwalior Fort to the opulent Jai Vilas Palace, discover why this ancient city of Madhya Pradesh is one of India\'s most underrated heritage destinations.',
        content: '<p>Gwalior, the "City of Music and Heritage," is one of Central India\'s most fascinating destinations...</p>',
        cover: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200',
        tags: ['gwalior', 'heritage', 'travel', 'madhya-pradesh'],
        author: 'Royal Blue Heaven Team',
        status: PubStatus.PUBLISHED,
        publishedAt: new Date('2024-10-15'),
        seo: {
          title: 'Exploring Gwalior: Heritage Lover\'s Guide | Royal Blue Heaven Blog',
          description: 'Discover Gwalior\'s finest heritage sites — fort, palaces, temples — with our complete travel guide from Royal Blue Heaven.',
        },
      },
      {
        title: 'Top 10 Experiences to Have at Royal Blue Heaven',
        slug: 'top-10-experiences-royal-blue-heaven',
        excerpt: 'Beyond the exquisite rooms, Royal Blue Heaven offers a world of experiences — from Ayurvedic spa rituals to rooftop dining under the stars. Here are 10 you must try.',
        content: '<p>When you stay at Royal Blue Heaven, every moment is crafted to be extraordinary...</p>',
        cover: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
        tags: ['experiences', 'luxury', 'hotel', 'spa'],
        author: 'Nidhi Sharma',
        status: PubStatus.PUBLISHED,
        publishedAt: new Date('2024-11-01'),
        seo: {
          title: '10 Must-Have Experiences at Royal Blue Heaven | Luxury Hotel Gwalior',
          description: 'Discover our top 10 exclusive experiences — spa, rooftop dining, heritage tours, and more — at Royal Blue Heaven, Gwalior.',
        },
      },
      {
        title: 'The Art of Indian Royal Cuisine: A Chef\'s Perspective',
        slug: 'art-of-indian-royal-cuisine',
        excerpt: 'Executive Chef Vikram Anand shares the story behind our signature dishes — from the 12-hour Dal Maharani to the legendary Galouti Kebab — and the philosophy of royal Indian cooking.',
        content: '<p>Every dish at Maharaja Fine Dining tells a story of centuries-old culinary heritage...</p>',
        cover: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
        tags: ['dining', 'cuisine', 'chef', 'food'],
        author: 'Chef Vikram Anand',
        status: PubStatus.PUBLISHED,
        publishedAt: new Date('2024-10-28'),
        seo: {
          title: 'Art of Indian Royal Cuisine | Chef Vikram Anand | Royal Blue Heaven',
          description: 'Our Executive Chef shares the philosophy and stories behind Royal Blue Heaven\'s signature royal Indian dishes.',
        },
      },
    ],
  })
  console.log('✅ Blog posts created')

  // ── Spa Services ──────────────────────────────────────────────────────────
  await prisma.spaService.createMany({
    data: [
      { name: 'Royal Abhyanga', category: 'massage', description: 'A traditional Ayurvedic full-body massage with warm herbal oils, synchronized two-therapist technique', duration: 90, price: 5500, order: 1 },
      { name: 'Shirodhara', category: 'massage', description: 'A continuous stream of warm medicated oil poured on the forehead — the ultimate stress-relief treatment', duration: 60, price: 4500, order: 2 },
      { name: 'Gold Leaf Facial', category: 'facial', description: 'A luxurious 24-karat gold facial that brightens, firms, and rejuvenates. The signature of our spa.', duration: 75, price: 6500, order: 1 },
      { name: 'Kansa Vatki Massage', category: 'massage', description: 'Ancient Kansa bowl massage for deep detoxification and energy rebalancing', duration: 60, price: 3800, order: 3 },
      { name: 'Couples\' Retreat', category: 'couples', description: 'A two-hour couples\' journey: champagne welcome, synchronized massage, and rose petal bath', duration: 120, price: 12000, order: 1 },
      { name: 'Himalayan Salt Scrub', category: 'body', description: 'Full-body exfoliation with pink Himalayan salt and essential oils, followed by a moisturizing wrap', duration: 60, price: 4000, order: 1 },
    ],
  })
  console.log('✅ Spa services created')

  // ── Event Packages ────────────────────────────────────────────────────────
  await prisma.eventPackage.createMany({
    data: [
      { title: 'Royal Wedding Package', type: 'wedding', description: 'A complete wedding package for up to 300 guests including mandap decoration, floral arrangements, catering, accommodation, and honeymoon suite on the wedding night.', capacity: 300, price: 500000, features: ['Mandap & Decoration', 'Floral Arrangements', 'Catering (veg & non-veg)', 'Bridal Suite', 'Photography Setup Area', 'Valet Parking', 'Welcome Drinks', 'Customized Wedding Cake'], isActive: true, order: 1 },
      { title: 'Corporate Excellence Package', type: 'corporate', description: 'Ideal for conferences, seminars, and corporate retreats. State-of-the-art AV equipment, business center access, and premium catering.', capacity: 150, price: 75000, features: ['AV Equipment', 'High-Speed Wi-Fi', 'Business Center', 'Tea/Coffee Service', 'Lunch Buffet', 'Stationery', 'LCD Projector', 'Video Conferencing Setup'], isActive: true, order: 2 },
      { title: 'Royal Birthday Celebration', type: 'birthday', description: 'Make your birthday unforgettable with a themed celebration — cake, decorations, DJ, and a private dining experience.', capacity: 50, price: 35000, features: ['Themed Decoration', 'Custom Cake', 'Welcome Drinks', 'Private Dining Area', 'DJ Setup', 'Photo Booth', 'Balloon Arrangements', 'Return Gifts'], isActive: true, order: 3 },
    ],
  })
  console.log('✅ Event packages created')

  // ── Offers ────────────────────────────────────────────────────────────────
  await prisma.offer.createMany({
    data: [
      { title: 'Royal Honeymoon Escape', slug: 'royal-honeymoon-escape', description: 'Celebrate your love with our curated honeymoon package: Royal Suite, rose petal turndown, champagne, couples spa session, and candlelight dinner.', image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1200', couponCode: 'HONEY30', terms: 'Valid for minimum 2 nights. Advance booking required. Blackout dates may apply.', validTo: new Date('2025-12-31'), isActive: true, order: 1 },
      { title: 'Heritage Weekend Getaway', slug: 'heritage-weekend-getaway', description: 'Book 2 nights over a weekend and get complimentary breakfast for two, a guided Gwalior heritage tour, and 15% off on spa services.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200', couponCode: 'ROYAL20', terms: 'Valid Friday-Sunday. Minimum 2-night stay required.', validTo: new Date('2025-12-31'), isActive: true, order: 2 },
      { title: 'Early Bird Corporate Deal', slug: 'early-bird-corporate', description: 'Book 30 days in advance for your corporate stay and enjoy 25% off room rates, complimentary airport transfer, and late checkout at 3 PM.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200', couponCode: 'CORP25', terms: 'Minimum 30 days advance booking required. Valid for Deluxe and Premier rooms.', validTo: new Date('2025-06-30'), isActive: true, order: 3 },
    ],
  })
  console.log('✅ Offers created')

  // ── Careers ───────────────────────────────────────────────────────────────
  await prisma.career.createMany({
    data: [
      { title: 'Front Desk Executive', department: 'Guest Relations', description: 'We are looking for a warm, professional Front Desk Executive to be the first point of contact for our guests. Minimum 2 years luxury hotel experience required.', requirements: '2+ years in luxury hotel, fluent English & Hindi, excellent communication skills', type: 'full-time', isOpen: true },
      { title: 'Sous Chef — Indian Cuisine', department: 'F&B', description: 'Join our award-winning kitchen brigade. The Sous Chef will assist the Executive Chef in menu development and day-to-day kitchen operations. Specialization in Awadhi/Mughlai cuisine preferred.', requirements: 'Hotel Management degree, 5+ years kitchen experience, creative flair', type: 'full-time', isOpen: true },
      { title: 'Spa Therapist', department: 'Spa & Wellness', description: 'Certified Ayurvedic therapist to deliver world-class treatments in our Serenity Spa. Must have CIDESCO or equivalent certification.', requirements: 'CIDESCO or Ayurvedic massage certification, 2+ years spa experience', type: 'full-time', isOpen: true },
    ],
  })
  console.log('✅ Careers created')

  // ── Default Pages (CMS) ───────────────────────────────────────────────────
  const homePageSections = [
    {
      type: 'hero',
      order: 0,
      visible: true,
      content: {
        title: 'Where Royalty Meets Serenity',
        subtitle: 'Royal Blue Heaven, DD Nagar, Gwalior',
        videoUrl: '',
        posterUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920',
        buttons: [{ text: 'Book Your Stay', link: '/book', style: 'primary' }, { text: 'Explore Rooms', link: '/rooms', style: 'outline' }],
      },
    },
    {
      type: 'booking-bar',
      order: 1,
      visible: true,
      content: { floating: true },
    },
    {
      type: 'stats',
      order: 2,
      visible: true,
      content: {
        items: [
          { value: '20', label: 'Luxury Rooms & Suites' },
          { value: '15+', label: 'Years of Excellence' },
          { value: '5000+', label: 'Happy Guests' },
          { value: '4.9★', label: 'Average Rating' },
        ],
      },
    },
    {
      type: 'about',
      order: 3,
      visible: true,
      content: {
        eyebrow: 'Our Story',
        title: 'A Legacy of Royal Hospitality',
        description: 'Nestled in the cultural heart of Gwalior, Royal Blue Heaven is more than a hotel — it is an experience woven from centuries of royal Gwalior heritage. Every corridor tells a story, every suite is a sanctuary, and every meal is a celebration.',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
        button: { text: 'Our Story', link: '/about' },
      },
    },
    {
      type: 'rooms-showcase',
      order: 4,
      visible: true,
      content: {
        eyebrow: 'Rooms & Suites',
        title: 'Your Royal Sanctuary Awaits',
        subtitle: 'From elegant Deluxe Rooms to the opulent Heritage Villa — each space is a masterpiece of royal design.',
      },
    },
    {
      type: 'offers-strip',
      order: 5,
      visible: true,
      content: {
        eyebrow: 'Special Offers',
        title: 'Exclusive Packages',
        subtitle: 'Curated experiences designed to make every stay extraordinary.',
      },
    },
    {
      type: 'gallery-strip',
      order: 6,
      visible: true,
      content: {
        title: 'A Glimpse of Royalty',
        button: { text: 'View Full Gallery', link: '/gallery' },
      },
    },
    {
      type: 'features',
      order: 7,
      visible: true,
      content: {
        eyebrow: 'Why Choose Us',
        title: 'The Royal Blue Heaven Difference',
        items: [
          { icon: '🏰', title: 'Royal Heritage Design', description: 'Mughal-inspired architecture and interiors that transport you to an era of grandeur.' },
          { icon: '🍽️', title: 'Award-Winning Cuisine', description: 'Chef Vikram Anand\'s culinary creations celebrate the finest of Indian royal cooking.' },
          { icon: '💆', title: 'Serenity Spa', description: 'Ancient Ayurvedic therapies delivered by master practitioners in a serene sanctuary.' },
          { icon: '🎭', title: 'Personalized Service', description: 'A dedicated butler and guest relations team ensuring every wish is fulfilled.' },
          { icon: '📍', title: 'Prime Location', description: 'Minutes from Gwalior Fort, Jai Vilas Palace, and the city\'s finest attractions.' },
          { icon: '⭐', title: '5-Star Rated', description: 'Consistently rated 4.9/5 stars by thousands of delighted guests across platforms.' },
        ],
      },
    },
    {
      type: 'testimonials',
      order: 8,
      visible: true,
      content: {
        eyebrow: 'Guest Stories',
        title: 'What Our Guests Say',
      },
    },
    {
      type: 'cta',
      order: 9,
      visible: true,
      content: {
        title: 'Ready for a Royal Experience?',
        subtitle: 'Book directly for the best rates and exclusive benefits.',
        backgroundImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920',
        buttons: [{ text: 'Book Now', link: '/book', style: 'gold' }, { text: 'Contact Us', link: '/contact', style: 'outline' }],
      },
    },
  ]

  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Home',
      status: PubStatus.PUBLISHED,
      seo: {
        title: 'Royal Blue Heaven | Luxury Hotel in Gwalior, Madhya Pradesh',
        description: 'Royal Blue Heaven — the finest luxury hotel in Gwalior. Royal Blue & Gold design, 20 exquisite rooms, fine dining, Ayurvedic spa, and seamless event hosting.',
        ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      },
      sections: {
        create: homePageSections.map((s) => s),
      },
    },
  })
  console.log('✅ Home page with', homePageSections.length, 'sections created')

  // Create other default pages
  const staticPages = [
    { slug: 'about', title: 'About Us', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Our Story', subtitle: 'A Legacy Woven in Royal Blue & Gold', posterUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920' } }] },
    { slug: 'rooms', title: 'Rooms & Suites', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Rooms & Suites', subtitle: 'Your Royal Sanctuary', posterUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920' } }] },
    { slug: 'dining', title: 'Dining', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Royal Dining', subtitle: 'A Culinary Journey Fit for Royalty', posterUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920' } }] },
    { slug: 'events', title: 'Banquet & Events', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Events & Celebrations', subtitle: 'Create Memories That Last Lifetimes', posterUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920' } }] },
    { slug: 'spa', title: 'Spa & Wellness', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Serenity Spa', subtitle: 'Ancient Wisdom, Modern Luxury', posterUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920' } }] },
    { slug: 'gallery', title: 'Gallery', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Gallery', subtitle: 'A Visual Journey Through Royal Blue Heaven', posterUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920' } }] },
    { slug: 'contact', title: 'Contact Us', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Contact Us', subtitle: 'We\'d Love to Hear From You', posterUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920' } }, { type: 'contact-form', order: 1, visible: true, content: {} }, { type: 'map-block', order: 2, visible: true, content: {} }] },
    { slug: 'testimonials', title: 'Testimonials', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Guest Stories', subtitle: 'Thousands of Royal Experiences', posterUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920' } }] },
    { slug: 'offers', title: 'Offers & Packages', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Special Offers', subtitle: 'Extraordinary Stays, Exceptional Value', posterUrl: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1920' } }] },
    { slug: 'experiences', title: 'Experiences', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Experiences & Attractions', subtitle: 'Discover the Wonders of Gwalior', posterUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920' } }] },
    { slug: 'blog', title: 'Travel Guide & Blog', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Travel Guide', subtitle: 'Stories, Tips & Insider Guides', posterUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920' } }] },
    { slug: 'faq', title: 'FAQ', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Frequently Asked Questions', subtitle: 'Everything You Need to Know', posterUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920' } }, { type: 'faq-block', order: 1, visible: true, content: {} }] },
    { slug: 'facilities', title: 'Facilities & Amenities', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Facilities & Amenities', subtitle: 'Every Luxury, Within Reach', posterUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920' } }] },
    { slug: 'careers', title: 'Careers', sections: [{ type: 'hero', order: 0, visible: true, content: { title: 'Join Our Team', subtitle: 'Build a Career in Luxury Hospitality', posterUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920' } }] },
    { slug: 'privacy-policy', title: 'Privacy Policy', sections: [{ type: 'rich-text', order: 0, visible: true, content: { title: 'Privacy Policy', html: '<p>Privacy Policy content goes here...</p>' } }] },
    { slug: 'terms', title: 'Terms & Conditions', sections: [{ type: 'rich-text', order: 0, visible: true, content: { title: 'Terms & Conditions', html: '<p>Terms & Conditions content goes here...</p>' } }] },
    { slug: 'cancellation-policy', title: 'Cancellation & Refund Policy', sections: [{ type: 'rich-text', order: 0, visible: true, content: { title: 'Cancellation & Refund Policy', html: '<p>Cancellation policy content goes here...</p>' } }] },
  ]

  for (const page of staticPages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: {
        slug: page.slug,
        title: page.title,
        status: PubStatus.PUBLISHED,
        sections: { create: page.sections as any[] },
      },
    })
  }
  console.log('✅ All static pages created')

  // ── Notification Templates ────────────────────────────────────────────────
  await prisma.notificationTemplate.createMany({
    data: [
      {
        key: 'booking_confirmed',
        channel: 'email',
        subject: 'Booking Confirmed — Royal Blue Heaven | Booking {{code}}',
        body: `Dear {{guestName}},\n\nYour booking at Royal Blue Heaven has been confirmed!\n\n🏨 Booking Code: {{code}}\n📅 Check-in: {{checkIn}}\n📅 Check-out: {{checkOut}}\n🛏️ Room: {{roomType}}\n💰 Total: ₹{{total}}\n\nWe look forward to welcoming you!\n\nWarm regards,\nRoyal Blue Heaven Team`,
      },
      {
        key: 'booking_pending',
        channel: 'email',
        subject: 'Booking Received — Royal Blue Heaven | Booking {{code}}',
        body: `Dear {{guestName}},\n\nWe have received your booking request ({{code}}) and it is pending confirmation.\n\nOur team will confirm within 4 hours. For immediate assistance, WhatsApp us at +91 98765 43210.\n\nRoyal Blue Heaven Team`,
      },
      {
        key: 'enquiry_received',
        channel: 'email',
        subject: 'Thank You for Your Enquiry — Royal Blue Heaven',
        body: `Dear {{name}},\n\nThank you for reaching out to Royal Blue Heaven. We have received your enquiry and our team will get back to you within 4 hours.\n\nFor urgent queries, please call +91 98765 43210 or WhatsApp us.\n\nRoyal Blue Heaven Team`,
      },
      {
        key: 'otp',
        channel: 'email',
        subject: 'Your Login OTP — Royal Blue Heaven',
        body: `Your OTP for Royal Blue Heaven Guest Portal login is: {{otp}}\n\nThis OTP is valid for 10 minutes. Do not share it with anyone.\n\nRoyal Blue Heaven Security Team`,
      },
      {
        key: 'admin_new_booking',
        channel: 'email',
        subject: '🔔 New Booking — {{code}} | Royal Blue Heaven Admin',
        body: `New booking received!\n\nCode: {{code}}\nGuest: {{guestName}} ({{guestEmail}})\nCheck-in: {{checkIn}}\nTotal: ₹{{total}}\n\nView in admin panel: {{adminUrl}}`,
      },
    ],
  })
  console.log('✅ Notification templates created')

  console.log('\n🎉 Database seeded successfully!')
  console.log('📧 Admin login: admin@royalblueheaven.com')
  console.log('🔑 Admin password: Admin@RBH2024!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
