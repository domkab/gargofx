'use client';

import { useEffect, useState } from 'react';
import Logo from '../Logo';
import Image from 'next/image';
import clsx from 'clsx';
import styles from '@/styles/components/header.module.scss';

export default function HeaderClientSide() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        'fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-300',
        scrolled ? 'bg-black/30 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      {/* LEFT GROUP: Logo + Desktop Nav */}
      <div className="flex items-center gap-10">
        <Logo />

        <nav className="hidden md:flex gap-6 text-white text-sm">
          {navItems.map((item) => (
            <a
              key={item}
              href={`${item.toLowerCase()}`}
              className={styles.link}
            >
              {item}
            </a>
          ))}
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
            'flex flex-col items-center justify-center',
            'gap-8 text-white text-xl',
            'bg-black/90'
          )}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={styles.link}
            >
              {item}
            </a>
          ))}

          <button
            onClick={() => setMenuOpen(false)}
            className={clsx(
              'absolute top-6 right-6',
              'text-white text-3xl'
            )}
          >
            ×
          </button>
        </div>
      )}
    </header>
  );
}