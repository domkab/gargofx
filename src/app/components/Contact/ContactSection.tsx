import clsx from 'clsx';
import styles from '@/styles/components/contact.module.scss';
import ContactForm from './ContactForm';
import { JSX } from 'react';

type ContactSectionProps = {
  as?: keyof JSX.IntrinsicElements;
};

export default function ContactSection({ as = 'section' }: ContactSectionProps) {
  const Component = as;

  return (
    <Component className={clsx(styles.contact, 'px-5 py-5 mb-7')}>
      <div
        className={clsx(
          styles['contact__header'],
          'flex flex-col md:flex-row md:items-center md:justify-between mb-10'
        )}
      >
        <h2 className={clsx(styles['contact__title'], 'text-white mb-4 md:mb-0')}>
          contact
        </h2>

        <div className={clsx(styles['contact__socials'], 'gap-8 text-secondary')}>
          <a href="https://facebook.com" target="_blank">facebook</a>
          <a href="https://www.instagram.com/gargofx?igsh=MWNlbmg2endoemVtbA==" target="_blank">instagram</a>
          <a href="https://x.com" target="_blank">x</a>
        </div>
      </div>

      <ContactForm />
    </Component>
  );
}