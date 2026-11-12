'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface MenuQRModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuQRModal({ isOpen, onClose }: MenuQRModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: 'rgba(7,18,40,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xs rounded-lg shadow-2xl"
        style={{
          background: '#FBF8F1',
          border: '2px solid #C9A24B',
          padding: '24px 20px 20px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close QR modal"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(11,27,58,0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#0B1B3A',
          }}
        >
          <X style={{ width: '14px', height: '14px' }} />
        </button>

        {/* Gold Accent Top Bar */}
        <div
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #C9A24B, transparent)',
            marginBottom: '16px',
            borderRadius: '2px',
          }}
        />

        {/* Title */}
        <h3
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '17px',
            fontWeight: 600,
            color: '#0B1B3A',
            textAlign: 'center',
            marginBottom: '4px',
            letterSpacing: '0.03em',
          }}
        >
          🍽️ Scan to Order Food
        </h3>
        <p
          style={{
            fontSize: '11px',
            color: '#7a6a4a',
            textAlign: 'center',
            marginBottom: '16px',
            letterSpacing: '0.04em',
          }}
        >
          From your room or at the table
        </p>

        {/* QR Code Image */}
        <div
          style={{
            border: '1px solid rgba(201,162,75,0.3)',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#fff',
            padding: '8px',
          }}
        >
          <img
            src="/menu-qr.png"
            alt="Food Menu QR Code - Scan to Order"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
          />
        </div>

        {/* Instruction */}
        <p
          style={{
            fontSize: '10px',
            color: '#888',
            textAlign: 'center',
            marginTop: '12px',
            letterSpacing: '0.03em',
          }}
        >
          Point your camera at the QR code to open the menu
        </p>

        {/* Gold Accent Bottom Bar */}
        <div
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #C9A24B, transparent)',
            marginTop: '16px',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  )
}

