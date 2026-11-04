import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

const DEFAULT_PAGES = [
  { slug: 'home', title: 'Home Page' },
  { slug: 'rooms', title: 'Rooms & Palatial Suites' },
  { slug: 'dining', title: 'Maharaja Fine Dining' },
  { slug: 'events', title: 'Banquets & Celebrations' },
  { slug: 'spa', title: 'Serenity Ayurvedic Spa' },
  { slug: 'experiences', title: 'Gwalior Heritage Experiences' },
  { slug: 'offers', title: 'Special Offers & Packages' },
  { slug: 'gallery', title: 'Hotel Photo & Video Gallery' },
  { slug: 'about', title: 'About Royal Blue Heaven' },
  { slug: 'contact', title: 'Contact & Location' },
  { slug: 'book', title: 'Online Room Reservation' },
  { slug: 'lookup', title: 'Booking Lookup' },
  { slug: 'testimonials', title: 'Guest Reviews & Testimonials' },
  { slug: 'facilities', title: 'Hotel Facilities & Amenities' },
  { slug: 'privacy-policy', title: 'Privacy Policy' },
  { slug: 'terms', title: 'Terms & Conditions' },
  { slug: 'cancellation-policy', title: 'Cancellation & Refund Policy' },
]

export async function GET() {
  try {
    const pages = await prisma.page.findMany()
    // Merge with defaults so every page exists
    const list = DEFAULT_PAGES.map((dp) => {
      const found = pages.find((p) => p.slug === dp.slug)
      return {
        slug: dp.slug,
        title: found?.title || dp.title,
        seo: (found?.seo as any) || {
          title: `${dp.title} | Royal Blue Heaven, Gwalior`,
          description: `Experience luxury at Royal Blue Heaven. ${dp.title} in DD Nagar, Gwalior.`,
          ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
        },
      }
    })
    return NextResponse.json(list)
  } catch (error) {
    console.error('[SEO GET Error]', error)
    return NextResponse.json(DEFAULT_PAGES.map(dp => ({
      slug: dp.slug,
      title: dp.title,
      seo: { title: `${dp.title} | Royal Blue Heaven`, description: '' }
    })))
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug, title, seo } = await req.json()
    const page = await prisma.page.upsert({
      where: { slug },
      update: { title, seo },
      create: { slug, title: title || slug, seo },
    })
    return NextResponse.json(page)
  } catch (error) {
    console.error('[SEO POST Error]', error)
    return NextResponse.json({ error: 'Failed to update SEO' }, { status: 500 })
  }
}

