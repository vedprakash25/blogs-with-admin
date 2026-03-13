import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 30)

  const { data, error } = await supabase
    .from('blogs')
    .delete()
    .eq('status', 'trashed')
    .lte('trashed_at', cutoff.toISOString())
    .select('id')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: { purged: data?.length ?? 0 } })
}
