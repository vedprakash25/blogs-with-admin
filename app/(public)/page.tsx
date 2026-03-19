
import { createClient } from '@/lib/supabase/server'
import BlogGrid from '@/components/public/BlogGrid'
import CategoryTabs from '@/components/public/CategoryTabs'
import NewsletterBanner from '@/components/public/NewsletterBanner'
import { Banner } from './banner'

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: blogs }, { data: categories }] = await Promise.all([
    supabase
      .from('blogs')
      .select(`
        id, title, slug, excerpt, cover_image, status,
        views, likes, published_at, scheduled_at, trashed_at, created_at, updated_at,
        category:categories(id, name, slug),
        tags:blog_tags(tag:tags(id, name, slug))
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(12),
    supabase.from('categories').select('*').order('name'),
  ])

  console.log("blogs", blogs)

  const flatBlogs = blogs?.map((b: any) => ({
    ...b,
    tags: b.tags?.map((t: any) => t.tag).filter(Boolean) ?? [],
  })) ?? []

  const rest = flatBlogs.slice(1)


  return (
    <div >
      <Banner />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 xl:py-20 py-10">
        <div className="mb-8">
          <CategoryTabs categories={categories ?? []} />
        </div>
        <BlogGrid blogs={rest} />
      </section>
      <div >
        <NewsletterBanner />
      </div>
    </div>
  )
}
