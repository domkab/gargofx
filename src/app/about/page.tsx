import { aboutMetadata } from '@/lib/metadata/about';
import { getCarouselImages } from '@/lib/services/imageService';
import styles from '@/styles/components/about.module.scss';
import clsx from 'clsx';
import HomeImageCarousel from '../components/HomeImageCarousel';

export const metadata = aboutMetadata;

export default async function AboutPage() {
  const images = await getCarouselImages();

  return (
    <main className={clsx(
      styles['about'], 'about'
    )}>

      <section className={clsx('about__hero', 'relative', 'w-full')}>
        <HomeImageCarousel images={images} />

        <div
          className={clsx(
            styles['about__text-container'],
            'text-start',
            'text-white',
            'z-10',
          )}
        >
          <h1
            className={clsx(
              styles['about__text'],
              'font-semibold'
            )}
          >
            About us
          </h1>

          <h2
            className={clsx(
              styles['about__text'],
              styles['about__text--secondary'],
            )}
          >
            Who we are and what we do
          </h2>
        </div>
      </section>
    </main>
  );
}