import { AboutMetadata } from '@/app/about/metadata';
import { getCarouselImages } from '@/lib/services/imageService';
import styles from '@/styles/components/about.module.scss';
import clsx from 'clsx';
import HomeImageCarousel from '../components/HomeImageCarousel';
import LogoSlider from '../components/LogoSlider/LogoSlider';
import { Divider } from '../components/Divider';
import FeaturedLayout from '../components/Layout/FeaturedLayout';
import AboutJsonLd from './AboutJsonLd';

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
        <section className={clsx('about__hero', 'relative', 'w-full')}>
          <HomeImageCarousel images={images} />

          <div
            className={clsx(
              styles['about__text-container'],
              'text-start',
              'text-white',
              'z-10',
            )}
          >
            <h1
              className={clsx(
                styles['about__text'],
                'mb-1'
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
            We’re a creative team specializing in 3D design, animation, and visual effects. From stylized content to photorealistic renders, we help brands and studios bring ideas to life.
          </h2>

          <article className={clsx(styles['about__article'])}>
            <h3 className={clsx(styles['about__subheading'])}>
              3D Modeling
            </h3>
            <p className={clsx(styles['about__paragraph'])}>
              Custom-built characters, environments, props, and product models for animation,
              games, and visualizations.
            </p>
          </article>

          <article className={clsx(styles['about__article'])}>
            <h3 className={clsx(styles['about__subheading'])}>
              3D animation
            </h3>
            <p className={clsx(styles['about__paragraph'])}>
              Full-service animation including character animation, creature animation, motion graphics, and explainer animations. Ideal for film, games, and branded content.
            </p>
          </article>

          <article className={clsx(styles['about__article'])}>
            <h3 className={clsx(styles['about__subheading'])}>
              Game trailers & Cinematics
            </h3>
            <p className={clsx(styles['about__paragraph'])}>
              High-impact trailers, teaser videos, and in-game cinematics that bring your game’s story and style to life. Perfect for launches, Steam pages, and social media campaigns.
            </p>
          </article>

          <article className={clsx(styles['about__article'])}>
            <h3 className={clsx(styles['about__subheading'])}>
              Product visualization
            </h3>
            <p className={clsx(styles['about__paragraph'])}>
              Photorealistic or stylized 3D renders of products for ads, websites, and e-commerce platforms.
            </p>
          </article>

          <article className={clsx(styles['about__article'])}>
            <h3 className={clsx(styles['about__subheading'])}>
              Commercial & Advertising Animation
            </h3>
            <p className={clsx(styles['about__paragraph'])}>
              3D commercials tailored for online, TV, or social platforms. Includes stylized ads, animated promos, and branded storytelling.
            </p>
          </article>

          <article className={clsx(styles['about__article'])}>
            <h3 className={clsx(styles['about__subheading'])}>
              Visual Effects (VFX)
            </h3>
            <p className={clsx(styles['about__paragraph'])}>
              Smoke, fire, fluid simulations, destruction, particle effects, and compositing for dynamic video projects.
            </p>
          </article>

          <article className={clsx(styles['about__article'])}>
            <h3 className={clsx(styles['about__subheading'])}>
              3D for AR/VR
            </h3>
            <p className={clsx(styles['about__paragraph'])}>
              Optimized 3D assets and immersive environments for augmented and virtual reality platforms.
            </p>
          </article>
        </section>

        <section className={clsx(styles['about__slider'])}>
          <h2 className={clsx(styles['about__slider-title'])}>
            Selected clients & collaborations
          </h2>
          <Divider />
          <LogoSlider />
          <Divider />
        </section>

        <FeaturedLayout />
      </main>
    </>
  );
}