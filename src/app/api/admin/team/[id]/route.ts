import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Team DELETE Error]', error)
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.role && { role: body.role }),
        ...(body.photo !== undefined && { photo: body.photo }),
        ...(body.bio !== undefined && { bio: body.bio }),
        ...(body.order !== undefined && { order: Number(body.order) }),
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('[Team PUT Error]', error)
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
  }
}

