'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const res = await fetch(`/api/blogs?search=${encodeURIComponent(query)}&limit=5`)
      const { data } = await res.json()
      setResults(data ?? [])
      setOpen(true)
      setLoading(false)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          🔍
        </span> */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search articles..."
          className="w-full px-2 py-1.5 text-sm border border-border rounded-sm bg-muted/40 focus:bg-background focus:outline-none focus:ring-[1px] focus:ring-blue-300/20 transition placeholder:text-light"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
            ...
          </span>
        )}
      </div>

      {open && (
        <div className="absolute top-full mt-1.5 w-full bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">No results found</p>
          ) : (
            results.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                onClick={() => { setOpen(false); setQuery('') }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0"
              >
                {blog.cover_image && (
                  <img
                    src={blog.cover_image}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{blog.title}</p>
                  <p className="text-xs text-muted-foreground">{blog.category?.name}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
