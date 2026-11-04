'use client'

import React, { useState, useEffect } from 'react'
import { UtensilsCrossed, Plus, Trash2, Edit2, RefreshCw, CheckCircle } from 'lucide-react'

interface MenuItem {
  id: string
  category: string
  name: string
  description?: string
  price?: number
  isVeg: boolean
  isSignature: boolean
  isActive: boolean
  image?: string
}

export default function DiningAdminPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mains',
    description: '',
    price: 850,
    isVeg: true,
    isSignature: true,
    image: '',
  })

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/dining', { credentials: 'include' })
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
      const res = await fetch('/api/admin/dining', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) {
        setShowModal(false)
        fetchItems()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this menu item?')) return
    try {
      const res = await fetch(`/api/admin/dining/${id}`, { method: 'DELETE', credentials: 'include' })
      if (res.ok) fetchItems()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Maharaja Fine Dining — Menu Manager</h1>
          <p className="text-xs text-gray-500 mt-1">Royal Awadhi banquets, chef signatures, veg/non-veg tags & pricing</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
          style={{ background: '#C9A24B' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Dish to Menu
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              <th className="py-3 px-4">Dish</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Signature</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-4">
                  <span className="font-semibold text-[#0B1B3A] block">{item.name}</span>
                  {item.description && <span className="text-[11px] text-gray-400 block line-clamp-1">{item.description}</span>}
                </td>
                <td className="py-3 px-4 uppercase text-[10px] font-semibold text-gray-500">{item.category}</td>
                <td className="py-3 px-4 font-semibold text-gray-900">₹{Number(item.price || 0).toLocaleString('en-IN')}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.isVeg ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    {item.isVeg ? 'VEG' : 'NON-VEG'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {item.isSignature && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C9A24B]/15 text-[#C9A24B] border border-[#C9A24B]/30">
                      CHEF SIGNATURE
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => handleDelete(item.id)} className="text-rose-600 hover:text-rose-800 p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Add Dish to Dining Menu</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Dish Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. 12-Hour Slow Dal Maharani"
                  className="w-full border p-2 rounded-sm font-semibold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  >
                    <option value="Starters">Royal Starters</option>
                    <option value="Mains">Awadhi Mains</option>
                    <option value="Rice & Breads">Dum Biryani & Breads</option>
                    <option value="Desserts">Sweet Indulgence</option>
                    <option value="Beverages">Mocktails & Saffron Teas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="w-3.5 h-3.5 text-emerald-600"
                  />
                  <span>Pure Vegetarian</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSignature}
                    onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                    className="w-3.5 h-3.5 text-[#C9A24B]"
                  />
                  <span>Chef Signature</span>
                </label>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Simmered over slow embers overnight with smoked butter..."
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-sm text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]" style={{ background: '#C9A24B' }}>
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

