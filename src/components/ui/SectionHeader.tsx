import React from 'react'
import { GoldDivider } from './GoldDivider'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  dark?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  dark = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 ${
        centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'
      } ${className}`}
    >
      {eyebrow && (
        <div className="flex items-center justify-center gap-3 mb-2">
          {centered && <span className="w-8 h-[1px] bg-[#C9A24B]" />}
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C9A24B]">
            {eyebrow}
          </span>
          <span className="w-8 h-[1px] bg-[#C9A24B]" />
        </div>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${
          dark ? 'text-[#FBF8F1]' : 'text-[#0B1B3A]'
        }`}
      >
        {title}
      </h2>

      <GoldDivider variant="narrow" withOrnament={true} />

      {subtitle && (
        <p
          className={`text-base sm:text-lg font-light leading-relaxed ${
            dark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

