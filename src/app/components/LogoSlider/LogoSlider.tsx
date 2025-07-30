'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/styles/components/logo-slider.module.scss';
import clsx from 'clsx';

type Logo = { url: string; alt: string };

export default function LogoSlider() {
  const [logos, setLogos] = useState<Logo[]>([]);
  console.log(logos);
  
  useEffect(() => {
    fetch('/api/logo-slider/get')
      .then(res => res.json())
      .then(setLogos)
      .catch(() => setLogos([]));
  }, []);

  if (!logos.length) return null;

  return (
    <div className={clsx(styles['logos'])}>
      {/* Repeat twice for infinite loop */}
      <div className={clsx(styles['logo__items'])}>
        {logos.map((logo, idx) => (
          <Image
            key={`logo-1-${idx}`}
            src={logo.url}
            alt={logo.alt}
            width={100}
            height={100}
          />
        ))}
      </div>

      <div className={clsx(styles['logo__items'])}>
        {logos.map((logo, idx) => (
          <Image
            key={`logo-2-${idx}`}
            src={logo.url}
            alt={logo.alt}
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
}