'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import BlogsTable from '@/components/admin/BlogsTable'
import { timeUntilPurge } from '@/lib/utils/formatDate'
import type { BlogListItem } from '@/lib/types'

export default function TrashPage() {
  const [blogs, setBlogs] = useState<BlogListItem[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchTrash() {
    setLoading(true)
    const res = await fetch('/api/blogs?status=trashed&limit=100')
    const { data } = await res.json()
    setBlogs(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchTrash() }, [])

  async function handleRestore(id: string) {
    await fetch(`/api/blogs/${id}/restore`, { method: 'POST' })
    fetchTrash()
  }

  async function handlePermanentDelete(id: string) {
    const supabase = createClient()
    await supabase.from('blogs').delete().eq('id', id)
    fetchTrash()
  }

  return (
    <div className="px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Trash</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Blogs are automatically deleted 30 days after being trashed.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Trash is empty</div>
      ) : (
        <>
          {/* Days remaining indicators */}
          <div className="mb-4 space-y-2">
            {blogs.map((blog) => blog.trashed_at && (
              <div key={blog.id} className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg">
                <span className="truncate font-medium">{blog.title}</span>
                <span className="text-orange-500 ml-4 shrink-0">
                  {timeUntilPurge(blog.trashed_at)}
                </span>
              </div>
            ))}
          </div>

          <BlogsTable
            blogs={blogs}
            onDelete={handlePermanentDelete}
            onPublish={() => {}}
            onRestore={handleRestore}
            showTrash
          />
        </>
      )}
    </div>
  )
}
