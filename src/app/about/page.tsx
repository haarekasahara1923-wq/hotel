import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Award, ShieldCheck, Heart, Users, Sparkles, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GoldDivider } from '@/components/ui/GoldDivider'

const TEAM = [
  {
    name: 'Rajendra Singh Chauhan',
    role: 'General Manager',
    bio: 'With over two decades of fine hospitality leadership across heritage Rajput properties, Rajendra safeguards the spirit of royal hospitality.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600',
  },
  {
    name: 'Executive Chef Vikram Anand',
    role: 'Director of Culinary Arts',
    bio: 'Alumnus of prestigious royal palace kitchens, Chef Vikram curates time-honored Awadhi & Mughal gastronomy with organic indigenous produce.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600',
  },
  {
    name: 'Nidhi Sharma',
    role: 'Head of Guest Concierge',
    bio: 'Devoted to personalizing every stay, ensuring guest desires are anticipated with grace, warmth, and discreet discretion.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920"
            alt="About Royal Blue Heaven"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            The Chronicle of Royal Blue Heaven
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Where Royalty Meets Serenity
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            A bespoke boutique retreat of 20 palatial chambers, handcrafted to celebrate the rich architectural and cultural soul of Gwalior.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[500px] rounded-sm overflow-hidden shadow-xl border-2 border-[#C9A24B]/30">
              <Image
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000"
                alt="Hotel Evening Glow"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block">
              Our Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0B1B3A] leading-tight">
              Honoring centuries of majestic hospitality in Madhya Pradesh
            </h2>
            <GoldDivider variant="narrow" withOrnament={false} className="!mx-0" />
            <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed">
              Founded on the belief that true luxury lies in exclusivity, privacy, and authentic warmth, Royal Blue Heaven was deliberately limited to just 20 chambers. This ensures that every honored guest is greeted by name, their palate catered to by our master chefs, and their comfort watched over with royal reverence.
            </p>
            <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed">
              Located in DD Nagar, Gwalior, our property is a sanctuary away from urban hustle while remaining within 10 minutes of the storied Gwalior Fort and Jai Vilas Palace.
            </p>
          </div>
        </div>
      </div>

      {/* Pillars of Hospitality */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <SectionHeader
          eyebrow="The Royal Standard"
          title="Our Pillars of Devotion"
          subtitle="Every facet of your stay is rooted in four noble traditions."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#C9A24B]/20 p-6 rounded-sm shadow-sm text-center">
            <Sparkles className="w-8 h-8 text-[#C9A24B] mx-auto mb-4" />
            <h3 className="font-serif text-xl font-light text-[#0B1B3A] mb-2">Bespoke Living</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              20 chambers ensure personal attention, dedicated butlers, and tailored services.
            </p>
          </div>

          <div className="bg-white border border-[#C9A24B]/20 p-6 rounded-sm shadow-sm text-center">
            <Heart className="w-8 h-8 text-[#C9A24B] mx-auto mb-4" />
            <h3 className="font-serif text-xl font-light text-[#0B1B3A] mb-2">Atithi Devo Bhava</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Treating each visitor as a divine guest, an age-old philosophy woven into all staff training.
            </p>
          </div>

          <div className="bg-white border border-[#C9A24B]/20 p-6 rounded-sm shadow-sm text-center">
            <Award className="w-8 h-8 text-[#C9A24B] mx-auto mb-4" />
            <h3 className="font-serif text-xl font-light text-[#0B1B3A] mb-2">Culinary Purity</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Fresh farm produce, slow clay-oven cooking, and heirloom royal recipes.
            </p>
          </div>

          <div className="bg-white border border-[#C9A24B]/20 p-6 rounded-sm shadow-sm text-center">
            <ShieldCheck className="w-8 h-8 text-[#C9A24B] mx-auto mb-4" />
            <h3 className="font-serif text-xl font-light text-[#0B1B3A] mb-2">Peace & Seclusion</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              A serene haven designed for deep relaxation, private celebration, and wellness.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <SectionHeader
          eyebrow="Custodians of Hospitality"
          title="Meet Our Leadership Team"
          subtitle="Experienced hoteliers dedicated to crafting unforgettable journeys."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-[#C9A24B]/20 rounded-sm overflow-hidden shadow-sm"
            >
              <div className="relative h-72">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
                  {member.role}
                </span>
                <h3 className="font-serif text-xl font-light text-[#0B1B3A] mb-3">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

