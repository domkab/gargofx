import fs from 'fs';
import path from 'path';
import { adminStorage } from '@/firebase/firebase-admin';
import { getUploadsPath } from '@/utils/uploadPath';
import featuredLayoutModel from './models/featuredLayoutModel';
import postModel from './models/postModel';
import homePageLayoutModel from './models/homePageLayoutModel';
import LogoSliderModel from './models/LogoSliderModel';
import { ImageCarousel } from './models/ImageCarouselModel';

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

// syncFromFirebase
// •	Downloads all images from Firebase to local uploads directory
// •	Skips if file already exists locally
// •	Ensures directory structure is maintained

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

// syncUsedImagesToFirebaseFromLocal
	// •	Scans DB for image URLs
	// •	Checks if file exists locally
	// •	Uploads it to Firebase if it’s missing there

export async function syncUsedImagesToFirebaseFromLocal(options?: { dryRun?: boolean }) {
  const bucket = adminStorage.bucket();
  const [existingFiles] = await bucket.getFiles();
  const existingFirebasePaths = new Set(existingFiles.map(file => file.name));

  const usedPaths = new Set<string>();

  // --- Featured Layout
  const featuredRows = await featuredLayoutModel.find({});
  for (const row of featuredRows) {
    for (const block of row.blocks) {
      const urls = [
        block.image?.desktop?.url,
        block.image?.mobile?.url,
      ].filter(Boolean);

      urls.forEach((url: string) => {
        const match = url.match(/uploads\/(featured-posts\/.+|posts\/.+)/);
        if (match?.[1]) usedPaths.add(match[1]);
      });
    }
  }

  // --- Home Carousel
  const homeCarousel = await ImageCarousel.findOne({});
  if (homeCarousel) {
    const urls = [
      homeCarousel.heroImageUrl,
      ...(homeCarousel.carouselImages || []),
    ].filter(Boolean);

    urls.forEach((url: string) => {
      const match = url.match(/uploads\/(home\/.+)/);
      if (match?.[1]) usedPaths.add(match[1]);
    });
  }

  // --- Posts
  const posts = await postModel.find({});
  for (const post of posts) {
    const urls = [
      post.heroImage?.url,
      ...(post.content || []).map((c: { url?: string }) => c.url),
    ].filter(Boolean);

    urls.forEach((url: string) => {
      const match = url.match(/uploads\/(posts\/.+|featured-posts\/.+)/);
      if (match?.[1]) usedPaths.add(match[1]);
    });
  }

  // --- HomePage Layout
  const homePageRows = await homePageLayoutModel.find({});
  for (const row of homePageRows) {
    for (const block of row.blocks) {
      const urls = [
        block.image?.desktop?.url,
        block.image?.mobile?.url,
      ].filter(Boolean);

      urls.forEach((url: string) => {
        const match = url.match(/uploads\/(featured-posts\/.+|posts\/.+)/);
        if (match?.[1]) usedPaths.add(match[1]);
      });
    }
  }

  // --- Logo Slider
  const logoSliderDocs = await LogoSliderModel.find({});
  for (const logo of logoSliderDocs) {
    if (logo.url) {
      const match = logo.url.match(/uploads\/(logo-slider\/.+)/);
      if (match?.[1]) usedPaths.add(match[1]);
    }
  }

  let uploadedCount = 0;

  for (const relPath of usedPaths) {
    const localPath = getUploadsPath(relPath);

    if (!fs.existsSync(localPath)) {
      console.warn('🚫 Local file missing:', relPath);
      continue;
    }

    if (existingFirebasePaths.has(relPath)) {
      console.log('🔁 Already in Firebase:', relPath);
      continue;
    }

    if (options?.dryRun) {
      console.log('🟡 DRY RUN - Would upload:', relPath);
      continue;
    }

    console.log('⬆️ Uploading:', relPath);

    const fileRef = bucket.file(relPath);

    await new Promise((resolve, reject) => {
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

    uploadedCount++;
  }

  console.log(`✅ Uploaded ${uploadedCount} new images to Firebase.`);
  return { uploadedCount };
}

// cleanupUnusedImagesFromFirebaseAndFilestore
// •	Scans DB for used image URLs
// •	Deletes files from Firebase and local storage that are not used
// •	Ensures all used images are retained

export async function cleanupUnusedImagesFromFirebaseAndFilestore() {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('🛑 Skipping image cleanup: Not in production environment');
    return { deletedCount: 0 };
  };

  const bucket = adminStorage.bucket();
  const [files] = await bucket.getFiles();

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

  // ✅ Collect image URLs from Home Carousel
  const homeCarousel = await ImageCarousel.findOne({});
  if (homeCarousel) {
    const urls = [
      homeCarousel.heroImageUrl,
      ...(homeCarousel.carouselImages || []),
    ].filter(Boolean);

    urls.forEach((url: string) => {
      const match = url.match(/(home\/.+)/);
      if (match?.[1]) usedImagePaths.add(match[1]);
    });
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

  // ✅ Collect image URLs from HomePage Layout
  const homePageRows = await homePageLayoutModel.find({});
  for (const row of homePageRows) {
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

  // Logo Slider
  const logoSliderDocs = await LogoSliderModel.find({});
  for (const logo of logoSliderDocs) {
    if (logo.url) {
      const match = logo.url.match(/(logo-slider\/.+)/);
      if (match?.[1]) usedImagePaths.add(match[1]);
    }
  }

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