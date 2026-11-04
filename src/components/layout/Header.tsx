'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, Phone, Sparkles } from 'lucide-react'
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
      if (window.scrollY > 20) {
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
    { name: 'Rooms & Suites', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Banquet & Events', href: '/events' },
    { name: 'Spa & Wellness', href: '/spa' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Offers', href: '/offers' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {announcement?.enabled && (
        <AnnouncementBar text={announcement.text} link={announcement.link} />
      )}

      {/* Top micro bar for telephone & guest lookup */}
      <div className="bg-[#071228] text-xs text-gray-300 border-b border-[#C9A24B]/20 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#C9A24B] hidden sm:inline-flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-[#C9A24B]" /> Luxury Palace Hotel • DD Nagar, Gwalior
            </span>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#C9A24B] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C9A24B]" />
              <span className="font-medium">{phone}</span>
            </a>
            <span className="text-[#C9A24B]/40">|</span>
            <Link
              href="/lookup"
              className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#C9A24B] transition-colors"
            >
              <User className="w-3 h-3 text-[#C9A24B]" />
              <span>Lookup Booking</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B1B3A] shadow-2xl border-b border-[#C9A24B]/30 py-2.5'
            : 'bg-[#0B1B3A]/95 backdrop-blur-md border-b border-[#C9A24B]/25 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Royal Crest Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full border-2 border-[#C9A24B] flex items-center justify-center bg-gradient-to-br from-[#1A3FA3] to-[#0B1B3A] shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-[#C9A24B] font-bold text-lg tracking-wider">
                RBH
              </span>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-2xl font-normal text-[#FBF8F1] tracking-wider uppercase block leading-none">
                {hotelName}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mt-1">
                Where Royalty Meets Serenity
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs xl:text-sm tracking-wider uppercase transition-colors duration-200 relative py-1 font-medium ${
                    active
                      ? 'text-[#C9A24B] font-semibold'
                      : 'text-gray-200 hover:text-[#C9A24B]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Book Now Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/book"
              className="bg-gradient-to-r from-[#C9A24B] via-[#E8D5A3] to-[#C9A24B] text-[#0B1B3A] font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-sm hover:brightness-110 transition-all duration-300 shadow-[0_2px_12px_rgba(201,162,75,0.35)]"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/book"
              className="bg-[#C9A24B] text-[#0B1B3A] px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider"
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
          <div className="lg:hidden bg-[#0B1B3A] border-b border-[#C9A24B]/30 px-6 py-6 transition-all duration-300">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-wider uppercase py-2 border-b border-white/10 ${
                    pathname === link.href
                      ? 'text-[#C9A24B] font-semibold'
                      : 'text-gray-200 hover:text-[#C9A24B]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/lookup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-wider text-gray-300 hover:text-[#C9A24B] flex items-center gap-2 py-1"
                >
                  <User className="w-4 h-4 text-[#C9A24B]" />
                  <span>Lookup Booking</span>
                </Link>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="text-xs uppercase tracking-wider text-[#C9A24B] flex items-center gap-2 py-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {phone}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
