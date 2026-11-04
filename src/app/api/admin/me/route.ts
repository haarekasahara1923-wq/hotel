import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get('rbh_admin_session')
  
  if (!session?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Session value is the admin user ID stored during login
    const admin = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' },
      select: { id: true, name: true, email: true, role: true },
    })

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ 
      id: admin.id,
      name: admin.name || 'Super Admin',
      email: admin.email,
      role: admin.role
    })
  } catch {
    return NextResponse.json({ name: 'Super Admin', role: 'SUPER_ADMIN' })
  }
}

