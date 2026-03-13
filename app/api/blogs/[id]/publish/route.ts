import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createAdminClient()

  const { data: blog, error } = await supabase
    .from('blogs')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
      scheduled_at: null,
    })
    .eq('id', params.id)
    .select('slug')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  revalidatePath('/')
  revalidatePath(`/blog/${blog.slug}`)

  return NextResponse.json({ data: { success: true } })
}
