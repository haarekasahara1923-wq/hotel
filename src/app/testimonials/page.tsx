'use client'

import React, { useState } from 'react'
import { Star, CheckCircle, Send } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const REVIEWS = [
  {
    name: 'Rahul Sharma',
    city: 'New Delhi',
    rating: 5,
    date: 'October 2024',
    title: 'A Royal Experience Beyond Compare',
    comment:
      'Royal Blue Heaven exceeded every expectation. The Presidential Suite was magnificent — the blue marble with gold inlay, the panoramic view, and the staff treated us like royalty. We will return for our anniversary every year!',
  },
  {
    name: 'Priya & Vikram Mehta',
    city: 'Mumbai',
    rating: 5,
    date: 'November 2024',
    title: 'Magical Wedding Anniversary',
    comment:
      'Our stay in the Royal Suite was pure magic. The private dinner, rose petals, and attentive butler service made our 10th anniversary an unforgettable fairy tale. The Dal Maharani at Maharaja was the best we have ever had.',
  },
  {
    name: 'Aditya Kapoor',
    city: 'Bengaluru',
    rating: 5,
    date: 'September 2024',
    title: 'Finest Hospitality in Central India',
    comment:
      'Travelled for work and upgraded to the Premier Suite — worth every rupee. Fast Wi-Fi, excellent breakfast, professional staff. The conference facilities are top-notch too. My go-to whenever I visit Gwalior.',
  },
  {
    name: 'Sneha & Raj Gupta',
    city: 'Kolkata',
    rating: 5,
    date: 'August 2024',
    title: 'Honeymoon Made in Heaven',
    comment:
      'Every detail was perfect. The Heritage Villa with its private plunge pool and courtyard was romantic beyond words. The evening bonfire under the stars was unforgettable. Thank you RBH team!',
  },
  {
    name: 'Suresh Agarwal',
    city: 'Jaipur',
    rating: 5,
    date: 'July 2024',
    title: 'Impeccable Service & Privacy',
    comment:
      'From check-in to checkout, the service was flawless. Having only 20 rooms means you get total tranquility and attention. The butler in the Royal Suite anticipated every need before we could ask.',
  },
  {
    name: 'Anjali Desai',
    city: 'Pune',
    rating: 5,
    date: 'October 2024',
    title: 'The Spa is Sheer Bliss',
    comment:
      'The Ayurvedic spa treatments here are truly therapeutic. The therapists are highly skilled and the atmosphere is serene. Paired with the gorgeous room, I left feeling completely rejuvenated.',
  },
]

export default function TestimonialsPage() {
  const [submitted, setSubmitted] = useState(false)
  const [rating, setRating] = useState(5)

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
            Reflections of Royalty
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Guest Testimonials
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            Honest experiences from travelers who have made Royal Blue Heaven their sanctuary in Gwalior.
          </p>
        </div>
      </section>

      {/* Summary Score Banner */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white border border-[#C9A24B]/30 rounded-sm shadow-md p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
          <div>
            <span className="font-serif text-5xl font-light text-[#1A3FA3] block">
              4.9
            </span>
            <div className="flex items-center justify-center gap-1 text-[#C9A24B] my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C9A24B]" />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-light">Overall Guest Rating</span>
          </div>

          <div className="h-12 w-[1px] bg-gray-200 hidden sm:block" />

          <div>
            <span className="font-serif text-3xl font-light text-[#0B1B3A] block">
              98%
            </span>
            <span className="text-xs text-gray-500 font-light">
              Guests would recommend to family & friends
            </span>
          </div>

          <div className="h-12 w-[1px] bg-gray-200 hidden sm:block" />

          <div>
            <a
              href="#review-form"
              className="bg-[#C9A24B] text-[#0B1B3A] px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#E8D5A3] transition-colors inline-block"
            >
              Write a Review
            </a>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-white border border-[#C9A24B]/20 p-8 rounded-sm shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#C9A24B]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A24B]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">{r.date}</span>
                </div>

                <h3 className="font-serif text-xl font-light text-[#0B1B3A] mb-3">
                  "{r.title}"
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed mb-6">
                  {r.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#0B1B3A] block">
                    {r.name}
                  </span>
                  <span className="text-[11px] text-gray-500">{r.city}</span>
                </div>
                <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-sm border border-green-200">
                  Verified Guest
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Review Form */}
      <div id="review-form" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white border-2 border-[#C9A24B] rounded-sm p-8 shadow-lg">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
              Guest Feedback
            </span>
            <h2 className="font-serif text-2xl text-[#0B1B3A]">
              Share Your Royal Experience
            </h2>
            <p className="text-xs text-gray-500 font-light mt-1">
              Your feedback is moderated by our guest relations team to maintain quality and privacy.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle className="w-10 h-10 text-[#C9A24B] mx-auto" />
              <h3 className="font-serif text-xl text-[#0B1B3A]">
                Review Submitted with Gratitude
              </h3>
              <p className="text-xs text-gray-600">
                Thank you for your valuable words. Once approved by our team, it will appear on our guest wall.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Your Name *</label>
                  <input required type="text" className="w-full px-3 py-2 border rounded-sm" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">City / Country *</label>
                  <input required type="text" className="w-full px-3 py-2 border rounded-sm" placeholder="e.g. New Delhi" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1.5 rounded-sm border ${
                        rating >= star ? 'border-[#C9A24B] text-[#C9A24B]' : 'border-gray-200 text-gray-400'
                      }`}
                    >
                      <Star className={`w-5 h-5 ${rating >= star ? 'fill-[#C9A24B]' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Review Title *</label>
                <input required type="text" className="w-full px-3 py-2 border rounded-sm" placeholder="e.g. Unforgettable Honeymoon Stay" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Your Detailed Feedback *</label>
                <textarea required rows={4} className="w-full px-3 py-2 border rounded-sm" placeholder="Describe your room, dining, spa, and hospitality experience..." />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B1B3A] text-[#C9A24B] font-semibold uppercase tracking-widest py-3 rounded-sm hover:bg-[#1A3FA3] hover:text-white transition-colors"
              >
                Post Guest Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

