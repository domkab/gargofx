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
          <HomeImageCarousel images={images}/>

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

              Elevating{' '}
              <span className='font-bold italic'>storytelling</span>
              <br />
              through <span className="font-bold">the</span> power
              <br />
              <span className='italic font-semibold'>of CGI.</span>
            </h1>
          </div>
        </section>

        <HomePageLayout />
        <ContactSection as='section' />
      </main>
    </>
  );
}