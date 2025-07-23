'use client';

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import styles from '@/styles/components/footer.module.scss';

export default function Footer() {
  return (
    <footer className={clsx(styles.footer, 'w-full')}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Wrapper: switches layout at md */}
        <div className="flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:items-start md:text-left">

          {/* GROUP 1: Email + Phone */}
          <div className="flex flex-col gap-4">
            <div className={clsx(styles['footer__contact-row'])}>
              <Image src="/icons/email.svg" alt="email" width={20} height={20} />
              <Link
                href="mailto:laurynas.gargasas@gmail.com"
                className="uppercase tracking-wide text-sm"
              >
                laurynas.gargasas@gmail.com
              </Link>
            </div>

            <div className={clsx(styles['footer__contact-row'])}>
              <Image src="/icons/phone.svg" alt="phone" width={20} height={20} />
              <Link
                href="tel:+37061550539"
                className="uppercase tracking-wide text-sm hover:underline"
              >
                <b>TEL:</b> +370 6 155 0539
              </Link>
            </div>
          </div>

          {/* GROUP 2: Socials, Logo, Links */}
          <div className="flex flex-col items-center gap-6 md:items-end">
            {/* Social icons */}
            <div className="flex gap-6">
              <span>FOLLOW US</span>
              <Link href="https://facebook.com" target="_blank">
                <Image src="/icons/social/facebook.svg" alt="facebook" width={24} height={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <Image src="/icons/social/instagram.svg" alt="instagram" width={24} height={24} />
              </Link>
              <Link href="https://x.com" target="_blank">
                <Image src="/icons/social/x.svg" alt="x" width={24} height={24} />
              </Link>
            </div>

            {/* Logo */}
            <Image src="/icons/Logo-footer.svg" alt="Logo" width={120} height={40} />

            {/* Links */}
            <div className="flex flex-col items-center gap-2 text-sm md:items-end">
              <span>
                © {new Date().getFullYear()} <span>COPYRIGHT</span>
              </span>
              <Link href="/terms" className="underline">
                TERMS OF USE AND PRIVACY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}