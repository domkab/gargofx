import { withAdminAuth } from '@/lib/auth/withAdminAuth';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { getUploadsPath } from '@/utils/uploadPath';

export const POST = withAdminAuth(async (_user, req: NextRequest) => {
  const { uploadToFirebase } = await import('@/lib/firebaseSync');

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const slug = formData.get('slug') as string;
  const target = formData.get('target') as 'main' | 'inline' | 'featured';

  if (!file || !slug || !target) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    // Convert to WebP (no resize)
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 90 }) // 85–95 range is good for high quality
      .toBuffer();

    // File paths
    const fileName = `${target}-${Date.now()}-${uuidv4()}.webp`;
    const relativePath =
      target === 'featured'
        ? `featured-posts/${fileName}`
        : `posts/${slug}/${fileName}`;

    const filePath = getUploadsPath(relativePath);
    const publicUrl = `/uploads/${relativePath}`;

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    fs.writeFileSync(filePath, webpBuffer);

    if (process.env.ENABLE_FIREBASE_SYNC === 'true') {
      await uploadToFirebase(filePath, relativePath);
    }

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
});