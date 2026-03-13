'use client'

import { useState, useEffect } from 'react'
import { formatDateTime } from '@/lib/utils/formatDate'
import type { Comment } from '@/lib/types'

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function fetchAll() {
    // Fetch all comments via supabase directly
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { data } = await supabase
      .from('comments')
      .select('*, blog:blogs(title, slug)')
      .order('created_at', { ascending: false })
    setComments(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  async function handleDelete(id: string) {
    await fetch(`/api/comments?id=${id}`, { method: 'DELETE' })
    setDeleteId(null)
    setComments((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Comments</h1>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : comments.length === 0 ? (
        <p className="text-center py-16 text-muted-foreground text-sm">No comments yet</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          {comments.map((comment: any, i) => (
            <div key={comment.id} className={`px-5 py-4 ${i < comments.length - 1 ? 'border-b border-border' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-sm">{comment.author_name}</span>
                    <span className="text-xs text-muted-foreground">{comment.author_email}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{formatDateTime(comment.created_at)}</span>
                  </div>
                  {comment.blog && (
                    <p className="text-xs text-orange-500 mb-2">
                      On: {comment.blog.title}
                    </p>
                  )}
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>

                <div className="shrink-0">
                  {deleteId === comment.id ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleDelete(comment.id)} className="text-xs text-red-600 font-medium">
                        Confirm
                      </button>
                      <button onClick={() => setDeleteId(null)} className="text-xs text-muted-foreground">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteId(comment.id)} className="text-xs text-red-500 hover:text-red-600">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
