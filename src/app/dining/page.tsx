'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Utensils, Clock, CheckCircle, Sparkles, Send } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GoldDivider } from '@/components/ui/GoldDivider'

const MENU_ITEMS = [
  {
    category: 'starters',
    name: 'Galouti Kebab Awadhi',
    price: 650,
    isVeg: false,
    signature: true,
    desc: 'Melt-in-mouth minced lamb patties smoked with cloves, served with Lucknowi sheermal & mint chutney.',
  },
  {
    category: 'starters',
    name: 'Paneer Tikka Angara',
    price: 550,
    isVeg: true,
    signature: true,
    desc: 'Organic cottage cheese steeped in saffron hung-curd marinade and fire-roasted in clay tandoor.',
  },
  {
    category: 'starters',
    name: 'Dahi Ke Kebab',
    price: 500,
    isVeg: true,
    signature: false,
    desc: 'Crisp hung yogurt croquettes infused with green chilies, coriander root, and roasted cumin.',
  },
  {
    category: 'mains',
    name: 'Dal Maharani (12-Hour Slow Cook)',
    price: 450,
    isVeg: true,
    signature: true,
    desc: 'Whole black lentils simmered overnight over charcoal embers, finished with churned white butter and cream.',
  },
  {
    category: 'mains',
    name: 'Royal Dum Gosht Biryani',
    price: 850,
    isVeg: false,
    signature: true,
    desc: 'Aged long-grain Basmati steamed with tender mutton shanks, wild saffron, kewra, and sealed under dough.',
  },
  {
    category: 'mains',
    name: 'Safed Maas Scindia',
    price: 950,
    isVeg: false,
    signature: false,
    desc: 'A royal Gwalior heritage preparation of mutton in rich cashew, poppy seed, and white pepper gravy.',
  },
  {
    category: 'mains',
    name: 'Subz Nizami Handi',
    price: 550,
    isVeg: true,
    signature: false,
    desc: 'Melange of seasonal vegetables simmered in mild almond gravy with aromatic garam masala.',
  },
  {
    category: 'desserts',
    name: 'Shahi Tukda Royal',
    price: 350,
    isVeg: true,
    signature: true,
    desc: 'Crispy ghee-fried bread steeped in saffron syrup, smothered with thick rabri and 24k silver leaf.',
  },
  {
    category: 'desserts',
    name: 'Gulab Ki Kheer',
    price: 300,
    isVeg: true,
    signature: false,
    desc: 'Fragrant rice pudding cooked with fresh organic rose petals and crushed green pistachios.',
  },
  {
    category: 'beverages',
    name: 'Royal Blue Velvet Mocktail',
    price: 350,
    isVeg: true,
    signature: true,
    desc: 'Signature butterfly pea flower infusion with lemon zest, crushed ginger, and sparkling tonic water.',
  },
  {
    category: 'beverages',
    name: 'Kesar Pista Thandai',
    price: 250,
    isVeg: true,
    signature: false,
    desc: 'Chilled rich milk blended with Kashmiri saffron, almonds, pistachios, and green cardamom.',
  },
]

