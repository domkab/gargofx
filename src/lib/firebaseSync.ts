import fs from 'fs';
import path from 'path';
import { adminStorage } from '@/firebase/firebase-admin';
import { getUploadsPath } from '@/utils/uploadPath';
import featuredLayoutModel from './models/featuredLayoutModel';
import postModel from './models/postModel';

export async function uploadToFirebase(localPath: string, destination: string) {
  const bucket = adminStorage.bucket();
  const fileRef = bucket.file(destination);

  return new Promise((resolve, reject) => {
    fs.createReadStream(localPath)
      .pipe(fileRef.createWriteStream({
        resumable: false,
        gzip: true,
        public: true,
        contentType: 'image/webp',
      }))
      .on('error', reject)
      .on('finish', resolve);
  });
};

export async function syncFromFirebase() {
  const bucket = adminStorage.bucket();
  const [files] = await bucket.getFiles({ prefix: '' });

  for (const file of files) {
    const remotePath = file.name;

    if (!remotePath || remotePath.endsWith('/')) continue;

    const localPath = getUploadsPath(remotePath);
    const localDir = path.dirname(localPath);

    if (fs.existsSync(localPath)) {
      console.log(`🔁 Skipped (already exists): ${localPath}`);
      continue;
    }

    fs.mkdirSync(localDir, { recursive: true });
    console.log('✅ Target directory =', localDir);

    const writeStream = fs.createWriteStream(localPath);
    writeStream.on('finish', () => {
      console.log(`✅ Finished writing: ${localPath}`);
    });

    await new Promise((resolve, reject) => {
      file.createReadStream()
        .on('error', reject)
        .on('end', resolve)
        .pipe(writeStream);
    });

    console.log(`✅ Synced: ${remotePath}`);
  }

  console.log('🔥 Image sync from Firebase complete.');
}

export async function cleanupUnusedImagesFromFirebaseAndFilestore() {
  const bucket = adminStorage.bucket();
  const [files] = await bucket.getFiles(); // no prefix needed

  const usedImagePaths = new Set<string>();

  // ✅ Collect image URLs from Featured Layout
  const featuredRows = await featuredLayoutModel.find({});
  for (const row of featuredRows) {
    for (const block of row.blocks) {
      const urls = [
        block.image?.desktop?.url,
        block.image?.mobile?.url,
      ].filter(Boolean);

      urls.forEach((url: string) => {
        const match = url.match(/(featured-posts\/.+|posts\/.+)/);
        if (match?.[1]) usedImagePaths.add(match[1]);
      });
    }
  }

  // ✅ Collect image URLs from Posts
  const posts = await postModel.find({});
  for (const post of posts) {
    const urls = [
      post.heroImage?.url,
      ...(post.content || []).map((c: { url?: string }) => c.url),
    ].filter(Boolean);

    urls.forEach((url: string) => {
      const match = url.match(/(featured-posts\/.+|posts\/.+)/);
      if (match?.[1]) usedImagePaths.add(match[1]);
    });
  }

  // ✅ Delete unused images
  let deletedCount = 0;

  for (const file of files) {
    const remotePath = file.name;

    if (!usedImagePaths.has(remotePath)) {
      console.log('🗑 Deleting unused file:', remotePath);
      await file.delete().catch(() => { });
      const localPath = getUploadsPath(remotePath);
      if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
      deletedCount++;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ USED PATHS:', Array.from(usedImagePaths));
    console.log('✅ ALL FIREBASE FILES:', files.map(f => f.name));
  }

  console.log(`🔥 Cleanup complete. Deleted ${deletedCount} unused images.`);
  return { deletedCount };
}