import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.spaService.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Spa DELETE Error]', error)
    return NextResponse.json({ error: 'Failed to delete spa service' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const updated = await prisma.spaService.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.category && { category: body.category }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.duration !== undefined && { duration: Number(body.duration) }),
        ...(body.price !== undefined && { price: Number(body.price) }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
        ...(body.order !== undefined && { order: Number(body.order) }),
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('[Spa PUT Error]', error)
    return NextResponse.json({ error: 'Failed to update spa service' }, { status: 500 })
  }
}

