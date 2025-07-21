import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const uploadsDir = path.join(process.cwd(), 'public/uploads');
  const postsDir = path.join(uploadsDir, 'posts');

  const postImages: string[] = [];

  try {
    const filesInUploads = fs.readdirSync(uploadsDir);
    const defaultHomeImage = filesInUploads.find((file) =>
      file.includes('home-default')
    );

    const firstImage = defaultHomeImage
      ? `/uploads/${defaultHomeImage}`
      : '';

    const postSlugs = fs.readdirSync(postsDir);
    for (const slug of postSlugs) {
      const slugDir = path.join(postsDir, slug);
      const files = fs.readdirSync(slugDir);

      files.forEach((filename) => {
        if (filename.startsWith('main-')) {
          postImages.push(`/uploads/posts/${slug}/${filename}`);
        }
      });
    }

    return NextResponse.json({ firstImage, postImages });
  } catch (error) {
    console.error('❌ Failed to read images:', error);
    return NextResponse.json({ message: 'Failed to read carousel images.' }, { status: 500 });
  }
}