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
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [viewportWidth, setViewPortWidth] = useState<number>(0);

  const pathname = usePathname();

  const closeMenu = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsAnimatingOut(false);
    }, 500);
  };

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

  useEffect(() => {
    setMenuOpen(false);
    setIsAnimatingOut(false);
  }, [pathname]);

  useEffect(() => {
    const setWidth = () => setViewPortWidth(window.innerWidth);
    setWidth();
    window.addEventListener('resize', setWidth);
    return () => window.removeEventListener('resize', setWidth);
  }, []);

  const navItems = ['projects', 'about', 'contact'];

  return (
    <header
      className={clsx(
        styles['header'],
        'fixed top-0 left-0 w-full z-50 flex items-center justify-between',
        'transition-all duration-300',
        scrolled ? 'bg-black/30 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >

      {/* Desktop group: show only when viewportWidth > 768 */}
      {viewportWidth > 768 && (
        <div className="w-full flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Right: Desktop navigation */}
          <nav className={clsx(styles['desktop-nav'], 'flex gap-12 text-white')}>
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
      )}

      {/* Mobile group: show only when viewportWidth <= 768 */}
      {viewportWidth <= 768 && (
        <div className="w-full flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Right: Burger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="p-2 -m-2"
          >
            <Image
              src="/icons/hamburger.svg"
              alt="menu"
              width={32}
              height={32}
              unoptimized
              className="cursor-pointer"
            />
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-[999]',
          'flex flex-col justify-between',
          'text-white text-xl',
          styles['header__burger'],
          menuOpen && styles['header__burger--active'],
          isAnimatingOut && styles['header__burger--closing']
        )}
      >
        {/* Top bar: Logo + Close button */}
        <div
          className={clsx(
            'header__burger-top-bar',
            'w-full flex items-center justify-between',
            'px-5 py-4',
            styles['header__burger-header'],
          )}
        >
          <Logo />

          <Image
            src="/icons/close.svg"
            alt='close icon'
            width={32}
            height={32}
            unoptimized
            onClick={closeMenu}
            className={clsx(
              'cursor-pointer',
              'text-white text-3xl leading-none',
              styles['header__burger-close'],
            )}
            aria-label="Close menu"
          />

        </div>

        {/* Mobile Navigation */}
        <nav
          className={clsx(
            'header__nav-mobile',
            styles['header__nav-mobile'],
            'flex flex-col items-center gap-8 flex-1 justify-start',
            'mt-12'
          )}
        >
          {navItems.map((item) => {
            const link = `/${item.toLowerCase()}`;
            const isActive = pathname === link;

            return (
              <Link
                key={item}
                href={link}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  styles['header__burger-navitem'], 'text-start',
                  isActive && styles.active
                )}
              >
                {item}
              </Link>
            )
          })}
        </nav>

        {/* Footer (Contact + Social) */}
        <section className={clsx(footerStyles['footer'])}>
          <div className="mx-auto px-5 md:px-10 pt-10 pb-14">
            <div
              className={clsx(
                'flex flex-col items-center text-center gap-6',
                'md:flex-row md:justify-between md:items-start md:text-left'
              )}
            >

              {/* EMAIL + PHONE */}
              <div className="flex flex-col items-center gap-8">
                <div className={clsx(styles['footer__contact-row'], 'font-bold flex gap-2')}>
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

                <div className={clsx(styles['footer__contact-row'], 'flex gap-2')}>
                  <Image
                    src="/icons/phone.svg"
                    alt="phone"
                    width={20}
                    height={20}
                    unoptimized
                  />
                  <Link
                    href={phoneRef}
                    className="uppercase tracking-wide text-sm"
                  >
                    <b>TEL:</b> {phone}
                  </Link>
                </div>
              </div>

              {/* Social + Footer Links */}
              <section className="flex flex-col items-center gap-6 md:items-end">
                <article className={clsx(
                  'flex gap-10',
                  'mt-3 md:mt-0'
                )}
                >
                  <span
                    className={footerStyles['footer__followus']}
                  >
                    FOLLOW US
                  </span>

                  <Link href={facebook} target="_blank">
                    <Image src="/icons/social/facebook.svg"
                      alt="facebook"
                      width={48}
                      height={48}
                      unoptimized
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
                </article>

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
        </section>
      </div>
    </header>
  );
}