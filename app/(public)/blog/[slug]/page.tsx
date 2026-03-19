import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { extractToc } from '@/lib/utils/toc'
import TipTapRenderer from '@/components/public/TipTapRenderer'
import TableOfContents from '@/components/public/TableOfContents'
import { Metadata } from 'next'

const createSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

const getBlog = async (slug: string) => {
  const supabase = createSupabase()
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      id, title, slug, excerpt, content, cover_image,
      published_at, views, likes,
      category:categories(id, name, slug),
      tags:blog_tags(tag:tags(id, name, slug))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) return null
  return data
}

// ── Static params ────────────────────────────────────────
export async function generateStaticParams() {
  const supabase = createSupabase()
  const { data } = await supabase
    .from('blogs')
    .select('slug')
    .eq('status', 'published')
  return data?.map(({ slug }) => ({ slug })) ?? []
}

// ── Dynamic metadata ─────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist or has been removed.',
    }
  }

  const ogImage = blog.cover_image ?? '/og-image.png'
  const postUrl = `https://thelense.vercel.app/blog/${blog.slug}` // 🔁 replace with your domain

  // Strip HTML tags for plain text description
  const plainText = blog.excerpt
    ?? blog.content.replace(/<[^>]+>/g, '').slice(0, 155) + '...'

  return {
    title: blog.title,
    description: plainText,

    openGraph: {
      type: 'article',
      url: postUrl,
      title: blog.title,
      description: plainText,
      siteName: 'The Lense',
      publishedTime: blog.published_at,
      images: [{ url: ogImage, width: 1200, height: 630, alt: blog.title }],
    },

    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: plainText,
      images: [ogImage],
    },

    alternates: {
      canonical: postUrl,
    },
  }
}

// ── Page ─────────────────────────────────────────────────
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) notFound()

  const supabase = createSupabase()
  supabase.rpc('increment_views', { blog_id: blog.id }).then(() => { })

  const toc = extractToc(blog.content)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex gap-12">
        <article className="flex-1 min-w-0">
          {blog.cover_image && (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full rounded-2xl object-top object-cover max-h-112 mb-8"
            />
          )}
          <h1 className="text-4xl font-zen font-bold leading-tight mb-4">
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-orange-500 pl-4">
              {blog.excerpt}
            </p>
          )}
          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground mb-4">
            {blog.published_at && (
              <span>
                {new Date(blog.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            <span>· {blog.views ?? 0} views</span>
          </div>

          <TipTapRenderer content={blog.content} />

          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
              {blog.tags.map((t: any) => (
                <span
                  key={t.tag?.id}
                  className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                >
                  #{t.tag?.name}
                </span>
              ))}
            </div>
          )}
        </article>

        {toc.length > 0 && (
          <aside className="hidden lg:block w-64 shrink-0">
            <TableOfContents items={toc} />
          </aside>
        )}
      </div>
    </div>
  )
}