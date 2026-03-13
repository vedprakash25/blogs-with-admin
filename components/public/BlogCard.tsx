import Link from 'next/link'
import { formatDateShort } from '@/lib/utils/formatDate'
import { calculateReadTime, formatReadTime } from '@/lib/utils/readTime'
import TagBadge from './TagBadge'
import type { BlogListItem } from '@/lib/types'

export default function BlogCard({ blog }: { blog: BlogListItem }) {
  return (
    <article className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
      {/* Cover image */}
      {blog.cover_image && (
        <Link href={`/blog/${blog.slug}`}>
          <div className="overflow-hidden h-48">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="p-5">
        {/* Category */}
        {blog.category && (
          <Link
            href={`/category/${blog.category.slug}`}
            className="text-xs font-semibold text-orange-500 uppercase tracking-wider hover:text-orange-600 transition-colors"
          >
            {blog.category.name}
          </Link>
        )}

        {/* Title */}
        <Link href={`/blog/${blog.slug}`}>
          <h2 className="mt-2 text-lg font-semibold leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
            {blog.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {blog.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {blog.published_at && (
              <span>{formatDateShort(blog.published_at)}</span>
            )}
            <span>·</span>
            <span>{blog.views.toLocaleString()} views</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatReadTime(calculateReadTime(blog as any))}
          </span>
        </div>
      </div>
    </article>
  )
}
