'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUploader from '@/components/admin/ImageUploader'
import TagSelector from '@/components/admin/TagSelector'
import SEOFields from '@/components/admin/SEOFields'
import SchedulePublishModal from '@/components/admin/SchedulePublishModal'
import type { Category } from '@/lib/types'

export default function NewBlogPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState<Record<string, any>>({})
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [categoryId, setCategoryId] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('categories').select('*').order('name').then(({ data }) => {
      setCategories(data ?? [])
    })
  }, [])

  async function save(status: 'draft' | 'published' | 'scheduled', scheduledAt?: Date) {
    if (!title.trim()) { setError('Title is required'); return }
    if (!categoryId) { setError('Please select a category'); return }

    setSaving(true)
    setError(null)

    const body: any = {
      title, excerpt, content, cover_image: coverImage,
      category_id: categoryId, tags: selectedTags,
      status, meta_title: metaTitle, meta_description: metaDescription,
    }
    if (scheduledAt) body.scheduled_at = scheduledAt.toISOString()


    console.log("Body", body)
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const { data, error } = await res.json()
    console.log("res", data)
    setSaving(false)

    if (error) { setError(error); return }
    router.push('/dashboard/blogs')
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">New blog post</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Create and publish a new article</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => save('draft')}
            disabled={saving}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            onClick={() => setShowScheduleModal(true)}
            disabled={saving}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition disabled:opacity-50"
          >
            Schedule
          </button>
          <button
            onClick={() => save('published')}
            disabled={saving}
            className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition disabled:opacity-50"
          >
            {saving ? 'Publishing...' : 'Publish now'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 dark:bg-red-950/30 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Main content */}
        <div className="col-span-2 space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title..."
              className="w-full text-3xl font-bold border-0 border-b border-border bg-transparent pb-3 focus:outline-none focus:border-orange-500 placeholder:text-muted-foreground/50 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description shown in blog listings..."
              rows={2}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <SEOFields
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            onMetaTitleChange={setMetaTitle}
            onMetaDescriptionChange={setMetaDescription}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ImageUploader value={coverImage} onChange={setCoverImage} />

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <TagSelector selectedIds={selectedTags} onChange={setSelectedTags} />
        </div>
      </div>

      {showScheduleModal && (
        <SchedulePublishModal
          onConfirm={(date) => { setShowScheduleModal(false); save('scheduled', date) }}
          onCancel={() => setShowScheduleModal(false)}
        />
      )}
    </div>
  )
}
