import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tag, Calendar, Check, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const OFFERS = [
  {
    title: 'The Royal Honeymoon Retreat',
    code: 'HONEY30',
    discount: '30% Off Royal Suite',
    desc: 'Celebrate eternal love in our palatial Royal Suite. Includes candlelit dinner under the stars, rose petal turndown, couples spa journey, and chilled champagne on arrival.',
    terms: 'Valid for stays of 2+ nights. Blackout dates apply on festivals.',
    validity: 'Valid through Dec 31, 2025',
    image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1000',
  },
  {
    title: 'Heritage Weekend Getaway',
    code: 'ROYAL20',
    discount: '20% Off All Chambers',
    desc: 'Experience Gwalior over the weekend with complimentary gourmet buffet breakfast, guided heritage Fort excursion, and 15% discount at Serenity Spa.',
    terms: 'Valid on Friday, Saturday, and Sunday check-ins for minimum 2 nights.',
    validity: 'Valid through Dec 31, 2025',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1000',
  },
  {
    title: 'Advance Purchase Privilege',
    code: 'CORP25',
    discount: '25% Off Advance Stays',
    desc: 'Plan in advance to receive our most advantageous tariff. Applicable across Deluxe and Premier rooms booked at least 15 days ahead of arrival.',
    terms: 'Non-refundable tariff. 100% advance deposit required at time of booking.',
    validity: 'Valid through June 30, 2025',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000',
  },
]

export default function OffersPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            Privileged Packages
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Exclusive Stay Offers
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            Thoughtfully packaged experiences blending chamber luxury, fine gastronomy, and private heritage tours.
          </p>
        </div>
      </section>

      {/* Offers List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-12">
        {OFFERS.map((offer) => (
          <div
            key={offer.title}
            className="bg-white border border-[#C9A24B]/30 rounded-sm overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12"
          >
            <div className="md:col-span-5 relative min-h-[280px]">
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#0B1B3A] text-[#C9A24B] px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm border border-[#C9A24B]/30">
                {offer.discount}
              </div>
            </div>

            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#0B1B3A] mb-3">
                  {offer.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed mb-6">
                  {offer.desc}
                </p>

                <div className="p-3 bg-gray-50 border border-gray-100 rounded-sm text-xs text-gray-500 space-y-1 mb-6">
                  <div>
                    <span className="font-medium text-[#0B1B3A]">Terms: </span>
                    {offer.terms}
                  </div>
                  <div>
                    <span className="font-medium text-[#0B1B3A]">Validity: </span>
                    {offer.validity}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#C9A24B]" />
                  <span className="text-xs text-gray-500">Promo Code:</span>
                  <span className="font-mono text-sm font-bold bg-[#C9A24B]/15 text-[#0B1B3A] px-2.5 py-0.5 rounded-sm border border-[#C9A24B]/40">
                    {offer.code}
                  </span>
                </div>

                <Link
                  href={`/book?coupon=${offer.code}`}
                  className="w-full sm:w-auto bg-[#C9A24B] text-[#0B1B3A] px-6 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-[#E8D5A3] transition-colors text-center"
                >
                  Book with Offer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

