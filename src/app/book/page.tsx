'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Users,
  Home,
  Check,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { BookingSearchBar } from '@/components/booking/BookingSearchBar'

const ROOM_OPTIONS = [
  {
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    id: 'deluxe-room-id',
    baseRate: 5500,
    size: '350 sq ft',
    bed: 'King Bed',
    maxAdults: 2,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    highlights: ['City View', 'Marble Bath', 'Wi-Fi', 'Breakfast available'],
  },
  {
    name: 'Premier Suite',
    slug: 'premier-suite',
    id: 'premier-suite-id',
    baseRate: 9500,
    size: '600 sq ft',
    bed: 'King Bed',
    maxAdults: 3,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
    highlights: ['Private Balcony', 'Living Parlor', 'Bathtub', 'Butler Service'],
  },
  {
    name: 'Royal Suite',
    slug: 'royal-suite',
    id: 'royal-suite-id',
    baseRate: 18000,
    size: '900 sq ft',
    bed: 'King Four-Poster',
    maxAdults: 4,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
    highlights: ['Palace View', 'Four-Poster Bed', '24/7 Butler', 'Champagne Welcome'],
  },
  {
    name: 'Presidential Suite',
    slug: 'presidential-suite',
    id: 'presidential-suite-id',
    baseRate: 35000,
    size: '1800 sq ft',
    bed: 'Super King',
    maxAdults: 4,
    image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800',
    highlights: ['Grand Piano', 'Private Jacuzzi', 'Dining for 6', 'Dedicated Butler'],
  },
  {
    name: 'Heritage Villa Room',
    slug: 'heritage-villa-room',
    id: 'heritage-villa-room-id',
    baseRate: 25000,
    size: '1200 sq ft',
    bed: 'King Bed',
    maxAdults: 3,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
    highlights: ['Plunge Pool', 'Private Courtyard', 'Jaali Screens', 'Outdoor Shower'],
  },
]

function BookingContent() {
  const searchParams = useSearchParams()

  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const adults = Number(searchParams.get('adults')) || 2
  const children = Number(searchParams.get('children')) || 0
  const rooms = Number(searchParams.get('rooms')) || 1

  // Calculate number of nights
  let nights = 1
  if (checkIn && checkOut) {
    const d1 = new Date(checkIn)
    const d2 = new Date(checkOut)
    const diffTime = Math.abs(d2.getTime() - d1.getTime())
    nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  }

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-[#0B1B3A] text-white pt-28 pb-14 border-b border-[#C9A24B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-2">
            Step 1 of 3: Chamber Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#FBF8F1]">
            Select Your Chamber or Suite
          </h1>
        </div>
      </section>

      {/* Booking Search Modifier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <BookingSearchBar
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          initialAdults={adults}
          initialChildren={children}
          initialRooms={rooms}
          variant="card"
        />
      </div>

      {/* Results List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h2 className="font-serif text-2xl text-[#0B1B3A]">
              Available Royal Suites
            </h2>
            <p className="text-xs text-gray-500 font-light mt-0.5">
              Tariffs calculated for {nights} {nights === 1 ? 'night' : 'nights'}, {rooms} {rooms === 1 ? 'room' : 'rooms'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#1A3FA3] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            <span>Best Direct Tariff Guarantee</span>
          </div>
        </div>

        <div className="space-y-8">
          {ROOM_OPTIONS.map((room) => {
            const totalPrice = room.baseRate * nights * rooms
            const bookUrl = `/book/${room.slug}?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&rooms=${rooms}`

            return (
              <div
                key={room.slug}
                className="bg-white border border-[#C9A24B]/20 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12"
              >
                {/* Image */}
                <div className="md:col-span-4 relative min-h-[240px]">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="md:col-span-5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#0B1B3A] mb-1">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      <span>{room.size}</span>
                      <span>•</span>
                      <span>{room.bed}</span>
                      <span>•</span>
                      <span>Max {room.maxAdults} Guests</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      {room.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#C9A24B]" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 text-xs text-[#C9A24B] font-medium">
                    ✓ Free cancellation up to 48 hours before check-in
                  </div>
                </div>

                {/* Price & Action */}
                <div className="md:col-span-3 p-6 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-between text-right">
                  <div>
                    <span className="text-[11px] text-gray-400 block">
                      Tariff for {nights} {nights === 1 ? 'night' : 'nights'}
                    </span>
                    <span className="font-serif text-3xl font-light text-[#1A3FA3] block">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-gray-400 block">
                      (₹{room.baseRate.toLocaleString('en-IN')} / night + GST)
                    </span>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={bookUrl}
                      className="w-full bg-[#C9A24B] text-[#0B1B3A] text-center font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded-sm hover:bg-[#E8D5A3] transition-colors block shadow-sm"
                    >
                      Select Chamber
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-serif">Loading royal suites...</div>}>
      <BookingContent />
    </Suspense>
  )
}

