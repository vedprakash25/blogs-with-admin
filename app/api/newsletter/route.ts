import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const supabase = createAdminClient()

  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Upsert — re-subscribe if previously unsubscribed
    const { error } = await supabase
      .from('subscribers')
      .upsert({ email: email.toLowerCase().trim(), is_active: true }, { onConflict: 'email' })

    if (error) throw error

    return NextResponse.json({ data: { success: true } }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = createAdminClient()
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

  const { error } = await supabase
    .from('subscribers')
    .update({ is_active: false })
    .eq('email', email.toLowerCase())

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data: { success: true } })
}
