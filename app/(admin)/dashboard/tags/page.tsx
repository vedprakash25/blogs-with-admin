'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slugify'
import type { Tag } from '@/lib/types'

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function fetchTags() {
    const supabase = createClient()
    const { data } = await supabase.from('tags').select('*').order('name')
    setTags(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchTags() }, [])

  async function handleCreate() {
    if (!newName.trim()) return
    setCreating(true)
    const supabase = createClient()
    await supabase.from('tags').insert({ name: newName.trim(), slug: slugify(newName) })
    setNewName('')
    setCreating(false)
    fetchTags()
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('tags').delete().eq('id', id)
    setDeleteId(null)
    fetchTags()
  }

  return (
    <div className="px-6 py-8 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Tags</h1>

      {/* Create */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          placeholder="Tag name..."
          className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleCreate}
          disabled={creating || !newName.trim()}
          className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition disabled:opacity-50"
        >
          {creating ? '...' : '+ Create tag'}
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          {tags.length === 0 ? (
            <p className="text-center py-10 text-muted-foreground text-sm">No tags yet</p>
          ) : (
            tags.map((tag, i) => (
              <div
                key={tag.id}
                className={`flex items-center justify-between px-4 py-3 ${
                  i < tags.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div>
                  <span className="font-medium text-sm">{tag.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">/{tag.slug}</span>
                </div>

                {deleteId === tag.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="text-xs text-red-600 font-medium"
                    >
                      Confirm delete
                    </button>
                    <button onClick={() => setDeleteId(null)} className="text-xs text-muted-foreground">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteId(tag.id)}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
