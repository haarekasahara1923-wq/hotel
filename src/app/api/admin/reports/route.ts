import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [bookings, payments] = await Promise.all([
      prisma.booking.findMany({
        select: {
          id: true,
          code: true,
          guestName: true,
          checkIn: true,
          checkOut: true,
          total: true,
          status: true,
          source: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.payment.findMany({
        select: {
          id: true,
          amount: true,
          status: true,
          method: true,
          createdAt: true,
        },
      }),
    ])

    const totalRevenue = payments
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + Number(p.amount), 0)

    const sourceStats: Record<string, number> = {}
    bookings.forEach((b) => {
      sourceStats[b.source] = (sourceStats[b.source] || 0) + 1
    })

    const statusStats: Record<string, number> = {}
    bookings.forEach((b) => {
      statusStats[b.status] = (statusStats[b.status] || 0) + 1
    })

    return NextResponse.json({
      totalRevenue,
      totalBookings: bookings.length,
      sourceStats,
      statusStats,
      bookings,
    })
  } catch (error) {
    console.error('[Reports GET Error]', error)
    return NextResponse.json({
      totalRevenue: 0,
      totalBookings: 0,
      sourceStats: {},
      statusStats: {},
      bookings: [],
    })
  }
}

