import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { format } from 'date-fns'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('rbh_admin_session')
  return !!session?.value
}

export async function GET(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const statusParam = searchParams.get('status') || 'ALL'
    const skip = (page - 1) * limit

    const where =
      statusParam && statusParam !== 'ALL'
        ? { status: statusParam as any }
        : {}

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          code: true,
          guestName: true,
          guestEmail: true,
          guestPhone: true,
          checkIn: true,
          checkOut: true,
          rooms: true,
          adults: true,
          children: true,
          total: true,
          subtotal: true,
          tax: true,
          status: true,
          source: true,
          paymentMode: true,
          specialRequests: true,
          adminNotes: true,
          cancellationNote: true,
          createdAt: true,
        },
      }),
      prisma.booking.count({ where }),
    ])

    return NextResponse.json({
      bookings,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('[Bookings GET Error]', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
      roomTypeId,
      specialRequests,
      adminNotes,
      paymentMode,
    } = body

    // Validate required fields
    if (!guestName || !guestEmail || !guestPhone || !checkIn || !checkOut) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const nights = Math.max(
      1,
      Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    )

    // Calculate pricing
    let subtotal = 0
    if (roomTypeId) {
      const roomType = await prisma.roomType.findUnique({ where: { id: roomTypeId } })
      if (roomType) {
        subtotal = Number(roomType.baseRate) * nights * (rooms || 1)
      }
    }

    const tax = subtotal * 0.12 // 12% GST
    const total = subtotal + tax

    // Generate booking code
    const code = `RBH-${format(new Date(), 'yyyyMMdd')}-${Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase()}`

    const booking = await prisma.booking.create({
      data: {
        code,
        guestName,
        guestEmail,
        guestPhone,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults: parseInt(adults) || 1,
        children: parseInt(children) || 0,
        rooms: parseInt(rooms) || 1,
        subtotal,
        tax,
        discount: 0,
        total,
        status: 'CONFIRMED',
        source: 'WALKIN',
        paymentMode: paymentMode || 'full',
        specialRequests: specialRequests || null,
        adminNotes: adminNotes || null,
      },
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error('[Bookings POST Error]', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
