import type { TocItem } from '../types'

export function extractToc(content: Record<string, any>): TocItem[] {
  const items: TocItem[] = []

  function walk(node: any) {
    if (node.type === 'heading' && node.attrs?.level) {
      const text = node.content?.map((n: any) => n.text || '').join('') || ''
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      items.push({ id, text, level: node.attrs.level })
    }
    if (node.content) node.content.forEach(walk)
  }

  if (content?.content) content.content.forEach(walk)
  return items
}
