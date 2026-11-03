'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Users, Sparkles, Check, Send, CheckCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EVENT_PACKAGES = [
  {
    title: 'The Royal Wedding Celebration',
    type: 'Wedding',
    capacity: 'Up to 300 Guests',
    price: 500000,
    desc: 'Transform your auspicious day into an unforgettable royal fairy tale. Full property buyout with mandap decoration, floral arrangements, multi-course banquet, and bridal suite.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    features: [
      'Crystal Chandelier Banquet Hall',
      'Manicured Open Lawn for Baraat',
      'Dedicated Wedding Concierge Team',
      'Customized 7-Course Royal Feast',
      'Bridal Suite on Wedding Night',
      'Valet Parking for 50+ Vehicles',
      'Sound & DJ Stage Permissions',
      'Custom Tiered Wedding Cake',
    ],
  },
  {
    title: 'Corporate Summit & Executive Retreat',
    type: 'Corporate',
    capacity: 'Up to 150 Delegates',
    price: 75000,
    desc: 'State-of-the-art audiovisual facilities, high-speed Wi-Fi, breakout spaces, and executive catering for board meetings, seminars, and product launches.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    features: [
      'Dual 4K Laser Projection Displays',
      'High-Speed Dedicated 300 Mbps Wi-Fi',
      'Conference Stationery & Mints',
      'Executive Luncheon & Tea Breaks',
      'Video Conferencing Infrastructure',
      'Podium, Collar & Handheld Mics',
      'Business Center Secretarial Support',
      'Special Room Rates for Attendees',
    ],
  },
  {
    title: 'Imperial Anniversary & Birthday Soirée',
    type: 'Social',
    capacity: 'Up to 60 Guests',
    price: 35000,
    desc: 'An intimate, luxurious gathering with mood candlelight, personalized music, curated cocktail menu, and gourmet dining for your closest companions.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
    features: [
      'Private Rooftop or Banquet Hall',
      'Thematic Gold & Blue Floral Decor',
      'Customized Celebration Cake',
      'Signature Welcome Cocktails',
      'Dedicated Butler Service',
      'Photobooth with Royal Props',
      'Curated Music Playlist Support',
      'Personalized Menu Keepsakes',
    ],
  },
]

export default function EventsPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920"
            alt="Events & Banquets"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            Grand Celebrations & Summits
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Banquets & Royal Events
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            From regal palace weddings to distinguished corporate gatherings, our majestic halls and lawns set the benchmark for landmark moments.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <SectionHeader
          eyebrow="Curated Occasions"
          title="Bespoke Event Packages"
          subtitle="Everything you need for an effortless, grand gathering in Gwalior."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EVENT_PACKAGES.map((pkg) => (
            <div
              key={pkg.title}
              className="bg-white border border-[#C9A24B]/20 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1B3A]/80 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-semibold text-[#C9A24B] border border-[#C9A24B]/30">
                    {pkg.type}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 font-light">
                      Capacity: {pkg.capacity}
                    </span>
                    <span className="text-xs font-semibold text-[#1A3FA3]">
                      From ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-light text-[#0B1B3A] mb-3">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-gray-600 font-light leading-relaxed mb-6">
                    {pkg.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="#enquiry-form"
                  className="w-full bg-[#0B1B3A] text-[#C9A24B] text-center font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded-sm hover:bg-[#1A3FA3] hover:text-white transition-colors block"
                >
                  Request Package Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Enquiry Form */}
      <div id="enquiry-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white border-2 border-[#C9A24B] rounded-sm p-8 sm:p-12 shadow-lg">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-1">
              Event Concierge
            </span>
            <h2 className="font-serif text-3xl text-[#0B1B3A] font-light">
              Plan Your Royal Event
            </h2>
            <p className="text-xs text-gray-500 font-light mt-1">
              Share your vision and our senior events director will connect with customized layouts and packages.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle className="w-12 h-12 text-[#C9A24B] mx-auto" />
              <h3 className="font-serif text-2xl text-[#0B1B3A]">
                Event Proposal Initiated
              </h3>
              <p className="text-xs text-gray-600 font-light max-w-md mx-auto">
                Thank you! Our Events Director will review your dates and guest numbers, then contact you within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEnquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Contact Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Type of Event *
                  </label>
                  <select className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B] bg-white">
                    <option>Wedding & Reception</option>
                    <option>Sangeet / Mehendi Ceremony</option>
                    <option>Corporate Summit / Meeting</option>
                    <option>Anniversary / Birthday Party</option>
                    <option>Product Launch / Exhibition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Expected Guests
                  </label>
                  <select className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B] bg-white">
                    <option>20 - 50 Guests</option>
                    <option>50 - 100 Guests</option>
                    <option>100 - 200 Guests</option>
                    <option>200 - 300 Guests (Full Buyout)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                  Tell Us About Your Vision & Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Catering preferences, room stay requirements, floral decorations..."
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C9A24B] text-[#0B1B3A] font-semibold text-xs uppercase tracking-widest py-3 rounded-sm hover:bg-[#E8D5A3] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit Event Proposal Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

