import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BlogGrid from '@/components/public/BlogGrid'
import CategoryTabs from '@/components/public/CategoryTabs'
import { Banner } from '../../banner'
import NewsletterBanner from '@/components/public/NewsletterBanner'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const supabase = await createClient()


  const [{ data: category }, { data: categories }] = await Promise.all([
    supabase.from('categories').select('*').eq('slug', slug).single(),
    supabase.from('categories').select('*').order('name'),
  ])

  if (!category) notFound()

  const { data: blogsRaw } = await supabase
    .from('blogs')
    .select(`
      id, title, slug, excerpt, cover_image, status,
      views, likes, published_at, scheduled_at, trashed_at, created_at, updated_at,
      category:categories(id, name, slug),
      tags:blog_tags(tag:tags(id, name, slug))
    `)
    .eq('status', 'published')
    .eq('category_id', category.id)
    .order('published_at', { ascending: false })

  const blogs = blogsRaw?.map((b: any) => ({
    ...b,
    tags: b.tags?.map((t: any) => t.tag).filter(Boolean) ?? [],
  })) ?? []

  return (
    <section>
      <Banner />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 xl:py-20 py-10">
        <div className="mb-8">
          <CategoryTabs categories={categories ?? []} />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {blogs.length} article{blogs.length !== 1 ? 's' : ''}
          </p>
        </div>

        <BlogGrid blogs={blogs} emptyMessage={`No posts in ${category.name} yet.`} />
      </section>
      <div >
        <NewsletterBanner />
      </div>
    </section>
  )
}
