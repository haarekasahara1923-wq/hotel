'use client'

import React, { useState, useEffect } from 'react'
import { BookOpen, Plus, Trash2, Edit2, RefreshCw, CheckCircle } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover?: string
  tags: string[]
  status: string
  publishedAt?: string
  createdAt: string
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover: '',
    tags: 'Gwalior, Heritage, Luxury Stay',
    status: 'PUBLISHED',
  })

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/blog', { credentials: 'include' })
      if (res.ok) setPosts(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) {
        setShowModal(false)
        fetchPosts()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE', credentials: 'include' })
      if (res.ok) fetchPosts()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Blog & Heritage Stories Manager</h1>
          <p className="text-xs text-gray-500 mt-1">Gwalior travel guides, royal culinary traditions & hotel news</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
          style={{ background: '#C9A24B' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Write New Story
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Tags</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {posts.length > 0 ? (
              posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#0B1B3A] block">{p.title}</span>
                    <span className="text-[10px] text-gray-400 font-mono">/{p.slug}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.tags?.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-[11px]">
                    {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleDelete(p.id)} className="text-rose-600 hover:text-rose-800 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-400 text-xs">
                  No blog stories created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Publish Article / Blog Story</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Article Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Exploring Gwalior Fort: The Pearl of India"
                  className="w-full border p-2 rounded-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Short Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Content Body</label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border p-2 rounded-sm font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.cover}
                  onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-sm text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]"
                  style={{ background: '#C9A24B' }}
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

