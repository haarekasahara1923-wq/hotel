'use client'

import React, { useState, useEffect } from 'react'
import { BarChart3, Download, RefreshCw, Calendar, TrendingUp, DollarSign, Layers } from 'lucide-react'

interface ReportData {
  totalRevenue: number
  totalBookings: number
  sourceStats: Record<string, number>
  statusStats: Record<string, number>
  bookings: Array<{
    id: string
    code: string
    guestName: string
    checkIn: string
    checkOut: string
    total: number
    status: string
    source: string
    createdAt: string
  }>
}

export default function ReportsAdminPage() {
  const [data, setData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchReports = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/reports', { credentials: 'include' })
      if (res.ok) setData(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const exportCsv = () => {
    if (!data?.bookings) return
    const headers = ['Booking Code', 'Guest Name', 'Check-In', 'Check-Out', 'Total Tariff', 'Status', 'Booking Source', 'Created At']
    const rows = data.bookings.map((b) => [
      b.code,
      `"${b.guestName}"`,
      new Date(b.checkIn).toISOString().split('T')[0],
      new Date(b.checkOut).toISOString().split('T')[0],
      b.total,
      b.status,
      b.source,
      new Date(b.createdAt).toISOString().split('T')[0],
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `RBH_Bookings_Report_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Reports & Performance Analytics</h1>
          <p className="text-xs text-gray-500 mt-1">Financial reconciliation, occupancy yields & CSV/Excel export for accountants</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchReports}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={exportCsv}
            disabled={!data?.bookings?.length}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Download className="w-3.5 h-3.5" />
            Export to Excel / CSV
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Gross Revenue</span>
          <div className="text-2xl font-serif text-[#0B1B3A] mt-2">
            ₹{(data?.totalRevenue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-600 mt-1 block">Paid transaction receipts</span>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Total Stays</span>
          <div className="text-2xl font-serif text-[#1A3FA3] mt-2">{data?.totalBookings || 0}</div>
          <span className="text-[10px] text-gray-400 mt-1 block">All registered folios</span>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Average Tariff / Booking</span>
          <div className="text-2xl font-serif text-[#0B1B3A] mt-2">
            ₹{data?.totalBookings ? Math.round((data.totalRevenue || 0) / data.totalBookings).toLocaleString('en-IN') : 0}
          </div>
          <span className="text-[10px] text-gray-400 mt-1 block">ADR proxy</span>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Chamber Inventory</span>
          <div className="text-2xl font-serif text-[#C9A24B] mt-2">20 Chambers</div>
          <span className="text-[10px] text-gray-400 mt-1 block">Boutique luxury capacity</span>
        </div>
      </div>

      {/* Breakdowns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sources */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0B1B3A]">Bookings by Channel Source</h2>
          <div className="space-y-2 text-xs">
            {data?.sourceStats && Object.keys(data.sourceStats).length > 0 ? (
              Object.entries(data.sourceStats).map(([src, count]) => {
                const pct = data.totalBookings ? Math.round((count / data.totalBookings) * 100) : 0
                return (
                  <div key={src} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700 uppercase">{src}</span>
                      <span className="text-gray-500">{count} bookings ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#1A3FA3' }} />
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-gray-400 italic">No source data available.</p>
            )}
          </div>
        </div>

        {/* Statuses */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0B1B3A]">Bookings by Status</h2>
          <div className="space-y-2 text-xs">
            {data?.statusStats && Object.keys(data.statusStats).length > 0 ? (
              Object.entries(data.statusStats).map(([st, count]) => {
                const pct = data.totalBookings ? Math.round((count / data.totalBookings) * 100) : 0
                return (
                  <div key={st} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700 uppercase">{st}</span>
                      <span className="text-gray-500">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#C9A24B' }} />
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-gray-400 italic">No status data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

