'use client'

import React, { useState, useEffect } from 'react'
import { Star, CheckCircle, XCircle, MessageCircle, RefreshCw, Send } from 'lucide-react'

interface Review {
  id: string
  name: string
  rating: number
  title?: string
  comment: string
  source: string
  status: string
  featured: boolean
  adminReply?: string
  createdAt: string
}

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [replyingTo, setReplyingTo] = useState<Review | null>(null)
  const [replyText, setReplyText] = useState('')

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/reviews?status=${statusFilter}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setReviews(data.reviews || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [statusFilter])

  const handleUpdate = async (id: string, updates: Partial<Review>) => {
    try {
      const res = await fetch(`/api/admin/reviews`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
        credentials: 'include',
      })
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyingTo) return
    await handleUpdate(replyingTo.id, { adminReply: replyText })
    setReplyingTo(null)
    setReplyText('')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Reviews & Testimonials Moderation</h1>
          <p className="text-xs text-gray-500 mt-1">Approve guest testimonials, feature on homepage, write official management replies</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchReviews}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-white p-2 rounded-sm border border-gray-200 shadow-sm">
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
              statusFilter === st ? 'bg-[#0B1B3A] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div key={r.id} className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#0B1B3A]">{r.name}</span>
                    <span className="text-[10px] text-gray-400 font-medium">via {r.source}</span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        r.status === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-700'
                          : r.status === 'REJECTED'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {r.status}
                    </span>
                    {r.featured && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-[#C9A24B]/15 text-[#C9A24B] border border-[#C9A24B]/30">
                        ★ FEATURED ON HOME
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[#C9A24B] mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-[#C9A24B]' : 'text-gray-200'}`}
                      />
                    ))}
                    {r.title && <span className="font-semibold text-xs text-gray-800 ml-2 font-serif">"{r.title}"</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {r.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleUpdate(r.id, { status: 'APPROVED' })}
                      className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded hover:bg-emerald-100"
                    >
                      Approve
                    </button>
                  )}
                  {r.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleUpdate(r.id, { status: 'REJECTED' })}
                      className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleUpdate(r.id, { featured: !r.featured })}
                    className="px-2.5 py-1 text-[11px] font-semibold text-[#0B1B3A] bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    {r.featured ? 'Unfeature' : 'Feature'}
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-700 italic bg-gray-50/70 p-3 rounded border border-gray-100">
                "{r.comment}"
              </p>

              {r.adminReply && (
                <div className="p-3 rounded bg-blue-50/70 border border-blue-100 text-xs text-blue-900 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#1A3FA3] tracking-wider block">
                    Management Response:
                  </span>
                  <p>{r.adminReply}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                <span>{new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <button
                  onClick={() => {
                    setReplyingTo(r)
                    setReplyText(r.adminReply || '')
                  }}
                  className="text-[#1A3FA3] hover:underline font-medium flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  {r.adminReply ? 'Edit Reply' : 'Reply to Guest'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border rounded p-12 text-center text-xs text-gray-400">
            No reviews matching status "{statusFilter}".
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {replyingTo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Reply to {replyingTo.name}</h2>
            <form onSubmit={handleSendReply} className="space-y-3 text-xs">
              <textarea
                required
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write an official luxury response from hotel management..."
                className="w-full border p-2 rounded-sm"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 border rounded text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded font-semibold text-[#0B1B3A]"
                  style={{ background: '#C9A24B' }}
                >
                  Publish Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

