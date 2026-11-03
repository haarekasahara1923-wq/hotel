'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Calendar, Phone, ShieldAlert, CheckCircle, Clock } from 'lucide-react'

export default function BookingLookupPage() {
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState<any>(null)
  const [error, setError] = useState('')

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulating lookup check
    setTimeout(() => {
      setLoading(false)
      setSearched(true)
      if (code.toUpperCase().includes('RBH') || code.length >= 6) {
        setBooking({
          code: code.toUpperCase(),
          guestName: 'Honored Guest',
          roomName: 'Royal Suite',
          checkIn: '2024-12-15',
          checkOut: '2024-12-18',
          nights: 3,
          adults: 2,
          status: 'CONFIRMED',
          total: 54000,
          paid: 54000,
        })
      } else {
        setError('No reservation found matching this booking reference and phone number. Please verify and try again.')
        setBooking(null)
      }
    }, 600)
  }

  return (
    <div className="bg-[#FBF8F1] min-h-screen pt-28 pb-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-2">
            Guest Self-Service
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#0B1B3A] font-light">
            Find Your Reservation
          </h1>
          <p className="text-xs text-gray-500 font-light mt-2">
            Enter your booking reference code and registered mobile number to review or manage your stay.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white border border-[#C9A24B]/30 rounded-sm p-6 sm:p-8 shadow-md mb-8">
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                Booking Reference Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. RBH-20241103-9A2B"
                className="w-full px-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-sm uppercase tracking-wider focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                Registered Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0B1B3A] text-[#C9A24B] font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded-sm hover:bg-[#1A3FA3] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Searching...' : 'Lookup Reservation'}</span>
            </button>
          </form>
        </div>

        {/* Found Booking Details */}
        {searched && booking && (
          <div className="bg-white border-2 border-[#C9A24B] rounded-sm p-6 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                  Reference Code
                </span>
                <span className="font-mono text-lg font-bold text-[#0B1B3A]">
                  {booking.code}
                </span>
              </div>
              <div className="px-3 py-1 bg-green-50 border border-green-200 rounded-sm text-green-700 text-xs font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{booking.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <span className="text-gray-400 block text-[11px]">Primary Guest</span>
                <span className="font-medium text-[#0B1B3A]">{booking.guestName}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Chamber</span>
                <span className="font-medium text-[#0B1B3A]">{booking.roomName}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Check-In</span>
                <span className="font-medium text-[#0B1B3A]">{booking.checkIn} (2 PM)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Check-Out</span>
                <span className="font-medium text-[#0B1B3A]">{booking.checkOut} (12 PM)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Total Tariff</span>
                <span className="font-medium text-[#1A3FA3]">₹{booking.total.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Settlement Status</span>
                <span className="font-medium text-green-700">Fully Settled</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact?subject=Modify+Booking+${booking.code}`}
                className="flex-1 text-center py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#0B1B3A] text-[#0B1B3A] hover:bg-[#0B1B3A] hover:text-white rounded-sm transition-colors"
              >
                Request Modification
              </Link>
              <Link
                href={`/contact?subject=Cancel+Booking+${booking.code}`}
                className="flex-1 text-center py-2.5 text-xs uppercase tracking-wider font-semibold border border-red-300 text-red-600 hover:bg-red-50 rounded-sm transition-colors"
              >
                Request Cancellation
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

