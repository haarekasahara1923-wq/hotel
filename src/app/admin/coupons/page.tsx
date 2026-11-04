'use client'

import React, { useState, useEffect } from 'react'
import { Tag, Plus, Trash2, Edit2, Calendar, CheckCircle } from 'lucide-react'

interface Coupon {
  id: string
  code: string
  type: string
  value: number
  minAmount?: number
  validFrom: string
  validTo: string
  used: number
  usageLimit?: number
  isActive: boolean
}

interface Offer {
  id: string
  title: string
  slug: string
  description: string
  image?: string
  couponCode?: string
  validTo?: string
  isActive: boolean
}

export default function CouponsAdminPage() {
  const [activeTab, setActiveTab] = useState<'coupons' | 'offers'>('coupons')
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [showAddCoupon, setShowAddCoupon] = useState(false)
  const [showAddOffer, setShowAddOffer] = useState(false)

  const [couponForm, setCouponForm] = useState({
    code: '',
    type: 'percent',
    value: 15,
    minAmount: 5000,
    validFrom: new Date().toISOString().split('T')[0],
    validTo: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    usageLimit: 100,
  })

  const [offerForm, setOfferForm] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
    couponCode: '',
  })

  const fetchData = async () => {
    try {
      const [cRes, oRes] = await Promise.all([
        fetch('/api/admin/coupons', { credentials: 'include' }),
        fetch('/api/admin/offers', { credentials: 'include' }),
      ])
      if (cRes.ok) setCoupons(await cRes.json())
      if (oRes.ok) setOffers(await oRes.json())
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponForm),
        credentials: 'include',
      })
      if (res.ok) {
        setShowAddCoupon(false)
        fetchData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offerForm),
        credentials: 'include',
      })
      if (res.ok) {
        setShowAddOffer(false)
        fetchData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Coupons & Special Offers</h1>
          <p className="text-xs text-gray-500 mt-1">Promotional discount codes & stay packages</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-gray-200 rounded-sm p-0.5 text-xs">
            <button
              onClick={() => setActiveTab('coupons')}
              className={`px-3 py-1.5 rounded-sm font-medium transition-all ${
                activeTab === 'coupons' ? 'bg-[#0B1B3A] text-white' : 'text-gray-600'
              }`}
            >
              Promo Codes
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`px-3 py-1.5 rounded-sm font-medium transition-all ${
                activeTab === 'offers' ? 'bg-[#0B1B3A] text-white' : 'text-gray-600'
              }`}
            >
              Offers ({offers.length})
            </button>
          </div>
          <button
            onClick={() => (activeTab === 'coupons' ? setShowAddCoupon(true) : setShowAddOffer(true))}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1B3A] rounded-sm shadow-sm transition-all hover:brightness-110"
            style={{ background: '#C9A24B' }}
          >
            <Plus className="w-3.5 h-3.5" />
            {activeTab === 'coupons' ? 'Create Coupon' : 'Create Offer'}
          </button>
        </div>
      </div>

      {activeTab === 'coupons' && (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Validity</th>
                <th className="py-3 px-4">Usage</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {coupons.length > 0 ? (
                coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#1A3FA3] text-sm">
                      {c.code}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {c.type === 'percent' ? `${c.value}% OFF` : `₹${c.value} OFF`}
                    </td>
                    <td className="py-3 px-4 text-[11px] text-gray-500">
                      Till {new Date(c.validTo).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 text-[11px]">
                      {c.used} / {c.usageLimit || '∞'} redemptions
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 text-xs">
                    No promo codes active. Click "Create Coupon" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'offers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {offers.length > 0 ? (
            offers.map((o) => (
              <div key={o.id} className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col justify-between">
                {o.image && (
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    <img src={o.image} alt={o.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4 space-y-2 flex-1">
                  <h3 className="font-serif text-base font-semibold text-[#0B1B3A]">{o.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-3">{o.description}</p>
                  {o.couponCode && (
                    <span className="inline-block font-mono text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded">
                      CODE: {o.couponCode}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center text-gray-400 text-xs bg-white border border-dashed rounded">
              No promotional packages listed yet.
            </div>
          )}
        </div>
      )}

      {/* Add Coupon Modal */}
      {showAddCoupon && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Create Discount Coupon</h2>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. ROYAL15"
                  className="w-full border p-2 rounded-sm font-mono uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Discount Type</label>
                  <select
                    value={couponForm.type}
                    onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Value</label>
                  <input
                    type="number"
                    required
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: Number(e.target.value) })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Valid From</label>
                  <input
                    type="date"
                    required
                    value={couponForm.validFrom}
                    onChange={(e) => setCouponForm({ ...couponForm, validFrom: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Valid To</label>
                  <input
                    type="date"
                    required
                    value={couponForm.validTo}
                    onChange={(e) => setCouponForm({ ...couponForm, validTo: e.target.value })}
                    className="w-full border p-2 rounded-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddCoupon(false)}
                  className="px-4 py-2 border rounded-sm text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]"
                  style={{ background: '#C9A24B' }}
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Offer Modal */}
      {showAddOffer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-serif text-[#0B1B3A]">Create Special Offer</h2>
            <form onSubmit={handleCreateOffer} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Offer Title</label>
                <input
                  type="text"
                  required
                  value={offerForm.title}
                  onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                  placeholder="e.g. Royal Honeymoon Escape"
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Description</label>
                <textarea
                  rows={3}
                  required
                  value={offerForm.description}
                  onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                  placeholder="Complimentary candlelit dinner, rose petals, airport transfer..."
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Cover Image URL</label>
                <input
                  type="url"
                  value={offerForm.image}
                  onChange={(e) => setOfferForm({ ...offerForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Attached Coupon Code (Optional)</label>
                <input
                  type="text"
                  value={offerForm.couponCode}
                  onChange={(e) => setOfferForm({ ...offerForm, couponCode: e.target.value.toUpperCase() })}
                  placeholder="e.g. HONEYMOON"
                  className="w-full border p-2 rounded-sm font-mono uppercase"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddOffer(false)}
                  className="px-4 py-2 border rounded-sm text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm font-semibold text-[#0B1B3A]"
                  style={{ background: '#C9A24B' }}
                >
                  Publish Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

