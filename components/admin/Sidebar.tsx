'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: '◈' },
  { label: 'Blogs', href: '/dashboard/blogs', icon: '✦' },
  { label: 'Trash', href: '/dashboard/trash', icon: '⊘' },
  { label: 'Tags', href: '/dashboard/tags', icon: '◇' },
  { label: 'Comments', href: '/dashboard/comments', icon: '◉' },
  { label: 'Subscribers', href: '/dashboard/subscribers', icon: '◎' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="w-60 shrink-0 min-h-screen border-r border-border flex flex-col bg-card">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Ink<span className="text-orange-500">well</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-0.5">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-border pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <span>↗</span> View site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
        >
          <span>→</span> Sign out
        </button>
      </div>
    </aside>
  )
}
