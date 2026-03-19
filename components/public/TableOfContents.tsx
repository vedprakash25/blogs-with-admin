'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from '@/lib/types'

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="sticky xl:top-24 top-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        On this page
      </p>
      <ul className="space-y-1 border border-border py-2 px-2">
        {items.map((item, index) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
            <a
              href={`#${item.id}`}
              className={`block text-xs py-1 ${index === 0 ? "pl-3" : "pl-4 border-l-1"}  transition-colors ${activeId === item.id
                ? 'border-orange-500 text-orange-500 font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}