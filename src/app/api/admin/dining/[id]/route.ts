import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.menuItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Dining DELETE Error]', error)
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.category && { category: body.category }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.price !== undefined && { price: body.price ? Number(body.price) : null }),
        ...(body.isVeg !== undefined && { isVeg: Boolean(body.isVeg) }),
        ...(body.isSignature !== undefined && { isSignature: Boolean(body.isSignature) }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
        ...(body.order !== undefined && { order: Number(body.order) }),
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('[Dining PUT Error]', error)
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 })
  }
}

