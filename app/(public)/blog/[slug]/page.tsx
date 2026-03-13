import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { extractToc } from '@/lib/utils/toc'
import { calculateReadTime, formatReadTime } from '@/lib/utils/readTime'
import { formatDate } from '@/lib/utils/formatDate'
import TableOfContents from '@/components/public/TableOfContents'
import ShareButtons from '@/components/public/ShareButtons'
import TagBadge from '@/components/public/TagBadge'
import LikeButton from '@/components/public/LikeButton'
import CommentSection from '@/components/public/CommentSection'
import BlogGrid from '@/components/public/BlogGrid'
import { createClient as createServerClient } from '@supabase/supabase-js'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data } = await supabase
    .from('blogs')
    .select('slug')
    .eq('status', 'published')

  return data?.map(({ slug }) => ({ slug })) ?? []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const supabase = await createClient()
  const { data: blog } = await supabase
    .from('blogs')
    .select('title, meta_title, meta_description, excerpt, cover_image, slug')
    .eq('slug', slug)
    .single()


  if (!blog) return {}

  const title = blog.meta_title || blog.title
  const description = blog.meta_description || blog.excerpt || ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: blog.cover_image ? [blog.cover_image] : [],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blog.cover_image ? [blog.cover_image] : [],
    },
  }
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params

  const supabase = await createClient()

  const { data: blog } = await supabase
    .from('blogs')
    .select(`
      *,
      category:categories(id, name, slug),
      tags:blog_tags(tag:tags(id, name, slug))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!blog) notFound()

  const flatBlog = {
    ...blog,
    tags: blog.tags?.map((t: any) => t.tag).filter(Boolean) ?? [],
  }

  supabase
    .from('blogs')
    .update({ views: blog.views + 1 })
    .eq('id', blog.id)
    .then(() => { })

  const parsed =
    typeof blog.content === "string"
      ? JSON.parse(blog.content)
      : blog.content

  const tiptapContent = convertBlocksToTiptap(parsed)

  const html = generateHTML(tiptapContent, [
    StarterKit,
    Image,
    Link
  ])

  const toc = extractToc(blog.content)
  const readTime = calculateReadTime(blog.content)

  const { data: relatedRaw } = await supabase
    .from('blogs')
    .select(`
      id, title, slug, excerpt, cover_image, status,
      views, likes, published_at, scheduled_at, trashed_at, created_at, updated_at,
      category:categories(id, name, slug),
      tags:blog_tags(tag:tags(id, name, slug))
    `)
    .eq('status', 'published')
    .eq('category_id', blog.category_id)
    .neq('id', blog.id)
    .limit(3)

  const related = relatedRaw?.map((b: any) => ({
    ...b,
    tags: b.tags?.map((t: any) => t.tag).filter(Boolean) ?? [],
  })) ?? []

  function convertBlocksToTiptap(content: any) {
    if (!content?.blocks) return content

    return {
      type: "doc",
      content: content.blocks.map((block: any) => {
        switch (block.type) {
          case "heading":
            return {
              type: "heading",
              attrs: { level: block.level || 2 },
              content: [{ type: "text", text: block.text || "" }]
            }

          case "paragraph":
            return {
              type: "paragraph",
              content: [{ type: "text", text: block.text || "" }]
            }

          case "image":
            return {
              type: "image",
              attrs: {
                src: block.url,
                alt: block.alt || ""
              }
            }

          case "list":
            return {
              type: "bulletList",
              content: block.items.map((item: string) => ({
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: item }]
                  }
                ]
              }))
            }

          default:
            return null
        }
      }).filter(Boolean)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex gap-12">
        <article className="flex-1 min-w-0">
          {flatBlog.category && (
            <a
              href={`/category/${flatBlog.category.slug}`}
              className="text-xs font-semibold text-orange-500 uppercase tracking-wider hover:text-orange-600"
            >
              {flatBlog.category.name}
            </a>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mt-3 mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
            {blog.published_at && <span>{formatDate(blog.published_at)}</span>}
            <span>·</span>
            <span>{formatReadTime(readTime)}</span>
            <span>·</span>
            <span>{blog.views.toLocaleString()} views</span>
          </div>

          {blog.cover_image && (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full rounded-2xl mb-8 object-cover max-h-[480px]"
            />
          )}

          <div
            className="tiptap-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {flatBlog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
              {flatBlog.tags.map((tag: any) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
            <ShareButtons title={blog.title} slug={blog.slug} />
            <LikeButton blogId={blog.id} initialLikes={blog.likes} />
          </div>

          <div className="mt-12">
            <CommentSection blogId={blog.id} />
          </div>
        </article>

        {toc.length > 0 && (
          <aside className="hidden lg:block w-56 shrink-0">
            <TableOfContents items={toc} />
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-semibold mb-6">Related posts</h2>
          <BlogGrid blogs={related} />
        </section>
      )}
    </div>
  )
}
