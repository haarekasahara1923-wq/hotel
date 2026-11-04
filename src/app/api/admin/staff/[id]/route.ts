import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Staff DELETE Error]', error)
    return NextResponse.json({ error: 'Failed to delete staff member' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.role && { role: body.role }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('[Staff PUT Error]', error)
    return NextResponse.json({ error: 'Failed to update staff member' }, { status: 500 })
  }
}

