import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'
import bcrypt from 'bcryptjs'

export async function GET() {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const staff = await prisma.user.findMany({
      where: {
        role: { in: ['SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST', 'ACCOUNTANT', 'EDITOR'] },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(staff)
  } catch (error) {
    console.error('[Staff GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, email, phone, role = 'RECEPTIONIST', password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password required' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })
    return NextResponse.json(user)
  } catch (error: any) {
    console.error('[Staff POST Error]', error)
    return NextResponse.json({ error: error.message || 'Failed to create staff' }, { status: 500 })
  }
}

