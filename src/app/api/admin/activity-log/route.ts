import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const logs = await prisma.activityLog.findMany({
      include: {
        user: { select: { name: true, email: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json(logs)
  } catch (error) {
    console.error('[ActivityLog GET Error]', error)
    return NextResponse.json([])
  }
}

