import clsx from 'clsx';
import ContactForm from '../components/Contact/ContactForm';
import HomeImageCarousel from '../components/HomeImageCarousel';
import { getCarouselImages } from '@/lib/services/imageService';
import contactForm from '@/styles/components/contact.module.scss';
import contactPage from '@/styles/components/contactPage.module.scss';

export default async function ContactPage() {
  const images = await getCarouselImages();

  return (
    <main
      className={clsx(
        contactPage['contact'], 'contact'
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
            About us
          </h1>

          <p
            className={clsx(
              contactPage['contact__hero-text'],
              contactPage['contact__hero-text--secondary'],
            )}
          >
            Who we are and what we do
          </p>
        </div>
      </section>

      <section className={clsx(contactPage['contact__content'])}>
        <h1 className={clsx(contactForm.title, 'text-white text-3xl mb-8')}>contact</h1>

        <div className={clsx(contactForm.socials, 'flex gap-8 text-secondary mb-10')}>
          <a href="https://facebook.com" target="_blank" className={contactForm.link}>
            facebook
          </a>
          <a href="https://instagram.com" target="_blank" className={contactForm.link}>
            instagram
          </a>
          <button className={contactForm.close}>x</button>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}