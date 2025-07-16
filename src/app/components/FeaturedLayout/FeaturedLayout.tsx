import { getFeaturedLayout } from '@/lib/services/postService';
import clsx from 'clsx';

export default async function FeaturedLayout() {
  const layout = await getFeaturedLayout(); // returns rows with blocks (each has image, postId, layout)

  if (!layout?.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">🎯 Featured Layout</h2>

      <div className="space-y-8">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-4">
            {row.blocks.map((block, blockIndex) => (
              <div
                key={`${rowIndex}-${blockIndex}-${block.id}`}
                className={clsx(
                  'rounded overflow-hidden shadow-sm bg-white dark:bg-gray-900',
                  {
                    'w-full': block.layout === 'full',
                    'w-2/3': block.layout === '2/3',
                    'w-1/2': block.layout === '1/2',
                    'w-1/3': block.layout === '1/3',
                  }
                )}
              >
                {block.image?.desktop?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={block.image.desktop.url}
                    alt={block.image.desktop.alt || ''}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}