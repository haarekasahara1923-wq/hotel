'use client'

import React, { useState, useEffect } from 'react'
import { HelpCircle, Plus, Trash2, Edit2, RefreshCw } from 'lucide-react'

interface Faq {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

export default function FaqsAdminPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0,
  })

  const fetchFaqs = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/faqs', { credentials: 'include' })
      if (res.ok) setFaqs(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFaqs()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) {
        setShowModal(false)
        setFormData({ question: '', answer: '', category: 'General', order: 0 })
        fetchFaqs()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE', credentials: 'include' })
      if (res.ok) fetchFaqs()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Frequently Asked Questions (FAQ)</h1>
          <p className="text-xs text-gray-500 mt-1">Manage guest answers for check-in policies, dining, weddings & spa</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
          style={{ background: '#C9A24B' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add FAQ
        </button>
      </div>

      <div className="space-y-3">
        {faqs.length > 0 ? (
          faqs.map((f) => (
            <div key={f.id} className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200">
                    {f.category}
                  </span>
                  <h3 className="font-semibold text-xs text-[#0B1B3A] mt-1.5">{f.question}</h3>
                </div>
                <button onClick={() => handleDelete(f.id)} className="text-rose-600 hover:text-rose-800 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded">{f.answer}</p>
            </div>
          ))
        ) : (
          <div className="py-12 bg-white border rounded text-center text-xs text-gray-400">
            No FAQs entered yet.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Add Guest FAQ</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border p-2 rounded-sm"
                >
                  <option value="General">General & Location</option>
                  <option value="Booking">Booking & Payments</option>
                  <option value="Dining">Maharaja Dining</option>
                  <option value="Spa">Serenity Spa</option>
                  <option value="Events">Weddings & Banquets</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Question</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. What are the check-in and check-out timings?"
                  className="w-full border p-2 rounded-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Detailed answer provided to hotel guests..."
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-sm text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]" style={{ background: '#C9A24B' }}>
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

