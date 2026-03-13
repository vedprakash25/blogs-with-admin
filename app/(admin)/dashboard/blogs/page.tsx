'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import BlogsTable from '@/components/admin/BlogsTable'
import type { BlogListItem, BlogStatus } from '@/lib/types'

const TABS: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Scheduled', value: 'scheduled' },
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogListItem[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ status: activeTab, limit: '100' })
    const res = await fetch(`/api/blogs?${params}`)
    const { data } = await res.json()
    setBlogs(data ?? [])
    setLoading(false)
  }, [activeTab])

  useEffect(() => { fetchBlogs() }, [fetchBlogs])

  async function handleDelete(id: string) {
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
    fetchBlogs()
  }

  async function handlePublish(id: string) {
    await fetch(`/api/blogs/${id}/publish`, { method: 'POST' })
    fetchBlogs()
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blog posts</h1>
        <Link
          href="/dashboard/blogs/new"
          className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
        >
          + New post
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.value
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>
      ) : (
        <BlogsTable
          blogs={blogs}
          onDelete={handleDelete}
          onPublish={handlePublish}
        />
      )}
    </div>
  )
}
