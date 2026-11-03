import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { BackToTop } from '@/components/layout/BackToTop'
import { Preloader } from '@/components/layout/Preloader'

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

export const metadata: Metadata = {
  title: 'Royal Blue Heaven | Luxury Hotel in Gwalior, Madhya Pradesh',
  description:
    'Experience palatial luxury at Royal Blue Heaven in DD Nagar, Gwalior. 20 opulent rooms & suites, fine dining, Ayurvedic spa, and banquet facilities. Book online with best rate guarantee.',
  keywords: [
    'luxury hotel gwalior',
    'royal blue heaven',
    'best hotel in gwalior',
    'palace hotel madhya pradesh',
    'royal suite gwalior',
    'wedding venue gwalior',
  ],
  authors: [{ name: 'Royal Blue Heaven' }],
  metadataBase: new URL('https://royalblueheaven.com'),
  openGraph: {
    title: 'Royal Blue Heaven | Luxury Hotel in Gwalior',
    description:
      'Where Royalty Meets Serenity. Experience 5-star heritage luxury in Gwalior.',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FBF8F1] text-[#1C1C1E]">
        <Preloader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  )
}
