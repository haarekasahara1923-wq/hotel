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
    const roomTypes = await prisma.roomType.findMany({
      orderBy: { order: 'asc' },
      include: { rooms: { orderBy: { number: 'asc' } } },
    })
    return NextResponse.json({ roomTypes })
  } catch (e) {
    console.error('[Rooms GET]', e)
    return NextResponse.json({ error: 'Failed to fetch room types' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const {
      name, slug, description, shortDesc, size, maxAdults, maxChildren,
      bedType, view, baseRate, amenities, images, video, isActive, order,
    } = body
    if (!name || !slug || !description || !baseRate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const roomType = await prisma.roomType.create({
      data: {
        name, slug,
        description, shortDesc: shortDesc || '',
        size: parseInt(size) || 0,
        maxAdults: parseInt(maxAdults) || 1,
        maxChildren: parseInt(maxChildren) || 0,
        bedType: bedType || '',
        view: view || null,
        baseRate: parseFloat(baseRate),
        amenities: Array.isArray(amenities) ? amenities : (amenities || '').split(',').map((a: string) => a.trim()).filter(Boolean),
        images: Array.isArray(images) ? images : (images || '').split(',').map((i: string) => i.trim()).filter(Boolean),
        video: video || null,
        isActive: isActive !== false,
        order: parseInt(order) || 0,
      },
    })
    return NextResponse.json({ roomType }, { status: 201 })
  } catch (e) {
    console.error('[Rooms POST]', e)
    return NextResponse.json({ error: 'Failed to create room type' }, { status: 500 })
  }
}
