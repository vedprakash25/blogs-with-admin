'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Category } from '@/lib/types'

export default function CategoryTabs({ categories }: { categories: Category[] }) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
      <Link
        href="/"
        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
          pathname === '/'
            ? 'bg-orange-500 text-white'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            pathname === `/category/${cat.slug}`
              ? 'bg-orange-500 text-white'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )
}
