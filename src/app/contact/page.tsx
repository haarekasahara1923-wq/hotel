'use client'

import React, { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GoldDivider } from '@/components/ui/GoldDivider'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            Warm Hospitality Awaits
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Connect With Our Royal Concierge
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            Our reservation concierges and front desk executives are delighted to assist you 24 hours a day.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#C9A24B]/30 p-8 rounded-sm shadow-sm">
              <h2 className="font-serif text-2xl text-[#0B1B3A] mb-4">
                Hotel Location & Inquiries
              </h2>
              <GoldDivider variant="narrow" withOrnament={false} className="!mx-0 mb-6" />

              <div className="space-y-6 text-xs text-gray-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#1A3FA3]/10 flex items-center justify-center text-[#1A3FA3] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0B1B3A] block text-sm">
                      Address
                    </span>
                    <p className="font-light text-gray-600 mt-0.5">
                      Royal Blue Heaven, DD Nagar, Gwalior, Madhya Pradesh 474011, India
                    </p>
                    <span className="text-[11px] text-[#C9A24B] font-medium block mt-1">
                      (10 minutes from Gwalior Railway Station & Airport)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#1A3FA3]/10 flex items-center justify-center text-[#1A3FA3] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0B1B3A] block text-sm">
                      Direct Telephone
                    </span>
                    <a
                      href="tel:+919876543210"
                      className="font-light text-gray-600 hover:text-[#C9A24B] block mt-0.5"
                    >
                      +91 98765 43210 (24/7 Desk)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0B1B3A] block text-sm">
                      WhatsApp Concierge
                    </span>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noreferrer"
                      className="font-light text-gray-600 hover:text-[#25D366] block mt-0.5"
                    >
                      +91 98765 43210 (Instant Assistance)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#1A3FA3]/10 flex items-center justify-center text-[#1A3FA3] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0B1B3A] block text-sm">
                      Electronic Mail
                    </span>
                    <a
                      href="mailto:info@royalblueheaven.com"
                      className="font-light text-gray-600 hover:text-[#C9A24B] block mt-0.5"
                    >
                      info@royalblueheaven.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#1A3FA3]/10 flex items-center justify-center text-[#1A3FA3] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0B1B3A] block text-sm">
                      Check-In & Check-Out
                    </span>
                    <p className="font-light text-gray-600 mt-0.5">
                      Check-in from 2:00 PM | Check-out until 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white border border-[#C9A24B]/30 rounded-sm overflow-hidden shadow-sm h-64 relative">
              <iframe
                title="Royal Blue Heaven Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14316.536780775988!2d78.18283!3d26.21828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c68c6e263c95%3A0x6b45063f1f3efd38!2sDeen%20Dayal%20Nagar%2C%20Gwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-[#C9A24B] rounded-sm p-8 sm:p-10 shadow-lg">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-1">
                Direct Message
              </span>
              <h2 className="font-serif text-3xl text-[#0B1B3A] font-light mb-6">
                Send an Enquiry
              </h2>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-[#C9A24B] mx-auto" />
                  <h3 className="font-serif text-2xl text-[#0B1B3A]">
                    Message Dispatched
                  </h3>
                  <p className="text-xs text-gray-600 font-light max-w-sm mx-auto">
                    Thank you for reaching out. Our front desk manager has received your inquiry and will respond within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                        Subject of Inquiry
                      </label>
                      <select className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B] bg-white">
                        <option>Room & Suite Reservations</option>
                        <option>Maharaja Table Booking</option>
                        <option>Banquet & Wedding Packages</option>
                        <option>Airport Chauffeur Transfer</option>
                        <option>General Concierge Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your inquiry or specific dates here..."
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B1B3A] text-[#C9A24B] font-semibold text-xs uppercase tracking-widest py-3 rounded-sm hover:bg-[#1A3FA3] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

