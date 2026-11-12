import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { BackToTop } from '@/components/layout/BackToTop'
import { Preloader } from '@/components/layout/Preloader'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { getSiteSettings } from '@/lib/getSiteSettings'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  const hotelName = settings.hotelName || 'The Royal Comfort Hotel & Restaurant'
  const tagline = settings.tagline || 'Luxury Hotel in Gwalior, Madhya Pradesh'
  const description =
    settings.defaultMetaDesc ||
    `Experience palatial luxury at ${hotelName} in DD Nagar, Gwalior. Opulent rooms & suites, fine dining, Ayurvedic spa, and banquet facilities. Book online with best rate guarantee.`
  const title = settings.defaultMetaTitle || `${hotelName} | ${tagline}`
  const ogImage = settings.ogImageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200'
  const faviconUrl = settings.faviconUrl

  return {
    title,
    description,
    keywords: [
      `luxury hotel gwalior`,
      hotelName.toLowerCase(),
      'best hotel in gwalior',
      'palace hotel madhya pradesh',
      'hotel & restaurant gwalior',
      'wedding venue gwalior',
    ],
    authors: [{ name: hotelName }],
    metadataBase: new URL('https://royalblueheaven.com'),
    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : {
          icon: '/favicon.ico',
        },
    openGraph: {
      title: `${hotelName} | ${tagline}`,
      description: `Where Royalty Meets Serenity. Experience luxury hospitality at ${hotelName}, Gwalior.`,
      images: [ogImage],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-[#1C1C1E]">
        <Preloader />
        <Header
          hotelName={settings.hotelName}
          phone={settings.phone}
          logoUrl={settings.logoLightUrl || settings.logoDarkUrl}
          announcement={
            settings.announcementEnabled && settings.announcementText
              ? {
                  enabled: true,
                  text: settings.announcementText,
                  link: settings.announcementLink || '/offers',
                }
              : undefined
          }
        />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer
          hotelName={settings.hotelName}
          tagline={settings.tagline}
          address={settings.address}
          phone={settings.phone}
          email={settings.email}
          gstNumber={settings.gstNumber}
        />
        <WhatsAppButton
          number={settings.whatsappNumber || settings.phone}
          hotelName={settings.hotelName}
        />
        <BackToTop />
        <MobileBottomNav />
      </body>
    </html>
  )
}
