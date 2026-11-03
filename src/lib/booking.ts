import { prisma } from './prisma'
import { generateBookingCode, calculateNights, parseDecimal } from './utils'
import { GstSlab, CreateBookingInput } from '../types'
import { createRefund } from './razorpay'

export async function getAvailableRooms(
  checkIn: Date,
  checkOut: Date,
  adults = 1,
  children = 0,
  rooms = 1
) {
  // Release any expired holds first
  await releaseExpiredHolds()

  // Find all active room types that can accommodate guests
  const roomTypes = await prisma.roomType.findMany({
    where: {
      isActive: true,
      maxAdults: { gte: Math.ceil(adults / rooms) },
    },
    include: {
      rooms: {
        where: {
          status: 'AVAILABLE',
        },
      },
      rates: {
        where: {
          isActive: true,
        },
      },
    },
    orderBy: { order: 'asc' },
  })

  // Format dates for comparison
  const startDate = new Date(checkIn)
  const endDate = new Date(checkOut)

  const availableTypes = []

  for (const rt of roomTypes) {
    const allRoomIds = rt.rooms.map((r) => r.id)
    if (allRoomIds.length === 0) continue

    // Find rooms that have conflicting RoomNight bookings
    const bookedRooms = await prisma.roomNight.findMany({
      where: {
        roomId: { in: allRoomIds },
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: { roomId: true },
      distinct: ['roomId'],
    })

    const bookedRoomIds = new Set(bookedRooms.map((b) => b.roomId))

    // Find rooms held in payment flow
    const heldRooms = await prisma.bookingHold.findMany({
      where: {
        roomId: { in: allRoomIds },
        expiresAt: { gt: new Date() },
        OR: [
          {
            checkIn: { lt: endDate },
            checkOut: { gt: startDate },
          },
        ],
      },
      select: { roomId: true },
      distinct: ['roomId'],
    })

    const heldRoomIds = new Set(heldRooms.map((h) => h.roomId))

    // Available room IDs for this room type
    const availableRoomIds = allRoomIds.filter(
      (id) => !bookedRoomIds.has(id) && !heldRoomIds.has(id)
    )

    if (availableRoomIds.length >= rooms) {
      const priceCalc = await calculateRoomPrice(rt.id, startDate, endDate)
      availableTypes.push({
        roomType: rt,
        availableCount: availableRoomIds.length,
        availableRoomIds: availableRoomIds.slice(0, rooms),
        nights: priceCalc.nights,
        nightlyBreakdown: priceCalc.nightlyBreakdown,
        pricePerNight: priceCalc.subtotal / Math.max(1, priceCalc.nights),
        totalPrice: priceCalc.subtotal * rooms,
      })
    }
  }

  return availableTypes
}

export async function calculateRoomPrice(
  roomTypeId: string,
  checkIn: Date,
  checkOut: Date
) {
  const roomType = await prisma.roomType.findUnique({
    where: { id: roomTypeId },
    include: {
      rates: {
        where: { isActive: true },
        orderBy: { priority: 'desc' },
      },
    },
  })

  if (!roomType) {
    throw new Error('Room type not found')
  }

  const baseRate = parseDecimal(roomType.baseRate)
  const nights = calculateNights(checkIn, checkOut)
  const nightlyBreakdown: { date: string; rate: number }[] = []
  let subtotal = 0

  const cur = new Date(checkIn)
  while (cur < checkOut) {
    const curDateStr = cur.toISOString().split('T')[0]
    const dayOfWeek = cur.getDay() // 0 = Sun

    let nightlyRate = baseRate

    // Apply rate rules in order of priority (highest first)
    for (const rule of roomType.rates) {
      const ruleStart = new Date(rule.startDate)
      const ruleEnd = new Date(rule.endDate)

      if (cur >= ruleStart && cur <= ruleEnd) {
        if (rule.daysOfWeek.length === 0 || rule.daysOfWeek.includes(dayOfWeek)) {
          const adjVal = parseDecimal(rule.adjustValue)
          if (rule.adjustType === 'percent') {
            nightlyRate = nightlyRate * (1 + adjVal / 100)
          } else {
            nightlyRate = nightlyRate + adjVal
          }
          break // High priority rule applied
        }
      }
    }

    nightlyBreakdown.push({
      date: curDateStr,
      rate: Math.round(nightlyRate),
    })
    subtotal += Math.round(nightlyRate)
    cur.setDate(cur.getDate() + 1)
  }

  return {
    nights,
    nightlyBreakdown,
    subtotal,
  }
}

export function applyGstSlab(tariff: number, slabs: GstSlab[]) {
  let gstPercent = 12 // default fallback
  for (const slab of slabs) {
    if (tariff >= slab.minTariff && tariff <= slab.maxTariff) {
      gstPercent = slab.gst
      break
    }
  }
  const gstAmount = Math.round((tariff * gstPercent) / 100)
  return { gstPercent, gstAmount }
}

export async function validateCoupon(
  code: string,
  nights: number,
  subtotal: number
) {
  if (!code) return { valid: false, discount: 0, message: 'Invalid coupon' }

  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase().trim() },
  })

  if (!coupon || !coupon.isActive) {
    return { valid: false, discount: 0, message: 'Coupon code not found or inactive' }
  }

  const now = new Date()
  if (coupon.validFrom && now < new Date(coupon.validFrom)) {
    return { valid: false, discount: 0, message: 'Coupon is not yet active' }
  }
  if (coupon.validTo && now > new Date(coupon.validTo)) {
    return { valid: false, discount: 0, message: 'Coupon has expired' }
  }

  if (coupon.minNights && nights < coupon.minNights) {
    return {
      valid: false,
      discount: 0,
      message: `Coupon requires minimum ${coupon.minNights} nights stay`,
    }
  }

  if (coupon.minAmount && subtotal < parseDecimal(coupon.minAmount)) {
    return {
      valid: false,
      discount: 0,
      message: `Coupon requires minimum booking amount of ₹${coupon.minAmount}`,
    }
  }

  if (coupon.usageLimit && coupon.used >= coupon.usageLimit) {
    return { valid: false, discount: 0, message: 'Coupon usage limit reached' }
  }

  let discount = 0
  const couponVal = parseDecimal(coupon.value)
  if (coupon.type === 'percent') {
    discount = Math.round((subtotal * couponVal) / 100)
  } else {
    discount = Math.min(couponVal, subtotal)
  }

  return {
    valid: true,
    discount,
    coupon,
    message: `Coupon applied: ₹${discount} off!`,
  }
}

