'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Users,
  Bed,
  CreditCard,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
  ShieldCheck,
  CheckCircle,
  Clock,
  LogOut,
  RefreshCw,
  Plus,
  Eye,
  Edit3,
} from 'lucide-react'

const INITIAL_ROOMS = [
  // Deluxe (8 rooms: 101-108)
  { number: '101', type: 'Deluxe Room', floor: 1, status: 'OCCUPIED', guest: 'Dr. Rajan Pillai' },
  { number: '102', type: 'Deluxe Room', floor: 1, status: 'AVAILABLE', guest: '-' },
  { number: '103', type: 'Deluxe Room', floor: 1, status: 'OCCUPIED', guest: 'Ananya Roy' },
  { number: '104', type: 'Deluxe Room', floor: 1, status: 'AVAILABLE', guest: '-' },
  { number: '105', type: 'Deluxe Room', floor: 1, status: 'MAINTENANCE', guest: '-' },
  { number: '106', type: 'Deluxe Room', floor: 1, status: 'OCCUPIED', guest: 'Kavita Verma' },
  { number: '107', type: 'Deluxe Room', floor: 1, status: 'AVAILABLE', guest: '-' },
  { number: '108', type: 'Deluxe Room', floor: 1, status: 'OCCUPIED', guest: 'Deepak Chopra' },

  // Premier Suite (5 rooms: 201-205)
  { number: '201', type: 'Premier Suite', floor: 2, status: 'OCCUPIED', guest: 'Aditya Kapoor' },
  { number: '202', type: 'Premier Suite', floor: 2, status: 'OCCUPIED', guest: 'Rohan Mehra' },
  { number: '203', type: 'Premier Suite', floor: 2, status: 'AVAILABLE', guest: '-' },
  { number: '204', type: 'Premier Suite', floor: 2, status: 'OCCUPIED', guest: 'Sunita Bhatt' },
  { number: '205', type: 'Premier Suite', floor: 2, status: 'AVAILABLE', guest: '-' },

  // Royal Suite (3 rooms: 301-303)
  { number: '301', type: 'Royal Suite', floor: 3, status: 'OCCUPIED', guest: 'Priya & Vikram Mehta' },
  { number: '302', type: 'Royal Suite', floor: 3, status: 'OCCUPIED', guest: 'Suresh Agarwal' },
  { number: '303', type: 'Royal Suite', floor: 3, status: 'AVAILABLE', guest: '-' },

  // Presidential Suite (2 rooms: 401, 402)
  { number: '401', type: 'Presidential Suite', floor: 4, status: 'OCCUPIED', guest: 'Rahul Sharma (VIP)' },
  { number: '402', type: 'Presidential Suite', floor: 4, status: 'AVAILABLE', guest: '-' },

  // Heritage Villa (2 rooms: V1, V2)
  { number: 'V1', type: 'Heritage Villa Room', floor: 0, status: 'OCCUPIED', guest: 'Sneha & Raj Gupta' },
  { number: 'V2', type: 'Heritage Villa Room', floor: 0, status: 'AVAILABLE', guest: '-' },
]

const RECENT_BOOKINGS = [
  { code: 'RBH-20241103-9A2B', name: 'Rahul Sharma', room: 'Presidential Suite', dates: 'Nov 03 - Nov 07', total: 140000, paid: 140000, status: 'CHECKED_IN' },
  { code: 'RBH-20241103-4F8X', name: 'Priya Mehta', room: 'Royal Suite', dates: 'Nov 03 - Nov 05', total: 36000, paid: 36000, status: 'CHECKED_IN' },
  { code: 'RBH-20241102-1K9M', name: 'Amitabh Sen', room: 'Premier Suite', dates: 'Nov 05 - Nov 08', total: 28500, paid: 8550, status: 'CONFIRMED' },
  { code: 'RBH-20241101-7W2L', name: 'Vikram Rajput', room: 'Deluxe Room', dates: 'Nov 04 - Nov 06', total: 11000, paid: 0, status: 'PENDING' },
  { code: 'RBH-20241031-8P4Q', name: 'Kunal Grover', room: 'Heritage Villa', dates: 'Nov 01 - Nov 03', total: 50000, paid: 50000, status: 'CHECKED_OUT' },
]

