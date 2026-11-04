'use client'

import React, { useState, useEffect } from 'react'
import { PartyPopper, Plus, Trash2, Edit2, RefreshCw } from 'lucide-react'

interface EventPackage {
  id: string
  title: string
  type: string
  description: string
  capacity?: number
  price?: number
  features: string[]
  isActive: boolean
  image?: string
}

export default function EventsAdminPage() {
  const [packages, setPackages] = useState<EventPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: 'wedding',
    description: '',
    capacity: 250,
    price: 350000,
    features: 'Crystal Chandelier Ballroom, Royal Awadhi Catering, Saffron Welcome Drinks, Valet Parking',
    image: '',
  })

  const fetchPackages = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/events', { credentials: 'include' })
      if (res.ok) setPackages(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) {
        setShowModal(false)
        fetchPackages()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event package?')) return
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE', credentials: 'include' })
      if (res.ok) fetchPackages()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Banquets & Celebrations Packages</h1>
          <p className="text-xs text-gray-500 mt-1">Royal wedding ceremonies, corporate symposiums & heritage lawns</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
          style={{ background: '#C9A24B' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {pkg.type}
                </span>
                <span className="text-xs text-gray-400 font-medium">Up to {pkg.capacity} Guests</span>
              </div>
              <h3 className="font-serif text-lg text-[#0B1B3A] font-semibold">{pkg.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-3 mt-1">{pkg.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {pkg.features?.map((f) => (
                  <span key={f} className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Starting From</span>
                <span className="font-serif text-base font-bold text-[#0B1B3A]">
                  ₹{Number(pkg.price || 0).toLocaleString('en-IN')}
                </span>
              </div>
              <button onClick={() => handleDelete(pkg.id)} className="text-rose-600 hover:text-rose-800 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Create Banquet Package</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Package Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scindia Royal Wedding Soiree"
                  className="w-full border p-2 rounded-sm font-semibold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  >
                    <option value="wedding">Royal Wedding</option>
                    <option value="corporate">Corporate Summit</option>
                    <option value="birthday">Private Celebration</option>
                    <option value="social">Cocktail & Gala</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Guest Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Base Package Price (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Features (comma-separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-sm text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]" style={{ background: '#C9A24B' }}>
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

