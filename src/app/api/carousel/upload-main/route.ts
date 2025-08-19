import { withAdminAuth } from '@/lib/auth/withAdminAuth';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { getUploadsPath } from '@/utils/uploadPath';
import { ImageCarousel } from '@/lib/models/ImageCarouselModel';

export const POST = withAdminAuth(async (_user, req: NextRequest) => {
  const { uploadToFirebase } = await import('@/lib/firebaseSync');

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const convertToWebp = formData.get('convertToWebp') === 'true';

  if (!file) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    const finalBuffer = convertToWebp
      ? await sharp(buffer).webp({ quality: 90 }).toBuffer()
      : buffer;

    const fileName = convertToWebp ? 'home-default.webp' : 'home-default.' + file.type.split('/')[1];
    const relativePath = `home/${fileName}`;
    const filePath = getUploadsPath(relativePath);
    const publicUrl = `/uploads/${relativePath}`;

    console.log(publicUrl);
    

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, finalBuffer);

    if (process.env.ENABLE_FIREBASE_SYNC === 'true') {
      await uploadToFirebase(filePath, relativePath);
    }

    await ImageCarousel.findOneAndUpdate(
      {},
      {
        $set: {
          heroImageUrl: publicUrl,
          updatedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Home upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
});