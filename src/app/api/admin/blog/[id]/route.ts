import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.blogPost.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Blog DELETE Error]', error)
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const { title, slug, excerpt, content, cover, tags, status, publishedAt } = body

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(cover !== undefined && { cover }),
        ...(tags !== undefined && {
          tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : [],
        }),
        ...(status && { status }),
        ...(publishedAt !== undefined && {
          publishedAt: publishedAt ? new Date(publishedAt) : null,
        }),
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('[Blog PUT Error]', error)
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

