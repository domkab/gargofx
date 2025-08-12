import clsx from 'clsx';
import HomeImageCarousel from '../components/HomeImageCarousel';
import { getCarouselImages } from '@/lib/services/imageService';
import contactPage from '@/styles/components/contactPage.module.scss';
import ContactSection from '../components/Contact/ContactSection';

export const revalidate = 300;

export default async function ContactPage() {
  const images = await getCarouselImages();

  return (
    <main
      className={clsx(
        contactPage['contact'], 'contact max-h-full'
      )}>

      <section className={clsx('contact__hero', 'relative', 'w-full')}>
        <HomeImageCarousel images={images} />

        <div
          className={clsx(
            contactPage['contact__hero-text-container'],
            'text-start',
            'text-white',
            'z-10',
          )}
        >
          <h1
            className={clsx(
              contactPage['contact__hero-text'],
              'mb-1'
            )}
          >
            Contact
          </h1>

          <p
            className={clsx(
              contactPage['contact__hero-text'],
              contactPage['contact__hero-text--secondary'],
            )}
          >
            Questions? We’ve got answers
          </p>
        </div>
      </section>

      <ContactSection className={clsx(contactPage['contact__section'])}/>
    </main>
  );
}