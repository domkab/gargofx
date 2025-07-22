import clsx from 'clsx';
import styles from '@/styles/components/contact.module.scss';
import ContactForm from '../components/Contact/ContactForm';

export default function ContactPage() {
  return (
    <main className={clsx(styles.contact, 'px-5 py-5')}>
      <h1 className={clsx(styles.title, 'text-white text-3xl mb-8')}>contact</h1>

      <div className={clsx(styles.socials, 'flex gap-8 text-secondary mb-10')}>
        <a href="https://facebook.com" target="_blank" className={styles.link}>
          facebook
        </a>
        <a href="https://instagram.com" target="_blank" className={styles.link}>
          instagram
        </a>
        <button className={styles.close}>x</button>
      </div>

      <ContactForm />
    </main>
  );
}