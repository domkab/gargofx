'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';
import styles from '@/styles/components/home.module.scss';
import clsx from 'clsx';

type Props = {
  images: string[];
};

export default function HomeImageCarousel({ images }: Props) {
  if (!images.length) return null;

  return (
    <div
      className={clsx(
        styles['home__carousel'],
        'w-full relative z-0'
      )}
    >
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
        fadeEffect={{ crossFade: true }}
        speed={1800}
        // loop
        className="h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-full">
            <Image
              src={img}
              alt={`Slide ${idx}`}
              fill
              quality={90}
              priority={idx === 0}
              className='object-cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}