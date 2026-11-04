'use client'

import React, { useState, useEffect } from 'react'
import { Mail, MessageSquare, Save, RefreshCw, CheckCircle } from 'lucide-react'

interface Template {
  key: string
  name: string
  channel: 'email' | 'whatsapp'
  subject?: string
  body: string
}

const DEFAULT_TEMPLATES: Template[] = [
  {
    key: 'booking_confirmed',
    name: 'Booking Confirmation',
    channel: 'email',
    subject: 'Your Royal Reservation at Royal Blue Heaven, Gwalior [{{booking_code}}]',
    body: `Dear {{guest_name}},

Namaste from Royal Blue Heaven, Gwalior.

We are delighted to confirm your upcoming stay with us:
- Folio Code: {{booking_code}}
- Check-In: {{check_in}} (From 14:00)
- Check-Out: {{check_out}} (Until 11:00)
- Chamber: {{room_type}}
- Total Tariff: ₹{{total_amount}}

Our royal butler team awaits the pleasure of your arrival. Please let us know if you require complimentary railway station/airport transfer.

Warm Royal Regards,
General Manager
Royal Blue Heaven, DD Nagar, Gwalior`,
  },
  {
    key: 'whatsapp_welcome',
    name: 'WhatsApp Arrival Concierge',
    channel: 'whatsapp',
    body: `Namaste {{guest_name}} 🙏 Welcome to Royal Blue Heaven, Gwalior! Your reservation {{booking_code}} is confirmed for {{check_in}}. If you need directions, luggage assistance, or dietary preferences for dinner at Maharaja, please reply to this chat. Have a safe journey!`,
  },
  {
    key: 'enquiry_reply',
    name: 'Banquet & Wedding Enquiry Follow-up',
    channel: 'email',
    subject: 'Your Wedding & Celebration Enquiry — Royal Blue Heaven Gwalior',
    body: `Dear {{guest_name}},

Thank you for considering Royal Blue Heaven for your distinguished celebration.

Our palace banqueting team has received your enquiry. We would be honored to host your event with our crystal chandelier halls, Awadhi feast menus, and royal hospitality.

Our Events Director will call you shortly at {{guest_phone}} to schedule a palace walk-through.

Warm Regards,
Events Team, Royal Blue Heaven`,
  },
]

export default function EmailTemplatesAdminPage() {
  const [templates, setTemplates] = useState<Template[]>(DEFAULT_TEMPLATES)
  const [selectedKey, setSelectedKey] = useState('booking_confirmed')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const current = templates.find((t) => t.key === selectedKey) || templates[0]

  const handleUpdateCurrent = (field: 'subject' | 'body', val: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.key === selectedKey ? { ...t, [field]: val } : t))
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/admin/email-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(current),
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
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Email & WhatsApp Notification Templates</h1>
          <p className="text-xs text-gray-500 mt-1">Automated guest folios, confirmation emails & concierge WhatsApp messages</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
              <CheckCircle className="w-4 h-4" /> Template Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Template Select Column */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-3 space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 px-2 py-1 block">Templates</span>
          {templates.map((t) => (
            <button
              key={t.key}
              onClick={() => setSelectedKey(t.key)}
              className={`w-full text-left p-3 rounded text-xs transition-all ${
                selectedKey === t.key
                  ? 'bg-[#0B1B3A] text-white shadow'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold block">{t.name}</span>
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                    t.channel === 'whatsapp'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {t.channel}
                </span>
              </div>
            </button>
          ))}

          <div className="pt-4 border-t border-gray-100 p-2">
            <span className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Available Variables:</span>
            <div className="text-[10px] text-gray-500 font-mono space-y-0.5">
              <div>{'{{guest_name}}'}</div>
              <div>{'{{booking_code}}'}</div>
              <div>{'{{check_in}}'} / {'{{check_out}}'}</div>
              <div>{'{{room_type}}'}</div>
              <div>{'{{total_amount}}'}</div>
              <div>{'{{hotel_name}}'}</div>
            </div>
          </div>
        </div>

        {/* Editor Column */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-sm font-semibold text-[#0B1B3A] uppercase tracking-wider">{current.name}</h2>
            <span className="text-xs uppercase font-bold text-gray-500">Channel: {current.channel}</span>
          </div>

          {current.channel === 'email' && (
            <div>
              <label className="block text-gray-600 mb-1 font-medium text-xs">Email Subject Line</label>
              <input
                type="text"
                value={current.subject || ''}
                onChange={(e) => handleUpdateCurrent('subject', e.target.value)}
                className="w-full border p-2 rounded-sm text-xs font-medium"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-600 mb-1 font-medium text-xs">
              {current.channel === 'whatsapp' ? 'WhatsApp Message Body' : 'Email Content Body'}
            </label>
            <textarea
              rows={12}
              value={current.body}
              onChange={(e) => handleUpdateCurrent('body', e.target.value)}
              className="w-full border p-3 rounded-sm text-xs font-mono leading-relaxed bg-gray-50/50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

