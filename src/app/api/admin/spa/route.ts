import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  try {
    const services = await prisma.spaService.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    })
    return NextResponse.json(services)
  } catch (error) {
    console.error('[Spa GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, category = 'massage', description, duration = 60, price, image, order = 0 } = body
    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price required' }, { status: 400 })
    }

    const service = await prisma.spaService.create({
      data: {
        name,
        category,
        description: description || '',
        duration: Number(duration) || 60,
        price: Number(price),
        image,
        order: Number(order) || 0,
      },
    })
    return NextResponse.json(service)
  } catch (error) {
    console.error('[Spa POST Error]', error)
    return NextResponse.json({ error: 'Failed to create spa service' }, { status: 500 })
  }
}

