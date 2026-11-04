import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug') || 'home'

  try {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: { orderBy: { order: 'asc' } },
      },
    })
    return NextResponse.json(page || { slug, title: slug, sections: [] })
  } catch (error) {
    console.error('[CMS GET Error]', error)
    return NextResponse.json({ slug, title: slug, sections: [] })
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { slug, title, sections = [] } = body

    const page = await prisma.page.upsert({
      where: { slug },
      update: { title },
      create: { slug, title: title || slug },
    })

    // Update sections
    await prisma.pageSection.deleteMany({ where: { pageId: page.id } })

    for (let i = 0; i < sections.length; i++) {
      const s = sections[i]
      await prisma.pageSection.create({
        data: {
          pageId: page.id,
          type: s.type || 'rich-text',
          order: i,
          visible: s.visible !== false,
          content: s.content || {},
        },
      })
    }

    return NextResponse.json({ success: true, pageId: page.id })
  } catch (error) {
    console.error('[CMS POST Error]', error)
    return NextResponse.json({ error: 'Failed to save page CMS' }, { status: 500 })
  }
}

