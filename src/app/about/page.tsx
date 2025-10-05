import { AboutMetadata } from '@/app/about/metadata';
import { getCarouselImages } from '@/lib/services/imageService';
import styles from '@/styles/components/about.module.scss';
import clsx from 'clsx';
import HomeImageCarousel from '../components/HomeImageCarousel';
import LogoSlider from '../components/LogoSlider/LogoSlider';
import { Divider } from '../components/Divider';
import FeaturedLayout from '../components/Layout/FeaturedLayout';
import AboutJsonLd from './AboutJsonLd';
import ParticleClient from '../components/Particles/ParticleClient';
import Image from 'next/image';


export const revalidate = 300;
export const metadata = AboutMetadata;

export default async function AboutPage() {
  const images = await getCarouselImages();

  return (
    <>
      <AboutJsonLd />
      <main className={clsx(
        styles['about'], 'about'
      )}>
        <section className={clsx(
          'about__hero',
          'relative',
          'w-full',
          'z-20'
        )}
        >
          <HomeImageCarousel images={images} />

          <div
            className={clsx(
              styles['about__text-container'],
              'text-start',
              'text-white/95',
              'z-10',
            )}
          >
            <h1
              className={clsx(
                styles['about__text'],
              )}
            >
              About us
            </h1>

            <p
              className={clsx(
                styles['about__text'],
                styles['about__text--secondary'],
              )}
            >
              Who we are and what we do
            </p>
          </div>
        </section>

        <section className={clsx(styles['about__content'])}>
          <h2 className={clsx(styles['about__content-title'])}>
            GargoFX is a 3D animation studio based in Vilnius, Lithuania. We create high-quality product films, commercials, and cinematic 3D visuals that help brands stand out.
          </h2>
        </section>

        <Divider />

        <section className={clsx(styles['about__content'])}>
          <ParticleClient />

          <article className={clsx(styles['about__article'])}>
            <p className={clsx(styles['about__paragraph'])}>
              From product films and commercials to high-end visuals with simulations, lighting, and realistic rendering — our work helps brands stand out and sell.
            </p>

            <Image
              src="/icons/Logo.svg"
              alt="Description of image"
              width={700}
              height={100}
              className={clsx(styles['about__article-logo'])}
            />
          </article>
        </section>

        <section className={clsx(styles['about__slider'])}>
          <h2 className={clsx(styles['about__slider-title'])}>
            Selected clients & collaborations
          </h2>
          <Divider className={clsx(styles['about__slider-divider-top'])} />
          <LogoSlider />
          <Divider className={clsx(styles['about__slider-divider-bottom'])} marginBottom={80} />
        </section>

        {/* <Divider /> */}

        <FeaturedLayout />
      </main >
    </>
  );
}