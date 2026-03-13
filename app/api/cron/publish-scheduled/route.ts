import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  // Protect cron route
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const { data: blogs, error } = await supabase
    .from('blogs')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
      scheduled_at: null,
    })
    .eq('status', 'scheduled')
    .lte('scheduled_at', new Date().toISOString())
    .select('slug')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Revalidate all affected pages
  if (blogs && blogs.length > 0) {
    revalidatePath('/')
    blogs.forEach((b) => revalidatePath(`/blog/${b.slug}`))
  }

  return NextResponse.json({
    data: { published: blogs?.length ?? 0 }
  })
}
