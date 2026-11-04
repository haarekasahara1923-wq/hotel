'use client'

import React, { useState, useEffect } from 'react'
import { Users, Plus, Trash2, Edit2, RefreshCw } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  photo?: string
  bio?: string
  order: number
}

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: '',
    bio: '',
    order: 0,
  })

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/team', { credentials: 'include' })
      if (res.ok) setMembers(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) {
        setShowModal(false)
        setFormData({ name: '', role: '', photo: '', bio: '', order: 0 })
        fetchMembers()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this team member?')) return
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE', credentials: 'include' })
      if (res.ok) fetchMembers()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Leadership & Palace Staff</h1>
          <p className="text-xs text-gray-500 mt-1">General Manager, Executive Chefs, Head Butlers & Concierge team</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
          style={{ background: '#C9A24B' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {members.map((m) => (
          <div key={m.id} className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="h-44 bg-gray-100 overflow-hidden">
              {m.photo ? (
                <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-gray-400">
                  <Users className="w-10 h-10" />
                </div>
              )}
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-xs text-[#0B1B3A]">{m.name}</h3>
              <span className="text-[10px] text-[#C9A24B] font-semibold uppercase tracking-wider block">{m.role}</span>
              {m.bio && <p className="text-xs text-gray-500 line-clamp-2 mt-1">{m.bio}</p>}
              <div className="pt-2 flex justify-end">
                <button onClick={() => handleDelete(m.id)} className="text-rose-600 hover:text-rose-800 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Add Leadership / Team Member</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Chef Vikram Anand"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Designation / Role</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Executive Chef & Royal Gastronomy Director"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Photo URL</label>
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-sm text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]" style={{ background: '#C9A24B' }}>
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

