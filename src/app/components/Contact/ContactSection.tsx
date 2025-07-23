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
    <Component className={clsx(styles.contact, 'px-5 py-5')}>
      <h2 className={clsx(styles['contact__title'], 'text-white mb-8')}>
        contact
      </h2>

      <div className={clsx(styles['contact__socials'], 'gap-8 text-secondary mb-10')}>
        <a href="https://facebook.com" target="_blank">facebook</a>
        <a href="https://www.instagram.com/gargofx?igsh=MWNlbmg2endoemVtbA==" target="_blank">instagram</a>
        <a href="https://x.com" target="_blank">x</a>
      </div>

      <ContactForm />
    </Component>
  );
}