export async function createBookingHold(
  roomIds: string[],
  checkIn: Date,
  checkOut: Date,
  sessionId: string
) {
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes hold

  // Clean up any existing holds for this session
  await prisma.bookingHold.deleteMany({
    where: { sessionId },
  })

  const holds = []
  for (const roomId of roomIds) {
    const hold = await prisma.bookingHold.create({
      data: {
        roomId,
        sessionId,
        checkIn,
        checkOut,
        expiresAt,
      },
    })
    holds.push(hold)
  }

  return holds
}

export async function releaseExpiredHolds() {
  const result = await prisma.bookingHold.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  })
  return result.count
}

export async function createBooking(data: CreateBookingInput) {
  const checkIn = new Date(data.checkIn)
  const checkOut = new Date(data.checkOut)
  const nights = calculateNights(checkIn, checkOut)

  const settingsDoc = await prisma.siteSetting.findUnique({
    where: { id: 'main' },
  })
  const settingsData = settingsDoc?.data as any
  const gstSlabs = settingsData?.taxes?.gstSlabs || [
    { minTariff: 0, maxTariff: 7500, gst: 12 },
    { minTariff: 7501, maxTariff: 99999, gst: 18 },
  ]

  // Calculate pricing
  const priceInfo = await calculateRoomPrice(data.roomTypeId, checkIn, checkOut)
  const roomSubtotal = priceInfo.subtotal * (data.rooms || 1)

  // Calculate add-ons
  let addonsSubtotal = 0
  const bookingAddonsData: { addonId: string; qty: number; price: number }[] = []

  if (data.addons && data.addons.length > 0) {
    for (const a of data.addons) {
      const addon = await prisma.addon.findUnique({ where: { id: a.addonId } })
      if (addon && addon.isActive) {
        const addonPrice = parseDecimal(addon.price)
        const totalAddonPrice = addonPrice * a.qty
        addonsSubtotal += totalAddonPrice
        bookingAddonsData.push({
          addonId: a.addonId,
          qty: a.qty,
          price: addonPrice,
        })
      }
    }
  }

  // Calculate coupon discount
  let discount = 0
  if (data.couponCode) {
    const couponRes = await validateCoupon(data.couponCode, nights, roomSubtotal)
    if (couponRes.valid) {
      discount = couponRes.discount
    }
  }

  const subtotalBeforeTax = Math.max(0, roomSubtotal + addonsSubtotal - discount)
  const { gstAmount } = applyGstSlab(subtotalBeforeTax, gstSlabs)
  const total = subtotalBeforeTax + gstAmount

  // Get available rooms for this booking
  const roomType = await prisma.roomType.findUnique({
    where: { id: data.roomTypeId },
    include: { rooms: { where: { status: 'AVAILABLE' } } },
  })

  if (!roomType) {
    throw new Error('Room type not found')
  }

  const allRoomIds = roomType.rooms.map((r) => r.id)
  const bookedRooms = await prisma.roomNight.findMany({
    where: {
      roomId: { in: allRoomIds },
      date: { gte: checkIn, lt: checkOut },
    },
    select: { roomId: true },
    distinct: ['roomId'],
  })
  const bookedSet = new Set(bookedRooms.map((b) => b.roomId))
  const assignedRoomIds = allRoomIds
    .filter((id) => !bookedSet.has(id))
    .slice(0, data.rooms || 1)

  if (assignedRoomIds.length < (data.rooms || 1)) {
    throw new Error('Sorry, the selected room type is no longer available for these dates.')
  }

  const bookingCode = generateBookingCode()

  // Use Prisma transaction to atomically insert Booking, BookingRooms, and RoomNights
  const booking = await prisma.$transaction(async (tx) => {
    const newBooking = await tx.booking.create({
      data: {
        code: bookingCode,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        checkIn,
        checkOut,
        adults: data.adults,
        children: data.children,
        rooms: data.rooms || 1,
        status: data.paymentMode === 'enquiry' ? 'PENDING' : 'PENDING',
        subtotal: roomSubtotal + addonsSubtotal,
        tax: gstAmount,
        discount,
        total,
        paid: 0,
        couponCode: data.couponCode || null,
        paymentMode: data.paymentMode,
        specialRequests: data.specialRequests || null,
        addons: {
          create: bookingAddonsData,
        },
      },
    })

    // Create BookingRoom and RoomNight entries
    for (const roomId of assignedRoomIds) {
      await tx.bookingRoom.create({
        data: {
          bookingId: newBooking.id,
          roomId,
          roomTypeId: data.roomTypeId,
          nightlyRates: priceInfo.nightlyBreakdown,
          total: priceInfo.subtotal,
        },
      })

      // Insert RoomNights
      const cur = new Date(checkIn)
      while (cur < checkOut) {
        await tx.roomNight.create({
          data: {
            roomId,
            date: new Date(cur),
            bookingId: newBooking.id,
          },
        })
        cur.setDate(cur.getDate() + 1)
      }
    }

    if (data.couponCode && discount > 0) {
      await tx.coupon.update({
        where: { code: data.couponCode.toUpperCase().trim() },
        data: { used: { increment: 1 } },
      })
    }

    return newBooking
  })

  return booking
}

