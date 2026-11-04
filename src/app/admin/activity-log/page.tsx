'use client'

import React, { useState, useEffect } from 'react'
import { Activity, RefreshCw, User, ShieldCheck } from 'lucide-react'

interface LogItem {
  id: string
  action: string
  entity: string
  entityId?: string
  ip?: string
  createdAt: string
  user: {
    name: string
    email: string
    role: string
  }
}

export default function ActivityLogAdminPage() {
  const [logs, setLogs] = useState<LogItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/activity-log', { credentials: 'include' })
      if (res.ok) setLogs(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#0B1B3A] font-light">Audit Trail & Activity Log</h1>
          <p className="text-xs text-gray-500 mt-1">Immutable security log of administrative actions, tariff edits & status updates</p>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Staff Member</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Entity</th>
              <th className="py-3 px-4">IP / Client</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">
                    {new Date(log.createdAt).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#0B1B3A] block">{log.user?.name || 'Administrator'}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{log.user?.email}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#1A3FA3]">
                      {log.action.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-700 text-xs">
                    {log.entity} {log.entityId ? `#${log.entityId}` : ''}
                  </td>
                  <td className="py-3 px-4 text-gray-400 font-mono text-[10px]">
                    {log.ip || 'Admin Portal Session'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-400 text-xs">
                  No activity logs registered yet. Actions taken across the admin panel will be recorded here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

