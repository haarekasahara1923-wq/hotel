'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-6 z-40 bg-[#0B1B3A] border border-[#C9A24B]/40 text-[#C9A24B] p-3 rounded-full shadow-[0_4px_15px_rgba(11,27,58,0.4)] hover:bg-[#C9A24B] hover:text-[#0B1B3A] hover:scale-105 transition-all duration-300"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}

