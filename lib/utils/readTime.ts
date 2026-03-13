// Extracts plain text from Tiptap JSON and estimates read time
function extractText(node: any): string {
  if (node.type === 'text') return node.text || ''
  if (node.content) return node.content.map(extractText).join(' ')
  return ''
}

export function calculateReadTime(content: Record<string, any>): number {
  const text = extractText(content)
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const wordsPerMinute = 200
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`
}
