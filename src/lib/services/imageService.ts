import fs from 'fs';
import path from 'path';
import { connect } from '../mongodb/mongoose';
import LogoSliderModel from '../models/LogoSliderModel';
import Post from '../models/postModel';
import {
  // getUploadsBaseDir,
  getUploadsPath
} from '@/utils/uploadPath';


import { ImageCarousel } from '@/lib/models/ImageCarouselModel';

export async function getCarouselImages(): Promise<string[]> {
  await connect();

  const images: string[] = [];

  // Get main home image
  const main = await ImageCarousel.findOne().lean() as { heroImageUrl?: string };

  if (main?.heroImageUrl) {
    images.push(main.heroImageUrl);
  } else {
    console.warn('No main home image found in ImageCarousel');
  }

  // Get post main images
  const posts = await Post.find({}, { heroImage: 1 }).lean();

  for (const post of posts) {
    if (post.heroImage?.url) {
      images.push(post.heroImage.url);
    }
  }

  return images;
}

// export async function getCarouselImages(): Promise<string[]> {
//   const uploadsDir = getUploadsBaseDir();
//   const homeDir = path.join(uploadsDir, 'home');
//   const postsDir = path.join(uploadsDir, 'posts');

//   console.log('Uploads Directory:', uploadsDir);
//   console.log('Home Directory:', homeDir);
//   console.log('Posts Directory:', postsDir);

//   const shouldSkipWrites =
//     process.env.NEXT_PHASE === 'phase-production-build' ||
//     process.env.NODE_ENV === 'production';

//   const postImages: string[] = [];

//   if (!fs.existsSync(uploadsDir) && !shouldSkipWrites) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//   }

//   let first: string | undefined = undefined;
//   if (fs.existsSync(homeDir)) {
//     first = fs.readdirSync(homeDir).find((name) =>
//       name.includes('home-default')
//     );
//   }

//   if (fs.existsSync(postsDir)) {
//     const postDirs = fs.readdirSync(postsDir).filter((name) => {
//       const fullPath = path.join(postsDir, name);
//       return !name.startsWith('.') && fs.statSync(fullPath).isDirectory();
//     });

//     for (const dir of postDirs) {
//       const files = fs.readdirSync(path.join(postsDir, dir));
//       const mainImg = files.find((f) => f.includes('main'));
//       if (mainImg) postImages.push(`/uploads/posts/${dir}/${mainImg}`);
//     }
//   }

//   console.log('postImages:', postImages);

//   return [
//     first ? `/uploads/home/${first}` : '',
//     ...postImages,
//   ].filter(Boolean);
// }

export function deleteOldHomeDefaultImages() {
  const homeDir = path.dirname(getUploadsPath('home/placeholder.tmp'));

  if (!fs.existsSync(homeDir)) return;

  const files = fs.readdirSync(homeDir);

  files
    .filter((name) => name.startsWith('home-default'))
    .forEach((name) => {
      try {
        fs.unlinkSync(path.join(homeDir, name));
      } catch (err) {
        console.error('Failed to delete old home image:', err);
      }
    });
}


export async function getLogoSlider(): Promise<{ url: string; alt: string }[]> {
  await connect();
  const logos = await LogoSliderModel.find().sort({ order: 1 }).lean();

  return logos.map(logo => ({
    url: logo.url,
    alt: logo.alt || logo.url.split('/').pop()?.split('.')[0] || 'logo',
    order: logo.order
  }));
}