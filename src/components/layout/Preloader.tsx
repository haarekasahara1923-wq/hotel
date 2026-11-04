'use client'

import React, { useState, useEffect } from 'react'

export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only show preloader on first page load per session
    const hasLoaded = sessionStorage.getItem('rbh_preloader_shown')
    if (hasLoaded) {
      setLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('rbh_preloader_shown', 'true')
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1B3A] transition-opacity duration-700">
      {/* Royal Crest / Logo Motif */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-2 border-[#C9A24B] flex items-center justify-center animate-pulse">
          <span className="font-serif text-3xl font-light text-[#C9A24B] tracking-wider">
            RBH
          </span>
        </div>
        <div className="absolute inset-0 rounded-full border border-[#C9A24B]/30 animate-ping" />
      </div>

      {/* Hotel Title */}
      <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#FBF8F1] tracking-widest uppercase mb-2">
        Royal Blue Heaven
      </h1>
      <p className="font-serif italic text-sm text-[#C9A24B] tracking-wide mb-6">
        Where Royalty Meets Serenity
      </p>

      {/* Gold Shimmer Progress Bar */}
      <div className="w-48 h-[2px] bg-[#0B1B3A] overflow-hidden relative border border-[#C9A24B]/30 rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent animate-[shimmer_1.5s_infinite]" />
      </div>
    </div>
  )
}

