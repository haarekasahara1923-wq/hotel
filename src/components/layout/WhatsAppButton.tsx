'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  number?: string
  hotelName?: string
}

export function WhatsAppButton({
  number = '+919876543210',
  hotelName = 'Royal Blue Heaven',
}: WhatsAppButtonProps) {
  const cleanNumber = number.replace(/[^0-9]/g, '')
  const message = encodeURIComponent(
    `Hello ${hotelName}! I would like to enquire about room availability and booking.`
  )
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-medium pr-1">
        Chat with Us
      </span>
    </a>
  )
}

