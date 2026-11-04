import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('[Blog GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, slug, excerpt, content, cover, tags, status, publishedAt } = body

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: excerpt || '',
        content: content || '',
        cover: cover || null,
        tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : [],
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? (publishedAt ? new Date(publishedAt) : new Date()) : null,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('[Blog POST Error]', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}

