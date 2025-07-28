import NotFound from '@/app/not-found';
import { getPostBySlug } from '@/lib/services/postService';
import { IPost } from '@/types/post/iPost';
import Image from 'next/image';
import styles from '@/styles/components/project.module.scss';
import clsx from 'clsx';
import { Divider } from '@/app/components/Divider';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: IPost | null = await getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <main className={clsx(
      styles['project'],
      // 'md:flex md:flex-col'
    )}
    >
      <section className={styles['project__hero']}>
        <Image
          src={post.heroImage.url}
          alt={post.heroImage.alt || 'Hero Image'}
          fill
          className={styles['project__hero-image']}
          priority
        />

        <div className={styles['project__hero-text-container']}>
          <h1 className={styles['project__hero-title']}>
            {post.title.bold}
            {post.title.regular && (
              <span className={styles['project__hero-subtitle']}>{post.title.regular}</span>
            )}
          </h1>
        </div>
      </section>

      {/* Descriptions */}

      <div className={styles['project__desc-container']}>
        {post.description && <p className={styles['project__desc']}>{post.description}</p>}

        {post.optionalDescription && (
          <p
            className={clsx(
              styles['project__opt-desc'],
              'text-gray-300'
            )}
          >
            {post.optionalDescription}
          </p>
        )}
      </div>

      <Divider marginBottom={30} className={styles['project__separator']} />

      {/* Content Blocks */}
      <section className="grid grid-cols-2 gap-4 mx-5">
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
                  className="w-full h-52 object-cover"
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