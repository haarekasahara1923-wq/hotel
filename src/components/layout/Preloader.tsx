'use client'

import React, { useState, useEffect } from 'react'

interface BrandingData {
  hotelName?: string
  tagline?: string
  preloaderLogoUrl?: string
  logoLightUrl?: string
  logoDarkUrl?: string
  faviconUrl?: string
}

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [branding, setBranding] = useState<BrandingData>({})

  useEffect(() => {
    // Fetch branding for dynamic hotel name/logo
    fetch('/api/admin/branding')
      .then((r) => r.ok ? r.json() : {})
      .then((data) => setBranding(data))
      .catch(() => {})

    // Only show preloader on first page load per session
    const hasLoaded = sessionStorage.getItem('hotel_preloader_shown')
    if (hasLoaded) {
      setLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('hotel_preloader_shown', 'true')
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  const hotelName = branding.hotelName || 'The Royal Comfort Hotel & Restaurant'
  const tagline = branding.tagline || 'Where Royalty Meets Serenity'
  const logoUrl = branding.preloaderLogoUrl || branding.logoLightUrl || branding.logoDarkUrl

  // Generate initials from hotel name for fallback
  const initials = hotelName
    .split(' ')
    .filter((w) => w.length > 2 && !['and', 'the', '&'].includes(w.toLowerCase()))
    .slice(0, 3)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || 'TRC'

  return (
    <div
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{ background: '#0B1B3A' }}
    >
      {/* Logo or Initials Crest */}
      <div className="relative mb-6 flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-full border-2 flex items-center justify-center animate-pulse overflow-hidden"
          style={{ borderColor: '#C9A24B', background: 'rgba(201,162,75,0.08)' }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={hotelName}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
            />
          ) : (
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                fontWeight: 300,
                color: '#C9A24B',
                letterSpacing: '0.1em',
              }}
            >
              {initials}
            </span>
          )}
        </div>
        <div
          className="absolute inset-0 rounded-full border animate-ping"
          style={{ borderColor: 'rgba(201,162,75,0.3)' }}
        />
      </div>

      {/* Hotel Name — dynamic, 2-line split if needed */}
      {(() => {
        const parts = hotelName.split(/(?=Hotel|Restaurant|Resort|Palace|Suites)/i)
        if (parts.length >= 2) {
          return (
            <div className="text-center mb-2">
              <h1
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(18px, 5vw, 26px)',
                  fontWeight: 300,
                  color: '#FBF8F1',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {parts[0].trim()}
              </h1>
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(13px, 3vw, 17px)',
                  fontWeight: 300,
                  color: '#C9A24B',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {parts.slice(1).join(' ').trim()}
              </span>
            </div>
          )
        }
        return (
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(18px, 5vw, 26px)',
              fontWeight: 300,
              color: '#FBF8F1',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            {hotelName}
          </h1>
        )
      })()}

      {/* Tagline */}
      <p
        className="font-serif italic mb-6"
        style={{
          fontSize: '13px',
          color: '#C9A24B',
          letterSpacing: '0.08em',
          marginTop: '6px',
        }}
      >
        {tagline}
      </p>

      {/* Gold Shimmer Progress Bar */}
      <div
        className="overflow-hidden relative rounded-full"
        style={{
          width: '180px',
          height: '2px',
          background: 'rgba(201,162,75,0.15)',
          border: '1px solid rgba(201,162,75,0.3)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent animate-[shimmer_1.5s_infinite]"
        />
      </div>
    </div>
  )
}
