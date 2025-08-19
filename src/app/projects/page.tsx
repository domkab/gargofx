import { getCarouselImages } from '@/lib/services/imageService';
import { getFeaturedLayout } from '@/lib/services/postService';
import styles from '@/styles/components/projects.module.scss';
import type { FeaturedLayoutRow } from '@/types/featuredLayout';
import clsx from 'clsx';
import { Divider } from '../components/Divider';
import HomeImageCarousel from '../components/HomeImageCarousel';
import FeaturedLayout from '../components/Layout/FeaturedLayout';
import { projectsMetadata } from './metadata';
import ProjectsJsonLd from './ProjectsJsonLd';

export const revalidate = 120;
export const metadata = projectsMetadata

export default async function FeaturedProjectsLayout() {
  const layout: FeaturedLayoutRow[] = await getFeaturedLayout();
  const images = await getCarouselImages();

  if (!layout?.length) return null;

  return (
    <>
      <ProjectsJsonLd />
      <main
        className={clsx(
          'flex flex-col items-center justify-center',
          // 'min-h-[70vh]',
        )}>

        <section className={clsx(
          'projects__hero',
          'relative',
          'w-full'
        )}
        >
          <HomeImageCarousel images={images} />

          <div
            className={clsx(
              styles['projects__text-container'],
              'text-start',
              'text-white/95',
              'z-10',
            )}
          >
            <h1
              className={clsx(
                styles['projects__text'],
              )}
            >
              Featured projects
            </h1>

            <p
              className={clsx(
                styles['projects__text'],
                styles['projects__text--year'],
              )}
            >
              2024-2025
            </p>
          </div>

          {/* Divider line */}
          <Divider
            marginTop={44}
            marginLeft={20}
            marginRight={20}
          />

        </section>

        <FeaturedLayout />
      </main>
    </>

  );
}