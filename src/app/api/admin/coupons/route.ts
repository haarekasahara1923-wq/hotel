import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('rbh_admin_session')
  return !!session?.value
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ coupons })
  } catch (e) {
    console.error('[Coupons GET]', e)
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const { code, type, value, minNights, minAmount, validFrom, validTo, usageLimit, isActive } = body
    if (!code || !type || !value || !validFrom || !validTo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        type,
        value: parseFloat(value),
        minNights: minNights ? parseInt(minNights) : null,
        minAmount: minAmount ? parseFloat(minAmount) : null,
        validFrom: new Date(validFrom),
        validTo: new Date(validTo),
        usageLimit: usageLimit ? parseInt(usageLimit) : null,
        isActive: isActive !== false,
      },
    })
    return NextResponse.json({ coupon }, { status: 201 })
  } catch (e) {
    console.error('[Coupons POST]', e)
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 })
  }
}
