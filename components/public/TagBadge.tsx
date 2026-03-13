import Link from 'next/link'
import type { Tag } from '@/lib/types'

export default function TagBadge({ tag }: { tag: Tag }) {
  return (
    <Link
      href={`/tag/${tag.slug}`}
      className="inline-block px-2.5 py-0.5 text-xs rounded-full border border-border text-muted-foreground hover:border-orange-400 hover:text-orange-500 transition-colors"
    >
      #{tag.name}
    </Link>
  )
}
