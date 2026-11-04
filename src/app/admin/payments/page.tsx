'use client'

import React, { useState, useEffect } from 'react'
import {
  CreditCard,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  RotateCcw,
  DollarSign,
  ShieldAlert,
} from 'lucide-react'

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  method?: string
  razorpayPaymentId?: string
  razorpayOrderId?: string
  refundAmount?: number
  refundReason?: string
  createdAt: string
  booking?: {
    code: string
    guestName: string
    guestEmail: string
  }
}

export default function PaymentsAdminPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [refundModal, setRefundModal] = useState<Payment | null>(null)
  const [refundAmount, setRefundAmount] = useState('')
  const [refundReason, setRefundReason] = useState('')

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/payments?status=${statusFilter}`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setPayments(data.payments || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [statusFilter])

  const handleRefund = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!refundModal) return

    try {
      const res = await fetch(`/api/admin/payments/${refundModal.id}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(refundAmount), reason: refundReason }),
        credentials: 'include',
      })
      if (res.ok) {
        setRefundModal(null)
        setRefundAmount('')
        setRefundReason('')
        fetchPayments()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const totalCollected = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + Number(p.amount), 0)

  const totalRefunded = payments
    .filter((p) => p.status === 'refunded' || p.refundAmount)
    .reduce((sum, p) => sum + Number(p.refundAmount || p.amount), 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Payments & Refunds</h1>
          <p className="text-xs text-gray-500 mt-1">Transaction ledgers, gateway settlements & refund processing</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPayments}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Net Revenue Collected</span>
          <div className="text-2xl font-serif text-[#0B1B3A] mt-2">₹{totalCollected.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-emerald-600 mt-1 block">Live settlement balance</span>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Total Refunds Issued</span>
          <div className="text-2xl font-serif text-rose-700 mt-2">₹{totalRefunded.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-gray-400 mt-1 block">Across cancellations</span>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Gateway Status</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-gray-800">Razorpay Production Active</span>
          </div>
          <span className="text-[10px] text-gray-400 mt-1 block">Webhook listening</span>
        </div>
      </div>

      {/* Table & Filters */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex gap-1">
            {['ALL', 'paid', 'created', 'refunded', 'failed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                  statusFilter === st ? 'bg-[#0B1B3A] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {st.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transaction ID, booking..."
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-sm w-full sm:w-60 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                <th className="py-3 px-4">Booking Folio</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Gateway Reference</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {payments.length > 0 ? (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-[#1A3FA3]">
                      {p.booking?.code || 'WALKIN-DIRECT'}
                      <span className="text-[10px] text-gray-400 font-sans block">{p.booking?.guestName}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      ₹{Number(p.amount).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500">
                      {p.razorpayPaymentId || p.razorpayOrderId || '-'}
                    </td>
                    <td className="py-3 px-4 uppercase text-[10px] font-semibold text-gray-600">
                      {p.method || 'ONLINE'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          p.status === 'paid'
                            ? 'bg-emerald-50 text-emerald-700'
                            : p.status === 'refunded'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {p.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {p.status === 'paid' && (
                        <button
                          onClick={() => {
                            setRefundModal(p)
                            setRefundAmount(String(p.amount))
                          }}
                          className="px-2.5 py-1 text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 transition-colors"
                        >
                          Issue Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 text-xs">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Modal */}
      {refundModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Issue Payment Refund</h2>
            <p className="text-xs text-gray-500">
              Booking Folio: <span className="font-mono text-[#1A3FA3] font-semibold">{refundModal.booking?.code}</span>
            </p>
            <form onSubmit={handleRefund} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Refund Amount (₹)</label>
                <input
                  type="number"
                  required
                  max={refundModal.amount}
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Reason for Refund</label>
                <textarea
                  required
                  rows={3}
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="e.g. Guest cancelled 48h prior per policy"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setRefundModal(null)}
                  className="px-4 py-2 border rounded-sm text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm font-semibold bg-rose-600 text-white hover:bg-rose-700"
                >
                  Confirm Refund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

