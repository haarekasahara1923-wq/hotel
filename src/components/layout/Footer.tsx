'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
} from 'lucide-react'
import { GoldDivider } from '../ui/GoldDivider'

interface FooterProps {
  hotelName?: string
  tagline?: string
  address?: string
  phone?: string
  email?: string
  gstNumber?: string
}

export function Footer({
  hotelName = 'Royal Blue Heaven',
  tagline = 'Where Royalty Meets Serenity',
  address = 'DD Nagar, Gwalior, Madhya Pradesh 474011, India',
  phone = '+91 98765 43210',
  email = 'info@royalblueheaven.com',
  gstNumber = '23XXXXX1234X1ZX',
}: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setSubscribed(true)
    setNewsletterEmail('')
  }

  return (
    <footer className="bg-[#0B1B3A] text-white pt-16 pb-8 border-t border-[#C9A24B]/30 relative overflow-hidden">
      {/* Subtle gold glow behind footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#C9A24B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl sm:text-3xl font-light text-[#FBF8F1] tracking-wider uppercase block">
                {hotelName}
              </span>
              <span className="text-xs italic font-serif text-[#C9A24B] tracking-wide block mt-0.5">
                {tagline}
              </span>
            </Link>
            <p className="text-sm text-gray-300 font-light leading-relaxed mb-6 max-w-sm">
              Nestled in historic Gwalior, Royal Blue Heaven is a boutique 20-room sanctuary of royal hospitality, exquisite dining, and serene indulgence.
            </p>

            {/* Newsletter */}
            <div className="mb-4">
              <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-medium block mb-2">
                Receive Royal Privileges & Offers
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#C9A24B]">
                  <CheckCircle className="w-4 h-4" />
                  <span>Thank you for subscribing to our newsletter!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-white/5 border border-white/10 px-3.5 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C9A24B] flex-1 rounded-l-sm"
                  />
                  <button
                    type="submit"
                    className="bg-[#C9A24B] text-[#0B1B3A] px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-r-sm hover:bg-[#E8D5A3] transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B1B3A] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B1B3A] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.456 5 15.658 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B1B3A] transition-colors"
                aria-label="X Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-base tracking-wider text-[#C9A24B] uppercase mb-4">
              Accommodations
            </h3>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              <li>
                <Link href="/rooms/deluxe-room" className="hover:text-[#C9A24B] transition-colors">
                  Deluxe Room
                </Link>
              </li>
              <li>
                <Link href="/rooms/premier-suite" className="hover:text-[#C9A24B] transition-colors">
                  Premier Suite
                </Link>
              </li>
              <li>
                <Link href="/rooms/royal-suite" className="hover:text-[#C9A24B] transition-colors">
                  Royal Suite
                </Link>
              </li>
              <li>
                <Link href="/rooms/presidential-suite" className="hover:text-[#C9A24B] transition-colors">
                  Presidential Suite
                </Link>
              </li>
              <li>
                <Link href="/rooms/heritage-villa-room" className="hover:text-[#C9A24B] transition-colors">
                  Heritage Villa Room
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-[#C9A24B] hover:underline pt-1 inline-block">
                  View All Rooms →
                </Link>
              </li>
            </ul>
          </div>

          {/* Experiences & Services */}
          <div>
            <h3 className="font-serif text-base tracking-wider text-[#C9A24B] uppercase mb-4">
              Explore & Dine
            </h3>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              <li>
                <Link href="/dining" className="hover:text-[#C9A24B] transition-colors">
                  Maharaja Fine Dining
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#C9A24B] transition-colors">
                  Banquet & Weddings
                </Link>
              </li>
              <li>
                <Link href="/spa" className="hover:text-[#C9A24B] transition-colors">
                  Serenity Spa & Wellness
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[#C9A24B] transition-colors">
                  Gwalior Fort & Heritage
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-[#C9A24B] transition-colors">
                  Hotel Facilities
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#C9A24B] transition-colors">
                  Special Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-serif text-base tracking-wider text-[#C9A24B] uppercase mb-4">
              Reach Us
            </h3>
            <ul className="space-y-3 text-xs text-gray-300 font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#C9A24B] transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-[#C9A24B] transition-colors">
                  {email}
                </a>
              </li>
              <li className="pt-2 text-[11px] text-gray-400">
                <span>GST: </span>
                <span className="text-gray-300">{gstNumber}</span>
              </li>
            </ul>
          </div>
        </div>

        <GoldDivider variant="full" withOrnament={false} className="my-8 opacity-20" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {hotelName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-[#C9A24B] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#C9A24B] transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/cancellation-policy" className="hover:text-[#C9A24B] transition-colors">
              Cancellation & Refund Policy
            </Link>
            <span>•</span>
            <Link href="/lookup" className="hover:text-[#C9A24B] transition-colors">
              Booking Lookup
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-[#C9A24B] transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
