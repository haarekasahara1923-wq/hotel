import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    })
    return NextResponse.json(faqs)
  } catch (error) {
    console.error('[Faq GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { question, answer, category = 'General', order = 0 } = body
    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer required' }, { status: 400 })
    }

    const faq = await prisma.faq.create({
      data: { question, answer, category, order: Number(order) || 0 },
    })
    return NextResponse.json(faq)
  } catch (error) {
    console.error('[Faq POST Error]', error)
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}

