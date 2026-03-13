import { createClient } from '@/lib/supabase/server'
import BlogGrid from '@/components/public/BlogGrid'
import CategoryTabs from '@/components/public/CategoryTabs'
import NewsletterBanner from '@/components/public/NewsletterBanner'

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

  const flatBlogs = blogs?.map((b: any) => ({
    ...b,
    tags: b.tags?.map((t: any) => t.tag).filter(Boolean) ?? [],
  })) ?? []

  // Featured blog = first one
  const featured = flatBlogs[0]
  const rest = flatBlogs.slice(1)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* Featured post */}
      {featured && (
        <a href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="relative rounded-3xl overflow-hidden h-[420px] bg-muted">
            {featured.cover_image && (
              <img
                src={featured.cover_image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              {featured.category && (
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  {featured.category.name}
                </span>
              )}
              <h1 className="text-white text-2xl sm:text-3xl font-bold mt-2 leading-snug max-w-2xl">
                {featured.title}
              </h1>
              {featured.excerpt && (
                <p className="text-white/70 text-sm mt-2 max-w-xl line-clamp-2">
                  {featured.excerpt}
                </p>
              )}
            </div>
          </div>
        </a>
      )}

      {/* Category tabs */}
      <div className="mb-8">
        <CategoryTabs categories={categories ?? []} />
      </div>

      {/* Blog grid */}
      <BlogGrid blogs={rest} />

      {/* Newsletter banner */}
      <div className="mt-20">
        <NewsletterBanner />
      </div>
    </div>
  )
}
