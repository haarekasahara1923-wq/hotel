'use client'

import React, { useState, useEffect } from 'react'
import { Search, Save, CheckCircle, Globe, RefreshCw } from 'lucide-react'

interface SeoPageItem {
  slug: string
  title: string
  seo: {
    title: string
    description: string
    ogImage?: string
  }
}

export default function SeoAdminPage() {
  const [pages, setPages] = useState<SeoPageItem[]>([])
  const [selectedSlug, setSelectedSlug] = useState('home')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const fetchSeo = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/seo', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setPages(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSeo()
  }, [])

  const current = pages.find((p) => p.slug === selectedSlug) || pages[0]

  const updateCurrent = (field: 'title' | 'description' | 'ogImage', val: string) => {
    setPages((prev) =>
      prev.map((p) =>
        p.slug === selectedSlug
          ? { ...p, seo: { ...p.seo, [field]: val } }
          : p
      )
    )
  }

  const handleSave = async () => {
    if (!current) return
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: current.slug,
          title: current.title,
          seo: current.seo,
        }),
        credentials: 'include',
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Search Engine Optimization (SEO)</h1>
          <p className="text-xs text-gray-500 mt-1">Per-page meta titles, meta descriptions, OpenGraph social cards & search ranking tags</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
              <CheckCircle className="w-4 h-4" /> SEO Tags Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !current}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving...' : 'Save Page SEO'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Page selector */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3 space-y-1 max-h-[600px] overflow-y-auto">
          <span className="text-[10px] uppercase font-bold text-gray-400 px-2 py-1 block">Public Pages</span>
          {pages.map((p) => (
            <button
              key={p.slug}
              onClick={() => setSelectedSlug(p.slug)}
              className={`w-full text-left p-2.5 rounded text-xs transition-all ${
                selectedSlug === p.slug
                  ? 'bg-[#0B1B3A] text-white font-semibold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="truncate">{p.title}</div>
              <div className="text-[10px] text-gray-400 font-mono">/{p.slug}</div>
            </button>
          ))}
        </div>

        {/* SEO Editor */}
        {current && (
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
            <div className="border-b pb-3">
              <h2 className="text-sm font-semibold text-[#0B1B3A]">{current.title}</h2>
              <span className="text-xs text-gray-400 font-mono">https://royalblueheaven.com/{current.slug === 'home' ? '' : current.slug}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-gray-600 font-medium text-xs">Meta Title (Google Search Title)</label>
                <span className="text-[10px] text-gray-400 font-mono">{current.seo?.title?.length || 0}/60 chars</span>
              </div>
              <input
                type="text"
                value={current.seo?.title || ''}
                onChange={(e) => updateCurrent('title', e.target.value)}
                className="w-full border p-2 rounded-sm text-xs font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-gray-600 font-medium text-xs">Meta Description</label>
                <span className="text-[10px] text-gray-400 font-mono">{current.seo?.description?.length || 0}/160 chars</span>
              </div>
              <textarea
                rows={3}
                value={current.seo?.description || ''}
                onChange={(e) => updateCurrent('description', e.target.value)}
                className="w-full border p-2 rounded-sm text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium text-xs">Social Share Image URL (OG:Image 1200x630)</label>
              <input
                type="url"
                value={current.seo?.ogImage || ''}
                onChange={(e) => updateCurrent('ogImage', e.target.value)}
                className="w-full border p-2 rounded-sm text-xs"
              />
            </div>

            {/* Google SERP Preview Card */}
            <div className="pt-4 border-t">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Google SERP Snippet Preview:</span>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded text-xs space-y-1">
                <div className="text-[11px] text-gray-500 font-mono">https://royalblueheaven.com/{current.slug}</div>
                <div className="text-[#1a0dab] font-semibold text-sm hover:underline cursor-pointer">
                  {current.seo?.title || 'Royal Blue Heaven | Luxury Hotel'}
                </div>
                <div className="text-gray-600 text-xs line-clamp-2">
                  {current.seo?.description || 'Experience royal hospitality in Gwalior...'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

