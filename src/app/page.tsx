import { getCarouselImages } from '@/lib/services/imageService';
import HomeImageCarousel from './components/HomeImageCarousel';
import styles from '@/styles/components/home.module.scss';
import clsx from 'clsx';
import HomePageLayout from './components/Layout/HomePageLayout';
import ContactSection from './components/Contact/ContactSection';

// export const revalidate = 120;
// export const dynamic = 'force-dynamic';

export default async function Home() {
  const images = await getCarouselImages();

  return (
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
            'inset-0',
            'text-start',
            'flex flex-col justify-center',
            'text-white',
            'z-10',
            styles['home__text-container']
          )}
        >
          <h1
            className={clsx(
              styles['home__text'],
              'text-2xl sm:text-4xl',
              'font-semibold'
            )}
          >
            Unlocking the{' '}
            <span className='font-bold italic'>power</span>
            <br />
            of <span className="font-bold">CGI</span> to bring
            <br />
            stories to{' '}
            <span className='italic font-semibold'>life.</span>
          </h1>
        </div>
      </section>

      <HomePageLayout />
      <ContactSection as='section' />
    </main>
  );
}