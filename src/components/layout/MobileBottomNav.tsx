'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BedDouble, CalendarCheck, Image as ImageIcon, Phone } from 'lucide-react'

export function MobileBottomNav() {
  const pathname = usePathname()

  // Do not show on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Rooms', href: '/rooms', icon: BedDouble },
    { label: 'Reserve', href: '/book', icon: CalendarCheck, isCta: true },
    { label: 'Gallery', href: '/gallery', icon: ImageIcon },
    { label: 'Contact', href: '/contact', icon: Phone },
  ]

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t"
      style={{
        background: '#0B1B3A',
        borderColor: 'rgba(201,162,75,0.3)',
        height: '62px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        if (item.isCta) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center -mt-4"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #C9A24B 0%, #E8D5A3 100%)',
                  color: '#0B1B3A',
                  border: '2px solid #0B1B3A',
                }}
              >
                <Icon className="w-5 h-5 font-bold" />
              </div>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#C9A24B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginTop: '2px',
                }}
              >
                Book
              </span>
            </Link>
          )
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center py-1 px-3"
            style={{
              textDecoration: 'none',
              color: isActive ? '#C9A24B' : 'rgba(255,255,255,0.65)',
            }}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span
              style={{
                fontSize: '10px',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.04em',
              }}
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

