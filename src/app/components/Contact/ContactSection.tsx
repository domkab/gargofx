import clsx from 'clsx';
import styles from '@/styles/components/contact.module.scss';
import ContactForm from './ContactForm';
import { JSX } from 'react';
import { facebook, instagram, x } from '@/lib/constants';

type ContactSectionProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  displayFormTitle?: boolean;
};

export default function ContactSection({
  as = 'section',
  className,
  displayFormTitle = true,
}: ContactSectionProps) {
  const Component = as;

  return (
    <Component className={clsx(styles.contact, className)}>
      <div
        className={clsx(
          styles['contact__header'],
          'flex flex-col md:flex-row md:items-center md:justify-between mb-10',
          displayFormTitle ? '': styles['contact__header-if-primary']
        )}
      >
        {displayFormTitle && (
          <h2 className={clsx(styles['contact__title'], 'text-white/95 mb-4 md:mb-0')}>
            contact
          </h2>
        )}

        <div className={clsx(
          styles['contact__socials'], 'gap-8 text-secondary',
          displayFormTitle ? '' : styles['contact__socials-if-primary'],
        )}
        >
          <a href={facebook} target="_blank">facebook</a>
          <a href={instagram} target="_blank">instagram</a>
          <a href={x} target="_blank">x</a>
        </div>
      </div>

      <ContactForm />
    </Component >
  );
}