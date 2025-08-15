import { HOME_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildBreadcrumb, SITE_ID } from '@/lib/structured-data';
import JsonLd from '../components/seo/JsonLd';

export default function HomeJsonLd() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Home', item: `${SITE_URL}/` },
  ]);

  const homePage = {
    '@context': 'https://schema.org',
    '@type': ['WebPage', 'CollectionPage'],
    '@id': `${SITE_URL}/#home`,
    url: SITE_URL,
    name: SITE_NAME,
    description: HOME_DESCRIPTION,
    isPartOf: { '@id': SITE_ID },
    breadcrumb,
  };

  return (
    <>
      <JsonLd id="ld-breadcrumb-home" data={breadcrumb} />
      <JsonLd id="ld-home" data={homePage} />
    </>
  );
}