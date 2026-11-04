import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  try {
    const testimonials = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('[Testimonials GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, rating = 5, title, comment, source = 'WEBSITE', status = 'APPROVED', featured = true } = body
    if (!name || !comment) {
      return NextResponse.json({ error: 'Name and comment required' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        name,
        rating: Number(rating) || 5,
        title,
        comment,
        source,
        status,
        featured: Boolean(featured),
      },
    })
    return NextResponse.json(review)
  } catch (error) {
    console.error('[Testimonials POST Error]', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}

