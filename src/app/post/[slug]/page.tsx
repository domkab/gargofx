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
    )}
    >
      <section className={styles['project__hero']}>
        <Image
          src={post.heroImage.url}
          alt={post.heroImage.alt || 'Hero Image'}
          fill
          quality={90}
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
              styles['project__opt-desc'], 'font-extralight'
            )}
          >
            {post.optionalDescription}
          </p>
        )}
      </div>

      <Divider marginBottom={30} className={styles['project__separator']} />

      {/* Content Blocks */}
      <section
        className={clsx(
          'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16',
          styles['project__content-wrapper']
        )}
      >
        {post.content.map((block) => (
          <div
            key={block.id}
            className={clsx(
              block.layout === 'full' && 'col-span-1 md:col-span-2',
              styles['project__content-block-wrapper']
            )}
          >
            {block.type === 'image' ? (
              <div
                className={clsx(
                  styles['project__content-block'],
                  'relative w-full'
                )}
              >
                <Image
                  src={block.url}
                  alt={block.alt || ''}
                  fill
                  quality={90}
                  className={clsx(styles['project__content-block-image'])}
                />
              </div>
            ) : block.type === 'video' ? (
              <iframe
                src={block.url}
                className={clsx(
                  styles['project__content-block'],
                  styles['project__content-block-video'],
                  'w-full'
                )}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>
        ))}
      </section>

      {/* Credits */}

      <div className={clsx(styles['project__credits'])}>
        {post.credits?.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </main>
  );
}