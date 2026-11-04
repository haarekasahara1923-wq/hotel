import { cookies } from 'next/headers'

export async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('rbh_admin_session')
    return !!session?.value
  } catch {
    return false
  }
}

