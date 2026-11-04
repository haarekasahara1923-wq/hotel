'use client'

import React, { useState, useEffect } from 'react'
import { UserCog, Plus, Trash2, Edit2, ShieldCheck, Mail, Phone } from 'lucide-react'

interface StaffUser {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  createdAt: string
}

export default function StaffAdminPage() {
  const [staff, setStaff] = useState<StaffUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'RECEPTIONIST',
    password: '',
  })

  const fetchStaff = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/staff', { credentials: 'include' })
      if (res.ok) setStaff(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) {
        setShowModal(false)
        setFormData({ name: '', email: '', phone: '', role: 'RECEPTIONIST', password: '' })
        fetchStaff()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this staff user from admin panel access?')) return
    try {
      const res = await fetch(`/api/admin/staff/${id}`, { method: 'DELETE', credentials: 'include' })
      if (res.ok) fetchStaff()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Staff & Roles Administration</h1>
          <p className="text-xs text-gray-500 mt-1">Super Admin, General Manager, Receptionist, Accountant & Content Editor permissions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
          style={{ background: '#C9A24B' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Staff Member
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              <th className="py-3 px-4">Staff Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Role Permission</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {staff.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#0B1B3A]">{u.name}</td>
                <td className="py-3 px-4 text-gray-600">{u.email}</td>
                <td className="py-3 px-4 text-gray-600">{u.phone || '-'}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'SUPER_ADMIN'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : u.role === 'MANAGER'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : u.role === 'ACCOUNTANT'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-400 text-[11px]">
                  {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="py-3 px-4 text-right">
                  {u.role !== 'SUPER_ADMIN' && (
                    <button onClick={() => handleDelete(u.id)} className="text-rose-600 hover:text-rose-800 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Create Staff User</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rameshwar Rathore"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="reception@royalblueheaven.com"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  >
                    <option value="MANAGER">Manager</option>
                    <option value="RECEPTIONIST">Receptionist</option>
                    <option value="ACCOUNTANT">Accountant</option>
                    <option value="EDITOR">Content Editor</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Login Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-sm text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]" style={{ background: '#C9A24B' }}>
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

