import clsx from 'clsx';
import styles from '@/styles/components/contact.module.scss';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section className={clsx(styles.contact, 'px-5 py-5')}>
      <h2 className={clsx(
        styles['contact__title'],
        'text-white text-3xl mb-8',
        'text-start'
      )}
      >
        contact
      </h2>

      <div className={clsx(
        styles['contact__socials'],
        'flex justify-center gap-8 mb-10'
      )}
      >
        <a href="https://facebook.com" target="_blank">facebook</a>
        <a href="https://instagram.com" target="_blank">instagram</a>
        <a href="https://x.com" target='_blank'>x</a>
      </div>

      <ContactForm />
    </section>
  );
}