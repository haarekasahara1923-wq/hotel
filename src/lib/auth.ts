import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendOtpEmail } from '@/lib/resend'

export const ADMIN_ROLES = [
  'SUPER_ADMIN',
  'MANAGER',
  'RECEPTIONIST',
  'ACCOUNTANT',
  'EDITOR',
] as const

export type AdminRole = (typeof ADMIN_ROLES)[number]

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/admin/login',
  },

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Staff Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required.')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.passwordHash) {
          throw new Error('Invalid email or password.')
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        )

        if (!isValid) {
          throw new Error('Invalid email or password.')
        }

        const role = user.role
        if (!ADMIN_ROLES.includes(role as AdminRole)) {
          throw new Error('Access denied. Insufficient permissions.')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role,
        }
      },
    }),

    EmailProvider({
      server: '',
      from: process.env.EMAIL_FROM ?? 'noreply@royalblueheaven.com',
      async sendVerificationRequest({ identifier, url }: { identifier: string; url: string }) {
        const email = identifier
        const otp = crypto.randomInt(100000, 999999).toString()
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

        await prisma.otpToken.deleteMany({
          where: { email },
        })

        await prisma.otpToken.create({
          data: {
            email,
            otp,
            expiresAt,
          },
        })

        await sendOtpEmail(email, otp)
        void url
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role ?? 'GUEST'
      }

      if (trigger === 'update' && session?.role) {
        token.role = session.role
      }

      return token
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  events: {
    async signIn({ user }: any) {
      if (user?.email) {
        await prisma.otpToken.deleteMany({
          where: { email: user.email },
        })
      }
    },
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
})
