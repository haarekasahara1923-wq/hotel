'use client'

import React, { useState, useEffect } from 'react'
import {
  Bed,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  RefreshCw,
  Edit2,
  Trash2,
  Eye,
  SlidersHorizontal,
} from 'lucide-react'

interface RoomType {
  id: string
  name: string
  slug: string
  baseRate: number
  size: number
  maxAdults: number
  maxChildren: number
  bedType: string
  view: string
  isActive: boolean
  rooms: Array<{
    id: string
    number: string
    floor: number
    status: 'AVAILABLE' | 'MAINTENANCE' | 'BLOCKED'
    notes?: string
  }>
}

export default function RoomsAdminPage() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'types'>('matrix')
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDesc: '',
    size: 350,
    maxAdults: 2,
    maxChildren: 1,
    bedType: 'King Bed',
    view: 'City & Fort View',
    baseRate: 5500,
    amenities: 'Free Wi-Fi, Smart TV, Mini Bar, City View',
    images: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
  })

  const fetchRooms = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/rooms', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setRoomTypes(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const handleStatusChange = async (roomId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/rooms/${roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      })
      if (res.ok) {
        fetchRooms()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateRoomType = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amenities: formData.amenities.split(',').map((s) => s.trim()),
          images: formData.images.split(',').map((s) => s.trim()),
        }),
        credentials: 'include',
      })
      if (res.ok) {
        setShowAddModal(false)
        fetchRooms()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Flatten all 20 rooms
  const allRooms = roomTypes.flatMap((rt) =>
    (rt.rooms || []).map((r) => ({ ...r, typeName: rt.name, baseRate: rt.baseRate }))
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Rooms & Suites Manager</h1>
          <p className="text-xs text-gray-500 mt-1">
            20 luxury chambers • Real-time status matrix & tariff configuration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-gray-200 rounded-sm p-0.5 text-xs">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-sm font-medium transition-all ${
                activeTab === 'matrix' ? 'bg-[#0B1B3A] text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              20-Chamber Matrix
            </button>
            <button
              onClick={() => setActiveTab('types')}
              className={`px-3 py-1.5 rounded-sm font-medium transition-all ${
                activeTab === 'types' ? 'bg-[#0B1B3A] text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Room Types ({roomTypes.length})
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Room Category
          </button>
        </div>
      </div>

      {/* 20-Room Matrix View */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs bg-white p-3 rounded-sm border border-gray-200">
            <span className="font-semibold text-gray-600 uppercase text-[10px] tracking-wider">Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Maintenance / Housekeeping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Blocked / VIP</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {allRooms.map((room) => {
              const isAvailable = room.status === 'AVAILABLE'
              const isMaint = room.status === 'MAINTENANCE'

              return (
                <div
                  key={room.id}
                  className={`p-4 bg-white border rounded-sm shadow-sm transition-all flex flex-col justify-between ${
                    isAvailable
                      ? 'border-emerald-200 hover:border-emerald-400'
                      : isMaint
                      ? 'border-amber-200 hover:border-amber-400'
                      : 'border-rose-200 hover:border-rose-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl font-serif font-light text-[#0B1B3A]">Chamber {room.number}</span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isAvailable ? 'bg-emerald-500' : isMaint ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                      />
                    </div>
                    <div className="text-[11px] text-[#1A3FA3] font-medium truncate">{room.typeName}</div>
                    <div className="text-[10px] text-gray-400">Floor {room.floor} • ₹{Number(room.baseRate).toLocaleString('en-IN')}/nt</div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isAvailable
                          ? 'bg-emerald-50 text-emerald-700'
                          : isMaint
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {room.status}
                    </span>
                    <select
                      value={room.status}
                      onChange={(e) => handleStatusChange(room.id, e.target.value)}
                      className="text-[10px] border border-gray-200 rounded px-1.5 py-0.5 bg-gray-50 focus:outline-none"
                    >
                      <option value="AVAILABLE">Avail</option>
                      <option value="MAINTENANCE">Maint</option>
                      <option value="BLOCKED">Block</option>
                    </select>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Room Types Tab */}
      {activeTab === 'types' && (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                <th className="py-3 px-4">Room Type</th>
                <th className="py-3 px-4">Base Rate</th>
                <th className="py-3 px-4">Dimensions</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4">Chambers</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {roomTypes.map((rt) => (
                <tr key={rt.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#0B1B3A] block">{rt.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">/{rt.slug}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    ₹{Number(rt.baseRate).toLocaleString('en-IN')} <span className="text-[10px] text-gray-400 font-normal">/ night</span>
                  </td>
                  <td className="py-3 px-4">{rt.size} sq ft</td>
                  <td className="py-3 px-4">{rt.maxAdults} Adults, {rt.maxChildren} Child</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                      {rt.rooms?.length || 0} Rooms
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-[#1A3FA3] hover:text-[#C9A24B] p-1">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Add Room Category</h2>
            <form onSubmit={handleCreateRoomType} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Scindia Suite"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Base Rate (₹ / night)</label>
                  <input
                    type="number"
                    required
                    value={formData.baseRate}
                    onChange={(e) => setFormData({ ...formData, baseRate: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Size (sq ft)</label>
                  <input
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Short Tagline</label>
                <input
                  type="text"
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="e.g. Palatial grandeur with Scindia royal motifs"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Amenities (comma-separated)</label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

