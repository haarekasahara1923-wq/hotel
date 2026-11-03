import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sparkles,
  Wifi,
  Coffee,
  Tv,
  Bath,
  ArrowRight,
  Star,
  MapPin,
  Utensils,
  Award,
  Heart,
  ShieldCheck,
} from 'lucide-react'
import { BookingSearchBar } from '@/components/booking/BookingSearchBar'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GoldDivider } from '@/components/ui/GoldDivider'

const FEATURED_ROOMS = [
  {
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    tagline: 'Refined Comfort & City Views',
    size: '350 sq ft',
    bed: 'King Bed',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
    amenities: ['Free Wi-Fi', 'Smart TV', 'Mini Bar', 'City View'],
  },
  {
    name: 'Premier Suite',
    slug: 'premier-suite',
    tagline: 'Spacious Suite with Private Balcony',
    size: '600 sq ft',
    bed: 'King Bed',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200',
    amenities: ['Living Area', 'Private Balcony', 'Bathtub', 'Butler Service'],
  },
  {
    name: 'Royal Suite',
    slug: 'royal-suite',
    tagline: 'Palatial Grandeur with Mughal Art',
    size: '900 sq ft',
    bed: 'King Four-Poster',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
    amenities: ['Four-Poster Bed', 'Marble Bath', 'Mughal Art', '24/7 Butler'],
  },
  {
    name: 'Presidential Suite',
    slug: 'presidential-suite',
    tagline: 'The Ultimate Epitome of Opulence',
    size: '1800 sq ft',
    bed: 'Super King',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200',
    amenities: ['Grand Piano', 'Private Jacuzzi', 'Dining for 6', 'Dedicated Butler'],
  },
  {
    name: 'Heritage Villa Room',
    slug: 'heritage-villa-room',
    tagline: 'Private Courtyard & Plunge Pool',
    size: '1200 sq ft',
    bed: 'King Bed',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
    amenities: ['Plunge Pool', 'Private Courtyard', 'Jaali Screens', 'Bonfire on request'],
  },
]

const EXPERIENCES = [
  {
    title: 'Gwalior Fort',
    distance: '3.5 km',
    desc: 'The legendary "Pearl in the necklace of forts of India", featuring Man Singh Palace and rock-cut Jain statues.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
  },
  {
    title: 'Jai Vilas Palace & Museum',
    distance: '4.0 km',
    desc: 'The Scindia royal residence with the world’s largest chandeliers and gold dining train.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
  },
  {
    title: 'Sas-Bahu Temples',
    distance: '4.5 km',
    desc: 'Exquisite 11th-century carved stone temples with breathtaking panoramic valley vistas.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
  },
  {
    title: 'Tansen Memorial & Music Heritage',
    distance: '5.0 km',
    desc: 'Honor the immortal father of Indian classical music in the city of rhythmic melodies.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
  },
]

