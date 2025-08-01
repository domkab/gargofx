'use client';

import { useEffect, useState } from 'react';
import Logo from '../Logo';
import Image from 'next/image';
import clsx from 'clsx';
import styles from '@/styles/components/header.module.scss';
import footerStyles from '@/styles/components/footer.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { facebook, instagram, mail, mailRef, phone, phoneRef, x } from '@/lib/constants';

export default function HeaderClientSide() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = ['projects', 'about', 'contact'];

  return (
    <header
      className={clsx(
        styles.header,
        'fixed top-0 left-0 w-full z-50 flex items-center justify-between ',
        'px-6 py-4 transition-all duration-300',
        scrolled ? 'bg-black/30 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      {/* LEFT GROUP: Logo + Desktop Nav */}
      <div className="flex items-center gap-10">
        <Logo />

        <nav className="hidden md:flex gap-6 text-white text-sm">
          {navItems.map((item) => {
            const link = `/${item.toLowerCase()}`;
            const isActive = pathname === link;

            return (
              <Link
                key={item}
                href={link}
                className={clsx(styles.link, isActive && styles.active)}
              >
                {item}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* RIGHT: Burger */}
      <div className="md:hidden">
        <Image
          src="/icons/hamburger.svg"
          alt="menu"
          width={32}
          height={32}
          className="cursor-pointer"
          onClick={() => setMenuOpen(true)}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className={clsx(
            'fixed inset-0 z-[999]',
            'flex flex-col justify-center',
            'text-white text-xl',
            'bg-black/90'
          )}
        >
          <div className="flex justify-between px-5">
            <Logo />
            <button
              onClick={() => setMenuOpen(false)}
              className={clsx(
                // 'absolute top-6 right-6',
                'text-white text-3xl',
                styles['header__burger-close']
              )}
            >
              ×
            </button>
          </div>

          <nav className={clsx(
            'flex flex-col items-center gap-8',
            styles['header__burger']
          )}>
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className={styles.link}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:items-start md:text-left">

            {/* EMAIL */}
            <div className="flex flex-col gap-4">
              <div className={clsx(footerStyles['footer__contact-row'], 'font-bold')}>
                <Image src="/icons/email.svg" alt="email" width={20} height={20} />
                <Link
                  href={mailRef}
                  className="uppercase tracking-wide text-sm"
                >
                  {mail}
                </Link>
              </div>

              <div className={clsx(footerStyles['footer__contact-row'])}>
                <Image src="/icons/phone.svg" alt="phone" width={20} height={20} />
                <Link
                  href={phoneRef}
                  className="uppercase tracking-wide text-sm"
                >
                  <b>TEL:</b> {phone}
                </Link>
              </div>
            </div>

            {/* GROUP 2 */}
            <div className="flex flex-col items-center gap-6 md:items-end">
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
}