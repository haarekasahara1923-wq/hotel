import { prisma } from './prisma'

export interface SiteSettings {
  hotelName?: string
  tagline?: string
  establishedYear?: string
  description?: string
  logoLightUrl?: string
  logoDarkUrl?: string
  faviconUrl?: string
  preloaderLogoUrl?: string
  primaryColor?: string
  primaryDarkColor?: string
  accentColor?: string
  champagneColor?: string
  phone?: string
  email?: string
  whatsappNumber?: string
  gstNumber?: string
  address?: string
  mapEmbedUrl?: string
  instagramUrl?: string
  facebookUrl?: string
  twitterUrl?: string
  youtubeUrl?: string
  announcementEnabled?: boolean
  announcementText?: string
  announcementLink?: string
  maintenanceMode?: boolean
  defaultMetaTitle?: string
  defaultMetaDesc?: string
  ogImageUrl?: string
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { id: 'main' },
    })
    return (setting?.data as SiteSettings) || {}
  } catch (error) {
    console.error('[getSiteSettings Error]', error)
    return {}
  }
}

