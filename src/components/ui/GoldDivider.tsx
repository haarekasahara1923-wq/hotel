import React from 'react'

interface GoldDividerProps {
  variant?: 'full' | 'narrow' | 'centered'
  withOrnament?: boolean
  className?: string
}

export function GoldDivider({
  variant = 'centered',
  withOrnament = true,
  className = '',
}: GoldDividerProps) {
  const widthClass =
    variant === 'full'
      ? 'w-full'
      : variant === 'narrow'
      ? 'w-24'
      : 'w-48 max-w-full'

  return (
    <div
      className={`flex items-center justify-center my-6 mx-auto ${widthClass} ${className}`}
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B] to-[#C9A24B]/50" />
      {withOrnament && (
        <div className="mx-3 flex items-center justify-center">
          <div className="w-2 h-2 rotate-45 bg-[#C9A24B] shadow-[0_0_8px_#C9A24B]" />
        </div>
      )}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C9A24B]/50 via-[#C9A24B] to-transparent" />
    </div>
  )
}

