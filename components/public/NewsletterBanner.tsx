'use client'

import { useState } from 'react'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const { error } = await res.json()

    if (error) {
      setStatus('error')
      setMessage(error)
    } else {
      setStatus('success')
      setMessage("You're subscribed! Great to have you.")
      setEmail('')
    }
  }

  return (
    <div className="max-w-6xl xl:px-6 px-4 mx-auto bg-linear-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-900 rounded-3xl py-12 text-center">
      <h2 className="text-2xl font-inter font-bold mb-2">Stay in the loop</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Get new articles delivered straight to your inbox. No spam, ever.
      </p>

      {status === 'success' ? (
        <p className="text-green-600 dark:text-green-400 font-medium">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 text-sm border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-2.5 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition disabled:opacity-60"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-500 text-sm mt-3">{message}</p>
      )}
    </div>
  )
}
