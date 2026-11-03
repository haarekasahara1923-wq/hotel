import { Role, PubStatus, RoomStatus, BookingStatus } from '@prisma/client'

export type { Role, PubStatus, RoomStatus, BookingStatus }

export interface ThemeColors {
  primary: string
  primaryDark: string
  accent: string
  champagne: string
  ivory: string
  charcoal: string
  maroon?: string
}

export interface FontSettings {
  heading: string
  body: string
  accent: string
}

export interface GstSlab {
  minTariff: number
  maxTariff: number
  gst: number
}

export interface CancellationTier {
  hoursBeforeCheckIn: number
  chargePercent: number
}

export interface SiteSettings {
  hotelName: string
  tagline: string
  address: string
  phone: string
  email: string
  whatsapp: string
  gstNumber: string
  mapEmbed: string
  socials: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
  }
  theme: ThemeColors
  fonts: FontSettings
  buttonStyle: 'square' | 'rounded'
  headerStyle: 'transparent' | 'solid'
  logoLight?: string
  logoDark?: string
  favicon?: string
  preloaderLogo?: string
  announcement?: {
    enabled: boolean
    text: string
    link?: string
  }
  seo: {
    title: string
    description: string
    ogImage?: string
  }
  taxes: {
    gstSlabs: GstSlab[]
  }
  policies: {
    checkInTime: string
    checkOutTime: string
    cancellation: CancellationTier[]
    advancePaymentPercent: number
    paymentModes: {
      full: boolean
      advance: boolean
      enquiry: boolean
    }
  }
  checkIn: string
  checkOut: string
  copyright: string
  footer?: {
    description?: string
    links?: { label: string; href: string }[]
  }
  maintenanceMode?: boolean
}

export interface BookingSearchParams {
  checkIn?: string
  checkOut?: string
  adults?: number
  children?: number
  rooms?: number
}

export interface CreateBookingInput {
  roomTypeId: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  rooms: number
  guestName: string
  guestEmail: string
  guestPhone: string
  paymentMode: 'full' | 'advance' | 'enquiry'
  couponCode?: string
  specialRequests?: string
  addons?: { addonId: string; qty: number }[]
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

