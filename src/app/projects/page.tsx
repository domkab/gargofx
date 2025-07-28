import { getFeaturedLayout } from '@/lib/services/postService';
import clsx from 'clsx';
import Link from 'next/link';
import type { FeaturedLayoutRow } from '@/types/featuredLayout';
import { getCarouselImages } from '@/lib/services/imageService';
import HomeImageCarousel from '../components/HomeImageCarousel';
import styles from '@/styles/components/projects.module.scss';

export default async function FeaturedProjectsLayout() {
  const layout: FeaturedLayoutRow[] = await getFeaturedLayout();

  const images = await getCarouselImages();

  if (!layout?.length) return null;

  return (
    <main
      className={clsx(
        'flex flex-col items-center justify-center',
        'min-h-[70vh]',
      )}>

      <div className={clsx('projects__hero','relative', 'w-full')}>
        <HomeImageCarousel images={images} />

        <div
          className={clsx(
            styles['projects__text-container'],
            'text-start',
            'text-white',
            'z-10',
          )}
        >
          <h1
            className={clsx(
              styles['projects__text'],
              'font-semibold'
            )}
          >
            Featured projects
          </h1>

          <h2
            className={clsx(
              styles['projects__text'],
              styles['projects__text--year'],
              'text-2xl sm:text-4xl',
            )}
          >
            2024-2025
          </h2>
        </div>

        {/* Divider line */}
        <div
          className={clsx(
            'divider-wrapper',
            styles['projects__featured-title-container'],
            'flex items-center gap-4',
            'mt-12 mx-5'
          )}
        >
          <div className="flex-1 h-px bg-white opacity-50" />
        </div>
      </div>

      <div className="layout md:px-5 px-6 mt-12 mb-20">
        {layout.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={clsx(
              styles['projects__card-wrapper'],
              'grid grid-cols-4 gap-8',
            )}
          >
            {row.blocks.map((block, blockIndex) => (
              <div
                key={`${rowIndex}-${blockIndex}-${block.id}`}
                className={clsx(
                  styles['projects__card'],
                  'overflow-hidden shadow-sm',
                  {
                    'col-span-4 md:col-span-1': block.layout === '1/4',
                    'col-span-4 md:col-span-2': block.layout === '1/2',
                    'col-span-4': block.layout === 'full',
                  }
                )}
              >
                <Link href={`/post/${block.post?.slug}`}>
                  <picture>
                    {block.image?.mobile?.url && (
                      <source
                        srcSet={block.image.mobile.url}
                        media="(max-width: 768px)"
                      />
                    )}

                    <img
                      src={block.image?.desktop?.url || block.image?.mobile?.url || ''}
                      alt={block.image?.desktop?.alt}
                      // className="w-full h-96 object-cover"
                      className={clsx(
                        styles['projects__card-image']
                      )}                    />
                  </picture>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}