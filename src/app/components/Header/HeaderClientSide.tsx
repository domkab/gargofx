'use client';

import { useEffect, useState } from 'react';
import Logo from '../Logo';
import Image from 'next/image';
import clsx from 'clsx';

export default function HeaderClientSide() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'header',
        'fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 transition-all duration-300',
        scrolled
          ? 'bg-black/30 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <Logo />

      <Image
        src="/icons/hamburger.svg"
        alt="burger menu open"
        width={48}
        height={48}
        className="cursor-pointer"
      />
    </header>
  );
}