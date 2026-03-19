import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BlogGrid from '@/components/public/BlogGrid'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const supabase = await createClient()

  const { data: tag } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!tag) notFound()

  const { data: blogTagsRaw } = await supabase
    .from('blog_tags')
    .select(`
      blog:blogs(
        id, title, slug, excerpt, cover_image, status,
        views, likes, published_at, scheduled_at, trashed_at, created_at, updated_at,
        category:categories(id, name, slug),
        tags:blog_tags(tag:tags(id, name, slug))
      )
    `)
    .eq('tag_id', tag.id)

  const blogs = blogTagsRaw
    ?.map((bt: any) => bt.blog)
    .filter((b: any) => b?.status === 'published')
    .map((b: any) => ({
      ...b,
      tags: b.tags?.map((t: any) => t.tag).filter(Boolean) ?? [],
    })) ?? []

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-1">Tag</p>
        <h1 className="text-2xl font-bold">#{tag.name}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {blogs.length} article{blogs.length !== 1 ? 's' : ''}
        </p>
      </div>

      <BlogGrid blogs={blogs} emptyMessage={`No posts tagged with #${tag.name} yet.`} />
    </div>
  )
}