const ENQUIRIES = [
  { id: '1', name: 'Siddharth Roy', type: 'Wedding', date: 'Today, 9:30 AM', phone: '+91 98111 22334', message: 'Looking for full property buyout for 250 guests on Jan 18-20, 2025.' },
  { id: '2', name: 'Pooja Singhania', type: 'Dining', date: 'Today, 8:15 AM', phone: '+91 97222 33445', message: 'Table for 6 guests for anniversary celebration with candle setup tonight.' },
  { id: '3', name: 'Dr. Alok Verma', type: 'Corporate', date: 'Yesterday', phone: '+91 99333 44556', message: 'Medical symposium day package for 60 doctors with AV setup.' },
]

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'bookings' | 'enquiries' | 'branding'>('overview')
  const [rooms, setRooms] = useState(INITIAL_ROOMS)
  const [bookings, setBookings] = useState(RECENT_BOOKINGS)

  // Branding state
  const [hotelName, setHotelName] = useState('Royal Blue Heaven')
  const [tagline, setTagline] = useState('Where Royalty Meets Serenity')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [whatsapp, setWhatsapp] = useState('+919876543210')
  const [announcement, setAnnouncement] = useState('🎉 Special offer: Book 3 nights, get 20% off! Use code ROYAL20')
  const [savedMsg, setSavedMsg] = useState(false)

  const occupiedCount = rooms.filter((r) => r.status === 'OCCUPIED').length
  const occupancyPercent = Math.round((occupiedCount / 20) * 100)

  const handleStatusChange = (roomNumber: string, newStatus: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.number === roomNumber ? { ...r, status: newStatus } : r))
    )
  }

  const handleBookingStatusChange = (code: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.code === code ? { ...b, status: newStatus } : b))
    )
  }

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 3000)
  }

  return (
    <div className="bg-[#0B1B3A] min-h-screen text-gray-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-[#0B1B3A] border-b border-[#C9A24B]/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#C9A24B] flex items-center justify-center text-[#C9A24B] font-serif font-bold text-sm">
            RBH
          </div>
          <div>
            <h1 className="font-serif text-lg tracking-wider text-[#FBF8F1] leading-none">
              Royal Blue Heaven
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-[#C9A24B] font-semibold">
              Super Admin Management Suite
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-300">Database & Razorpay Live</span>
          </div>
          <Link
            href="/"
            className="border border-[#C9A24B]/60 text-[#C9A24B] px-3 py-1.5 rounded-sm hover:bg-[#C9A24B] hover:text-[#0B1B3A] transition-colors"
          >
            Visit Public Site
          </Link>
          <button
            onClick={() => {
              document.cookie = 'authjs.session-token=; path=/; max-age=0'
              document.cookie = 'next-auth.session-token=; path=/; max-age=0'
              window.location.href = '/admin/login'
            }}
            className="border border-red-500/40 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 bg-[#0B1B3A]/90 border-r border-[#C9A24B]/20 p-4 shrink-0">
          <div className="mb-6 px-3">
            <span className="text-[10px] uppercase tracking-widest text-[#C9A24B] block font-semibold">
              Logged in as
            </span>
            <span className="text-sm font-medium text-white block">Super Admin (Rajendra S.)</span>
            <span className="text-[11px] text-gray-400">admin@royalblueheaven.com</span>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-2.5 rounded-sm flex items-center gap-3 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#C9A24B] text-[#0B1B3A] font-semibold'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Dashboard & Occupancy</span>
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`w-full text-left px-3.5 py-2.5 rounded-sm flex items-center gap-3 transition-colors ${
                activeTab === 'rooms'
                  ? 'bg-[#C9A24B] text-[#0B1B3A] font-semibold'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Bed className="w-4 h-4" />
              <span>Room Inventory (20 Rooms)</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left px-3.5 py-2.5 rounded-sm flex items-center gap-3 transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-[#C9A24B] text-[#0B1B3A] font-semibold'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Bookings & Guests</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full text-left px-3.5 py-2.5 rounded-sm flex items-center gap-3 transition-colors ${
                activeTab === 'enquiries'
                  ? 'bg-[#C9A24B] text-[#0B1B3A] font-semibold'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquiries & Leads ({ENQUIRIES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('branding')}
              className={`w-full text-left px-3.5 py-2.5 rounded-sm flex items-center gap-3 transition-colors ${
                activeTab === 'branding'
                  ? 'bg-[#C9A24B] text-[#0B1B3A] font-semibold'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Branding & CMS</span>
            </button>
          </nav>
        </aside>

        {/* Content View */}
        <main className="flex-1 p-6 lg:p-10 bg-[#09152C] overflow-y-auto">
          {/* ── TAB 1: OVERVIEW DASHBOARD ── */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#0B1B3A] border border-[#C9A24B]/30 p-5 rounded-sm shadow-sm">
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
                    Today's Occupancy
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-light text-white">
                      {occupancyPercent}%
                    </span>
                    <span className="text-xs text-gray-400">
                      ({occupiedCount}/20 Rooms)
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-[#C9A24B] h-full"
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#0B1B3A] border border-[#C9A24B]/30 p-5 rounded-sm shadow-sm">
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
                    Monthly Revenue
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-light text-[#FBF8F1]">
                      ₹18,45,000
                    </span>
                  </div>
                  <span className="text-[11px] text-green-400 block mt-2">
                    ↑ 18.5% vs last month
                  </span>
                </div>

                <div className="bg-[#0B1B3A] border border-[#C9A24B]/30 p-5 rounded-sm shadow-sm">
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
                    Today's Check-Ins
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-light text-white">
                      4 Chambers
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 block mt-2">
                    2 Check-outs pending
                  </span>
                </div>

                <div className="bg-[#0B1B3A] border border-[#C9A24B]/30 p-5 rounded-sm shadow-sm">
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
                    Average Daily Rate (ADR)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-light text-[#FBF8F1]">
                      ₹14,200
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 block mt-2">
                    RevPAR: ₹11,360
                  </span>
                </div>
              </div>

              {/* Quick Actions & 20-Room Visual Matrix */}
              <div className="bg-[#0B1B3A] border border-[#C9A24B]/30 p-6 rounded-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-xl text-white">
                      Chamber Status Grid (20 Rooms)
                    </h2>
                    <span className="text-xs text-gray-400">
                      Live status across all 5 suite tiers
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-green-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      Available
                    </span>
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      Occupied
                    </span>
                    <span className="flex items-center gap-1.5 text-yellow-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      Maintenance
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {rooms.map((r) => {
                    const bg =
                      r.status === 'OCCUPIED'
                        ? 'border-blue-500/50 bg-blue-950/40 text-blue-200'
                        : r.status === 'MAINTENANCE'
                        ? 'border-yellow-500/50 bg-yellow-950/40 text-yellow-200'
                        : 'border-green-500/50 bg-green-950/40 text-green-200'

                    return (
                      <div
                        key={r.number}
                        className={`p-3 rounded-sm border ${bg} text-xs space-y-1`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-sm">
                            #{r.number}
                          </span>
                          <span className="text-[10px] uppercase font-semibold">
                            {r.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-300 block truncate">
                          {r.type}
                        </span>
                        <span className="text-[10px] text-gray-400 block truncate">
                          {r.guest}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: ROOM INVENTORY ── */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="font-serif text-2xl text-white">
                    20-Room Inventory & Status Control
                  </h2>
                  <span className="text-xs text-gray-400">
                    Switch room statuses, assign guests, or toggle maintenance
                  </span>
                </div>
              </div>

              <div className="bg-[#0B1B3A] border border-[#C9A24B]/30 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-white/5 uppercase text-[10px] tracking-wider text-[#C9A24B] border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Room #</th>
                      <th className="p-3.5">Suite Category</th>
                      <th className="p-3.5">Floor</th>
                      <th className="p-3.5">Current Guest</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {rooms.map((r) => (
                      <tr key={r.number} className="hover:bg-white/5">
                        <td className="p-3.5 font-mono font-bold text-white">
                          #{r.number}
                        </td>
                        <td className="p-3.5 font-medium">{r.type}</td>
                        <td className="p-3.5">Floor {r.floor}</td>
                        <td className="p-3.5">{r.guest}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${
                              r.status === 'OCCUPIED'
                                ? 'bg-blue-900 text-blue-200'
                                : r.status === 'MAINTENANCE'
                                ? 'bg-yellow-900 text-yellow-200'
                                : 'bg-green-900 text-green-200'
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={r.status}
                            onChange={(e) => handleStatusChange(r.number, e.target.value)}
                            className="bg-white/10 border border-white/20 text-white rounded-sm px-2 py-1 text-xs focus:outline-none focus:border-[#C9A24B]"
                          >
                            <option value="AVAILABLE" className="bg-[#0B1B3A]">Set Available</option>
                            <option value="OCCUPIED" className="bg-[#0B1B3A]">Set Occupied</option>
                            <option value="MAINTENANCE" className="bg-[#0B1B3A]">Set Maintenance</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TAB 3: BOOKINGS ── */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="font-serif text-2xl text-white">
                    Guest Reservations & Folios
                  </h2>
                  <span className="text-xs text-gray-400">
                    Live database of active and upcoming stays
                  </span>
                </div>
              </div>

              <div className="bg-[#0B1B3A] border border-[#C9A24B]/30 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-white/5 uppercase text-[10px] tracking-wider text-[#C9A24B] border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Booking Code</th>
                      <th className="p-3.5">Guest</th>
                      <th className="p-3.5">Chamber</th>
                      <th className="p-3.5">Stay Dates</th>
                      <th className="p-3.5">Total / Paid</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bookings.map((b) => (
                      <tr key={b.code} className="hover:bg-white/5">
                        <td className="p-3.5 font-mono text-[#C9A24B] font-semibold">
                          {b.code}
                        </td>
                        <td className="p-3.5 font-medium text-white">{b.name}</td>
                        <td className="p-3.5">{b.room}</td>
                        <td className="p-3.5">{b.dates}</td>
                        <td className="p-3.5">
                          ₹{b.total.toLocaleString('en-IN')}{' '}
                          <span className="text-[10px] text-gray-400">
                            (Paid: ₹{b.paid.toLocaleString('en-IN')})
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-white/10 text-white">
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={b.status}
                            onChange={(e) => handleBookingStatusChange(b.code, e.target.value)}
                            className="bg-white/10 border border-white/20 text-white rounded-sm px-2 py-1 text-xs focus:outline-none focus:border-[#C9A24B]"
                          >
                            <option value="CONFIRMED" className="bg-[#0B1B3A]">Confirmed</option>
                            <option value="CHECKED_IN" className="bg-[#0B1B3A]">Checked In</option>
                            <option value="CHECKED_OUT" className="bg-[#0B1B3A]">Checked Out</option>
                            <option value="CANCELLED" className="bg-[#0B1B3A]">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TAB 4: ENQUIRIES ── */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="font-serif text-2xl text-white">
                    Guest Enquiries & Banquet Leads
                  </h2>
                  <span className="text-xs text-gray-400">
                    Direct communications from website visitors
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {ENQUIRIES.map((e) => (
                  <div
                    key={e.id}
                    className="bg-[#0B1B3A] border border-[#C9A24B]/30 p-6 rounded-sm shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-white text-sm">{e.name}</span>
                        <span className="text-[10px] bg-[#C9A24B]/20 text-[#C9A24B] px-2 py-0.5 rounded-sm uppercase font-semibold">
                          {e.type} Enquiry
                        </span>
                        <span className="text-[11px] text-gray-400">{e.date}</span>
                      </div>
                      <span className="text-xs text-[#C9A24B] block mb-2">{e.phone}</span>
                      <p className="text-xs text-gray-300 font-light max-w-2xl">{e.message}</p>
                    </div>

                    <a
                      href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#25D366] text-white px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider shrink-0 hover:bg-[#20ba5a] transition-colors"
                    >
                      Reply on WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 5: BRANDING SETTINGS ── */}
          {activeTab === 'branding' && (
            <div className="max-w-2xl space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h2 className="font-serif text-2xl text-white">
                  Site Branding & Theme CMS
                </h2>
                <span className="text-xs text-gray-400">
                  Update live hotel identity, announcement banners, and contact coordinates
                </span>
              </div>

              {savedMsg && (
                <div className="p-4 bg-green-950/60 border border-green-500 rounded-sm text-xs text-green-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Branding & theme updates saved successfully! Applied across website immediately.</span>
                </div>
              )}

              <form onSubmit={handleSaveBranding} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Hotel Title *</label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Brand Tagline *</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-medium mb-1">Reception Phone *</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-1">WhatsApp Concierge *</label>
                    <input
                      type="text"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Top Announcement Bar Text</label>
                  <input
                    type="text"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                  <button
                    type="submit"
                    className="bg-[#C9A24B] text-[#0B1B3A] font-semibold uppercase tracking-widest px-6 py-2.5 rounded-sm hover:bg-[#E8D5A3] transition-colors"
                  >
                    Save All Branding Updates
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

