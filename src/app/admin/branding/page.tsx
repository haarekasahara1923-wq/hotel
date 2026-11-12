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
  Upload,
  Loader2,
  Trash2,
} from 'lucide-react'

export default function BrandingAdminPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [uploadingField, setUploadingField] = useState<string | null>(null)

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

  const handleFileUpload = async (file: File, fieldName: string) => {
    setUploadingField(fieldName)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('alt', `${formData.hotelName} ${fieldName}`)
      fd.append('folder', 'branding')

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
        credentials: 'include',
      })

      if (res.ok) {
        const data = await res.json()
        if (data.url) {
          setFormData((prev) => ({ ...prev, [fieldName]: data.url }))
        }
      } else {
        alert('Upload failed. Please try a different image.')
      }
    } catch (err) {
      console.error(err)
      alert('Upload error')
    } finally {
      setUploadingField(null)
    }
  }

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

  const renderImagePicker = (label: string, fieldName: keyof typeof formData, helperText: string) => {
    const currentValue = formData[fieldName] as string
    const isUploading = uploadingField === fieldName

    return (
      <div className="border border-dashed border-gray-300 rounded-sm p-4 bg-gray-50/50">
        <label className="block text-gray-700 font-semibold mb-1 text-xs">{label}</label>
        <p className="text-[11px] text-gray-500 mb-2">{helperText}</p>

        {currentValue ? (
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded border bg-[#0B1B3A] p-1 flex items-center justify-center shrink-0 overflow-hidden">
              <img src={currentValue} alt={label} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-emerald-700 font-medium truncate flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Image uploaded from device
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] px-2.5 py-1 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium">
                  <Upload className="w-3 h-3" /> Change
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) handleFileUpload(f, fieldName)
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, [fieldName]: '' }))}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-1 text-rose-600 hover:text-rose-800"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <label className="cursor-pointer border-2 border-dashed border-[#C9A24B]/40 hover:border-[#C9A24B] rounded-sm p-4 flex flex-col items-center justify-center text-center bg-white transition-colors">
            {isUploading ? (
              <div className="flex items-center gap-2 text-xs text-[#0B1B3A] font-medium">
                <Loader2 className="w-4 h-4 animate-spin text-[#C9A24B]" />
                Uploading from device...
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-[#C9A24B] mb-1.5" />
                <span className="text-xs font-semibold text-[#0B1B3A]">
                  Select from Device Gallery
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">
                  Click to browse your phone/computer photos
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) handleFileUpload(f, fieldName)
                  }}
                />
              </>
            )}
          </label>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif text-[#0B1B3A] font-light">Site Branding & Visual Identity</h1>
          <p className="text-xs text-gray-500 mt-1">Live branding settings, palace colors, contact credentials & announcement banner</p>
        </div>
        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
              <CheckCircle className="w-4 h-4" /> Live on Public Website!
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
        {/* Hotel Identity */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0B1B3A] border-b pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A24B]" />
            Hotel Identity & Information
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
              <label className="block text-gray-600 mb-1 font-medium">Established Year</label>
              <input
                type="text"
                value={formData.establishedYear}
                onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Short Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Logos & Assets - Direct Device Gallery Selection */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0B1B3A] border-b pb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#C9A24B]" />
            Logos & Visual Assets (Select from Device Gallery)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderImagePicker('Main Header Logo (Light)', 'logoLightUrl', 'Appears on dark navy header bar')}
            {renderImagePicker('Dark Theme Logo', 'logoDarkUrl', 'Used on light backgrounds or invoice headers')}
            {renderImagePicker('Browser Favicon', 'faviconUrl', 'Square icon shown in browser tab (.png / .ico)')}
            {renderImagePicker('Preloader / Splash Crest', 'preloaderLogoUrl', 'Royal crest shown on initial page load')}
          </div>
        </div>

        {/* Color Palette */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 sm:p-6 space-y-4">
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
              <label className="block text-gray-600 mb-1 font-medium">Royal Gold (Accent)</label>
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

        {/* Contact & Legal */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0B1B3A] border-b pb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#C9A24B]" />
            Contact & Legal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Email Address</label>
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
              <label className="block text-gray-600 mb-1 font-medium">Physical Hotel Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0B1B3A] border-b pb-2 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#C9A24B]" />
            Social Media Handles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Instagram URL</label>
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
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Twitter / X URL</label>
              <input
                type="text"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">YouTube Channel URL</label>
              <input
                type="text"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar & Modes */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 sm:p-6 space-y-4">
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
                  <label className="block text-gray-600 mb-1 font-medium">Announcement Text</label>
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
        <div className="flex justify-end pt-2 pb-12 lg:pb-0">
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
