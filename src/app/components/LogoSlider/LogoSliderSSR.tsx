import Image from 'next/image';
import clsx from 'clsx';
import styles from '@/styles/components/logo-slider.module.scss';
import { getLogoSlider } from '@/lib/services/imageService';

export default async function LogoSlider() {
  const logos = await getLogoSlider();

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