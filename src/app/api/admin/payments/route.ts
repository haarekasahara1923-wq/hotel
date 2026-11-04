import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('rbh_admin_session')
  return !!session?.value
}

export async function GET(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const statusParam = searchParams.get('status') || 'ALL'
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const skip = (page - 1) * limit

    const where: any = {}
    if (statusParam && statusParam !== 'ALL') where.status = statusParam
    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) where.createdAt.gte = new Date(dateFrom)
      if (dateTo) where.createdAt.lte = new Date(dateTo + 'T23:59:59Z')
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          booking: {
            select: {
              code: true,
              guestName: true,
              guestEmail: true,
              status: true,
            },
          },
        },
      }),
      prisma.payment.count({ where }),
    ])

    // Summary stats
    const [totalRevenue, pendingSum, refundsThisMonth] = await Promise.all([
      prisma.payment.aggregate({ where: { status: 'paid' }, _sum: { amount: true } }),
      prisma.payment.aggregate({ where: { status: 'created' }, _sum: { amount: true } }),
      prisma.payment.aggregate({
        where: {
          status: 'refunded',
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: { refundAmount: true },
      }),
    ])

    return NextResponse.json({
      payments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      summary: {
        totalRevenue: totalRevenue._sum.amount || 0,
        pendingPayments: pendingSum._sum.amount || 0,
        refundsThisMonth: refundsThisMonth._sum.refundAmount || 0,
      },
    })
  } catch (e) {
    console.error('[Payments GET]', e)
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}
