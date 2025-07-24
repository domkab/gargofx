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

      <div className={clsx('relative', 'w-full')}>
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
      </div>

      <div className="space-y-8">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-4">
            {row.blocks.map((block, blockIndex) => (
              <div
                key={`${rowIndex}-${blockIndex}-${block.id}`}
                className={clsx(
                  'mb-4',
                  'rounded overflow-hidden shadow-sm bg-white dark:bg-gray-900',
                  {
                    'w-[calc(25%-1rem)]': block.layout === '1/4',
                    'w-[calc(50%-1rem)]': block.layout === '1/2',
                    'w-full': block.layout === 'full',
                  }
                )}
              >
                <Link href={`/post/${block.post?.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.image?.desktop?.url || ''}
                    alt={block.image?.desktop?.alt || ''}
                    className="w-full h-64 object-cover"
                  />
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}