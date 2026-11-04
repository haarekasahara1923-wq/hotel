'use client'

import React, { useState, useEffect } from 'react'
import { Settings, Save, CheckCircle, ShieldAlert, KeyRound, Clock, Percent } from 'lucide-react'

export default function SettingsAdminPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [formData, setFormData] = useState({
    gstRate: 12,
    checkInTime: '14:00',
    checkOutTime: '11:00',
    cancellationHours: 48,
    advancePaymentPercent: 50,
    autoConfirm: true,
    smokingPolicy: 'Strictly Non-Smoking inside chambers; permitted in heritage courtyard gardens.',
    petPolicy: 'Pet companions are warmly welcomed in Heritage Villa suites upon prior notice.',
    keysStatus: {
      razorpayConfigured: false,
      cloudinaryConfigured: false,
      databaseConfigured: true,
      emailConfigured: false,
    },
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setFormData((prev) => ({ ...prev, ...data }))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Hotel Policy & System Settings</h1>
          <p className="text-xs text-gray-500 mt-1">GST tax rates, check-in schedules, payment gateway status & cancellation terms</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
              <CheckCircle className="w-4 h-4" /> Policies Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* API Keys Status Card */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0B1B3A] flex items-center gap-2 border-b pb-2">
            <KeyRound className="w-4 h-4 text-[#C9A24B]" />
            Integration Keys & Environment Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded border flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-800 block">Neon PostgreSQL Database</span>
                <span className="text-[10px] text-gray-400">DATABASE_URL connection string</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                CONNECTED
              </span>
            </div>

            <div className="p-3 rounded border flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-800 block">Razorpay Payment Gateway</span>
                <span className="text-[10px] text-gray-400">RAZORPAY_KEY_ID & KEY_SECRET</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  formData.keysStatus?.razorpayConfigured
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {formData.keysStatus?.razorpayConfigured ? 'ACTIVE' : 'TEST / DEMO MODE'}
              </span>
            </div>

            <div className="p-3 rounded border flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-800 block">Cloudinary Media CDN</span>
                <span className="text-[10px] text-gray-400">CLOUDINARY_CLOUD_NAME & KEYS</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  formData.keysStatus?.cloudinaryConfigured
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {formData.keysStatus?.cloudinaryConfigured ? 'CONNECTED' : 'DIRECT URL MODE'}
              </span>
            </div>

            <div className="p-3 rounded border flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-800 block">Resend Email Delivery</span>
                <span className="text-[10px] text-gray-400">RESEND_API_KEY</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  formData.keysStatus?.emailConfigured
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {formData.keysStatus?.emailConfigured ? 'LIVE' : 'MOCK LOGGING'}
              </span>
            </div>
          </div>
        </div>

        {/* Taxes & Financial Policies */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0B1B3A] flex items-center gap-2 border-b pb-2">
            <Percent className="w-4 h-4 text-[#C9A24B]" />
            Taxes & Reservation Deposits
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Standard GST Surcharge (%)</label>
              <input
                type="number"
                value={formData.gstRate}
                onChange={(e) => setFormData({ ...formData, gstRate: Number(e.target.value) })}
                className="w-full border p-2 rounded-sm"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Government luxury slab (12%)</span>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Advance Deposit Required (%)</label>
              <input
                type="number"
                value={formData.advancePaymentPercent}
                onChange={(e) => setFormData({ ...formData, advancePaymentPercent: Number(e.target.value) })}
                className="w-full border p-2 rounded-sm"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Minimum 50% for direct confirmation</span>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Free Cancellation Window (Hours)</label>
              <input
                type="number"
                value={formData.cancellationHours}
                onChange={(e) => setFormData({ ...formData, cancellationHours: Number(e.target.value) })}
                className="w-full border p-2 rounded-sm"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Prior to arrival date (48 hours)</span>
            </div>
          </div>
        </div>

        {/* Timings */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0B1B3A] flex items-center gap-2 border-b pb-2">
            <Clock className="w-4 h-4 text-[#C9A24B]" />
            Check-in / Check-out Timings
          </h2>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Standard Check-In Time</label>
              <input
                type="time"
                value={formData.checkInTime}
                onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Standard Check-Out Time</label>
              <input
                type="time"
                value={formData.checkOutTime}
                onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
                className="w-full border p-2 rounded-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

