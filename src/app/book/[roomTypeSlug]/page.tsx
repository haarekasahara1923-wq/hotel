'use client'

import React, { useState, use, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Users,
  Check,
  ShieldCheck,
  CreditCard,
  Tag,
  Lock,
  ArrowRight,
} from 'lucide-react'

const ROOM_DATA: Record<string, any> = {
  'deluxe-room': {
    name: 'Deluxe Room',
    rate: 5500,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
  },
  'premier-suite': {
    name: 'Premier Suite',
    rate: 9500,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
  },
  'royal-suite': {
    name: 'Royal Suite',
    rate: 18000,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
  },
  'presidential-suite': {
    name: 'Presidential Suite',
    rate: 35000,
    image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800',
  },
  'heritage-villa-room': {
    name: 'Heritage Villa Room',
    rate: 25000,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
  },
}

const AVAILABLE_ADDONS = [
  { id: 'breakfast', name: 'Royal Buffet Breakfast', price: 750, per: 'guest/day', icon: '🍳' },
  { id: 'airport_pickup', name: 'Luxury Airport Chauffeur Transfer', price: 1500, per: 'trip', icon: '🚗' },
  { id: 'spa_treatment', name: 'Ayurvedic Abhyanga Spa (60 min)', price: 3500, per: 'person', icon: '💆' },
  { id: 'room_decoration', name: 'Anniversary / Honeymoon Rose Decor', price: 2500, per: 'stay', icon: '🌹' },
  { id: 'candlelight_dinner', name: 'Private Starlit Candlelight Dinner', price: 4500, per: 'couple', icon: '🕯️' },
]

