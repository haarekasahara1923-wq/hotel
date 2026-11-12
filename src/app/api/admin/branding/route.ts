import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { id: 'main' },
    })
    return NextResponse.json(setting?.data || {})
  } catch (error) {
    console.error('[Admin Branding GET Error]', error)
    return NextResponse.json({})
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const updated = await prisma.siteSetting.upsert({
      where: { id: 'main' },
      update: { data },
      create: { id: 'main', data },
    })

    // Real-time revalidation across all public pages and layouts
    try {
      revalidatePath('/', 'layout')
    } catch (e) {
      console.warn('Revalidation warning:', e)
    }

    return NextResponse.json({ success: true, data: updated.data })
  } catch (error) {
    console.error('[Admin Branding POST Error]', error)
    return NextResponse.json({ error: 'Failed to save branding' }, { status: 500 })
  }
}

