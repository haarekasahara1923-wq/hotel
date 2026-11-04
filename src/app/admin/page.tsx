'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users,
  Bed,
  CreditCard,
  TrendingUp,
  Calendar,
  MessageSquare,
  Clock,
  ArrowRight,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react'

interface StatsData {
  todayCheckins: number
  todayCheckouts: number
  occupancyPercent: number
  revenueThisMonth: number
  pendingEnquiries: number
  totalBookings: number
  recentBookings: Array<{
    id: string
    code: string
    guestName: string
    guestEmail: string
    checkIn: string
    checkOut: string
    status: string
    total: number
    rooms: number
    source: string
  }>
  recentEnquiries: Array<{
    id: string
    name: string
    email: string
    phone: string
    type: string
    status: string
    createdAt: string
  }>
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/stats', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Royal Blue Heaven — Executive Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">Live overview of hotel occupancy, daily arrivals, revenue & guest requests</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Plus className="w-3.5 h-3.5" />
            New Walk-in Booking
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Occupancy */}
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Occupancy</span>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#1A3FA3]" style={{ background: 'rgba(26,63,163,0.1)' }}>
              <Bed className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-serif font-light text-[#0B1B3A]">{stats?.occupancyPercent ?? 0}%</span>
            <span className="text-[10px] text-gray-400">of 20 chambers</span>
          </div>
          <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${stats?.occupancyPercent ?? 0}%`, background: '#1A3FA3' }} />
          </div>
        </div>

        {/* Today's Check-ins */}
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Arrivals Today</span>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-emerald-600" style={{ background: 'rgba(16,185,129,0.1)' }}>
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-serif font-light text-emerald-700">{stats?.todayCheckins ?? 0}</span>
            <span className="text-[10px] text-gray-400">check-ins scheduled</span>
          </div>
          <p className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Standard check-in: 14:00
          </p>
        </div>

        {/* Today's Check-outs */}
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Departures</span>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-amber-600" style={{ background: 'rgba(245,158,11,0.1)' }}>
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-serif font-light text-amber-700">{stats?.todayCheckouts ?? 0}</span>
            <span className="text-[10px] text-gray-400">check-outs scheduled</span>
          </div>
          <p className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Standard check-out: 11:00
          </p>
        </div>

        {/* Revenue This Month */}
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Month Revenue</span>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#C9A24B]" style={{ background: 'rgba(201,162,75,0.1)' }}>
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-serif font-light text-[#0B1B3A]">
              ₹{(stats?.revenueThisMonth ?? 0).toLocaleString('en-IN')}
            </span>
          </div>
          <p className="mt-2 text-[10px] text-gray-400">
            Total {stats?.totalBookings ?? 0} bookings logged
          </p>
        </div>

        {/* Pending Enquiries */}
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">New Leads</span>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-rose-600" style={{ background: 'rgba(225,29,72,0.1)' }}>
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-serif font-light text-rose-700">{stats?.pendingEnquiries ?? 0}</span>
            <span className="text-[10px] text-gray-400">require reply</span>
          </div>
          <Link href="/admin/enquiries" className="mt-2 text-[10px] text-[#1A3FA3] hover:underline flex items-center gap-1">
            View pipeline →
          </Link>
        </div>
      </div>

      {/* Quick Operations Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <Link
          href="/admin/rooms"
          className="p-3 bg-white border border-gray-200 rounded-sm shadow-sm hover:border-[#C9A24B] transition-all text-center flex flex-col items-center justify-center"
        >
          <Bed className="w-5 h-5 text-[#1A3FA3] mb-1.5" />
          <span className="text-xs font-semibold text-[#0B1B3A]">Room Matrix</span>
          <span className="text-[10px] text-gray-400">20 Rooms Status</span>
        </Link>
        <Link
          href="/admin/bookings"
          className="p-3 bg-white border border-gray-200 rounded-sm shadow-sm hover:border-[#C9A24B] transition-all text-center flex flex-col items-center justify-center"
        >
          <Calendar className="w-5 h-5 text-[#C9A24B] mb-1.5" />
          <span className="text-xs font-semibold text-[#0B1B3A]">Bookings</span>
          <span className="text-[10px] text-gray-400">Manage Stays</span>
        </Link>
        <Link
          href="/admin/gallery"
          className="p-3 bg-white border border-gray-200 rounded-sm shadow-sm hover:border-[#C9A24B] transition-all text-center flex flex-col items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-purple-600 mb-1.5" />
          <span className="text-xs font-semibold text-[#0B1B3A]">Gallery & Videos</span>
          <span className="text-[10px] text-gray-400">Upload & Embed</span>
        </Link>
        <Link
          href="/admin/branding"
          className="p-3 bg-white border border-gray-200 rounded-sm shadow-sm hover:border-[#C9A24B] transition-all text-center flex flex-col items-center justify-center"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1.5" />
          <span className="text-xs font-semibold text-[#0B1B3A]">Branding</span>
          <span className="text-[10px] text-gray-400">Logos & Colors</span>
        </Link>
        <Link
          href="/admin/dining"
          className="p-3 bg-white border border-gray-200 rounded-sm shadow-sm hover:border-[#C9A24B] transition-all text-center flex flex-col items-center justify-center"
        >
          <TrendingUp className="w-5 h-5 text-amber-600 mb-1.5" />
          <span className="text-xs font-semibold text-[#0B1B3A]">Dining Menu</span>
          <span className="text-[10px] text-gray-400">Awadhi Dishes</span>
        </Link>
        <Link
          href="/admin/reports"
          className="p-3 bg-white border border-gray-200 rounded-sm shadow-sm hover:border-[#C9A24B] transition-all text-center flex flex-col items-center justify-center"
        >
          <CreditCard className="w-5 h-5 text-blue-600 mb-1.5" />
          <span className="text-xs font-semibold text-[#0B1B3A]">Reports</span>
          <span className="text-[10px] text-gray-400">Export Excel/PDF</span>
        </Link>
      </div>

      {/* Main Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#0B1B3A]">Recent Bookings</h2>
              <p className="text-[11px] text-gray-400">Latest reservations across website and reception</p>
            </div>
            <Link href="/admin/bookings" className="text-xs text-[#1A3FA3] hover:underline flex items-center gap-1 font-medium">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="py-3 px-4">Booking Code</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Check-in / Out</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                  stats.recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-[#1A3FA3]">{b.code}</td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#0B1B3A] block">{b.guestName}</span>
                        <span className="text-[10px] text-gray-400">{b.guestEmail}</span>
                      </td>
                      <td className="py-3 px-4 text-[11px]">
                        <div>In: {new Date(b.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                        <div className="text-gray-400">Out: {new Date(b.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        ₹{Number(b.total).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            b.status === 'CONFIRMED'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : b.status === 'CHECKED_IN'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : b.status === 'PENDING'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[10px] uppercase tracking-wider text-gray-400">
                        {b.source}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400 text-xs">
                      No reservations recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Enquiries (1 Col) */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#0B1B3A]">Recent Enquiries</h2>
              <p className="text-[11px] text-gray-400">Leads from website forms & contact requests</p>
            </div>
            <Link href="/admin/enquiries" className="text-xs text-[#1A3FA3] hover:underline flex items-center gap-1 font-medium">
              All leads <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex-1 divide-y divide-gray-100">
            {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
              stats.recentEnquiries.map((e) => (
                <div key={e.id} className="p-3.5 hover:bg-gray-50/70 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[#0B1B3A]">{e.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider bg-purple-50 text-purple-700">
                      {e.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mb-1.5 flex items-center gap-2">
                    <span>{e.phone}</span>
                    <span>•</span>
                    <span className="truncate">{e.email}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-gray-400">
                      {new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                    <a
                      href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${e.name}, thank you for contacting Royal Blue Heaven.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition-colors"
                    >
                      WhatsApp Reply ↗
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-gray-400 text-xs">
                No customer enquiries yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
