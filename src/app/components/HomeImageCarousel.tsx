'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function HomeImageCarousel() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/home/carousel')
      .then((res) => res.json())
      .then((data) => {
        const all = [data.firstImage, ...data.postImages].filter(Boolean);
        setImages(all);
      })
      .catch(console.error);
  }, []);

  if (!images.length) return null;

  return (
    <div className="w-full aspect-[16/9] overflow-hidden">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        fadeEffect={{ crossFade: true }}
        loop
        className="h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="w-full h-full object-cover transition-opacity duration-2000"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}