'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import path from 'path';
import styles from '@/styles/components/logo-slider.module.scss';
import clsx from 'clsx';

export default function LogoSlider() {
  const [logos, setLogos] = useState<string[]>([]);

  useEffect(() => {
    const importLogos = async () => {
      const logoFiles = await fetch('/api/logo-slider/get').then(res => res.json());
      setLogos(logoFiles);
    };
    importLogos();
  }, []);

  return (
    <div className={clsx(styles['logos'])}>
      {/* Repeat twice for infinite loop */}
      <div className={clsx(styles['logo__items'])}>
        {logos.map((logo, idx) => (
          <Image
            key={`logo-1-${idx}`}
            src={`/images/logo-slider/${logo}`}
            alt={path.parse(logo).name}
            width={100}
            height={100}
          />
        ))}

      </div>
      <div className={clsx(styles['logo__items'])}>
        {logos.map((logo, idx) => (
          <Image
            key={`logo-2-${idx}`}
            src={`/images/logo-slider/${logo}`}
            alt={path.parse(logo).name}
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
}