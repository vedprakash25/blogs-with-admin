import { createClient } from '@/lib/supabase/server'
import StatsCard from '@/components/admin/StatsCard'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [
    { count: totalBlogs },
    { count: published },
    { count: drafts },
    { count: scheduled },
    { count: comments },
    { count: subscribers },
    { data: topBlogs },
  ] = await Promise.all([
    supabase.from('blogs').select('*', { count: 'exact', head: true }).neq('status', 'trashed'),
    supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'scheduled'),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('blogs')
      .select('id, title, slug, views, likes')
      .eq('status', 'published')
      .order('views', { ascending: false })
      .limit(5),
  ])

  const totalViews = topBlogs?.reduce((sum, b) => sum + (b.views || 0), 0) ?? 0

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Welcome back to your dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total blogs" value={totalBlogs ?? 0} icon="✦" />
        <StatsCard label="Published" value={published ?? 0} icon="◉" />
        <StatsCard label="Drafts" value={drafts ?? 0} icon="◈" />
        <StatsCard label="Scheduled" value={scheduled ?? 0} icon="◷" />
        <StatsCard label="Total views" value={(totalViews).toLocaleString()} icon="👁" />
        <StatsCard label="Comments" value={comments ?? 0} icon="💬" />
        <StatsCard label="Subscribers" value={subscribers ?? 0} icon="◎" />
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <Link
          href="/dashboard/blogs/new"
          className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
        >
          + Write new post
        </Link>
        <Link
          href="/dashboard/blogs"
          className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition"
        >
          Manage blogs
        </Link>
      </div>

      {/* Top blogs */}
      {topBlogs && topBlogs.length > 0 && (
        <div>
          <h2 className="text-base font-semibold mb-4">Top performing posts</h2>
          <div className="border border-border rounded-xl overflow-hidden">
            {topBlogs.map((blog, i) => (
              <div
                key={blog.id}
                className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-muted-foreground text-sm w-5 shrink-0">{i + 1}</span>
                  <span className="truncate text-sm font-medium">{blog.title}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="text-xs text-muted-foreground">{blog.views.toLocaleString()} views</span>
                  <span className="text-xs text-muted-foreground">{blog.likes} likes</span>
                  <Link
                    href={`/dashboard/blogs/${blog.id}/edit`}
                    className="text-xs text-orange-500 hover:text-orange-600"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
