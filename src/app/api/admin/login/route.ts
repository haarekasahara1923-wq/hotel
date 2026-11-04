import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = body.email?.trim()
    const password = body.password?.trim()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    let isValid = false

    // 1. Direct Master Super Admin validation
    if (email === 'admin@royalblueheaven.com' && password === 'Admin@RBH2024!') {
      isValid = true
    } else {
      // 2. Database validation fallback
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        })
        if (user && user.passwordHash) {
          isValid = await bcrypt.compare(password, user.passwordHash)
        }
      } catch (dbErr) {
        console.error('DB query error:', dbErr)
      }
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true, redirect: '/admin' })

    const cookieOptions = {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax' as const,
      httpOnly: false,
    }

    response.cookies.set('rbh_admin_session', 'authenticated_super_admin', cookieOptions)
    response.cookies.set('authjs.session-token', 'authenticated_super_admin', cookieOptions)
    response.cookies.set('next-auth.session-token', 'authenticated_super_admin', cookieOptions)

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}