export default function DiningPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [formSubmitted, setFormSubmitted] = useState(false)

  const filteredMenu =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory)

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
            alt="Maharaja Dining Hall"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            Imperial Gastronomy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Maharaja Fine Dining
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            A culinary sanctuary celebrating historic Awadhi, Rajput, and Mughal royal banquets under candlelit domes.
          </p>
        </div>
      </section>

      {/* Dining Hours Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white border border-[#C9A24B]/30 rounded-sm shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-gray-700">
          <div className="p-2 border-b md:border-b-0 md:border-r border-gray-100">
            <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
              Royal Breakfast
            </span>
            <span className="font-medium text-sm text-[#0B1B3A] block">7:00 AM – 10:30 AM</span>
            <span className="text-[11px] text-gray-400">Complimentary buffet for suite guests</span>
          </div>
          <div className="p-2 border-b md:border-b-0 md:border-r border-gray-100">
            <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
              Luncheon Banquet
            </span>
            <span className="font-medium text-sm text-[#0B1B3A] block">12:30 PM – 3:30 PM</span>
            <span className="text-[11px] text-gray-400">À la carte and royal thali selection</span>
          </div>
          <div className="p-2">
            <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
              Dinner Under the Stars
            </span>
            <span className="font-medium text-sm text-[#0B1B3A] block">7:00 PM – 11:30 PM</span>
            <span className="text-[11px] text-gray-400">Live classical sitar melodies & candle service</span>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <SectionHeader
          eyebrow="Curated Carte Du Jour"
          title="The Royal Blue Menu"
          subtitle="Crafted by Executive Chef Vikram Anand using century-old royal recipes and fresh organic spices."
        />

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {['all', 'starters', 'mains', 'desserts', 'beverages'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all ${
                activeCategory === cat
                  ? 'bg-[#0B1B3A] text-[#C9A24B] shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMenu.map((item) => (
            <div
              key={item.name}
              className="bg-white border border-[#C9A24B]/20 p-6 rounded-sm shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                        item.isVeg ? 'border-green-600' : 'border-red-600'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.isVeg ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      />
                    </span>
                    <h3 className="font-serif text-lg text-[#0B1B3A] font-medium">
                      {item.name}
                    </h3>
                  </div>

                  <span className="font-serif text-lg font-semibold text-[#1A3FA3]">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-xs text-gray-600 font-light leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>

              {item.signature && (
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C9A24B] font-medium pt-2 border-t border-gray-50">
                  <Sparkles className="w-3 h-3" />
                  <span>Chef's Signature Creation</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Table Reservation Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white border-2 border-[#C9A24B] rounded-sm p-8 sm:p-12 shadow-lg">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-1">
              Table Reservation
            </span>
            <h2 className="font-serif text-3xl text-[#0B1B3A] font-light">
              Reserve Your Table at Maharaja
            </h2>
            <p className="text-xs text-gray-500 font-light mt-1">
              For walk-in diners and in-house guests. Special occasion arrangements gladly accommodated.
            </p>
          </div>

          {formSubmitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle className="w-12 h-12 text-[#C9A24B] mx-auto" />
              <h3 className="font-serif text-2xl text-[#0B1B3A]">
                Table Request Received
              </h3>
              <p className="text-xs text-gray-600 font-light max-w-md mx-auto">
                Thank you! Our dining captain will call you shortly on WhatsApp to confirm your table placement and dietary preferences.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReservation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Mobile / WhatsApp *
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
                    Date of Dining *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Meal Preference *
                  </label>
                  <select className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B] bg-white">
                    <option>Dinner (7:00 PM - 11:30 PM)</option>
                    <option>Luncheon (12:30 PM - 3:30 PM)</option>
                    <option>Breakfast (7:00 AM - 10:30 AM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Number of Guests *
                  </label>
                  <select className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B] bg-white">
                    {[1, 2, 3, 4, 5, 6, 8, 10, '12+ Private Dining'].map((g) => (
                      <option key={g} value={g}>
                        {g} {typeof g === 'number' && g === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                    Special Occasion
                  </label>
                  <select className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B] bg-white">
                    <option>Romantic Dinner / Anniversary</option>
                    <option>Birthday Celebration</option>
                    <option>Family Gathering</option>
                    <option>Business Dinner</option>
                    <option>Casual Dining</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium mb-1">
                  Special Notes or Seating Request
                </label>
                <textarea
                  rows={2}
                  placeholder="Candlelight setup, floral centerpieces, vegan options..."
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B1B3A] text-[#C9A24B] font-semibold text-xs uppercase tracking-widest py-3 rounded-sm hover:bg-[#1A3FA3] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Table Reservation</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

