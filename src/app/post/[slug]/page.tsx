import NotFound from '@/app/not-found';
import { getPostBySlug } from '@/lib/services/postService';
import { IPost } from '@/types/post/iPost';
import Image from 'next/image';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: IPost | null = await getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <section className="relative w-full h-[30vh] flex items-center justify-center text-white text-center px-4">
        <Image
          src={post.heroImage.url}
          alt={post.heroImage.alt || 'Hero Image'}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold leading-tight">
            {post.title.bold}
            {post.title.regular && (
              <div className="font-normal mt-2">{post.title.regular}</div>
            )}
          </h1>
        </div>
      </section>

      {/* Descriptions */}
      {post.description && <p className="text-lg">{post.description}</p>}
      {post.optionalDescription && <p className="text-base text-gray-600">{post.optionalDescription}</p>}

      {/* Content Blocks */}
      <section className="grid grid-cols-2 gap-4">
        {post.content.map(block => {
          const isFull = block.layout === 'full';

          return (
            <div
              key={block.id}
              className={isFull ? 'col-span-2' : ''}
            >
              {block.type === 'image' ? (
                <Image
                  src={block.url}
                  alt={block.alt || ''}
                  width={1024}
                  height={300}
                  className="w-full h-auto object-cover rounded"
                />
              ) : block.type === 'video' ? (
                <video
                  src={block.url}
                  controls
                  className="w-full h-auto rounded"
                />
              ) : null}
            </div>
          );
        })}
      </section>

      {/* Credits */}
      <p className="text-sm text-gray-500 text-right">Credits: {post.credits}</p>
    </main>
  );
}