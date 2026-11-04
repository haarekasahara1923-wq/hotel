import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')

  try {
    const media = await prisma.media.findMany({
      where: type && type !== 'ALL' ? { type } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json(media)
  } catch (error) {
    console.error('[Media GET Error]', error)
    return NextResponse.json([])
  }
}

