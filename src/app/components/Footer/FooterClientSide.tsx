'use client';

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import styles from '@/styles/components/footer.module.scss';
import { facebook, instagram, mail, mailRef, phone, phoneRef, x } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className={clsx(styles.footer, 'w-full')}>
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
        {/* Wrapper: switches layout at md */}
        <div
          className={clsx(
            'flex flex-col items-center text-center gap-6',
            'md:flex-row md:justify-between md:items-start md:text-left'
          )}
        >

          {/* EMAIL & PHONE */}
          <section className="flex flex-col gap-4">
            <div className={clsx(styles['footer__contact-row'], 'font-bold')}>
              <Image src="/icons/email.svg" alt="email" width={20} height={20} />
              <Link
                href={mailRef}
                className="uppercase tracking-wide text-sm"
              >
                {mail}
              </Link>
            </div>

            <div className={clsx(styles['footer__contact-row'])}>
              <Image src="/icons/phone.svg" alt="phone" width={20} height={20} />
              <Link
                href={phoneRef}
                className="uppercase tracking-wide text-sm"
              >
                <b>TEL:</b> {phone}
              </Link>
            </div>
          </section>

          {/* GROUP 2 */}
          <section className="flex flex-col items-center gap-6 md:items-end">
            {/* Social icons */}
            <div className="flex gap-6">
              <span>FOLLOW US</span>
              <Link href={facebook} target="_blank">
                <Image src="/icons/social/facebook.svg" alt="facebook" width={24} height={24} />
              </Link>
              <Link href={instagram} target="_blank">
                <Image src="/icons/social/instagram.svg" alt="instagram" width={24} height={24} />
              </Link>
              <Link href={x} target="_blank">
                <Image src="/icons/social/x.svg" alt="x" width={24} height={24} />
              </Link>
            </div>

            {/* Logo */}
            <Image className='py-2' src="/icons/Logo-footer.svg" alt="Logo" width={120} height={40} />

            {/* Links */}
            <div className="flex flex-col items-center gap-2 text-sm md:items-end">
              <span>
                © {new Date().getFullYear()} <span>GARGOFX</span>
              </span>
              <Link href="/terms">
                TERMS OF USE AND PRIVACY
              </Link>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}