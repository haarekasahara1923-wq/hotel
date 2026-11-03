import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Users,
  Maximize2,
  Bed,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  Phone,
  ArrowRight,
} from 'lucide-react'
import { GoldDivider } from '@/components/ui/GoldDivider'

const ROOMS_DATA: Record<string, any> = {
  'deluxe-room': {
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    tagline: 'Refined Comfort & City Views',
    description:
      'The Deluxe Room is an intimate royal sanctuary dressed in serene royal blue and ivory tones. Features an expansive king bed with custom gold embroidery, an ensuite Italian marble bathroom with rain shower, and a panoramic picture window that frames the Gwalior cityscape.',
    size: 350,
    bedType: 'King Bed',
    maxAdults: 2,
    maxChildren: 1,
    view: 'Gwalior City View',
    floor: '1st Floor',
    price: 5500,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
      'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
    ],
    amenities: [
      'High-speed Wi-Fi (100 Mbps)',
      'Smart 55" 4K Television',
      'Rainfall Shower & Handheld Wand',
      'Plush Terry Robes & Slippers',
      'Luxury Botanical Toiletries',
      'Electronic In-Room Safe',
      'Mini Bar & Gourmet Snacks',
      'Tea & Artisan Coffee Maker',
      'Iron & Ironing Board',
      'Twice Daily Housekeeping',
    ],
  },
  'premier-suite': {
    name: 'Premier Suite',
    slug: 'premier-suite',
    tagline: 'Spacious Suite with Private Balcony',
    description:
      'An expansive suite designed for extended relaxation. The Premier Suite boasts a grand entrance foyer, a separate parlor living room with hand-carved mahogany furniture, an antique brass chandelier, and an open veranda overlooking the landscaped courtyard.',
    size: 600,
    bedType: 'King Bed',
    maxAdults: 3,
    maxChildren: 2,
    view: 'Courtyard & Garden View',
    floor: '2nd Floor',
    price: 9500,
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200',
      'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=1200',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
    ],
    amenities: [
      'Private Step-Out Balcony',
      'Separate Living Parlor',
      'Deep Soaking Bathtub',
      'Nespresso Espresso Station',
      'Dedicated On-Call Butler',
      'Evening Turndown with Chocolates',
      'Smart 65" 4K Television',
      'Bose Bluetooth Sound System',
      'Walk-in Wardrobe',
      'Shoe Shine Service',
    ],
  },
  'royal-suite': {
    name: 'Royal Suite',
    slug: 'royal-suite',
    tagline: 'Palatial Grandeur with Mughal Art',
    description:
      'A true masterwork of royal Rajput and Mughal hospitality. The Royal Suite centers around a regal four-poster bed draped in pure sapphire blue velvet. Gilded mirrors, authentic hand-woven Mughal rugs, and a freestanding clawfoot tub create an unforgettable ambiance of opulence.',
    size: 900,
    bedType: 'King Four-Poster',
    maxAdults: 4,
    maxChildren: 2,
    view: 'Palace View',
    floor: '3rd Floor',
    price: 18000,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
      'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=1200',
    ],
    amenities: [
      'Four-Poster Royal Bed',
      'Freestanding Clawfoot Tub',
      'Separate Dining Area (Seats 4)',
      '24/7 Dedicated Royal Butler',
      'Welcome Champagne & Fruit Platter',
      'Full Cocktail Bar Setup',
      'Custom Fragrance Menu',
      'Complimentary Airport Pick-up',
      'Priority Restaurant Reservations',
      'Unrestricted Spa Access',
    ],
  },
  'presidential-suite': {
    name: 'Presidential Suite',
    slug: 'presidential-suite',
    tagline: 'The Ultimate Epitome of Opulence',
    description:
      'The crowning jewel of Royal Blue Heaven. Spanning 1800 sq ft, this palatial residence features walls of rare blue marble inlaid with pure brass filigree, a grand salon with a baby grand piano, a formal dining hall for six, a private Jacuzzi, and an exclusive steam room.',
    size: 1800,
    bedType: 'California Super King',
    maxAdults: 4,
    maxChildren: 2,
    view: '360° Panoramic City & Fort View',
    floor: '4th Floor (Top Floor)',
    price: 35000,
    images: [
      'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200',
    ],
    amenities: [
      'Baby Grand Piano in Salon',
      'Private Heated Jacuzzi & Steam',
      'Private Dining Hall (Seats 6)',
      'Dedicated 24/7 Butler Team',
      'Two Full Marble Ensuites',
      'Round-Trip Luxury Airport Car',
      'Custom In-Suite Chef Dining',
      'Full Butler Pantry',
      'Smart Automated Lighting & Drapes',
      'Curated Royal Wine Cellar',
    ],
  },
  'heritage-villa-room': {
    name: 'Heritage Villa Room',
    slug: 'heritage-villa-room',
    tagline: 'Private Courtyard & Plunge Pool',
    description:
      'An intimate standalone heritage villa nestled in our serene private grounds. Highlights include a stone-walled private open courtyard, intricately hand-carved blue jaali lattice screens, an outdoor rain shower, and a temperature-controlled personal plunge pool under the stars.',
    size: 1200,
    bedType: 'King Bed',
    maxAdults: 3,
    maxChildren: 1,
    view: 'Private Enclosed Courtyard',
    floor: 'Ground Level',
    price: 25000,
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
    ],
    amenities: [
      'Private Temperature Plunge Pool',
      'Enclosed Open-Air Courtyard',
      'Outdoor Rainforest Shower',
      'Carved Blue Jaali Screens',
      'Starlit Bonfire on Request',
      'Courtyard Candlelight Dining',
      'Vintage Indian Antiques',
      '24/7 Butler Service',
      'Yoga & Meditation Mat Kit',
      'Complimentary Tea Tasting Ritual',
    ],
  },
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const room = ROOMS_DATA[slug]

  if (!room) {
    notFound()
  }

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* ── Breadcrumb & Title Hero ───────────────────────────────────────── */}
      <section className="bg-[#0B1B3A] text-white pt-28 pb-16 border-b border-[#C9A24B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#C9A24B] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/rooms" className="hover:underline">Rooms & Suites</Link>
            <span>/</span>
            <span className="text-gray-300">{room.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-1">
                {room.tagline}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FBF8F1]">
                {room.name}
              </h1>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-[#C9A24B]/30 px-6 py-3 rounded-sm">
              <div>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider block">
                  Tariff starting at
                </span>
                <span className="font-serif text-3xl font-light text-[#C9A24B]">
                  ₹{room.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-gray-400"> / night + taxes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery Strip ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative h-[360px] sm:h-[480px] rounded-sm overflow-hidden shadow-lg border border-[#C9A24B]/30">
            <Image
              src={room.images[0]}
              alt={room.name}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 h-[360px] sm:h-[480px]">
            <div className="relative flex-1 rounded-sm overflow-hidden shadow-md border border-[#C9A24B]/20">
              <Image
                src={room.images[1]}
                alt={`${room.name} interior`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-1 rounded-sm overflow-hidden shadow-md border border-[#C9A24B]/20">
              <Image
                src={room.images[2]}
                alt={`${room.name} details`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content & Sticky Booking Card ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Room Description, Specifications, Amenities, Policies */}
        <div className="lg:col-span-8 space-y-12">
          {/* Key Spec Badges */}
          <div className="bg-white border border-[#C9A24B]/20 p-6 rounded-sm shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                Room Dimension
              </span>
              <span className="font-serif text-lg text-[#0B1B3A] font-medium">
                {room.size} sq ft
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                Bed Layout
              </span>
              <span className="font-serif text-lg text-[#0B1B3A] font-medium">
                {room.bedType}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                Max Capacity
              </span>
              <span className="font-serif text-lg text-[#0B1B3A] font-medium">
                {room.maxAdults} Adults, {room.maxChildren} Child
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                Outlook & Floor
              </span>
              <span className="font-serif text-lg text-[#0B1B3A] font-medium">
                {room.view}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-[#C9A24B]/20 p-8 rounded-sm shadow-sm">
            <h2 className="font-serif text-2xl font-light text-[#0B1B3A] mb-4">
              The Royal Experience
            </h2>
            <GoldDivider variant="narrow" withOrnament={false} className="!mx-0 mb-6" />
            <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed mb-6">
              {room.description}
            </p>
            <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed">
              Every detail in this suite has been tailored with the finest natural materials — from Italian marble flooring that remains refreshingly cool, to goose-down pillows and 600-thread-count Egyptian cotton linens for regal slumber.
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white border border-[#C9A24B]/20 p-8 rounded-sm shadow-sm">
            <h2 className="font-serif text-2xl font-light text-[#0B1B3A] mb-4">
              Chamber Inclusions & Amenities
            </h2>
            <GoldDivider variant="narrow" withOrnament={false} className="!mx-0 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {room.amenities.map((item: string) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1A3FA3]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#1A3FA3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel & Stay Policies */}
          <div className="bg-white border border-[#C9A24B]/20 p-8 rounded-sm shadow-sm">
            <h2 className="font-serif text-2xl font-light text-[#0B1B3A] mb-4">
              Policies & Privileges
            </h2>
            <GoldDivider variant="narrow" withOrnament={false} className="!mx-0 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-600 font-light">
              <div>
                <span className="font-medium text-[#0B1B3A] block mb-1">
                  Check-in / Check-out
                </span>
                <p>Check-in: 2:00 PM | Check-out: 12:00 PM noon. Early check-in subject to availability.</p>
              </div>
              <div>
                <span className="font-medium text-[#0B1B3A] block mb-1">
                  Cancellation Policy
                </span>
                <p>Complimentary free cancellation up to 48 hours prior to arrival. 50% charged within 24–48 hours.</p>
              </div>
              <div>
                <span className="font-medium text-[#0B1B3A] block mb-1">
                  Smoking Policy
                </span>
                <p>Royal Blue Heaven is a 100% non-smoking sanctuary in all enclosed chambers.</p>
              </div>
              <div>
                <span className="font-medium text-[#0B1B3A] block mb-1">
                  Government Photo ID
                </span>
                <p>Valid government-issued photo ID required for all adult guests at the reception desk.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white border-2 border-[#C9A24B] p-6 sm:p-8 rounded-sm shadow-xl">
            <div className="text-center pb-6 border-b border-gray-100">
              <span className="text-xs uppercase tracking-wider text-gray-500 block mb-1">
                Direct Booking Guarantee
              </span>
              <div className="font-serif text-3xl font-light text-[#1A3FA3]">
                ₹{room.price.toLocaleString('en-IN')}
                <span className="text-xs text-gray-500 font-sans font-normal"> / night</span>
              </div>
              <span className="text-[11px] text-[#C9A24B] font-medium block mt-1">
                ✓ Free Airport Transfer on 2+ Nights Stay
              </span>
            </div>

            <div className="pt-6 space-y-4">
              <Link
                href={`/book/${room.slug}`}
                className="w-full bg-[#C9A24B] text-[#0B1B3A] text-center font-semibold text-xs uppercase tracking-widest py-3.5 px-4 rounded-sm hover:bg-[#E8D5A3] transition-colors block shadow-md"
              >
                Reserve This Suite
              </Link>

              <Link
                href={`/contact?subject=Enquiry+about+${encodeURIComponent(room.name)}`}
                className="w-full border border-[#0B1B3A] text-[#0B1B3A] text-center font-medium text-xs uppercase tracking-widest py-3 px-4 rounded-sm hover:bg-[#0B1B3A] hover:text-white transition-colors block"
              >
                Send Bespoke Enquiry
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-[11px] text-gray-500 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                <span>Instant confirmation via Email & WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A24B]" />
                <span>Pay online or choose advance deposit</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9A24B]" />
                <span>Personalized greeting with royal welcome drink</span>
              </div>
            </div>
          </div>

          {/* Need Assistance Card */}
          <div className="bg-[#0B1B3A] text-white p-6 rounded-sm border border-[#C9A24B]/30 text-center">
            <Phone className="w-6 h-6 text-[#C9A24B] mx-auto mb-2" />
            <span className="font-serif text-lg block mb-1">
              Need Personal Assistance?
            </span>
            <p className="text-xs text-gray-300 font-light mb-4">
              Our reservation concierges are at your service 24 hours a day.
            </p>
            <a
              href="tel:+919876543210"
              className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold hover:underline"
            >
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