function CheckoutContent({ roomSlug }: { roomSlug: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const checkIn = searchParams.get('checkIn') || new Date().toISOString().split('T')[0]
  const checkOut = searchParams.get('checkOut') || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  const adults = Number(searchParams.get('adults')) || 2
  const children = Number(searchParams.get('children')) || 0
  const rooms = Number(searchParams.get('rooms')) || 1

  const room = ROOM_DATA[roomSlug] || ROOM_DATA['deluxe-room']

  // Nights calculation
  const d1 = new Date(checkIn)
  const d2 = new Date(checkOut)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))

  // Form State
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [couponCode, setCouponCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponMsg, setCouponMsg] = useState('')
  const [paymentMode, setPaymentMode] = useState<'full' | 'advance' | 'enquiry'>('full')
  const [submitting, setSubmitting] = useState(false)

  // Calculations
  const roomTariff = room.rate * nights * rooms
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = AVAILABLE_ADDONS.find((a) => a.id === addonId)
    return sum + (item ? item.price : 0)
  }, 0)

  const subtotal = roomTariff + addonsTotal - discountAmount
  const gstPercent = room.rate > 7500 ? 18 : 12
  const tax = Math.round((subtotal * gstPercent) / 100)
  const grandTotal = subtotal + tax
  const advanceAmount = Math.round(grandTotal * 0.3)

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim()
    if (code === 'ROYAL20') {
      const discount = Math.round(roomTariff * 0.2)
      setDiscountAmount(discount)
      setCouponApplied(true)
      setCouponMsg('20% Royal Discount applied!')
    } else if (code === 'WELCOME10') {
      const discount = Math.round(roomTariff * 0.1)
      setDiscountAmount(discount)
      setCouponApplied(true)
      setCouponMsg('10% Welcome Discount applied!')
    } else if (code === 'FLAT2000') {
      setDiscountAmount(2000)
      setCouponApplied(true)
      setCouponMsg('₹2,000 Flat Discount applied!')
    } else {
      setCouponMsg('Invalid coupon code. Try ROYAL20 or WELCOME10')
    }
  }

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Generate random booking code
    const generatedCode = `RBH-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    try {
      // In production this calls /api/booking/create
      // Redirect to confirmation with details
      const params = new URLSearchParams({
        code: generatedCode,
        room: room.name,
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        checkIn,
        checkOut,
        nights: nights.toString(),
        total: grandTotal.toString(),
        mode: paymentMode,
      })

      router.push(`/book/confirmation?${params.toString()}`)
    } catch (err) {
      alert('Could not complete booking. Please try again or call reception.')
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Header */}
      <section className="bg-[#0B1B3A] text-white pt-28 pb-14 border-b border-[#C9A24B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-2">
            Step 2 of 3: Guest Details & Preferences
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#FBF8F1]">
            Complete Your Royal Reservation
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Guest Information & Options */}
        <form onSubmit={handleSubmitBooking} className="lg:col-span-8 space-y-8">
          {/* Guest Details */}
          <div className="bg-white border border-[#C9A24B]/20 p-6 sm:p-8 rounded-sm shadow-sm">
            <h2 className="font-serif text-2xl font-light text-[#0B1B3A] mb-4">
              Guest Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Maharaja Vikramaditya"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="for instant booking confirmation"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                  Approximate Arrival Time
                </label>
                <select className="w-full px-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B] bg-white">
                  <option>Standard Check-in (2:00 PM - 6:00 PM)</option>
                  <option>Evening Check-in (6:00 PM - 10:00 PM)</option>
                  <option>Late Night (After 10:00 PM)</option>
                  <option>Early Check-in (Request Subject to Availability)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                  Special Requests / Dietary Requirements
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Tell us if you require flower petals, ground floor room, airport pickup timing, or strict vegetarian dining..."
                  className="w-full px-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                />
              </div>
            </div>
          </div>

          {/* Add-on Experiences */}
          <div className="bg-white border border-[#C9A24B]/20 p-6 sm:p-8 rounded-sm shadow-sm">
            <h2 className="font-serif text-2xl font-light text-[#0B1B3A] mb-1">
              Curate Your Royal Experience
            </h2>
            <p className="text-xs text-gray-500 font-light mb-6">
              Select bespoke services to elevate your stay. All add-ons are settled together.
            </p>

            <div className="space-y-3">
              {AVAILABLE_ADDONS.map((addon) => {
                const selected = selectedAddons.includes(addon.id)
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-sm border cursor-pointer flex items-center justify-between transition-all ${
                      selected
                        ? 'border-[#C9A24B] bg-[#C9A24B]/10 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{addon.icon}</span>
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-[#0B1B3A] block">
                          {addon.name}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          ₹{addon.price.toLocaleString('en-IN')} / {addon.per}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-sm border flex items-center justify-center ${
                        selected
                          ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0B1B3A]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Payment Mode Selector */}
          <div className="bg-white border border-[#C9A24B]/20 p-6 sm:p-8 rounded-sm shadow-sm">
            <h2 className="font-serif text-2xl font-light text-[#0B1B3A] mb-2">
              Payment Preference
            </h2>
            <p className="text-xs text-gray-500 font-light mb-6">
              Choose how you would like to guarantee your reservation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label
                onClick={() => setPaymentMode('full')}
                className={`p-4 border rounded-sm cursor-pointer flex flex-col justify-between ${
                  paymentMode === 'full'
                    ? 'border-[#C9A24B] bg-[#C9A24B]/10'
                    : 'border-gray-200'
                }`}
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider block text-[#0B1B3A]">
                    Pay 100% Online
                  </span>
                  <span className="text-[11px] text-gray-500 block mt-1">
                    Instant guaranteed booking via Razorpay (UPI, Cards, NetBanking).
                  </span>
                </div>
                <span className="font-serif text-lg font-medium text-[#1A3FA3] mt-3 block">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </label>

              <label
                onClick={() => setPaymentMode('advance')}
                className={`p-4 border rounded-sm cursor-pointer flex flex-col justify-between ${
                  paymentMode === 'advance'
                    ? 'border-[#C9A24B] bg-[#C9A24B]/10'
                    : 'border-gray-200'
                }`}
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider block text-[#0B1B3A]">
                    Pay 30% Deposit
                  </span>
                  <span className="text-[11px] text-gray-500 block mt-1">
                    Secure room with 30% deposit now. Pay remainder at check-in.
                  </span>
                </div>
                <span className="font-serif text-lg font-medium text-[#1A3FA3] mt-3 block">
                  ₹{advanceAmount.toLocaleString('en-IN')}
                </span>
              </label>

              <label
                onClick={() => setPaymentMode('enquiry')}
                className={`p-4 border rounded-sm cursor-pointer flex flex-col justify-between ${
                  paymentMode === 'enquiry'
                    ? 'border-[#C9A24B] bg-[#C9A24B]/10'
                    : 'border-gray-200'
                }`}
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider block text-[#0B1B3A]">
                    Pay at Hotel / Enquiry
                  </span>
                  <span className="text-[11px] text-gray-500 block mt-1">
                    No payment right now. Staff will call to confirm booking.
                  </span>
                </div>
                <span className="text-xs font-medium text-[#C9A24B] mt-3 block">
                  Pay at Check-In
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C9A24B] text-[#0B1B3A] font-semibold text-xs sm:text-sm uppercase tracking-widest py-4 rounded-sm hover:bg-[#E8D5A3] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>
              {submitting
                ? 'Confirming Reservation...'
                : paymentMode === 'enquiry'
                ? 'Send Reservation Request'
                : `Confirm & Pay ₹${(paymentMode === 'advance' ? advanceAmount : grandTotal).toLocaleString('en-IN')}`}
            </span>
          </button>
        </form>

        {/* Right Column: Reservation Summary Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white border-2 border-[#C9A24B]/50 p-6 rounded-sm shadow-lg">
            <h3 className="font-serif text-xl font-light text-[#0B1B3A] pb-3 border-b border-gray-100">
              Reservation Summary
            </h3>

            {/* Room Preview */}
            <div className="flex gap-4 py-4 border-b border-gray-100">
              <div className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-base font-medium text-[#0B1B3A]">
                  {room.name}
                </h4>
                <span className="text-xs text-gray-500 block">
                  {rooms} {rooms === 1 ? 'Chamber' : 'Chambers'} • {adults} Adults
                </span>
                <span className="text-xs text-[#1A3FA3] font-medium block mt-1">
                  ₹{room.rate.toLocaleString('en-IN')} / night
                </span>
              </div>
            </div>

            {/* Dates */}
            <div className="py-4 border-b border-gray-100 text-xs text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="font-medium text-[#0B1B3A]">{checkIn} (2 PM)</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="font-medium text-[#0B1B3A]">{checkOut} (12 PM)</span>
              </div>
              <div className="flex justify-between">
                <span>Total Stay Duration:</span>
                <span className="font-medium text-[#0B1B3A]">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="py-4 border-b border-gray-100">
              <span className="text-xs uppercase tracking-wider text-gray-600 font-medium block mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#C9A24B]" />
                Have a Coupon Code?
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. ROYAL20"
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-sm uppercase focus:outline-none focus:border-[#C9A24B]"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-[#0B1B3A] text-[#C9A24B] px-3 py-2 text-xs font-semibold uppercase rounded-sm hover:bg-[#1A3FA3] transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponMsg && (
                <span
                  className={`text-[11px] block mt-1.5 ${
                    couponApplied ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {couponMsg}
                </span>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="py-4 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Chamber Tariff ({nights} nights):</span>
                <span>₹{roomTariff.toLocaleString('en-IN')}</span>
              </div>

              {addonsTotal > 0 && (
                <div className="flex justify-between">
                  <span>Selected Add-ons ({selectedAddons.length}):</span>
                  <span>₹{addonsTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              {discountAmount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Coupon Discount:</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Taxes & GST ({gstPercent}%):</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="font-serif text-base text-[#0B1B3A]">Total Amount:</span>
                <span className="font-serif text-2xl text-[#1A3FA3] font-medium">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {paymentMode === 'advance' && (
                <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between text-[#C9A24B] font-medium text-xs">
                  <span>Pay Today (30% Deposit):</span>
                  <span>₹{advanceAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ roomTypeSlug: string }>
}) {
  const { roomTypeSlug } = use(params)
  return (
    <Suspense fallback={<div className="p-20 text-center font-serif">Loading checkout...</div>}>
      <CheckoutContent roomSlug={roomTypeSlug} />
    </Suspense>
  )
}

