import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  try {
    const templates = await prisma.notificationTemplate.findMany()
    return NextResponse.json(templates)
  } catch (error) {
    console.error('[Templates GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { key, channel = 'email', subject, body: templateBody } = body
    if (!key || !templateBody) {
      return NextResponse.json({ error: 'Key and body required' }, { status: 400 })
    }

    const template = await prisma.notificationTemplate.upsert({
      where: { key },
      update: { channel, subject, body: templateBody },
      create: { key, channel, subject, body: templateBody },
    })
    return NextResponse.json(template)
  } catch (error) {
    console.error('[Templates POST Error]', error)
    return NextResponse.json({ error: 'Failed to save template' }, { status: 500 })
  }
}

