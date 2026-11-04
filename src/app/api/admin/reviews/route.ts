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
    const statusParam = searchParams.get('status') || 'ALL'
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const skip = (page - 1) * limit

    let where: any = {}
    if (statusParam === 'FEATURED') {
      where.featured = true
    } else if (statusParam && statusParam !== 'ALL') {
      where.status = statusParam
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.review.count({ where }),
    ])

    return NextResponse.json({ reviews, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (e) {
    console.error('[Reviews GET]', e)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}
