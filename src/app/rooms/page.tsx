'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Users,
  Maximize2,
  Bed,
  Check,
  Search,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const ALL_ROOMS = [
  {
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    tagline: 'Refined Comfort & City Views',
    description:
      'An elegant sanctuary featuring a royal blue headboard with gold piping, plush ivory linens, and large windows overlooking Gwalior. Perfect for business travelers and couples.',
    size: 350,
    bedType: 'King Bed',
    maxAdults: 2,
    maxChildren: 1,
    view: 'City View',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
    amenities: [
      'High-speed Wi-Fi',
      'Smart 55" TV',
      'Mini Bar',
      'Rain Shower',
      'Luxury Toiletries',
      'Tea & Coffee Maker',
      'In-room Safe',
      'Daily Housekeeping',
    ],
  },
  {
    name: 'Premier Suite',
    slug: 'premier-suite',
    tagline: 'Spacious Suite with Private Balcony',
    description:
      'Spacious and sophisticated, featuring a separate living parlor, carved rosewood furnishings, navy drapes with antique gold tassels, and an open balcony overlooking the courtyard gardens.',
    size: 600,
    bedType: 'King Bed',
    maxAdults: 3,
    maxChildren: 2,
    view: 'Garden View',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200',
    amenities: [
      'Private Balcony',
      'Separate Living Room',
      'Deep Soaking Bathtub',
      'Nespresso Machine',
      'Butler Service',
      'Evening Turndown',
      'High-speed Wi-Fi',
      'Smart 65" TV',
    ],
  },
  {
    name: 'Royal Suite',
    slug: 'royal-suite',
    tagline: 'Palatial Grandeur with Mughal Art',
    description:
      'A palatial retreat adorned with sapphire velvet chaises, gold-framed gilded mirrors, and authentic blue-gold Mughal carpets. Boasts a grand four-poster bed and Italian marble bathroom.',
    size: 900,
    bedType: 'King Four-Poster',
    maxAdults: 4,
    maxChildren: 2,
    view: 'Palace View',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
    amenities: [
      'Four-Poster Bed',
      'Freestanding Bathtub',
      'Separate Dining Area',
      '24/7 Dedicated Butler',
      'Chandelier & Fine Art',
      'Welcome Champagne',
      'Walk-in Wardrobe',
      'Exclusive Lounge Access',
    ],
  },
  {
    name: 'Presidential Suite',
    slug: 'presidential-suite',
    tagline: 'The Ultimate Epitome of Opulence',
    description:
      'The pinnacle of regal living in Central India. A lavish multi-room residence featuring blue marble walls with 24k gold inlay, a grand living hall, dining salon for six, and a grand piano.',
    size: 1800,
    bedType: 'Super King',
    maxAdults: 4,
    maxChildren: 2,
    view: 'Panoramic City View',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200',
    amenities: [
      'Grand Piano',
      'Private Jacuzzi & Steam',
      'Dining Table for 6',
      'Full Butler Pantry',
      'Two Marble Bathrooms',
      'Smart Home Controls',
      'Private Bar',
      'Dedicated Chauffeur',
    ],
  },
  {
    name: 'Heritage Villa Room',
    slug: 'heritage-villa-room',
    tagline: 'Private Courtyard & Plunge Pool',
    description:
      'A private ground-level villa retreat with an enclosed open-air courtyard, authentic blue jaali stone screens, carved antique furniture, and a heated private plunge pool.',
    size: 1200,
    bedType: 'King Bed',
    maxAdults: 3,
    maxChildren: 1,
    view: 'Courtyard & Garden',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
    amenities: [
      'Private Plunge Pool',
      'Open Courtyard',
      'Outdoor Rain Shower',
      'Jaali Screens',
      'Evening Bonfire',
      'Private Dining Service',
      'Vintage Artifacts',
      '24/7 Butler Service',
    ],
  },
]

export default function RoomsPage() {
  const [selectedView, setSelectedView] = useState('all')
  const [maxGuests, setMaxGuests] = useState(0)

  const filteredRooms = ALL_ROOMS.filter((room) => {
    if (selectedView !== 'all' && !room.view.toLowerCase().includes(selectedView)) {
      return false
    }
    if (maxGuests > 0 && room.maxAdults < maxGuests) {
      return false
    }
    return true
  })

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Page Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1920"
            alt="Suites Hero"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            Palatial Accommodations
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Rooms & Royal Suites
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            Discover our 20 chambers, each an individualized sanctuary of blue velvet, antique gold accents, and imperial hospitality.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white border border-[#C9A24B]/30 rounded-sm shadow-md p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              Filter by:
            </span>

            <select
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="text-xs font-medium border border-gray-200 rounded-sm px-3 py-2 text-gray-700 bg-gray-50 focus:outline-none focus:border-[#C9A24B]"
            >
              <option value="all">All Views</option>
              <option value="city">City View</option>
              <option value="garden">Garden View</option>
              <option value="palace">Palace View</option>
              <option value="courtyard">Courtyard View</option>
            </select>

            <select
              value={maxGuests}
              onChange={(e) => setMaxGuests(Number(e.target.value))}
              className="text-xs font-medium border border-gray-200 rounded-sm px-3 py-2 text-gray-700 bg-gray-50 focus:outline-none focus:border-[#C9A24B]"
            >
              <option value={0}>Any Occupancy</option>
              <option value={2}>2+ Adults</option>
              <option value={3}>3+ Adults</option>
              <option value={4}>4 Adults</option>
            </select>
          </div>

          <div className="text-xs text-gray-500 font-light">
            Showing <span className="font-semibold text-[#0B1B3A]">{filteredRooms.length}</span> of 5 suite categories
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        {filteredRooms.map((room, idx) => (
          <div
            key={room.slug}
            className="bg-white border border-[#C9A24B]/20 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#0B1B3A]/85 backdrop-blur-sm px-3 py-1 text-xs text-[#C9A24B] font-medium rounded-sm border border-[#C9A24B]/30">
                {room.view}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#0B1B3A]">
                    {room.name}
                  </h2>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">Starting from</span>
                    <span className="font-serif text-2xl font-normal text-[#1A3FA3]">
                      ₹{room.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-gray-500"> / night</span>
                  </div>
                </div>

                <p className="text-xs uppercase tracking-wider text-[#C9A24B] font-medium mb-4">
                  {room.tagline}
                </p>

                <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
                  {room.description}
                </p>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100 mb-6 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-[#C9A24B]" />
                    <span>{room.size} sq ft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#C9A24B]" />
                    <span>{room.bedType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C9A24B]" />
                    <span>Up to {room.maxAdults} Adults</span>
                  </div>
                </div>

                {/* Amenities Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                  {room.amenities.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1.5 text-[11px] text-gray-600 font-light"
                    >
                      <Check className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/rooms/${room.slug}`}
                  className="w-full sm:w-auto flex-1 text-center py-3 text-xs uppercase tracking-widest font-semibold border border-[#0B1B3A] text-[#0B1B3A] hover:bg-[#0B1B3A] hover:text-white rounded-sm transition-colors"
                >
                  Suite Details & Gallery
                </Link>
                <Link
                  href={`/book/${room.slug}`}
                  className="w-full sm:w-auto flex-1 text-center py-3 text-xs uppercase tracking-widest font-semibold bg-[#C9A24B] text-[#0B1B3A] hover:bg-[#E8D5A3] rounded-sm transition-colors shadow-sm"
                >
                  Book Suite
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

