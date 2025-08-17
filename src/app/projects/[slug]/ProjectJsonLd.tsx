import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { buildBreadcrumb, SITE_ID, ORG_ID } from '@/lib/structured-data';
import JsonLd from '@/app/components/seo/JsonLd';
import { getImageUrl } from '@/utils/getImageUrl';
import type { IPost } from '@/types/post/iPost';

export default function ProjectJsonLd({ post, slug }: { post: IPost; slug: string }) {
  const url = `${SITE_URL}/projects/${slug}`;
  const titleText = [post.title?.bold, post.title?.regular].filter(Boolean).join(' ').trim();
  const desc = post.description || post.optionalDescription;
  const heroUrl = post.heroImage?.url ? getImageUrl(post.heroImage.url) : undefined;

  const breadcrumb = buildBreadcrumb([
    { name: 'Home', item: `${SITE_URL}/` },
    { name: 'Projects', item: `${SITE_URL}/projects` },
    { name: titleText || 'Project', item: url },
  ]);

  const projectPage = {
    '@context': 'https://schema.org',
    '@type': ['CreativeWork', 'WebPage'],
    '@id': `${url}#project`,
    url,
    name: titleText || `${SITE_NAME} Project`,
    ...(desc ? { description: desc } : {}),
    ...(heroUrl
      ? { image: { '@type': 'ImageObject', url: heroUrl } }
      : {}),
    ...(post.createdAt ? { datePublished: post.createdAt } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    // ...(Array.isArray((post as any).tags) && (post as any).tags.length
    //   ? { keywords: (post as any).tags.join(', ') }
    //   : {}),
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
    breadcrumb,
  };

  return (
    <>
      <JsonLd id="ld-breadcrumb-project" data={breadcrumb} />
      <JsonLd id="ld-project" data={projectPage} />
    </>
  );
}