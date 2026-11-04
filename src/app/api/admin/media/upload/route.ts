import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/adminAuth'
import { v2 as cloudinary } from 'cloudinary'

if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

export async function POST(req: NextRequest) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contentType = req.headers.get('content-type') || ''
    
    // Support JSON body (URL-based upload or link saving)
    if (contentType.includes('application/json')) {
      const { url, alt, type = 'image', folder = 'general' } = await req.json()
      if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })
      
      const publicId = `rbh_${Date.now()}_${Math.random().toString(36).substring(7)}`
      const media = await prisma.media.create({
        data: {
          url,
          publicId,
          alt: alt || 'Royal Blue Heaven Media',
          type,
          folder,
        },
      })
      return NextResponse.json(media)
    }

    // Support FormData upload
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const alt = (formData.get('alt') as string) || ''
    const folder = (formData.get('folder') as string) || 'rbh-uploads'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json({
        error: 'Cloudinary environment variables not configured. You can add image/video URLs directly or configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your Vercel settings.',
        configured: false,
      }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `royal-blue-heaven/${folder}`,
          resource_type: file.type.startsWith('video') ? 'video' : 'image',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(buffer)
    })

    const media = await prisma.media.create({
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        type: file.type.startsWith('video') ? 'video' : 'image',
        alt: alt || file.name,
        folder,
        width: uploadResult.width,
        height: uploadResult.height,
        bytes: uploadResult.bytes,
        format: uploadResult.format,
      },
    })

    return NextResponse.json(media)
  } catch (error: any) {
    console.error('[Media Upload Error]', error)
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
  }
}

