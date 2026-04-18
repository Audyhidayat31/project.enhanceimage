import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const scaleParam = formData.get('scale') as string;
    const scale = parseInt(scaleParam || '4', 10);

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipe file tidak didukung. Gunakan JPG, PNG, atau WebP.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file terlalu besar. Maksimal 10MB.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Get original metadata
    const metadata = await sharp(inputBuffer).metadata();
    const originalWidth = metadata.width || 0;
    const originalHeight = metadata.height || 0;

    // Validate dimensions — cap max output at 4096x4096 to avoid OOM
    const newWidth = originalWidth * scale;
    const newHeight = originalHeight * scale;
    const clampedWidth = Math.min(newWidth, 4096);
    const clampedHeight = Math.min(newHeight, 4096);

    // Upscale using Sharp with Lanczos3 (high-quality bicubic interpolation)
    const upscaledBuffer = await sharp(inputBuffer)
      .resize(clampedWidth, clampedHeight, {
        kernel: sharp.kernel.lanczos3,
        fit: 'fill',
        withoutEnlargement: false,
      })
      // Sharpen slightly to compensate for upscaling softness
      .sharpen({ sigma: 0.8, m1: 1.5, m2: 2 })
      // Enhance contrast slightly
      .modulate({ brightness: 1.02, saturation: 1.05 })
      .png({ quality: 100, compressionLevel: 6 })
      .toBuffer();

    const base64 = upscaledBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;
    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      upscaledUrl: dataUrl,
      processingTime,
      scale,
      originalSize: `${originalWidth}x${originalHeight}`,
      upscaledSize: `${clampedWidth}x${clampedHeight}`,
    });
  } catch (error) {
    console.error('Upscaling error:', error);
    const message =
      error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses gambar';
    return NextResponse.json(
      { error: `Gagal memproses gambar: ${message}` },
      { status: 500 }
    );
  }
}

// Simple GET health check
export async function GET() {
  return NextResponse.json({ status: 'ok', engine: 'sharp-lanczos3' });
}