const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    city: 'New Delhi',
    rating: 5,
    title: 'A Royal Experience Beyond Compare',
    comment:
      'Royal Blue Heaven exceeded every expectation. The Presidential Suite was magnificent — the blue marble with gold inlay, the panoramic view, and the staff treated us like royalty.',
  },
  {
    name: 'Priya & Vikram Mehta',
    city: 'Mumbai',
    rating: 5,
    title: 'Magical Wedding Anniversary',
    comment:
      'Our stay in the Royal Suite was pure magic. The private dinner, rose petals, and attentive butler service made our 10th anniversary an unforgettable fairy tale.',
  },
  {
    name: 'Aditya Kapoor',
    city: 'Bengaluru',
    rating: 5,
    title: 'Finest Hospitality in Central India',
    comment:
      'Impeccable dining at Maharaja, lightning-fast Wi-Fi, and a serene spa. Hands down the premier luxury hotel in Gwalior.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between bg-[#0B1B3A] text-white overflow-hidden">
        {/* Background Image with Dark Navy & Gold Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
            alt="Royal Blue Heaven Hotel Exterior"
            fill
            priority
            className="object-cover object-center brightness-[0.45] scale-105 transition-transform duration-10000 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-[#0B1B3A]/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-36 pb-12 flex-1 flex flex-col justify-center items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A24B]/40 bg-[#0B1B3A]/60 backdrop-blur-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-medium">
              Boutique Luxury • 20 Royal Chambers
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide text-[#FBF8F1] mb-4 leading-[1.1]">
            Where Royalty Meets Serenity
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#C9A24B] font-light max-w-2xl mb-8">
            Royal Blue Heaven — DD Nagar, Gwalior
          </p>

          <p className="text-sm sm:text-base text-gray-200 font-light max-w-2xl mb-10 leading-relaxed">
            Step into an opulent heritage sanctuary where time-honored Mughal splendor, bespoke butler service, and contemporary indulgence converge.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/book"
              className="w-full sm:w-auto bg-[#C9A24B] text-[#0B1B3A] font-semibold text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-[#E8D5A3] transition-all duration-300 shadow-[0_4px_20px_rgba(201,162,75,0.4)]"
            >
              Reserve Your Stay
            </Link>
            <Link
              href="/rooms"
              className="w-full sm:w-auto border border-[#C9A24B] text-[#FBF8F1] font-medium text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-[#C9A24B]/20 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Chambers
            </Link>
          </div>
        </div>

        {/* Floating Booking Search Bar */}
        <div className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mb-10 sm:-mb-12">
          <BookingSearchBar variant="glass" />
        </div>
      </section>

      {/* ── 2. ROYAL STATS & STORY ────────────────────────────────────────── */}
      <section className="pt-24 pb-20 bg-[#FBF8F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key Stat Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 text-center">
            <div className="p-6 bg-white border border-[#C9A24B]/20 rounded-sm shadow-sm">
              <span className="font-serif text-3xl sm:text-4xl text-[#1A3FA3] font-light block mb-1">
                20
              </span>
              <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">
                Luxury Rooms & Suites
              </span>
            </div>
            <div className="p-6 bg-white border border-[#C9A24B]/20 rounded-sm shadow-sm">
              <span className="font-serif text-3xl sm:text-4xl text-[#1A3FA3] font-light block mb-1">
                15+
              </span>
              <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">
                Years of Royal Heritage
              </span>
            </div>
            <div className="p-6 bg-white border border-[#C9A24B]/20 rounded-sm shadow-sm">
              <span className="font-serif text-3xl sm:text-4xl text-[#1A3FA3] font-light block mb-1">
                4.9 ★
              </span>
              <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">
                Guest Satisfaction
              </span>
            </div>
            <div className="p-6 bg-white border border-[#C9A24B]/20 rounded-sm shadow-sm">
              <span className="font-serif text-3xl sm:text-4xl text-[#1A3FA3] font-light block mb-1">
                5000+
              </span>
              <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">
                Cherished Stays
              </span>
            </div>
          </div>

          {/* Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative h-[450px] sm:h-[520px] rounded-sm overflow-hidden shadow-2xl border-2 border-[#C9A24B]/40">
                <Image
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1000"
                  alt="Opulent Royal Blue Heaven Lobby"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#0B1B3A] text-white p-6 rounded-sm border border-[#C9A24B] shadow-xl max-w-xs">
                <p className="font-serif italic text-sm text-[#C9A24B] mb-1">
                  "Hospitality is not an industry — it is an ancient art of royal devotion."
                </p>
                <span className="text-[10px] uppercase tracking-wider text-gray-400">
                  — The Chauhan Legacy
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-2">
                Our Heritage & Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#0B1B3A] tracking-tight leading-tight mb-6">
                A Regal Haven in the Cradle of Gwalior Royalty
              </h2>
              <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed mb-6">
                Situated in DD Nagar, Gwalior, Royal Blue Heaven was envisioned as an intimate jewel box of just 20 exquisitely appointed suites. Drawing inspiration from the deep cobalt and antique gold motifs of royal Rajput and Scindia architecture, each corner evokes an atmosphere of timeless grace.
              </p>
              <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed mb-8">
                Whether dining under starlit domes at Maharaja Fine Dining, surrendering to Vedic healing in our Serenity Spa, or gazing upon historic hilltops from your private balcony, every moment at Royal Blue Heaven is choreographed to pamper you.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#C9A24B]/20">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C9A24B]" />
                  <span className="text-xs sm:text-sm font-medium text-[#0B1B3A]">
                    Best Rate Guaranteed
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#C9A24B]" />
                  <span className="text-xs sm:text-sm font-medium text-[#0B1B3A]">
                    24/7 Dedicated Butler
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED ROOMS & SUITES ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1B3A] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sanctuary of Comfort"
            title="Rooms & Palatial Suites"
            subtitle="Curated with hand-loomed royal blue silks, carved mahogany, and deep marble baths."
            dark={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_ROOMS.map((room) => (
              <div
                key={room.slug}
                className="group bg-white/5 border border-[#C9A24B]/25 hover:border-[#C9A24B] rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(201,162,75,0.15)]"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-[#0B1B3A]/80 backdrop-blur-md px-3 py-1 rounded-sm border border-[#C9A24B]/40 text-[#C9A24B] text-xs font-semibold">
                      ₹{room.price.toLocaleString('en-IN')} / night
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-gray-400 font-light mb-2">
                      <span>{room.size}</span>
                      <span>•</span>
                      <span>{room.bed}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-light text-[#FBF8F1] mb-2 group-hover:text-[#C9A24B] transition-colors">
                      {room.name}
                    </h3>

                    <p className="text-xs text-gray-300 font-light mb-4 line-clamp-2">
                      {room.tagline}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-white/10 text-gray-300 border border-white/5"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="flex-1 text-center py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#C9A24B] text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B1B3A] rounded-sm transition-all duration-200"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/book/${room.slug}`}
                    className="flex-1 text-center py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#C9A24B] text-[#0B1B3A] hover:bg-[#E8D5A3] rounded-sm transition-all duration-200 shadow-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9A24B] hover:text-white transition-colors"
            >
              <span>Explore All 20 Chambers & Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. FINE DINING & AMENITIES ──────────────────────────────────────── */}
      <section className="py-24 bg-[#FBF8F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Gastronomy & Wellness"
            title="The Royal Blue Indulgence"
            subtitle="From Awadhi slow-cooked banquets to heated infinity waters."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#C9A24B]/20 p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#1A3FA3]/10 flex items-center justify-center text-[#1A3FA3] mb-6">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-light text-[#0B1B3A] mb-3">
                Maharaja Fine Dining
              </h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
                Savor centuries-old royal Awadhi recipes, including 12-hour Dal Maharani, Dum Biryani, and saffron mocktails curated by Executive Chef Vikram Anand.
              </p>
              <Link
                href="/dining"
                className="text-xs uppercase tracking-wider font-semibold text-[#1A3FA3] hover:text-[#C9A24B] transition-colors flex items-center gap-1.5"
              >
                <span>View Menu & Reserve</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white border border-[#C9A24B]/20 p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#C9A24B]/15 flex items-center justify-center text-[#C9A24B] mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-light text-[#0B1B3A] mb-3">
                Serenity Ayurvedic Spa
              </h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
                Rejuvenate body and mind with authentic Kansa bowl detox, synchronized two-therapist Abhyanga, and soothing Shirodhara oil rituals.
              </p>
              <Link
                href="/spa"
                className="text-xs uppercase tracking-wider font-semibold text-[#1A3FA3] hover:text-[#C9A24B] transition-colors flex items-center gap-1.5"
              >
                <span>Discover Treatments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white border border-[#C9A24B]/20 p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#6B0F1A]/10 flex items-center justify-center text-[#6B0F1A] mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-light text-[#0B1B3A] mb-3">
                Banquets & Celebrations
              </h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
                Host intimate royal weddings and distinguished corporate gatherings up to 300 guests with crystal chandeliers and manicured courtyards.
              </p>
              <Link
                href="/events"
                className="text-xs uppercase tracking-wider font-semibold text-[#1A3FA3] hover:text-[#C9A24B] transition-colors flex items-center gap-1.5"
              >
                <span>Event Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. GWALIOR EXPERIENCES ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1B3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Explore Gwalior"
            title="Historic Wonders at Your Doorstep"
            subtitle="Royal Blue Heaven is ideally located within minutes of Central India’s grandest heritage landmarks."
            dark={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCES.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-sm overflow-hidden group hover:border-[#C9A24B]/60 transition-colors"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#0B1B3A]/80 backdrop-blur-sm px-2.5 py-0.5 rounded-sm text-[10px] text-[#C9A24B] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.distance}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-light text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FBF8F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Guest Sentiments"
            title="Voices of Delight"
            subtitle="Read true reflections from guests who experienced the hospitality of Royal Blue Heaven."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-[#C9A24B]/20 p-8 rounded-sm shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C9A24B] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A24B]" />
                    ))}
                  </div>
                  <h4 className="font-serif text-xl font-light text-[#0B1B3A] mb-3">
                    "{t.title}"
                  </h4>
                  <p className="text-sm text-gray-600 font-light italic leading-relaxed mb-6">
                    {t.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0B1B3A]">
                    {t.name}
                  </span>
                  <span className="text-[11px] text-gray-500">{t.city}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="text-xs uppercase tracking-widest text-[#1A3FA3] hover:text-[#C9A24B] transition-colors font-semibold"
            >
              Read All 500+ Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. ROYAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#0B1B3A] via-[#1A3FA3] to-[#0B1B3A] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-3">
            Best Online Rate Guarantee
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FBF8F1] mb-6">
            Begin Your Regal Journey at Royal Blue Heaven
          </h2>
          <p className="text-sm sm:text-base text-gray-200 font-light mb-10 max-w-xl mx-auto">
            Book directly through our website to enjoy complimentary airport transfer, welcome champagne, and 15% off spa therapies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="w-full sm:w-auto bg-[#C9A24B] text-[#0B1B3A] font-semibold text-xs sm:text-sm uppercase tracking-widest px-9 py-4 rounded-sm hover:bg-[#E8D5A3] transition-all shadow-[0_4px_24px_rgba(201,162,75,0.4)]"
            >
              Book Direct Now
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto border border-white/30 text-white font-medium text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-white/10 transition-colors"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