export async function cancelBooking(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { payments: true },
  })

  if (!booking) {
    throw new Error('Booking not found')
  }

  // Calculate cancellation refund based on hours before check-in
  const now = new Date()
  const checkIn = new Date(booking.checkIn)
  const hoursRemaining = (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60)

  let refundPercent = 0
  if (hoursRemaining >= 48) {
    refundPercent = 100 // Free cancellation
  } else if (hoursRemaining >= 24) {
    refundPercent = 50 // 50% charge
  } else {
    refundPercent = 0 // No refund
  }

  const paidAmount = parseDecimal(booking.paid)
  const refundAmount = Math.round((paidAmount * refundPercent) / 100)

  // Trigger Razorpay refund if online payment was made and refund is due
  if (refundAmount > 0) {
    const successPayment = booking.payments.find(
      (p) => p.status === 'paid' && p.razorpayPaymentId
    )
    if (successPayment?.razorpayPaymentId) {
      try {
        await createRefund(
          successPayment.razorpayPaymentId,
          refundAmount,
          { reason: `Guest cancellation - ${refundPercent}% refund policy` }
        )
      } catch (err) {
        console.error('Razorpay refund error:', err)
      }
    }
  }

  // Release the room nights
  await prisma.roomNight.deleteMany({
    where: { bookingId },
  })

  // Update booking status
  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'CANCELLED',
      cancellationNote: `Cancelled with ${refundPercent}% refund (₹${refundAmount})`,
    },
  })

  return { refundAmount, refundPercent }
}

