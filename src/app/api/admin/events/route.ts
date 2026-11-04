import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  try {
    const packages = await prisma.eventPackage.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(packages)
  } catch (error) {
    console.error('[Events GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, type = 'wedding', description, image, capacity, price, features = [], order = 0 } = body
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description required' }, { status: 400 })
    }

    const pkg = await prisma.eventPackage.create({
      data: {
        title,
        type,
        description,
        image,
        capacity: capacity ? Number(capacity) : null,
        price: price ? Number(price) : null,
        features: Array.isArray(features) ? features : typeof features === 'string' ? features.split(',').map((f: string) => f.trim()) : [],
        order: Number(order) || 0,
      },
    })
    return NextResponse.json(pkg)
  } catch (error) {
    console.error('[Events POST Error]', error)
    return NextResponse.json({ error: 'Failed to create event package' }, { status: 500 })
  }
}

