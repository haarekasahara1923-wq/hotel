'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

interface AnnouncementBarProps {
  text?: string
  link?: string
}

export function AnnouncementBar({
  text = '🎉 Special offer: Book 3 nights, get 20% off! Use code ROYAL20',
  link = '/offers',
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const isDismissed = localStorage.getItem('rbh_announcement_dismissed')
    if (!isDismissed) {
      setDismissed(false)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('rbh_announcement_dismissed', 'true')
  }

  if (dismissed || !text) return null

  return (
    <div className="bg-[#C9A24B] text-[#0B1B3A] text-xs sm:text-sm font-medium py-2 px-4 relative z-50 flex items-center justify-center">
      <div className="flex items-center gap-2 text-center">
        <span>{text}</span>
        {link && (
          <Link
            href={link}
            className="underline font-semibold hover:text-white transition-colors"
          >
            Learn More
          </Link>
        )}
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

