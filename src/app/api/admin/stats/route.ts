import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

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
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    const [
      todayCheckins,
      todayCheckouts,
      checkedInCount,
      revenueResult,
      pendingEnquiries,
      totalBookings,
      recentBookings,
      recentEnquiries,
    ] = await Promise.all([
      // Today's check-ins
      prisma.booking.count({
        where: {
          checkIn: { gte: todayStart, lt: todayEnd },
          status: { in: ['CONFIRMED', 'CHECKED_IN'] },
        },
      }),
      // Today's check-outs
      prisma.booking.count({
        where: {
          checkOut: { gte: todayStart, lt: todayEnd },
          status: { in: ['CONFIRMED', 'CHECKED_IN'] },
        },
      }),
      // Currently checked in (for occupancy)
      prisma.booking.count({
        where: { status: 'CHECKED_IN' },
      }),
      // Revenue this month
      prisma.payment.aggregate({
        where: {
          status: 'paid',
          createdAt: { gte: monthStart, lt: monthEnd },
        },
        _sum: { amount: true },
      }),
      // Pending enquiries
      prisma.enquiry.count({
        where: { status: 'NEW' },
      }),
      // Total bookings
      prisma.booking.count(),
      // Recent bookings (last 10)
      prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          code: true,
          guestName: true,
          guestEmail: true,
          checkIn: true,
          checkOut: true,
          status: true,
          total: true,
          rooms: true,
          source: true,
          createdAt: true,
        },
      }),
      // Recent enquiries (last 5)
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          type: true,
          status: true,
          createdAt: true,
        },
      }),
    ])

    const occupancyPercent = Math.round((checkedInCount / 20) * 100)
    const revenueThisMonth = Number(revenueResult._sum.amount ?? 0)

    return NextResponse.json({
      todayCheckins,
      todayCheckouts,
      occupancyPercent,
      revenueThisMonth,
      pendingEnquiries,
      totalBookings,
      recentBookings,
      recentEnquiries,
    })
  } catch (error) {
    console.error('[Admin Stats Error]', error)
    // Return empty data gracefully so the dashboard doesn't crash
    return NextResponse.json({
      todayCheckins: 0,
      todayCheckouts: 0,
      occupancyPercent: 0,
      revenueThisMonth: 0,
      pendingEnquiries: 0,
      totalBookings: 0,
      recentBookings: [],
      recentEnquiries: [],
    })
  }
}
