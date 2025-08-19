import fs from 'fs';
import path from 'path';
import { connect } from '../mongodb/mongoose';
import LogoSliderModel from '../models/LogoSliderModel';
import Post from '../models/postModel';
import {
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