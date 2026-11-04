import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  try {
    const items = await prisma.galleryItem.findMany({
      where: category && category !== 'ALL' ? { category } : undefined,
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('[Gallery GET Error]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { category = 'rooms', url, type = 'image', caption = '', order = 0 } = body

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Auto-detect type if not explicitly set
    let detectedType = type
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      detectedType = 'youtube'
    } else if (url.includes('instagram.com')) {
      detectedType = 'instagram'
    } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
      detectedType = 'facebook'
    } else if (url.match(/\.(mp4|webm|ogg|mov)$/i)) {
      detectedType = 'video'
    }

    const item = await prisma.galleryItem.create({
      data: {
        category,
        url,
        type: detectedType,
        caption,
        order: Number(order) || 0,
        isActive: true,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('[Gallery POST Error]', error)
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 })
  }
}

