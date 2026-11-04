'use client'

import React, { useState, useEffect } from 'react'
import {
  CalendarCheck,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  User,
  CreditCard,
  FileText,
} from 'lucide-react'

interface Booking {
  id: string
  code: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  rooms: number
  adults: number
  children: number
  total: number
  paid: number
  status: string
  source: string
  createdAt: string
  specialRequests?: string
  adminNotes?: string
}

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  // Form for manual walk-in booking
  const [walkinData, setWalkinData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults: 2,
    children: 0,
    rooms: 1,
    roomTypeId: 'deluxe-room',
    paymentMode: 'full',
    specialRequests: '',
    adminNotes: 'Walk-in booking recorded at reception',
  })

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/bookings?status=${statusFilter}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setBookings(data.bookings || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [statusFilter])

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      })
      if (res.ok) {
        fetchBookings()
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking({ ...selectedBooking, status: newStatus })
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateWalkin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(walkinData),
        credentials: 'include',
      })
      if (res.ok) {
        setShowAddModal(false)
        fetchBookings()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      b.code?.toLowerCase().includes(q) ||
      b.guestName?.toLowerCase().includes(q) ||
      b.guestEmail?.toLowerCase().includes(q) ||
      b.guestPhone?.includes(q)
    )
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Bookings & Reservations</h1>
          <p className="text-xs text-gray-500 mt-1">Calendar & Guest Folios • Walk-in entries, check-in/out, refunds</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Plus className="w-3.5 h-3.5" />
            Walk-in Booking
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 rounded-sm border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-1">
          {['ALL', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'PENDING', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                statusFilter === st
                  ? 'bg-[#0B1B3A] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {st === 'ALL' ? 'All Bookings' : st.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code, guest name, phone..."
            className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-sm w-full sm:w-64 focus:outline-none focus:border-[#C9A24B]"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                <th className="py-3 px-4">Folio / Code</th>
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Chambers</th>
                <th className="py-3 px-4">Total Tariff</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-[#1A3FA3]">
                      {b.code}
                      <span className="text-[10px] text-gray-400 block font-sans">
                        {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-[#0B1B3A] block">{b.guestName}</span>
                      <span className="text-[10px] text-gray-400">{b.guestPhone} • {b.guestEmail}</span>
                    </td>
                    <td className="py-3 px-4 text-[11px]">
                      <div>In: <span className="font-medium">{new Date(b.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span></div>
                      <div className="text-gray-400">Out: <span className="font-medium text-gray-600">{new Date(b.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span></div>
                    </td>
                    <td className="py-3 px-4">
                      {b.rooms} Room ({b.adults} Ad, {b.children} Ch)
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900 block">₹{Number(b.total).toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-emerald-600">Paid: ₹{Number(b.paid || 0).toLocaleString('en-IN')}</span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusUpdate(b.id, e.target.value)}
                        className={`text-[10px] font-semibold uppercase tracking-wider rounded px-2 py-1 border ${
                          b.status === 'CONFIRMED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : b.status === 'CHECKED_IN'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : b.status === 'CHECKED_OUT'
                            ? 'bg-gray-100 text-gray-700 border-gray-300'
                            : b.status === 'CANCELLED'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CHECKED_IN">CHECKED_IN</option>
                        <option value="CHECKED_OUT">CHECKED_OUT</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-[10px] uppercase font-medium text-gray-400">
                      {b.source}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="px-2.5 py-1 text-[11px] font-medium text-[#1A3FA3] bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 text-xs">
                    No bookings found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] text-[#C9A24B] uppercase tracking-widest font-semibold block">Booking Folio</span>
                <h2 className="text-xl font-serif text-[#0B1B3A]">{selectedBooking.code}</h2>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-[#1A3FA3] font-semibold">
                {selectedBooking.status}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Guest</span>
                  <span className="font-semibold text-gray-800">{selectedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Contact</span>
                  <span className="text-gray-800">{selectedBooking.guestPhone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Check-In</span>
                  <span className="font-medium text-gray-800">{new Date(selectedBooking.checkIn).toLocaleDateString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Check-Out</span>
                  <span className="font-medium text-gray-800">{new Date(selectedBooking.checkOut).toLocaleDateString('en-IN')}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Special Requests</span>
                <p className="text-gray-700 italic bg-amber-50/50 p-2 rounded border border-amber-100">
                  {selectedBooking.specialRequests || 'No special requests submitted'}
                </p>
              </div>

              <div className="border-t pt-3 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block">Total Amount</span>
                  <span className="text-lg font-serif text-[#0B1B3A]">₹{Number(selectedBooking.total).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'CHECKED_IN')}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                  >
                    Check In Guest
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'CHECKED_OUT')}
                    className="px-3 py-1.5 bg-gray-800 text-white rounded text-xs font-medium hover:bg-gray-900"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 border rounded text-xs text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Walk-in Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Create Walk-in / Reception Booking</h2>
            <form onSubmit={handleCreateWalkin} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Guest Full Name</label>
                <input
                  type="text"
                  required
                  value={walkinData.guestName}
                  onChange={(e) => setWalkinData({ ...walkinData, guestName: e.target.value })}
                  placeholder="e.g. Maharaja Vikram Singh"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={walkinData.guestEmail}
                    onChange={(e) => setWalkinData({ ...walkinData, guestEmail: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={walkinData.guestPhone}
                    onChange={(e) => setWalkinData({ ...walkinData, guestPhone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Check-In Date</label>
                  <input
                    type="date"
                    required
                    value={walkinData.checkIn}
                    onChange={(e) => setWalkinData({ ...walkinData, checkIn: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Check-Out Date</label>
                  <input
                    type="date"
                    required
                    value={walkinData.checkOut}
                    onChange={(e) => setWalkinData({ ...walkinData, checkOut: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Rooms</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={walkinData.rooms}
                    onChange={(e) => setWalkinData({ ...walkinData, rooms: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Adults</label>
                  <input
                    type="number"
                    min={1}
                    value={walkinData.adults}
                    onChange={(e) => setWalkinData({ ...walkinData, adults: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Children</label>
                  <input
                    type="number"
                    min={0}
                    value={walkinData.children}
                    onChange={(e) => setWalkinData({ ...walkinData, children: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Special Requests / Notes</label>
                <textarea
                  rows={2}
                  value={walkinData.specialRequests}
                  onChange={(e) => setWalkinData({ ...walkinData, specialRequests: e.target.value })}
                  placeholder="e.g. Airport pickup required, extra pillows"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-sm text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]"
                  style={{ background: '#C9A24B' }}
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

