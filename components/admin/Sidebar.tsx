'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FileEdit, HomeIcon, LayoutDashboard, List, LogOut, Menu, Tags, Trash, Users } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard className='w-3.5' /> },
  { label: 'Blogs', href: '/dashboard/blogs', icon: <List className='w-3.5' /> },
  { label: 'Trash', href: '/dashboard/trash', icon: <Trash className='w-3.5' /> },
  { label: 'Tags', href: '/dashboard/tags', icon: <Tags className='w-3.5' /> },
  { label: 'Comments', href: '/dashboard/comments', icon: <FileEdit className='w-3.5' /> },
  { label: 'Subscribers', href: '/dashboard/subscribers', icon: <Users className='w-3.5' /> },
]

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  function toggleMenu() {
    openMenu ? setOpenMenu(false) : setOpenMenu(true)
  }

  return (
    <aside className={`${openMenu ? "w-60" : "w-16"} transition-all border shrink-0 min-h-screen border-r border-border flex flex-col bg-card`}>
      {/* Logo */}
      <div className="p-4 flex justify-between border-b border-border">
        <div className={`${openMenu ? "w-full" : "w-0"} transition-all overflow-hidden`}>
          <Link href="/" className="text-xl font-zen tracking-tight text-nowrap">
            The Lense
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">Admin</p>
        </div>
        <button onClick={toggleMenu} className='h-fit cursor-pointer'><Menu /></button>
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
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors 
                ${openMenu ? "w-52" : "w-9"}
                ${isActive
                  ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                } overflow-hidden`}
            >
              <span className="text-base ">{item.icon}</span>
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
          className={`${openMenu ? "w-52" : "w-9"} overflow-hidden text-nowrap flex items-center gap-4 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors`}
        >
          <span><HomeIcon className='w-3.5' /></span> View site
        </Link>
        <button
          onClick={handleLogout}
          className={`${openMenu ? "w-52" : "w-9"} overflow-hidden w-full flex items-center gap-4 px-3 py-2 rounded-lg text-nowrap text-sm text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors`}
        >
          <span><LogOut className='w-3.5' /></span> Sign out
        </button>
      </div>
    </aside>
  )
}
