import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.galleryItem.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Gallery DELETE Error]', error)
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const item = await prisma.galleryItem.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error('[Gallery PATCH Error]', error)
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 })
  }
}

