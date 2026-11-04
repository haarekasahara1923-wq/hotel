'use client'

import React, { useState, useEffect } from 'react'
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  RefreshCw,
  Send,
  CheckCircle,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  type: string
  message?: string
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'CLOSED'
  notes?: string
  createdAt: string
}

export default function EnquiriesAdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/enquiries', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setEnquiries(data.enquiries || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      })
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus as any } : e))
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = enquiries.filter((e) => {
    if (typeFilter !== 'ALL' && e.type?.toLowerCase() !== typeFilter.toLowerCase()) return false
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      e.name?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.phone?.includes(q) ||
      e.message?.toLowerCase().includes(q)
    )
  })

  const stages: Array<'NEW' | 'CONTACTED' | 'CONVERTED' | 'CLOSED'> = [
    'NEW',
    'CONTACTED',
    'CONVERTED',
    'CLOSED',
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Enquiries & Leads Pipeline</h1>
          <p className="text-xs text-gray-500 mt-1">Track guest requests, wedding enquiries, dining reservations & corporate bookings</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchEnquiries}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 rounded-sm border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-1">
          {['ALL', 'room', 'event', 'dining', 'spa', 'contact'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                typeFilter === t
                  ? 'bg-[#0B1B3A] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t === 'ALL' ? 'All Leads' : t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lead name, email, phone..."
            className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-sm w-full sm:w-64 focus:outline-none focus:border-[#C9A24B]"
          />
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const items = filtered.filter((e) => e.status === stage)
          const colorMap = {
            NEW: 'border-t-rose-500 text-rose-700 bg-rose-50',
            CONTACTED: 'border-t-amber-500 text-amber-700 bg-amber-50',
            CONVERTED: 'border-t-emerald-500 text-emerald-700 bg-emerald-50',
            CLOSED: 'border-t-gray-400 text-gray-700 bg-gray-50',
          }

          return (
            <div
              key={stage}
              className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className={`p-3 border-b border-t-4 flex items-center justify-between ${colorMap[stage]}`}>
                <span className="font-semibold text-xs tracking-wider uppercase">{stage}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white shadow-xs">
                  {items.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                {items.length > 0 ? (
                  items.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3 bg-white border border-gray-200 rounded shadow-xs hover:border-[#C9A24B] transition-all space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-[#0B1B3A]">{lead.name}</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-bold shrink-0">
                          {lead.type}
                        </span>
                      </div>

                      <div className="text-[11px] text-gray-500 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                      </div>

                      {lead.message && (
                        <p className="text-[11px] text-gray-600 bg-gray-50 p-2 rounded italic line-clamp-3">
                          "{lead.message}"
                        </p>
                      )}

                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="text-[10px] border border-gray-200 rounded px-1.5 py-1 bg-gray-50 focus:outline-none"
                        >
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="CONVERTED">Converted</option>
                          <option value="CLOSED">Closed</option>
                        </select>

                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, regarding your enquiry with Royal Blue Heaven hotel...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded font-semibold border border-emerald-200 flex items-center gap-1"
                        >
                          WhatsApp ↗
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400 text-xs italic">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

