import { getCarouselImages } from '@/lib/services/imageService';
import HomeImageCarousel from '../components/HomeImageCarousel';
import styles from '@/styles/components/home.module.scss';
import clsx from 'clsx';
import HomePageLayout from '../components/Layout/HomePageLayout';
import ContactSection from '../components/Contact/ContactSection';
import HomeJsonLd from './HomeJsonLd';

export const revalidate = 69;

export default async function Home() {
  const images = await getCarouselImages();

  return (
    <>
      <HomeJsonLd />
      <main
        className={clsx(
          styles.home,
          'flex flex-col items-center justify-center',
          'min-h-[70vh]',
          'text-center'
        )}
      >
        <section className={clsx('relative', 'w-full')}>
          <HomeImageCarousel images={images} />

          <div
            className={clsx(
              'text-start',
              'text-white/95',
              styles['home__text-container']
            )}
          >
            <h1
              className={clsx(
                styles['home__text'],
              )}
            >

              {/* We create{' '}
              <span className='font-bold italic'>3D</span>
              <br />
              animation for ads
              <br />
              <span className='italic font-semibold'>products and brands</span> */}
              <span className='font-bold'>
                3D animation for <br />
                  products and brands
              </span>
            </h1>
          </div>
        </section>

        <HomePageLayout />
        <ContactSection as='section' />
      </main>
    </>
  );
}