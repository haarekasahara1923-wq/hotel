'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle,
  Calendar,
  MessageCircle,
  Printer,
  Home,
  ShieldCheck,
  MapPin,
  Clock,
} from 'lucide-react'

function ConfirmationContent() {
  const searchParams = useSearchParams()

  const code = searchParams.get('code') || 'RBH-CONFIRMED'
  const room = searchParams.get('room') || 'Deluxe Room'
  const name = searchParams.get('name') || 'Honored Guest'
  const email = searchParams.get('email') || 'guest@example.com'
  const phone = searchParams.get('phone') || '+91 98765 43210'
  const checkIn = searchParams.get('checkIn') || '2024-11-04'
  const checkOut = searchParams.get('checkOut') || '2024-11-06'
  const nights = searchParams.get('nights') || '2'
  const total = searchParams.get('total') || '12320'
  const mode = searchParams.get('mode') || 'full'

  const whatsappMessage = encodeURIComponent(
    `Hello Royal Blue Heaven! I have confirmed booking ${code} under ${name}. Please verify my arrival details.`
  )

  return (
    <div className="bg-[#FBF8F1] min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Card */}
        <div className="bg-white border-2 border-[#C9A24B] rounded-sm p-8 sm:p-12 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0B1B3A] via-[#C9A24B] to-[#0B1B3A]" />

          <div className="w-16 h-16 rounded-full bg-[#C9A24B]/15 text-[#C9A24B] flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-2">
            Reservation Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#0B1B3A] font-light mb-3">
            We Look Forward to Welcoming You
          </h1>

          <p className="text-sm text-gray-600 font-light max-w-md mx-auto mb-6">
            Dear <span className="font-medium text-[#0B1B3A]">{name}</span>, your royal reservation at Royal Blue Heaven has been successfully registered. A confirmation voucher has been dispatched to <span className="font-medium text-[#0B1B3A]">{email}</span>.
          </p>

          {/* Booking Code Banner */}
          <div className="bg-[#0B1B3A] text-white py-4 px-6 rounded-sm inline-block mb-8 border border-[#C9A24B]/40">
            <span className="text-[10px] uppercase tracking-widest text-[#C9A24B] block mb-1">
              Booking Reference Code
            </span>
            <span className="font-mono text-2xl font-bold tracking-wider text-[#FBF8F1]">
              {code}
            </span>
          </div>

          {/* Stay Summary Grid */}
          <div className="bg-gray-50 border border-gray-100 rounded-sm p-6 text-left text-xs sm:text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div>
              <span className="text-gray-400 block text-[11px]">Chamber Reserved</span>
              <span className="font-semibold text-[#0B1B3A]">{room}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Total Duration</span>
              <span className="font-semibold text-[#0B1B3A]">{nights} Nights Stay</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Check-In</span>
              <span className="font-semibold text-[#0B1B3A]">{checkIn} (from 2:00 PM)</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Check-Out</span>
              <span className="font-semibold text-[#0B1B3A]">{checkOut} (until 12:00 PM)</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Total Amount</span>
              <span className="font-semibold text-[#1A3FA3]">₹{Number(total).toLocaleString('en-IN')} (incl. GST)</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Payment Mode</span>
              <span className="font-semibold text-[#0B1B3A]">
                {mode === 'full' ? 'Paid in Full' : mode === 'advance' ? '30% Advance Paid' : 'Pay at Hotel'}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#25D366] text-white px-6 py-3 rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Message Reception on WhatsApp</span>
            </a>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto border border-[#0B1B3A] text-[#0B1B3A] px-6 py-3 rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-[#0B1B3A] hover:text-white transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Voucher</span>
            </button>
          </div>

          {/* Hotel Location note */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
            <MapPin className="w-4 h-4 text-[#C9A24B]" />
            <span>Royal Blue Heaven • DD Nagar, Gwalior, Madhya Pradesh, India</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-[#1A3FA3] hover:text-[#C9A24B] transition-colors font-semibold inline-flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-serif">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}

