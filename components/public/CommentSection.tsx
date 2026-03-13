'use client'

import { useState, useEffect } from 'react'
import { formatDateTime } from '@/lib/utils/formatDate'
import type { Comment } from '@/lib/types'

export default function CommentSection({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/comments?blog_id=${blogId}`)
      .then((r) => r.json())
      .then(({ data }) => setComments(data ?? []))
  }, [blogId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blog_id: blogId, author_name: name, author_email: email, content }),
    })

    const { data, error } = await res.json()
    setSubmitting(false)

    if (error) { setError(error); return }

    setComments((prev) => [...prev, data])
    setName('')
    setEmail('')
    setContent('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Comments <span className="text-muted-foreground font-normal text-base">({comments.length})</span>
      </h2>

      {/* Comment list */}
      {comments.length > 0 && (
        <div className="space-y-6 mb-10">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-orange-600 font-semibold text-sm shrink-0">
                {comment.author_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{comment.author_name}</span>
                  <span className="text-xs text-muted-foreground">{formatDateTime(comment.created_at)}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <div className="border border-border rounded-2xl p-6">
        <h3 className="text-base font-semibold mb-4">Leave a comment</h3>

        {success && (
          <div className="mb-4 px-4 py-3 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm rounded-lg">
            Comment posted!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Comment</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Share your thoughts..."
            />
            <p className="text-xs text-muted-foreground mt-1">{content.length}/1000</p>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Post comment'}
          </button>
        </form>
      </div>
    </div>
  )
}
