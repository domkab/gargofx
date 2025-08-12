import { getFeaturedLayout } from '@/lib/services/postService';
import clsx from 'clsx';
import Link from 'next/link';
import styles from '@/styles/components/projects.module.scss';
import type { FeaturedLayoutRow } from '@/types/featuredLayout';

export const revalidate = 240;

export default async function FeaturedLayout() {
  const layout: FeaturedLayoutRow[] = await getFeaturedLayout();

  if (!layout?.length) return null;

  return (
    <section className="layout md:px-5 px-6 mt-12 mb-20">
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
                    alt={block.image?.desktop?.alt || ''}
                    className={clsx(styles['projects__card-image'])}
                  />
                </picture>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}