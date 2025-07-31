import { withAdminAuth } from '@/lib/auth/withAdminAuth';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { uploadToFirebase } from '@/lib/firebaseSync';
import { getUploadsPath } from '@/utils/uploadPath';

export const POST = withAdminAuth(async (_user, req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (!file.name.endsWith('.svg')) {
      return NextResponse.json(
        { error: 'Only SVG files are allowed' }, { status: 400 }
      );
    }

    const originalName = path.parse(file.name).name;
    const safeName = originalName.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
    const uniqueId = uuidv4();

    // Generate filename
    const fileName = `${safeName}-${uniqueId}.svg`;
    const relativePath = `logo-slider/${fileName}`;
    const filePath = getUploadsPath(relativePath);
    const publicUrl = `/uploads/${relativePath}`;

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Save file locally
    fs.writeFileSync(filePath, buffer);

    // Upload to Firebase if enabled
    if (process.env.ENABLE_FIREBASE_SYNC === 'true') {
      await uploadToFirebase(filePath, relativePath);
    }

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Logo upload failed:', error);

    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
});