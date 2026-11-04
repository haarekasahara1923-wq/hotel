import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('rbh_admin_session')
  cookieStore.delete('authjs.session-token')
  cookieStore.delete('next-auth.session-token')
  
  return NextResponse.json({ success: true })
}

