import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EXPERIENCES_DATA = [
  {
    title: 'Gwalior Fort ("The Gibraltar of India")',
    distance: '3.5 km (8 mins drive)',
    duration: '2.5 - 3 Hours',
    desc: 'Perched high on a steep sandstone hill, Gwalior Fort is one of the most impregnable fortresses in Asia. Marvel at the Man Singh Palace with turquoise glazed tiles, Gujari Mahal, and 57 rock-carved Jain statues reaching up to 57 feet.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200',
  },
  {
    title: 'Jai Vilas Palace & Scindia Museum',
    distance: '4.0 km (10 mins drive)',
    duration: '2 Hours',
    desc: 'The active 19th-century royal palace of the Scindia dynasty. Features the opulent Darbar Hall adorned with 560 kg of gold leaf, the world’s two largest crystal chandeliers, and the famous silver miniature electric train that served cigars and liqueurs around the dining table.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200',
  },
  {
    title: 'Sas-Bahu Temples (Sahastrabahu)',
    distance: '4.5 km (10 mins drive)',
    duration: '1 Hour',
    desc: 'Dating to 1093 AD, these twin red sandstone temples dedicated to Lord Vishnu feature breathtaking multidimensional stone carvings, pyramidal roofs, and sweeping vistas over the valley.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
  },
  {
    title: 'Tansen Memorial & Classical Music Shrine',
    distance: '5.0 km (12 mins drive)',
    duration: '45 Minutes',
    desc: 'The sacred burial shrine of Mian Tansen, one of the Nine Jewels in Emperor Akbar’s court and the father of Hindustani classical music. A pilgrimage spot for music lovers and home to the annual Tansen Samaroh.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200',
  },
  {
    title: 'Sun Temple (Surya Mandir)',
    distance: '8.0 km (15 mins drive)',
    duration: '1 Hour',
    desc: 'Inspired by the famous Konark Sun Temple, this architectural marvel is constructed with red sandstone and pristine white marble, surrounded by serene manicured gardens and reflecting pools.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
  },
  {
    title: 'Gujari Mahal Archaeological Museum',
    distance: '3.5 km (8 mins drive)',
    duration: '1.5 Hours',
    desc: 'Built by Raja Man Singh Tomar for his beloved queen Mrignayani, this royal mansion now houses rare sculptures from the 1st and 2nd centuries BC, including the world-famous carved Shalabhanjika.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
  },
]

export default function ExperiencesPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative py-28 bg-[#0B1B3A] text-white text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-semibold block mb-2">
            Historic Gwalior
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#FBF8F1] mb-4">
            Experiences & Landmarks
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
            Gwalior is a city carved from royalty, melody, and legend. Our concierge organizes private guided excursions and chauffeurs to each monument.
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES_DATA.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#C9A24B]/20 rounded-sm overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative h-60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1B3A]/85 backdrop-blur-sm px-2.5 py-1 rounded-sm text-[11px] text-[#C9A24B] font-medium flex items-center gap-1 border border-[#C9A24B]/30">
                    <MapPin className="w-3 h-3" />
                    <span>{item.distance}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-light text-[#0B1B3A] mb-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-light">
                    <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>Suggested Time: {item.duration}</span>
                  </div>

                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/contact?subject=Guided+Tour+${encodeURIComponent(item.title)}`}
                  className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#0B1B3A] text-[#0B1B3A] hover:bg-[#0B1B3A] hover:text-white rounded-sm transition-colors block"
                >
                  Arrange Private Chauffeur
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

