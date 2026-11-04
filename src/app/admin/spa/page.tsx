'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, Plus, Trash2, Edit2, RefreshCw, Clock } from 'lucide-react'

interface SpaService {
  id: string
  name: string
  category: string
  description: string
  duration: number
  price: number
  isActive: boolean
}

export default function SpaAdminPage() {
  const [services, setServices] = useState<SpaService[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Ayurvedic',
    description: '',
    duration: 60,
    price: 4500,
  })

  const fetchServices = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/spa', { credentials: 'include' })
      if (res.ok) setServices(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/spa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) {
        setShowModal(false)
        fetchServices()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this spa therapy?')) return
    try {
      const res = await fetch(`/api/admin/spa/${id}`, { method: 'DELETE', credentials: 'include' })
      if (res.ok) fetchServices()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Serenity Ayurvedic Spa — Services</h1>
          <p className="text-xs text-gray-500 mt-1">Vedic healing therapies, Shirodhara, Abhyanga rituals & duration rates</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
          style={{ background: '#C9A24B' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Spa Treatment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {s.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {s.duration} Mins
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#0B1B3A] font-semibold">{s.name}</h3>
              <p className="text-xs text-gray-600 line-clamp-3 mt-1">{s.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="font-serif text-base font-bold text-[#0B1B3A]">
                ₹{Number(s.price).toLocaleString('en-IN')}
              </span>
              <button onClick={() => handleDelete(s.id)} className="text-rose-600 hover:text-rose-800 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Add Spa Treatment</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Treatment Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Shirodhara Medicated Oil Ritual"
                  className="w-full border p-2 rounded-sm font-semibold"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  >
                    <option value="Ayurvedic">Ayurvedic</option>
                    <option value="Massage">Body Massage</option>
                    <option value="Facial">Royal Facial</option>
                    <option value="Couples">Couples Bliss</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Duration (Mins)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Tariff (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Therapeutic Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-sm text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]" style={{ background: '#C9A24B' }}>
                  Save Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

