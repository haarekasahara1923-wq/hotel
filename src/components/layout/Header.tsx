'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, Phone } from 'lucide-react'
import { AnnouncementBar } from './AnnouncementBar'

interface HeaderProps {
  hotelName?: string
  phone?: string
  announcement?: {
    enabled: boolean
    text: string
    link?: string
  }
}

export function Header({
  hotelName = 'Royal Blue Heaven',
  phone = '+91 98765 43210',
  announcement,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Rooms & Suites', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Banquet & Events', href: '/events' },
    { name: 'Spa & Wellness', href: '/spa' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Offers', href: '/offers' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const isHome = pathname === '/'

  return (
    <>
      {announcement?.enabled && (
        <AnnouncementBar text={announcement.text} link={announcement.link} />
      )}

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-[#0B1B3A]/95 backdrop-blur-md shadow-lg border-b border-[#C9A24B]/20 py-3'
            : 'bg-gradient-to-b from-[#0B1B3A]/80 via-[#0B1B3A]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#C9A24B] flex items-center justify-center bg-[#0B1B3A]/50 group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-[#C9A24B] font-light text-base tracking-wider">
                R
              </span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-light text-[#FBF8F1] tracking-wider uppercase block leading-none">
                {hotelName}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A24B] font-medium block mt-0.5">
                Luxury Hotel • Gwalior
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors duration-200 relative py-1 ${
                    active
                      ? 'text-[#C9A24B] font-medium'
                      : 'text-gray-200 hover:text-[#C9A24B]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A24B]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Actions: Phone + Lookup + Book Now */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="hidden lg:flex items-center gap-1.5 text-xs text-[#C9A24B] hover:text-[#F4E9CD] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{phone}</span>
            </a>

            <Link
              href="/lookup"
              className="p-2 text-gray-300 hover:text-[#C9A24B] transition-colors"
              title="Lookup Booking"
            >
              <User className="w-4 h-4" />
            </Link>

            <Link
              href="/book"
              className="bg-[#C9A24B] text-[#0B1B3A] px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-[#E8D5A3] transition-all duration-300 shadow-[0_2px_12px_rgba(201,162,75,0.3)] hover:scale-102"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-3">
            <Link
              href="/book"
              className="bg-[#C9A24B] text-[#0B1B3A] px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider"
            >
              Book
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#C9A24B] hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0B1B3A] border-b border-[#C9A24B]/20 px-6 py-6 transition-all duration-300">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base tracking-wide py-1 border-b border-white/5 ${
                    pathname === link.href
                      ? 'text-[#C9A24B] font-medium'
                      : 'text-gray-300 hover:text-[#C9A24B]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/lookup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-gray-300 hover:text-[#C9A24B] flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>My Bookings / Lookup</span>
                </Link>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="text-sm text-[#C9A24B] flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{phone}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

