import fs from 'fs';
import path from 'path';
import { connect } from '../mongodb/mongoose';
import LogoSliderModel from '../models/LogoSliderModel';

export async function getCarouselImages(): Promise<string[]> {
  const uploadsDir = path.join(process.cwd(), 'public/uploads');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const first = fs.readdirSync(uploadsDir).find(name =>
    name.includes('home-default')
  );

  const postsDir = path.join(uploadsDir, 'posts');
  const postDirs = fs.readdirSync(postsDir).filter(name => {
    const fullPath = path.join(postsDir, name);
    return !name.startsWith('.') && fs.statSync(fullPath).isDirectory();
  });

  const postImages: string[] = [];

  for (const dir of postDirs) {
    const files = fs.readdirSync(path.join(postsDir, dir));
    const mainImg = files.find(f => f.includes('main'));
    if (mainImg) postImages.push(`/uploads/posts/${dir}/${mainImg}`);
  }

  return [
    first ? `/uploads/${first}` : '',
    ...postImages,
  ].filter(Boolean);
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