import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('rbh_admin_session')
  return !!session?.value
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const offers = await prisma.offer.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json({ offers })
  } catch (e) {
    console.error('[Offers GET]', e)
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const { title, slug, description, image, terms, couponCode, validTo, isActive, order } = body
    if (!title || !slug || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const offer = await prisma.offer.create({
      data: {
        title, slug, description,
        image: image || null,
        terms: terms || null,
        couponCode: couponCode || null,
        validTo: validTo ? new Date(validTo) : null,
        isActive: isActive !== false,
        order: parseInt(order) || 0,
      },
    })
    return NextResponse.json({ offer }, { status: 201 })
  } catch (e) {
    console.error('[Offers POST]', e)
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 })
  }
}
