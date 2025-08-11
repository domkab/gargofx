import { getFeaturedLayout } from '@/lib/services/postService';
import clsx from 'clsx';
import Link from 'next/link';
import type { FeaturedLayoutRow } from '@/types/featuredLayout';

// unused code?

async function FeaturedLayout() {
  const layout: FeaturedLayoutRow[] = await getFeaturedLayout();

  if (!layout?.length) return null;

  return (
    <section className="max-w-6xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">🎯 Featured Layout</h2>

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
    </section>
  );
}