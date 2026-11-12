'use client'

import React, { useState, useEffect } from 'react'
import {
  Image as ImageIcon,
  Video,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Play,
  Film,
  SlidersHorizontal,
  Upload,
  Loader2,
  CheckCircle,
} from 'lucide-react'

// Brand SVG helpers
const YoutubeIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const InstagramIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const FacebookIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.456 5 15.658 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
  </svg>
)

interface GalleryItem {
  id: string
  category: string
  url: string
  type: string // image | video | youtube | instagram | facebook
  caption?: string
  order: number
  isActive: boolean
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [showAddModal, setShowAddModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)

  // Form: device upload or social embed
  const [addMode, setAddMode] = useState<'upload' | 'embed'>('upload')
  const [formData, setFormData] = useState({
    category: 'rooms',
    url: '',
    type: 'image',
    caption: '',
    order: 0,
  })

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/gallery?category=${activeCategory}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [activeCategory])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this item from the gallery?')) return
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeviceFileUpload = async (file: File) => {
    setUploadingFile(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('alt', formData.caption || file.name)
      fd.append('folder', 'gallery')

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
        credentials: 'include',
      })

      if (res.ok) {
        const data = await res.json()
        if (data.url) {
          setFormData((prev) => ({
            ...prev,
            url: data.url,
            type: file.type.startsWith('video') ? 'video' : 'image',
            caption: prev.caption || file.name.replace(/\.[^/.]+$/, ''),
          }))
        }
      } else {
        alert('File upload failed. Please try a different photo or video.')
      }
    } catch (err) {
      console.error(err)
      alert('Upload error')
    } finally {
      setUploadingFile(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.url) {
      alert('Please select a photo/video from your device or enter a social link')
      return
    }

    setSubmitting(true)
    try {
      let finalType = formData.type
      const url = formData.url

      // Auto-detect embed type from URL
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        finalType = 'youtube'
      } else if (url.includes('instagram.com')) {
        finalType = 'instagram'
      } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
        finalType = 'facebook'
      } else if (url.match(/\.(mp4|webm|ogg|mov)$/i)) {
        finalType = 'video'
      }

      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: finalType }),
        credentials: 'include',
      })

      if (res.ok) {
        setShowAddModal(false)
        setFormData({ category: 'rooms', url: '', type: 'image', caption: '', order: 0 })
        fetchItems()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const categories = ['ALL', 'rooms', 'dining', 'events', 'spa', 'exterior', 'pool']

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif text-[#0B1B3A] font-light">Gallery & Media Manager</h1>
          <p className="text-xs text-gray-500 mt-1">
            Upload high-resolution photos and videos directly from your device, plus embed YouTube, Instagram Reels & Facebook videos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchItems}
            className="p-2 border rounded-sm text-gray-600 hover:bg-gray-50 transition-colors"
            title="Refresh gallery"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => {
              setFormData({ category: 'rooms', url: '', type: 'image', caption: '', order: 0 })
              setShowAddModal(true)
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Plus className="w-4 h-4" />
            Add Media / Video
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-sm capitalize whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-[#0B1B3A] text-white font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat === 'ALL' ? 'All Media' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-gray-400">
            Loading palace gallery...
          </div>
        ) : items.length > 0 ? (
          items.map((item) => {
            const isYoutube = item.type === 'youtube'
            const isInstagram = item.type === 'instagram'
            const isFacebook = item.type === 'facebook'
            const isVideo = item.type === 'video'

            return (
              <div
                key={item.id}
                className="bg-white border rounded-sm overflow-hidden shadow-sm group hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Media preview */}
                <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden flex items-center justify-center">
                  {isYoutube ? (
                    <div className="w-full h-full relative">
                      <img
                        src={`https://img.youtube.com/vi/${getYoutubeId(item.url)}/hqdefault.jpg`}
                        alt={item.caption || 'YouTube'}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                        <YoutubeIcon className="w-2.5 h-2.5" /> YouTube
                      </span>
                    </div>
                  ) : isInstagram ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-800 text-white p-4 text-center">
                      <InstagramIcon className="w-8 h-8 mb-2" />
                      <span className="text-xs font-semibold">Instagram Reel / Post</span>
                      <span className="text-[10px] opacity-80 truncate max-w-full mt-1">
                        {item.caption || 'Social Post'}
                      </span>
                    </div>
                  ) : isFacebook ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-600 text-white p-4 text-center">
                      <FacebookIcon className="w-8 h-8 mb-2" />
                      <span className="text-xs font-semibold">Facebook Reel / Video</span>
                    </div>
                  ) : isVideo ? (
                    <div className="w-full h-full relative flex items-center justify-center bg-black">
                      <video src={item.url} className="w-full h-full object-cover" muted />
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                        <Film className="w-2.5 h-2.5" /> Direct Video
                      </span>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.caption || 'Palace gallery'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Category Pill */}
                  <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Info footer */}
                <div className="p-3">
                  <p className="text-xs font-medium text-gray-800 truncate mb-1">
                    {item.caption || 'Untitled photo'}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t text-xs">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-[#1A3FA3] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" /> View Source
                    </a>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 transition-colors"
                      title="Delete from Gallery"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full py-16 bg-white border border-dashed rounded text-center text-xs text-gray-400 space-y-2">
            <ImageIcon className="w-8 h-8 text-gray-300 mx-auto" />
            <p>No gallery entries found in category "{activeCategory}".</p>
            <p className="text-[11px] text-gray-500">
              Click the button above to upload photo/video directly from device or embed YouTube/Instagram Reels.
            </p>
          </div>
        )}
      </div>

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-serif text-[#0B1B3A]">Add Media to Gallery</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-black">
                ✕
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded text-xs">
              <button
                type="button"
                onClick={() => setAddMode('upload')}
                className={`flex-1 py-1.5 rounded font-medium transition-all ${
                  addMode === 'upload' ? 'bg-white shadow text-[#0B1B3A]' : 'text-gray-500'
                }`}
              >
                Direct Device Gallery Upload
              </button>
              <button
                type="button"
                onClick={() => setAddMode('embed')}
                className={`flex-1 py-1.5 rounded font-medium transition-all ${
                  addMode === 'embed' ? 'bg-white shadow text-[#0B1B3A]' : 'text-gray-500'
                }`}
              >
                YouTube / Instagram / FB Reel
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              {addMode === 'upload' ? (
                <div>
                  <label className="block text-gray-700 mb-1 font-semibold">
                    Select Photo / Video from Device
                  </label>
                  {formData.url ? (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border rounded-sm">
                      <div className="w-14 h-14 bg-gray-900 rounded overflow-hidden shrink-0 flex items-center justify-center">
                        {formData.type === 'video' ? (
                          <Film className="w-6 h-6 text-[#C9A24B]" />
                        ) : (
                          <img src={formData.url} alt="Selected" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> File Selected & Ready
                        </p>
                        <label className="cursor-pointer text-[11px] text-[#1A3FA3] hover:underline font-medium inline-block mt-1">
                          Change file
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0]
                              if (f) handleDeviceFileUpload(f)
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer border-2 border-dashed border-[#C9A24B]/50 hover:border-[#C9A24B] rounded-sm p-6 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-white transition-colors">
                      {uploadingFile ? (
                        <div className="flex items-center gap-2 text-xs text-[#0B1B3A] font-medium">
                          <Loader2 className="w-5 h-5 animate-spin text-[#C9A24B]" />
                          Uploading media from device...
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-[#C9A24B] mb-2" />
                          <span className="text-xs font-semibold text-[#0B1B3A]">
                            Click to Select from Device Gallery
                          </span>
                          <span className="text-[10px] text-gray-400 mt-1">
                            Supports JPG, PNG, WEBP, MP4, MOV videos
                          </span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0]
                              if (f) handleDeviceFileUpload(f)
                            }}
                          />
                        </>
                      )}
                    </label>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 mb-1 font-semibold">
                    Social Video / Reel Link
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="e.g. https://www.youtube.com/watch?v=... or https://instagram.com/reel/..."
                    className="w-full border p-2 rounded-sm"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Supports YouTube Videos & Shorts, Instagram Reels & Posts, Facebook Watch Reels
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1 font-semibold">Gallery Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  >
                    <option value="rooms">Rooms & Suites</option>
                    <option value="dining">Maharaja Dining</option>
                    <option value="events">Banquets & Weddings</option>
                    <option value="spa">Serenity Spa</option>
                    <option value="exterior">Exterior & Architecture</option>
                    <option value="pool">Pool & Courtyards</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-semibold">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-semibold">Caption / Title</label>
                <input
                  type="text"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="e.g. Presidential Suite Grand Chandelier"
                  className="w-full border p-2 rounded-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-sm text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingFile || !formData.url}
                  className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A] disabled:opacity-50"
                  style={{ background: '#C9A24B' }}
                >
                  {submitting ? 'Saving...' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
