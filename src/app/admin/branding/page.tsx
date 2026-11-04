'use client'

import React, { useState, useEffect } from 'react'
import {
  Palette,
  CheckCircle,
  Save,
  Globe,
  Phone,
  Mail,
  Share2,
  Sliders,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react'

export default function BrandingAdminPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [formData, setFormData] = useState({
    // Identity
    hotelName: 'Royal Blue Heaven',
    tagline: 'Where Royalty Meets Serenity',
    establishedYear: '2010',
    description: 'A bespoke 20-room sanctuary in historic DD Nagar, Gwalior.',
    // Logos & Assets
    logoLightUrl: '',
    logoDarkUrl: '',
    faviconUrl: '',
    preloaderLogoUrl: '',
    // Colors
    primaryColor: '#1A3FA3',
    primaryDarkColor: '#0B1B3A',
    accentColor: '#C9A24B',
    champagneColor: '#F4E9CD',
    // Contact
    phone: '+91 98765 43210',
    email: 'info@royalblueheaven.com',
    whatsappNumber: '+91 98765 43210',
    gstNumber: '23XXXXX1234X1ZX',
    address: 'DD Nagar, Gwalior, Madhya Pradesh 474011, India',
    mapEmbedUrl: 'https://maps.google.com/maps?q=DD%20Nagar%20Gwalior&t=&z=13&ie=UTF8&iwloc=&output=embed',
    // Socials
    instagramUrl: 'https://instagram.com/royalblueheaven',
    facebookUrl: 'https://facebook.com/royalblueheaven',
    twitterUrl: 'https://twitter.com/royalblueheaven',
    youtubeUrl: 'https://youtube.com/@royalblueheaven',
    // Announcement Bar
    announcementEnabled: true,
    announcementText: 'Complimentary Airport Transfer & Spa Upgrade on Direct Bookings this Season',
    announcementLink: '/offers',
    // Maintenance Mode
    maintenanceMode: false,
    // SEO
    defaultMetaTitle: 'Royal Blue Heaven | Luxury Hotel in Gwalior',
    defaultMetaDesc: 'Experience royal heritage luxury at Royal Blue Heaven in DD Nagar, Gwalior.',
    ogImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
  })

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const res = await fetch('/api/admin/branding', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          if (data && Object.keys(data).length > 0) {
            setFormData((prev) => ({ ...prev, ...data }))
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBranding()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSavedSuccess(false)
    try {
      const res = await fetch('/api/admin/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) {
        setSavedSuccess(true)
        setTimeout(() => setSavedSuccess(false), 4000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Site Branding & Visual Identity</h1>
          <p className="text-xs text-gray-500 mt-1">Live branding settings, palace colors, contact credentials & announcement banner</p>
        </div>
        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
              <CheckCircle className="w-4 h-4" /> Changes Applied Live
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identity & Logos */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0B1B3A] border-b pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A24B]" />
            Hotel Identity & Logos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Hotel Name</label>
              <input
                type="text"
                value={formData.hotelName}
                onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Tagline / Motto</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Light Theme Logo URL</label>
              <input
                type="url"
                value={formData.logoLightUrl}
                onChange={(e) => setFormData({ ...formData, logoLightUrl: e.target.value })}
                placeholder="https://.../logo-white.png"
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Dark Theme Logo URL</label>
              <input
                type="url"
                value={formData.logoDarkUrl}
                onChange={(e) => setFormData({ ...formData, logoDarkUrl: e.target.value })}
                placeholder="https://.../logo-gold.png"
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Favicon URL (.ico or .png)</label>
              <input
                type="url"
                value={formData.faviconUrl}
                onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                placeholder="https://.../favicon.ico"
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Preloader / Splash Crest URL</label>
              <input
                type="url"
                value={formData.preloaderLogoUrl}
                onChange={(e) => setFormData({ ...formData, preloaderLogoUrl: e.target.value })}
                placeholder="https://.../crest.png"
                className="w-full border p-2 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0B1B3A] border-b pb-2 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#C9A24B]" />
            Color Palette & Accents
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Deep Navy (Hero & Nav)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.primaryDarkColor}
                  onChange={(e) => setFormData({ ...formData, primaryDarkColor: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primaryDarkColor}
                  onChange={(e) => setFormData({ ...formData, primaryDarkColor: e.target.value })}
                  className="w-full border p-1.5 rounded-sm font-mono text-xs uppercase"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Royal Blue (Primary)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="w-full border p-1.5 rounded-sm font-mono text-xs uppercase"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Antique Gold (Accent)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  className="w-full border p-1.5 rounded-sm font-mono text-xs uppercase"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Champagne / Ivory</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.champagneColor}
                  onChange={(e) => setFormData({ ...formData, champagneColor: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.champagneColor}
                  onChange={(e) => setFormData({ ...formData, champagneColor: e.target.value })}
                  className="w-full border p-1.5 rounded-sm font-mono text-xs uppercase"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact, Location & Socials */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0B1B3A] border-b pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C9A24B]" />
            Official Contact, Location & Social Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Reception Telephone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Official Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">WhatsApp Booking Number</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">GST Identification Number</label>
              <input
                type="text"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-600 mb-1 font-medium">Postal Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Instagram Handle / URL</label>
              <input
                type="text"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Facebook Page URL</label>
              <input
                type="text"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar & Modes */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0B1B3A] border-b pb-2 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C9A24B]" />
            Announcement Bar & Maintenance Mode
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="annToggle"
                checked={formData.announcementEnabled}
                onChange={(e) => setFormData({ ...formData, announcementEnabled: e.target.checked })}
                className="w-4 h-4 text-[#1A3FA3]"
              />
              <label htmlFor="annToggle" className="font-medium text-gray-800">
                Display Top Announcement Bar on Public Website
              </label>
            </div>

            {formData.announcementEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Announcement Message</label>
                  <input
                    type="text"
                    value={formData.announcementText}
                    onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Link Destination</label>
                  <input
                    type="text"
                    value={formData.announcementLink}
                    onChange={(e) => setFormData({ ...formData, announcementLink: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-800 block">Maintenance Mode</span>
                <span className="text-gray-400 text-[11px]">When activated, public site shows luxury "Under Renovation" landing page</span>
              </div>
              <input
                type="checkbox"
                checked={formData.maintenanceMode}
                onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                className="w-5 h-5 text-rose-600"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save All Branding'}
          </button>
        </div>
      </form>
    </div>
  )
}

