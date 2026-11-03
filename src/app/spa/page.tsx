'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Clock, Check, Send, CheckCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const SPA_SERVICES = [
  {
    name: 'Royal Abhyanga (Two-Therapist Massage)',
    duration: '90 Minutes',
    price: 5500,
    category: 'Ayurvedic Bodywork',
    desc: 'The ancient art of synchronized warm herbal oil massage performed by two master therapists to stimulate vitality and dissolve physical tension.',
  },
  {
    name: 'Shirodhara (Mind & Nerve Calming)',
    duration: '60 Minutes',
    price: 4500,
    category: 'Vedic Therapy',
    desc: 'A continuous, soothing stream of warm herbal medicated oil poured gently over the third-eye chakra to alleviate insomnia, anxiety, and mental fatigue.',
  },
  {
    name: '24-Karat Gold Leaf Imperial Facial',
    duration: '75 Minutes',
    price: 6500,
    category: 'Royal Skincare',
    desc: 'Pure 24k gold leaf sheets massaged into cleansed skin alongside saffron extract and almond oils to impart an imperial radiance and firm elasticity.',
  },
  {
    name: 'Kansa Vatki Detox Foot & Bodywork',
    duration: '60 Minutes',
    price: 3800,
    category: 'Energy Balancing',
    desc: 'An ancient massage using a traditional bronze Kansa bowl and clarified ghee to balance vital doshas and draw out toxins.',
  },
  {
    name: 'The Royal Couples’ Sanctuary Journey',
    duration: '120 Minutes',
    price: 12000,
    category: 'Couples Retreat',
    desc: 'A private retreat for two featuring a champagne welcome, synchronized full-body massage, aromatic rose petal milk bath, and fruit fondue.',
  },
  {
    name: 'Pink Himalayan Crystal Salt Polish',
    duration: '60 Minutes',
    price: 4000,
    category: 'Exfoliation',
    desc: 'Full-body exfoliation using raw pink crystal salts and cold-pressed sesame oil, followed by an ultra-nourishing botanical body wrap.',
  },
]

export default function SpaPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920"
            alt="Serenity Spa"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            Holistic Vedic Rejuvenation
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Serenity Spa & Wellness
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            Surrender to ancient Ayurvedic healing rituals, fragrant warm botanical oils, and transformative wellness therapies.
          </p>
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <SectionHeader
          eyebrow="Spa Menu"
          title="Sacred Healing Therapies"
          subtitle="Delivered by certified Ayurvedic practitioners using hand-pressed botanical oils from Kerala."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPA_SERVICES.map((s) => (
            <div
              key={s.name}
              className="bg-white border border-[#C9A24B]/20 p-6 rounded-sm shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
                  {s.category}
                </span>

                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-xl font-light text-[#0B1B3A]">
                    {s.name}
                  </h3>
                  <span className="font-serif text-lg font-semibold text-[#1A3FA3] shrink-0">
                    ₹{s.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                  <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>{s.duration}</span>
                </div>

                <p className="text-xs text-gray-600 font-light leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              <a
                href="#spa-booking"
                className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#0B1B3A] text-[#0B1B3A] hover:bg-[#0B1B3A] hover:text-white rounded-sm transition-colors block"
              >
                Book This Ritual
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Spa Appointment Booking Form */}
      <div id="spa-booking" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white border-2 border-[#C9A24B] rounded-sm p-8 shadow-lg">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
              Appointment Scheduling
            </span>
            <h2 className="font-serif text-2xl text-[#0B1B3A]">
              Reserve Your Spa Treatment
            </h2>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle className="w-10 h-10 text-[#C9A24B] mx-auto" />
              <h3 className="font-serif text-xl text-[#0B1B3A]">
                Spa Ritual Requested
              </h3>
              <p className="text-xs text-gray-600">
                Our spa concierge will contact you to confirm the exact therapist schedule and oil preferences.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Your Name *</label>
                <input required type="text" className="w-full px-3 py-2 border rounded-sm" placeholder="Full name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone / WhatsApp *</label>
                  <input required type="tel" className="w-full px-3 py-2 border rounded-sm" placeholder="+91..." />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Preferred Date *</label>
                  <input required type="date" min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border rounded-sm" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Select Ritual *</label>
                <select className="w-full px-3 py-2 border rounded-sm bg-white">
                  {SPA_SERVICES.map((s) => (
                    <option key={s.name}>{s.name} (₹{s.price})</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0B1B3A] text-[#C9A24B] font-semibold uppercase tracking-widest py-3 rounded-sm hover:bg-[#1A3FA3] hover:text-white transition-colors"
              >
                Confirm Spa Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

