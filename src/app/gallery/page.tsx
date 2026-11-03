'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'

const GALLERY_IMAGES = [
  { category: 'exterior', caption: 'Palatial Facade at Golden Hour', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200' },
  { category: 'exterior', caption: 'Reflecting Pool at Twilight', src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200' },
  { category: 'rooms', caption: 'Royal Suite Four-Poster Chamber', src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200' },
  { category: 'rooms', caption: 'Deluxe Room Ivory Linens', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200' },
  { category: 'rooms', caption: 'Presidential Suite Grand Salon', src: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200' },
  { category: 'rooms', caption: 'Heritage Villa Plunge Pool', src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200' },
  { category: 'dining', caption: 'Maharaja Royal Dining Hall', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200' },
  { category: 'dining', caption: 'Candlelight Courtyard Dinner', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200' },
  { category: 'events', caption: 'Crystal Chandelier Wedding Banquet', src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200' },
  { category: 'events', caption: 'Starlit Lawn Baraat Ceremony', src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200' },
  { category: 'spa', caption: 'Serenity Ayurvedic Sanctuary', src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200' },
  { category: 'spa', caption: 'Heated Infinity Waters at Sunrise', src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200' },
]

export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  const displayed =
    filter === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === filter)

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            Visual Splendor
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            The Royal Gallery
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            Glimpses of refined luxury, intricate Rajput-Mughal details, and starlit banquets at Royal Blue Heaven.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap mb-12">
          {['all', 'rooms', 'exterior', 'dining', 'events', 'spa'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all ${
                filter === cat
                  ? 'bg-[#0B1B3A] text-[#C9A24B] shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxImg(item.src)}
              className="group relative h-80 rounded-sm overflow-hidden cursor-pointer border border-[#C9A24B]/20 shadow-sm"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="font-serif text-lg text-[#FBF8F1]">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full h-[70vh]">
            <Image
              src={lightboxImg}
              alt="Enlarged gallery preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

