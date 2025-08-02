
import Image from 'next/image';
import styles from '@/styles/components/logo-slider.module.scss';
import clsx from 'clsx';
import { getLogoSlider } from '@/lib/services/imageService';

export const revalidate = 240;

export default async function LogoSlider() {
  const logos = await getLogoSlider();

  if (!logos.length) return null;

  return (
    <div className={clsx(styles['logos'])}>
      {[...Array(3)].map((_, groupIdx) => (
        <div key={groupIdx} className={clsx(styles['logo__items'])}>
          {logos.map((logo, idx) => (
            <Image
              key={`logo-${groupIdx}-${idx}`}
              src={logo.url}
              alt={logo.alt}
              width={100}
              height={100}
            />
          ))}
        </div>
      ))}
    </div>

  )
}