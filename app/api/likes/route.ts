import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const supabase = createAdminClient()

  try {
    const { blog_id, fingerprint } = await request.json()

    if (!blog_id || !fingerprint) {
      return NextResponse.json({ error: 'blog_id and fingerprint required' }, { status: 400 })
    }

    // Check if already liked
    const { data: existing } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('blog_id', blog_id)
      .eq('fingerprint', fingerprint)
      .single()

    if (existing) {
      // Unlike: remove record, decrement count
      await supabase.from('blog_likes').delete().eq('id', existing.id)
      const { data: blog } = await supabase
        .from('blogs')
        .update({ likes: supabase.rpc('decrement', { x: 1 }) as any })
        .eq('id', blog_id)
        .select('likes')
        .single()

      // Use raw SQL approach instead
      await supabase.rpc('decrement_likes', { blog_id })
      const { data: updated } = await supabase.from('blogs').select('likes').eq('id', blog_id).single()

      return NextResponse.json({ data: { liked: false, likes: updated?.likes ?? 0 } })
    } else {
      // Like: insert record, increment count
      await supabase.from('blog_likes').insert({ blog_id, fingerprint })
      await supabase.rpc('increment_likes', { blog_id })
      const { data: updated } = await supabase.from('blogs').select('likes').eq('id', blog_id).single()

      return NextResponse.json({ data: { liked: true, likes: updated?.likes ?? 0 } })
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const supabase = createAdminClient()
  const { searchParams } = new URL(request.url)
  const blog_id = searchParams.get('blog_id')
  const fingerprint = searchParams.get('fingerprint')

  if (!blog_id || !fingerprint) {
    return NextResponse.json({ error: 'blog_id and fingerprint required' }, { status: 400 })
  }

  const { data } = await supabase
    .from('blog_likes')
    .select('id')
    .eq('blog_id', blog_id)
    .eq('fingerprint', fingerprint)
    .single()

  return NextResponse.json({ data: { liked: !!data } })
}
