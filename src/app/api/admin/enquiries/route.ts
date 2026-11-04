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
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const statusParam = searchParams.get('status') || 'ALL'
    const typeParam = searchParams.get('type') || 'ALL'
    const skip = (page - 1) * limit

    const where: Record<string, any> = {}
    if (statusParam !== 'ALL') where.status = statusParam
    if (typeParam !== 'ALL') where.type = typeParam

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.enquiry.count({ where }),
    ])

    return NextResponse.json({
      enquiries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('[Enquiries GET Error]', error)
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { type, name, email, phone, message, meta } = body

    if (!name || !email || !phone || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        type,
        name,
        email,
        phone,
        message: message || null,
        meta: meta || null,
        status: 'NEW',
      },
    })

    return NextResponse.json({ enquiry }, { status: 201 })
  } catch (error) {
    console.error('[Enquiries POST Error]', error)
    return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 })
  }
}
