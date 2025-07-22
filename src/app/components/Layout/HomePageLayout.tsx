import { getHomePageLayout } from '@/lib/services/postService';
import { HomePageLayoutRow } from '@/types/HomePageLayout';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/components/home.module.scss';

export default async function HomePageLayout() {
  const layout: HomePageLayoutRow[] = await getHomePageLayout();

  if (!layout?.length) return null;

  return (
    <section className={styles['home__featured']}>
      <div
        className={clsx(
          styles['home__featured-title-container'],
          'flex items-center gap-4'
        )}
      >
        <h2
          className={clsx(
            styles['home__featured-title'],
            'text-white whitespace-nowrap'
          )}
        >
          Featured projects
        </h2>
        <div className="flex-1 h-px bg-white opacity-50" />
      </div>

      <div className="space-y-8">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-4">
            {row.blocks.map((block, blockIndex) => (
              <div
                key={`${rowIndex}-${blockIndex}-${block.id}`}
                className={clsx(
                  styles['home__featured-block'],
                  'overflow-hidden shadow-sm bg-white dark:bg-gray-900',
                  'w-[calc(50%-0.5rem)]',
                  {
                    // Override on medium+ screens
                    'md:w-[calc(25%-1rem)]': block.layout === '1/4',
                    'md:w-[calc(50%-1rem)]': block.layout === '1/2',
                    'md:w-full': block.layout === 'full',
                  }
                )}
              >
                <Link href={`/post/${block.post?.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.image?.desktop?.url || ''}
                    alt={block.image?.desktop?.alt || ''}
                    className={clsx(
                      styles['home__featured-image'],
                      'w-full object-cover',
                      'transition-transform duration-300 ease-in-out',
                      'hover:scale-105')}
                  />
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="text-center mt-7">
        <Link
          href="/featured"
        >
          <Image
            src="/icons/chevron-right.svg"
            alt="View all projects"
            width={22}
            height={22}
            className="inline-block mr-3"
          />
          View all projects
        </Link>
      </div>
    </section >
  );
}