import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(team)
  } catch (error) {
    console.error('[Team GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, role, photo, bio, order = 0 } = body
    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role required' }, { status: 400 })
    }

    const member = await prisma.teamMember.create({
      data: { name, role, photo, bio, order: Number(order) || 0 },
    })
    return NextResponse.json(member)
  } catch (error) {
    console.error('[Team POST Error]', error)
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
  }
}

