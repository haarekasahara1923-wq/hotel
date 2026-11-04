import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.eventPackage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Events DELETE Error]', error)
    return NextResponse.json({ error: 'Failed to delete event package' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const updated = await prisma.eventPackage.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.type && { type: body.type }),
        ...(body.description && { description: body.description }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.capacity !== undefined && { capacity: body.capacity ? Number(body.capacity) : null }),
        ...(body.price !== undefined && { price: body.price ? Number(body.price) : null }),
        ...(body.features !== undefined && {
          features: Array.isArray(body.features) ? body.features : typeof body.features === 'string' ? body.features.split(',').map((f: string) => f.trim()) : [],
        }),
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
        ...(body.order !== undefined && { order: Number(body.order) }),
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('[Events PUT Error]', error)
    return NextResponse.json({ error: 'Failed to update event package' }, { status: 500 })
  }
}

