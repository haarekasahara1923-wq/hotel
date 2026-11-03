import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Wifi,
  Car,
  Clock,
  Sparkles,
  Utensils,
  ShieldCheck,
  Coffee,
  Tv,
  CheckCircle,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const FACILITIES_LIST = [
  {
    title: 'Heated Infinity Swimming Pool',
    category: 'Leisure',
    desc: 'Maintained at a soothing 28°C year-round, flanked by cabanas, white sun loungers, and poolside refreshments. Open 6:00 AM – 10:00 PM daily.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
  },
  {
    title: '24-Hour Fitness Centre',
    category: 'Wellness',
    desc: 'Equipped with LifeFitness treadmills, ellipticals, dumbbells, kettlebells, yoga mats, and personal training support upon request.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  },
  {
    title: 'Serenity Ayurvedic Spa',
    category: 'Wellness',
    desc: 'Features authentic steam suites, private massage sanctuaries, a specialized Kansa detox chamber, and Vedic herbal therapies.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
  },
  {
    title: 'Valet Parking & Chauffeur Fleet',
    category: 'Convenience',
    desc: 'Complimentary valet parking for up to 50 cars with 24/7 security surveillance and private Mercedes/Innova airport chauffeur transfers.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  },
  {
    title: 'Executive Business Center',
    category: 'Business',
    desc: 'High-speed color laser printing, private video-conferencing booths, secretarial assistance, and quiet meeting chambers.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  },
  {
    title: '24/7 In-Room Royal Dining',
    category: 'Gastronomy',
    desc: 'Around-the-clock hot dining service delivered to your chamber with silver cloches, fine bone china, and customized late-night menus.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
  },
]

export default function FacilitiesPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            Comfort & Refinement
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Facilities & Amenities
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            Every convenience thoughtfully arranged to make your stay effortless, restorative, and memorable.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES_LIST.map((fac) => (
            <div
              key={fac.title}
              className="bg-white border border-[#C9A24B]/20 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-56">
                <Image
                  src={fac.image}
                  alt={fac.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0B1B3A]/85 backdrop-blur-sm px-2.5 py-1 rounded-sm text-[11px] text-[#C9A24B] font-medium border border-[#C9A24B]/30">
                  {fac.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl font-light text-[#0B1B3A] mb-3">
                  {fac.title}
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

