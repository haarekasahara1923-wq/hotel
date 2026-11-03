import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

// ---------------------------------------------------------------------------
// SDK configuration (runs once at module load)
// ---------------------------------------------------------------------------

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: 'image' | 'video' | 'raw';
  bytes: number;
  duration?: number; // video only
  asset_id: string;
  version: number;
  created_at: string;
  folder: string;
}

export interface OptimizedUrlOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: string;
  crop?: string;
  gravity?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Converts a File (from FormData) or a raw Buffer into a base64 data URI
 * that cloudinary.uploader.upload() can consume.
 */
async function toDataUri(
  file: File | Buffer,
  mimeType?: string
): Promise<string> {
  if (Buffer.isBuffer(file)) {
    const mime = mimeType ?? 'application/octet-stream';
    return `data:${mime};base64,${file.toString('base64')}`;
  }
  // File (Web API)
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
}

// ---------------------------------------------------------------------------
// Upload utilities
// ---------------------------------------------------------------------------

/**
 * Uploads an image to Cloudinary.
 * @param file   - A browser File object or a Node.js Buffer.
 * @param folder - The Cloudinary folder path (e.g. "royal-blue-heaven/rooms").
 * @param options - Additional Cloudinary upload options.
 */
export async function uploadImage(
  file: File | Buffer,
  folder: string,
  options: Record<string, unknown> = {}
): Promise<CloudinaryUploadResult> {
  const dataUri = await toDataUri(file);

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'image',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' },
    ],
    ...options,
  });

  return result as unknown as CloudinaryUploadResult;
}

/**
 * Uploads a video to Cloudinary.
 * @param file   - A browser File object or a Node.js Buffer.
 * @param folder - The Cloudinary folder path.
 */
export async function uploadVideo(
  file: File | Buffer,
  folder: string
): Promise<CloudinaryUploadResult> {
  const dataUri = await toDataUri(file);

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'video',
    transformation: [{ quality: 'auto' }],
  });

  return result as unknown as CloudinaryUploadResult;
}

/**
 * Deletes a media asset from Cloudinary by its public ID.
 * Tries image type first; falls back to video if not found.
 */
export async function deleteMedia(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch {
    // If it wasn't an image, try video
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
  }
}

// ---------------------------------------------------------------------------
// URL generation
// ---------------------------------------------------------------------------

/**
 * Generates an optimized, on-the-fly transformation URL for an existing asset.
 */
export function getOptimizedUrl(
  publicId: string,
  {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  }: OptimizedUrlOptions = {}
): string {
  const transformations: Record<string, unknown> = {
    quality,
    fetch_format: format,
    crop,
    gravity,
  };

  if (width) transformations.width = width;
  if (height) transformations.height = height;

  return cloudinary.url(publicId, {
    secure: true,
    transformation: [transformations],
  });
}

// ---------------------------------------------------------------------------
// Signed upload (client-side uploads)
// ---------------------------------------------------------------------------

/**
 * Generates an HMAC-SHA1 signature for a client-side signed upload request.
 * Call this on the server and return the signature + timestamp to the client.
 *
 * @param params - Parameters to sign (e.g. { folder, timestamp, upload_preset }).
 */
export function generateSignature(params: Record<string, unknown>): string {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    throw new Error('CLOUDINARY_API_SECRET environment variable must be set.');
  }

  // Sort params alphabetically and build query string (exclude api_key, resource_type, file)
  const excludedKeys = new Set(['api_key', 'resource_type', 'file']);
  const sortedString = Object.keys(params)
    .filter((key) => !excludedKeys.has(key))
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto
    .createHash('sha1')
    .update(sortedString + apiSecret)
    .digest('hex');
}
