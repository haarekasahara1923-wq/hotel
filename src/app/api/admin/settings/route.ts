import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { id: 'hotel_settings' },
    })

    const keysStatus = {
      razorpayConfigured: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
      cloudinaryConfigured: Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY),
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      emailConfigured: Boolean(process.env.RESEND_API_KEY),
    }

    const defaultSettings = {
      gstRate: 12,
      checkInTime: '14:00',
      checkOutTime: '11:00',
      cancellationHours: 48,
      advancePaymentPercent: 50,
      autoConfirm: true,
      keysStatus,
      ...(setting?.data as any || {}),
    }

    return NextResponse.json(defaultSettings)
  } catch (error) {
    console.error('[Settings GET Error]', error)
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
      where: { id: 'hotel_settings' },
      update: { data },
      create: { id: 'hotel_settings', data },
    })
    return NextResponse.json({ success: true, data: updated.data })
  } catch (error) {
    console.error('[Settings POST Error]', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

