'use client'

import React, { useState, useEffect } from 'react'
import {
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Film,
  AlertTriangle,
} from 'lucide-react'

interface MediaItem {
  id: string
  url: string
  publicId: string
  type: string
  alt?: string
  folder?: string
  width?: number
  height?: number
  bytes?: number
  createdAt: string
}

export default function MediaAdminPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [uploadUrl, setUploadUrl] = useState('')
  const [uploadAlt, setUploadAlt] = useState('')
  const [uploading, setUploading] = useState(false)
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/media', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setMediaList(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media file?')) return
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE', credentials: 'include' })
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadUrl) return
    setUploading(true)
    setUploadError(null)
    try {
      const isVid = uploadUrl.match(/\.(mp4|webm|ogg|mov)$/i)
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: uploadUrl,
          alt: uploadAlt || 'Royal Blue Heaven asset',
          type: isVid ? 'video' : 'image',
          folder: 'general',
        }),
        credentials: 'include',
      })
      if (res.ok) {
        setUploadUrl('')
        setUploadAlt('')
        fetchMedia()
      } else {
        const err = await res.json()
        setUploadError(err.error || 'Failed to save media')
      }
    } catch (err: any) {
      setUploadError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt', file.name)

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      if (res.ok) {
        fetchMedia()
      } else {
        const err = await res.json()
        setUploadError(err.error || 'Cloudinary upload requires API keys. You can paste image/video URLs directly.')
      }
    } catch (err: any) {
      setUploadError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Media Library & Cloudinary Assets</h1>
          <p className="text-xs text-gray-500 mt-1">Upload high-resolution photography, palace videos & manage asset URLs</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchMedia}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0B1B3A]">Add Media Asset</h2>

        {uploadError && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Notice:</p>
              <p>{uploadError}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* File input (Cloudinary) */}
          <div className="border-2 border-dashed border-gray-200 rounded p-4 text-center hover:border-[#C9A24B] transition-colors flex flex-col items-center justify-center">
            <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-xs font-medium text-gray-700">Upload from Device</span>
            <span className="text-[10px] text-gray-400 mt-0.5">Direct to Cloudinary CDN (Images, MP4)</span>
            <label className="mt-3 inline-block cursor-pointer px-4 py-1.5 bg-[#0B1B3A] text-white text-xs font-medium rounded hover:bg-[#1A3FA3] transition-colors">
              Choose File
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* URL Input */}
          <form onSubmit={handleAddUrl} className="flex flex-col justify-between space-y-2 text-xs">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Or Import from CDN / Unsplash URL</label>
              <input
                type="url"
                required
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <input
                type="text"
                value={uploadAlt}
                onChange={(e) => setUploadAlt(e.target.value)}
                placeholder="Label / Alt text (e.g. Maharaja Suite Bathroom)"
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="py-2 px-4 rounded font-semibold text-[#0B1B3A] transition-all hover:brightness-110"
              style={{ background: '#C9A24B' }}
            >
              {uploading ? 'Adding...' : 'Save Media URL'}
            </button>
          </form>
        </div>
      </div>

      {/* Grid of Assets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {mediaList.length > 0 ? (
          mediaList.map((m) => (
            <div
              key={m.id}
              className="group bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-28 bg-gray-100 flex items-center justify-center overflow-hidden">
                {m.type === 'video' ? (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Film className="w-6 h-6 text-[#1A3FA3]" />
                    <span className="text-[9px] uppercase font-mono mt-1">Video</span>
                  </div>
                ) : (
                  <img src={m.url} alt={m.alt || 'Asset'} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                )}
                <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded">
                  {m.type}
                </span>
              </div>

              <div className="p-2 space-y-1.5 text-xs">
                <p className="text-[11px] font-medium text-gray-800 truncate" title={m.alt || m.url}>
                  {m.alt || 'Chamber Photography'}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <button
                    onClick={() => handleCopy(m.id, m.url)}
                    className="text-[10px] text-[#1A3FA3] hover:underline flex items-center gap-1"
                    title="Copy Image URL"
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy URL
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-rose-600 hover:text-rose-800 p-0.5"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-xs text-gray-400 bg-white border border-dashed rounded">
            No media assets uploaded yet. Use the upload box above to add photos and videos.
          </div>
        )}
      </div>
    </div>
  )
}

