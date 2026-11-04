import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('[Dining GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, category, description, price, isVeg = true, isSignature = false, image, order = 0 } = body
    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category required' }, { status: 400 })
    }

    const item = await prisma.menuItem.create({
      data: {
        name,
        category,
        description,
        price: price ? Number(price) : null,
        isVeg: Boolean(isVeg),
        isSignature: Boolean(isSignature),
        image,
        order: Number(order) || 0,
      },
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error('[Dining POST Error]', error)
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 })
  }
}

