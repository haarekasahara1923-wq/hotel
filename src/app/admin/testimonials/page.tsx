'use client'

import React, { useState, useEffect } from 'react'
import { Star, Plus, Trash2, RefreshCw } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  rating: number
  title?: string
  comment: string
  source: string
  featured: boolean
}

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    title: '',
    comment: '',
    source: 'WEBSITE',
  })

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/testimonials', { credentials: 'include' })
      if (res.ok) setItems(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) {
        setShowModal(false)
        setFormData({ name: '', rating: 5, title: '', comment: '', source: 'WEBSITE' })
        fetchItems()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Guest Testimonials Manager</h1>
          <p className="text-xs text-gray-500 mt-1">Curate guest quotes displayed across homepage and booking flow</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
          style={{ background: '#C9A24B' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((t) => (
          <div key={t.id} className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#C9A24B] mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-[#C9A24B]' : 'text-gray-200'}`} />
                ))}
              </div>
              {t.title && <h3 className="font-serif font-semibold text-xs text-[#0B1B3A] mb-1">"{t.title}"</h3>}
              <p className="text-xs text-gray-600 italic">"{t.comment}"</p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-gray-800">{t.name}</span>
              <span className="text-gray-400 uppercase text-[9px]">{t.source}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Add Guest Testimonial</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Guest Name & City</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Rathore (Jaipur)"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  >
                    <option value="WEBSITE">Website Guest</option>
                    <option value="GOOGLE">Google Review</option>
                    <option value="TRIPADVISOR">TripAdvisor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Headline</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. A Regal Haven Beyond Expectations"
                  className="w-full border p-2 rounded-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Quote / Reflection</label>
                <textarea
                  rows={3}
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-sm text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]" style={{ background: '#C9A24B' }}>
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

