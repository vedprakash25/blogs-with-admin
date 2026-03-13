'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDateShort } from '@/lib/utils/formatDate'
import type { Subscriber } from '@/lib/types'

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const supabase = createClient()
      const { data } = await supabase
        .from('subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false })
      setSubscribers(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [])

  async function toggleActive(id: string, current: boolean) {
    const supabase = createClient()
    await supabase.from('subscribers').update({ is_active: !current }).eq('id', id)
    setSubscribers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_active: !current } : s))
    )
  }

  const active = subscribers.filter((s) => s.is_active)
  const inactive = subscribers.filter((s) => !s.is_active)

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Subscribers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {active.length} active · {inactive.length} unsubscribed
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-center py-16 text-muted-foreground text-sm">No subscribers yet</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Subscribed</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, i) => (
                <tr
                  key={sub.id}
                  className={`border-b border-border last:border-0 ${
                    i % 2 === 0 ? '' : 'bg-muted/10'
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{sub.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDateShort(sub.subscribed_at)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        sub.is_active
                          ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }`}
                    >
                      {sub.is_active ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => toggleActive(sub.id, sub.is_active)}
                      className="text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      {sub.is_active ? 'Unsubscribe' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
