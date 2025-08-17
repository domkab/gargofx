import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { getPostBySlug } from '@/lib/services/postService';
import { IPost } from '@/types/post/iPost';
import { getImageUrl } from '@/utils/getImageUrl';
import { Metadata } from 'next';

export async function generateProjectMetadata(slug: string): Promise<Metadata> {
  const post: IPost | null = await getPostBySlug(slug);

  if (!post) {
    return {
      title: { absolute: `${SITE_NAME} | Not found` },
      robots: { index: false, follow: false },
    };
  }

  const titleText = [post.title?.bold, post.title?.regular].filter(Boolean).join(' ').trim();
  const desc =
    post.description ||
    post.optionalDescription ||
    `${SITE_NAME} project showcase`;

  const heroUrl = post.heroImage?.url ? getImageUrl(post.heroImage.url) : undefined;
  const heroAlt = post.heroImage?.alt || titleText || 'Project image';
  const canonical = `/projects/${slug}`;
  const absoluteCanonical = `${SITE_URL}/projects/${slug}`;

  return {
    title: { absolute: `${SITE_NAME} | ${titleText}` },
    description: desc,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: absoluteCanonical,
      siteName: SITE_NAME,
      title: titleText || `${SITE_NAME} Project`,
      description: desc,
      ...(heroUrl
        ? { images: [{ url: heroUrl, width: 1200, height: 630, alt: heroAlt }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText || `${SITE_NAME} Project`,
      description: desc,
      ...(heroUrl ? { images: [heroUrl] } : {}),
    },
  };
}