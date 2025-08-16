'use client';

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import styles from '@/styles/components/footer.module.scss';
import { facebook, instagram, mail, mailRef, phone, phoneRef, x } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className={clsx(styles.footer, 'w-full')}>
      <div
        className={clsx(
          styles['footer__container'],
          'px-5 md:px-10 pt-10 pb-14'
        )}
      >
        {/* Wrapper: switches layout at md */}
        <div
          className={clsx(
            'flex flex-col items-center text-center gap-6',
            'md:flex-row md:justify-between md:items-start md:text-left'
          )}
        >

          {/* EMAIL & PHONE */}
          <section className="flex flex-col gap-8">
            <div className={clsx(styles['footer__contact-row'], 'font-bold')}>
              <Image
                src="/icons/email.svg"
                alt="email"
                width={20}
                height={20}
                unoptimized
              />
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
          <section className="flex flex-col items-center gap-8 md:items-end">
            {/* Social icons */}
            <div
              className={clsx(
                'flex gap-10 items-center',
                'mt-3 md:mt-0'
              )}
            >
              <span
                className={styles['footer__followus']}
              >
                FOLLOW US
              </span>

              <Link href={facebook} target="_blank">
                <Image src="/icons/social/facebook.svg"
                  alt="facebook"
                  width={48}
                  height={48}
                />
              </Link>

              <Link href={instagram} target="_blank">
                <Image src="/icons/social/instagram.svg"
                  alt="instagram"
                  width={48}
                  height={48}
                  unoptimized
                />
              </Link>

              <Link href={x} target="_blank">
                <Image src="/icons/social/x.svg"
                  alt="x"
                  width={48}
                  height={48}
                  unoptimized
                />
              </Link>
            </div>

            {/* Logo */}
            <Image
              className='py-2'
              src="/icons/Logo-footer.svg"
              alt="Logo"
              width={160}
              height={40}
              unoptimized
            />

            {/* Links */}
            <div className="flex flex-col items-center gap-4 text-sm md:items-end">
              <span>
                © {new Date().getFullYear()} <span>GARGOFX</span>
              </span>

              <Link href="/terms-conditions">
                TERMS OF USE AND PRIVACY
              </Link>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}