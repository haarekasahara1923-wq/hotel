'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Users, Home, Search } from 'lucide-react'

interface BookingSearchBarProps {
  initialCheckIn?: string
  initialCheckOut?: string
  initialAdults?: number
  initialChildren?: number
  initialRooms?: number
  variant?: 'glass' | 'card'
  className?: string
}

export function BookingSearchBar({
  initialCheckIn,
  initialCheckOut,
  initialAdults = 2,
  initialChildren = 0,
  initialRooms = 1,
  variant = 'glass',
  className = '',
}: BookingSearchBarProps) {
  const router = useRouter()

  // Default to tomorrow and day-after-tomorrow if not set
  const getTomorrow = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  }

  const getDayAfterTomorrow = () => {
    const d = new Date()
    d.setDate(d.getDate() + 3)
    return d.toISOString().split('T')[0]
  }

  const [checkIn, setCheckIn] = useState(initialCheckIn || getTomorrow())
  const [checkOut, setCheckOut] = useState(initialCheckOut || getDayAfterTomorrow())
  const [adults, setAdults] = useState(initialAdults)
  const [children, setChildren] = useState(initialChildren)
  const [rooms, setRooms] = useState(initialRooms)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
    }).toString()

    router.push(`/book?${query}`)
  }

  const containerStyle =
    variant === 'glass'
      ? 'bg-[#0B1B3A] border-2 border-[#C9A24B]/50 shadow-[0_12px_36px_rgba(0,0,0,0.18)]'
      : 'bg-white border border-[#C9A24B]/30 shadow-lg'

  const labelColor = variant === 'glass' ? 'text-[#C9A24B]' : 'text-[#0B1B3A]'
  const textColor = variant === 'glass' ? 'text-white' : 'text-gray-900'
  const inputBg = variant === 'glass' ? 'bg-white/10' : 'bg-gray-50'

  return (
    <form
      onSubmit={handleSearch}
      className={`rounded-sm p-4 sm:p-6 ${containerStyle} ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Check-in Date */}
        <div>
          <label className={`block text-xs uppercase tracking-wider font-medium mb-1.5 flex items-center gap-1.5 ${labelColor}`}>
            <Calendar className="w-3.5 h-3.5" />
            Check-In
          </label>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            className={`w-full px-3 py-2.5 text-xs sm:text-sm font-medium rounded-sm border border-[#C9A24B]/30 focus:outline-none focus:border-[#C9A24B] ${inputBg} ${textColor}`}
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className={`block text-xs uppercase tracking-wider font-medium mb-1.5 flex items-center gap-1.5 ${labelColor}`}>
            <Calendar className="w-3.5 h-3.5" />
            Check-Out
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().split('T')[0]}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            className={`w-full px-3 py-2.5 text-xs sm:text-sm font-medium rounded-sm border border-[#C9A24B]/30 focus:outline-none focus:border-[#C9A24B] ${inputBg} ${textColor}`}
          />
        </div>

        {/* Adults & Children */}
        <div>
          <label className={`block text-xs uppercase tracking-wider font-medium mb-1.5 flex items-center gap-1.5 ${labelColor}`}>
            <Users className="w-3.5 h-3.5" />
            Guests
          </label>
          <div className="flex gap-2">
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className={`w-1/2 px-2 py-2.5 text-xs sm:text-sm font-medium rounded-sm border border-[#C9A24B]/30 focus:outline-none focus:border-[#C9A24B] ${inputBg} ${textColor}`}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="text-gray-900 bg-white">
                  {n} {n === 1 ? 'Adult' : 'Adults'}
                </option>
              ))}
            </select>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className={`w-1/2 px-2 py-2.5 text-xs sm:text-sm font-medium rounded-sm border border-[#C9A24B]/30 focus:outline-none focus:border-[#C9A24B] ${inputBg} ${textColor}`}
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="text-gray-900 bg-white">
                  {n} {n === 1 ? 'Child' : 'Children'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rooms */}
        <div>
          <label className={`block text-xs uppercase tracking-wider font-medium mb-1.5 flex items-center gap-1.5 ${labelColor}`}>
            <Home className="w-3.5 h-3.5" />
            Rooms
          </label>
          <select
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className={`w-full px-3 py-2.5 text-xs sm:text-sm font-medium rounded-sm border border-[#C9A24B]/30 focus:outline-none focus:border-[#C9A24B] ${inputBg} ${textColor}`}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n} className="text-gray-900 bg-white">
                {n} {n === 1 ? 'Room' : 'Rooms'}
              </option>
            ))}
          </select>
        </div>

        {/* Search CTA */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#C9A24B] text-[#0B1B3A] font-semibold text-xs sm:text-sm uppercase tracking-wider py-3 px-4 rounded-sm hover:bg-[#E8D5A3] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(201,162,75,0.4)]"
          >
            <Search className="w-4 h-4" />
            Check Rates
          </button>
        </div>
      </div>
    </form>
  )
}

