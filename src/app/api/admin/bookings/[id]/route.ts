import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function checkAuth() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('rbh_admin_session')
    return !!session?.value
  } catch {
    return false
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        bookingRooms: {
          include: { room: { include: { roomType: true } } },
        },
        addons: { include: { addon: true } },
        payments: true,
        modifications: true,
      },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error('[Admin Booking Detail Error]', error)
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const { status, adminNotes, cancellationNote } = body

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
        ...(cancellationNote !== undefined && { cancellationNote }),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[Admin Update Booking Error]', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Admin Cancel Booking Error]', error)
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 })
  }
}
