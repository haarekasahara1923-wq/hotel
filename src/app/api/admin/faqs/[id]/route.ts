import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.faq.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Faq DELETE Error]', error)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const updated = await prisma.faq.update({
      where: { id },
      data: {
        ...(body.question && { question: body.question }),
        ...(body.answer && { answer: body.answer }),
        ...(body.category && { category: body.category }),
        ...(body.order !== undefined && { order: Number(body.order) }),
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('[Faq PUT Error]', error)
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
  }
}

