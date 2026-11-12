'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  MessageSquare,
  CreditCard,
  Tag,
  Star,
  Palette,
  FileEdit,
  Image,
  BookOpen,
  HelpCircle,
  Quote,
  Users,
  UtensilsCrossed,
  Sparkles,
  PartyPopper,
  UserCog,
  Mail,
  Search,
  BarChart3,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Hotel,
} from 'lucide-react'

const NAV_ITEMS = [
  { group: 'Main', items: [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  ]},
  { group: 'Hotel Operations', items: [
    { label: 'Rooms & Rates', href: '/admin/rooms', icon: BedDouble },
    { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { label: 'Payments & Refunds', href: '/admin/payments', icon: CreditCard },
  ]},
  { group: 'Marketing', items: [
    { label: 'Coupons & Offers', href: '/admin/coupons', icon: Tag },
    { label: 'Reviews', href: '/admin/reviews', icon: Star },
  ]},
  { group: 'Content', items: [
    { label: 'Site Branding', href: '/admin/branding', icon: Palette },
    { label: 'Page Editor / CMS', href: '/admin/cms', icon: FileEdit },
    { label: 'Media Library', href: '/admin/media', icon: Image },
    { label: 'Gallery', href: '/admin/gallery', icon: Image },
    { label: 'Blog', href: '/admin/blog', icon: BookOpen },
    { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Quote },
    { label: 'Team', href: '/admin/team', icon: Users },
  ]},
  { group: 'Services', items: [
    { label: 'Dining / Menu', href: '/admin/dining', icon: UtensilsCrossed },
    { label: 'Events Packages', href: '/admin/events', icon: PartyPopper },
    { label: 'Spa Services', href: '/admin/spa', icon: Sparkles },
  ]},
  { group: 'Administration', items: [
    { label: 'Staff & Roles', href: '/admin/staff', icon: UserCog },
    { label: 'Email Templates', href: '/admin/email-templates', icon: Mail },
    { label: 'SEO Manager', href: '/admin/seo', icon: Search },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
    { label: 'Activity Log', href: '/admin/activity-log', icon: Activity },
  ]},
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [adminName, setAdminName] = useState('Super Admin')

  // Protect admin routes - redirect to login if no session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/me', { credentials: 'include' })
        if (!res.ok) {
          window.location.href = '/admin/login'
        } else {
          const data = await res.json()
          if (data.name) setAdminName(data.name)
        }
      } catch {
        window.location.href = '/admin/login'
      }
    }
    // Don't check auth on login page itself
    if (!pathname.includes('/admin/login')) {
      checkAuth()
    }
  }, [pathname])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
    } catch {}
    window.location.href = '/admin/login'
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#C9A24B]/20">
        <div className="w-9 h-9 rounded-full border-2 border-[#C9A24B] flex items-center justify-center bg-[#1A3FA3] shrink-0">
          <Hotel className="w-4 h-4 text-[#C9A24B]" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-serif text-sm text-white tracking-wide whitespace-nowrap">Royal Blue Heaven</p>
            <p className="text-[10px] text-[#C9A24B] tracking-widest uppercase whitespace-nowrap">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
        {NAV_ITEMS.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]/60 font-semibold px-3 mb-1">
                {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C9A24B]/20 text-[#C9A24B] border-l-2 border-[#C9A24B]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Admin user & logout */}
      <div className="border-t border-[#C9A24B]/20 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C9A24B]/20 border border-[#C9A24B]/40 flex items-center justify-center shrink-0">
            <span className="text-[#C9A24B] text-xs font-bold">
              {adminName.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-xs text-white font-medium truncate">{adminName}</p>
              <p className="text-[10px] text-gray-400 truncate">Super Admin</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 transition-colors shrink-0"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex" style={{ background: '#f1f5f9' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col transition-all duration-300"
        style={{
          width: collapsed ? '64px' : '240px',
          background: '#0B1B3A',
          borderRight: '1px solid rgba(201,162,75,0.2)',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 30,
          overflowY: 'auto',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar (drawer) */}
      <aside
        className="lg:hidden flex flex-col fixed top-0 bottom-0 left-0 z-50 w-72 transition-transform duration-300"
        style={{
          background: '#0B1B3A',
          borderRight: '1px solid rgba(201,162,75,0.2)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      {/* On desktop: push content right of sidebar. On mobile: full width (sidebar is overlay) */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 w-full lg:w-auto"
        style={{ '--sidebar-w': collapsed ? '64px' : '240px' } as React.CSSProperties}
      >
        {/* Desktop Top bar */}
        <div
          className="hidden lg:flex sticky top-0 z-20 items-center justify-between px-6 py-3 border-b"
          style={{ background: '#fff', borderColor: 'rgba(201,162,75,0.15)', minHeight: '56px', marginLeft: 0 }}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-[#0B1B3A] transition-colors"
            title="Toggle sidebar"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/admin" className="text-[#1A3FA3] font-medium hover:text-[#C9A24B]">Admin</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-500 hover:text-[#1A3FA3] transition-colors flex items-center gap-1"
            >
              View Site ↗
            </Link>
          </div>
        </div>

        {/* Mobile top bar */}
        <div
          className="lg:hidden flex items-center justify-between px-4 py-3 border-b sticky top-0 z-20"
          style={{ background: '#0B1B3A', borderColor: 'rgba(201,162,75,0.2)' }}
        >
          <button onClick={() => setMobileOpen(true)} className="text-[#C9A24B] p-1" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-serif text-white text-sm tracking-wide">Admin Panel</span>
          <Link href="/" target="_blank" className="text-[10px] text-[#C9A24B] uppercase tracking-wider">
            Site ↗
          </Link>
        </div>

        {/* Page content - add bottom padding on mobile for bottom nav */}
        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
          {children}
        </main>
      </div>

      {/* ── MOBILE BOTTOM NAVIGATION BAR ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t"
        style={{ background: '#0B1B3A', borderColor: 'rgba(201,162,75,0.3)', height: '60px' }}
      >
        {[
          { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
          { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
          { label: 'Rooms', href: '/admin/rooms', icon: BedDouble },
          { label: 'Gallery', href: '/admin/gallery', icon: Image },
          { label: 'More', href: '#', icon: Menu, action: () => setMobileOpen(true) },
        ].map((item) => {
          const Icon = item.icon
          const isActive = item.href !== '#' && (pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)))
          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.action) {
                  item.action()
                } else {
                  window.location.href = item.href
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                padding: '6px 12px',
                color: isActive ? '#C9A24B' : 'rgba(255,255,255,0.5)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                minWidth: '56px',
              }}
              aria-label={item.label}
            >
              <Icon style={{ width: '20px', height: '20px', flexShrink: 0 }} />
              <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

