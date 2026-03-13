'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatDateShort } from '@/lib/utils/formatDate'
import type { BlogListItem } from '@/lib/types'

const STATUS_STYLES: Record<string, string> = {
  published: 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400',
  draft: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  scheduled: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400',
  trashed: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400',
}

interface BlogsTableProps {
  blogs: BlogListItem[]
  onDelete: (id: string) => void
  onPublish: (id: string) => void
  onRestore?: (id: string) => void
  showTrash?: boolean
}

export default function BlogsTable({
  blogs, onDelete, onPublish, onRestore, showTrash = false
}: BlogsTableProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null)

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground text-sm">
        No blogs found
      </div>
    )
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Views</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
            <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, i) => (
            <tr
              key={blog.id}
              className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                i % 2 === 0 ? '' : 'bg-muted/10'
              }`}
            >
              <td className="px-4 py-3 max-w-xs">
                <div className="font-medium truncate">{blog.title}</div>
                <div className="text-xs text-muted-foreground truncate">/blog/{blog.slug}</div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{blog.category?.name}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[blog.status]}`}>
                  {blog.status}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{blog.views.toLocaleString()}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {blog.published_at
                  ? formatDateShort(blog.published_at)
                  : blog.scheduled_at
                  ? `Sched: ${formatDateShort(blog.scheduled_at)}`
                  : formatDateShort(blog.created_at)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  {showTrash && onRestore ? (
                    <button
                      onClick={() => onRestore(blog.id)}
                      className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Restore
                    </button>
                  ) : (
                    <>
                      {blog.status !== 'published' && (
                        <button
                          onClick={() => onPublish(blog.id)}
                          className="text-xs text-green-600 hover:text-green-700 dark:text-green-400"
                        >
                          Publish
                        </button>
                      )}
                      <Link
                        href={`/dashboard/blogs/${blog.id}/edit`}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Edit
                      </Link>
                    </>
                  )}

                  {confirmId === blog.id ? (
                    <>
                      <button
                        onClick={() => { onDelete(blog.id); setConfirmId(null) }}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="text-xs text-muted-foreground"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setConfirmId(blog.id)}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      {showTrash ? 'Delete' : 'Trash'}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
