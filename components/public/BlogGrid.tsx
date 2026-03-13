import BlogCard from './BlogCard'
import type { BlogListItem } from '@/lib/types'

interface BlogGridProps {
  blogs: BlogListItem[]
  emptyMessage?: string
}

export default function BlogGrid({ blogs, emptyMessage = 'No posts yet.' }: BlogGridProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-4xl mb-3">✦</p>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
