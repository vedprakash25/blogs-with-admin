'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tag } from '@/lib/types'

interface TagSelectorProps {
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export default function TagSelector({ selectedIds, onChange }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newTagName, setNewTagName] = useState('')

  useEffect(() => {
    fetchTags()
  }, [])

  async function fetchTags() {
    const supabase = createClient()
    const { data } = await supabase.from('tags').select('*').order('name')
    setTags(data ?? [])
    setLoading(false)
  }

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((s) => s !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  async function createTag() {
    if (!newTagName.trim()) return
    setCreating(true)

    const supabase = createClient()
    const slug = newTagName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

    const { data, error } = await supabase
      .from('tags')
      .insert({ name: newTagName.trim(), slug })
      .select()
      .single()

    setCreating(false)
    setNewTagName('')

    if (!error && data) {
      setTags((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)))
      onChange([...selectedIds, data.id])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Tags</label>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading tags...</p>
      ) : (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => {
            const selected = selectedIds.includes(tag.id)
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggle(tag.id)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  selected
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'border-border text-muted-foreground hover:border-orange-400 hover:text-foreground'
                }`}
              >
                {tag.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Create new tag */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), createTag())}
          placeholder="New tag name..."
          className="flex-1 px-3 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="button"
          onClick={createTag}
          disabled={creating || !newTagName.trim()}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg border border-border disabled:opacity-50 transition"
        >
          {creating ? '...' : '+ Add'}
        </button>
      </div>
    </div>
  )
}
