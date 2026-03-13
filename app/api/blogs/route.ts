import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils/slugify'

export async function GET(request: NextRequest) {
  const supabase = createAdminClient()
  const { searchParams } = new URL(request.url)

  const status = searchParams.get('status') // published | draft | scheduled | trashed | all
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const offset = (page - 1) * limit

  let query = supabase
    .from('blogs')
    .select(`
      id, title, slug, excerpt, cover_image, status,
      views, likes, published_at, scheduled_at, trashed_at, created_at, updated_at,
      category:categories(id, name, slug),
      tags:blog_tags(tag:tags(id, name, slug))
    `, { count: 'exact' })

  // Status filter
  if (status && status !== 'all') {
    query = query.eq('status', status)
  } else if (!status) {
    // Public API — only published
    query = query.eq('status', 'published')
  }

  // Category filter
  if (category) {
    query = query.eq('categories.slug', category)
  }

  // Title search
  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  // Pagination + ordering
  query = query
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Flatten tags
  const blogs = data?.map((b: any) => ({
    ...b,
    tags: b.tags?.map((t: any) => t.tag).filter(Boolean) ?? [],
  }))

  return NextResponse.json({ data: blogs, total: count, page, limit })
}

export async function POST(request: NextRequest) {
  const supabase = createAdminClient()

  try {
    const body = await request.json()
    const {
      title, excerpt, content, cover_image, category_id,
      status, scheduled_at, meta_title, meta_description, tags,
    } = body

    const slug = slugify(title)

    // Check slug uniqueness
    const { data: existing } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single()

    const finalSlug = existing ? `${slug}-${Date.now()}` : slug

    const blogData: any = {
      title,
      slug: finalSlug,
      excerpt,
      content,
      cover_image,
      category_id,
      status,
      meta_title,
      meta_description,
    }

    if (status === 'scheduled' && scheduled_at) {
      blogData.scheduled_at = scheduled_at
    }
    if (status === 'published') {
      blogData.published_at = new Date().toISOString()
    }

    const { data: blog, error } = await supabase
      .from('blogs')
      .insert(blogData)
      .select()
      .single()

    if (error) throw error

    // Insert tags
    if (tags && tags.length > 0) {
      const tagRows = tags.map((tag_id: string) => ({ blog_id: blog.id, tag_id }))
      await supabase.from('blog_tags').insert(tagRows)
    }

    // Revalidate public pages
    revalidatePath('/')
    revalidatePath('/blog')

    return NextResponse.json({ data: blog }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
