'use client'

import React, { useState, useEffect } from 'react'
import {
  FileEdit,
  Save,
  Plus,
  Trash2,
  Eye,
  CheckCircle,
  Layout,
  MoveUp,
  MoveDown,
} from 'lucide-react'

const PAGES = [
  { slug: 'home', title: 'Home Page' },
  { slug: 'rooms', title: 'Rooms & Palatial Suites' },
  { slug: 'dining', title: 'Maharaja Fine Dining' },
  { slug: 'events', title: 'Banquets & Celebrations' },
  { slug: 'spa', title: 'Serenity Ayurvedic Spa' },
  { slug: 'experiences', title: 'Gwalior Fort & Experiences' },
  { slug: 'offers', title: 'Special Offers' },
  { slug: 'about', title: 'About Royal Blue Heaven' },
  { slug: 'contact', title: 'Contact & Location' },
]

interface Section {
  type: string
  title: string
  subtitle?: string
  content?: string
  visible: boolean
}

export default function CmsAdminPage() {
  const [selectedPage, setSelectedPage] = useState('home')
  const [pageTitle, setPageTitle] = useState('')
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const fetchPageCms = async (slug: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/cms?slug=${slug}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setPageTitle(data.title || slug)
        if (data.sections && data.sections.length > 0) {
          setSections(
            data.sections.map((s: any) => ({
              type: s.type,
              title: s.content?.title || s.type,
              subtitle: s.content?.subtitle || '',
              content: s.content?.body || '',
              visible: s.visible !== false,
            }))
          )
        } else {
          // Defaults for home or other pages
          setSections([
            { type: 'hero', title: 'Where Royalty Meets Serenity', subtitle: 'Royal Blue Heaven — DD Nagar, Gwalior', content: 'Step into an opulent heritage sanctuary...', visible: true },
            { type: 'story', title: 'A Regal Haven in the Cradle of Gwalior Royalty', subtitle: 'Our Heritage & Vision', content: 'Situated in DD Nagar, Gwalior...', visible: true },
            { type: 'rooms-showcase', title: 'Rooms & Palatial Suites', subtitle: 'Sanctuary of Comfort', content: 'Curated with hand-loomed royal blue silks...', visible: true },
            { type: 'dining-spa', title: 'The Royal Blue Indulgence', subtitle: 'Gastronomy & Wellness', content: 'Centuries-old royal Awadhi recipes...', visible: true },
            { type: 'cta', title: 'Begin Your Regal Journey at Royal Blue Heaven', subtitle: 'Best Online Rate Guarantee', content: 'Book directly through our website...', visible: true },
          ])
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPageCms(selectedPage)
  }, [selectedPage])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const payload = {
        slug: selectedPage,
        title: pageTitle,
        sections: sections.map((s, idx) => ({
          type: s.type,
          order: idx,
          visible: s.visible,
          content: {
            title: s.title,
            subtitle: s.subtitle,
            body: s.content,
          },
        })),
      }
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  const addSection = () => {
    setSections([
      ...sections,
      { type: 'rich-text', title: 'New Custom Section', subtitle: '', content: '', visible: true },
    ])
  }

  const removeSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx))
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Page Editor & CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Section-by-section content editor for every public hotel page</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
              <CheckCircle className="w-4 h-4" /> Live Content Updated
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving...' : 'Save Page Content'}
          </button>
        </div>
      </div>

      {/* Page Select Pills */}
      <div className="flex flex-wrap gap-1 bg-white p-2 rounded-sm border border-gray-200 shadow-sm text-xs">
        {PAGES.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSelectedPage(p.slug)}
            className={`px-3 py-1.5 rounded-sm font-medium transition-all ${
              selectedPage === p.slug ? 'bg-[#0B1B3A] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1A3FA3] text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-semibold text-xs text-[#0B1B3A] uppercase tracking-wider">
                  Section Type: {section.type}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={section.visible}
                    onChange={(e) => {
                      const updated = [...sections]
                      updated[idx].visible = e.target.checked
                      setSections(updated)
                    }}
                    className="w-3.5 h-3.5 text-[#1A3FA3]"
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() => removeSection(idx)}
                  className="text-rose-600 hover:text-rose-800 p-1"
                  title="Delete Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Eyebrow / Subtitle</label>
                <input
                  type="text"
                  value={section.subtitle}
                  onChange={(e) => {
                    const updated = [...sections]
                    updated[idx].subtitle = e.target.value
                    setSections(updated)
                  }}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Main Heading</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => {
                    const updated = [...sections]
                    updated[idx].title = e.target.value
                    setSections(updated)
                  }}
                  className="w-full border p-2 rounded-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium text-xs">Section Body / Paragraph</label>
              <textarea
                rows={3}
                value={section.content}
                onChange={(e) => {
                  const updated = [...sections]
                  updated[idx].content = e.target.value
                  setSections(updated)
                }}
                className="w-full border p-2 rounded-sm text-xs"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded text-xs font-semibold text-gray-600 hover:border-[#C9A24B] hover:text-[#0B1B3A] transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Section to {selectedPage.toUpperCase()} Page
        </button>
      </div>
    </div>
  )
}

