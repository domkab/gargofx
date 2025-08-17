import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildBreadcrumb, buildCollectionPage } from '@/lib/structured-data';
import JsonLd from '../components/seo/JsonLd';

export default function AboutJsonLd() {
  const url = `${SITE_URL}/about`;

  const breadcrumb = buildBreadcrumb([
    { name: 'Home', item: `${SITE_URL}/` },
    { name: 'About', item: url },
  ]);

  const aboutPage = {
    ...buildCollectionPage({
      name: `About — ${SITE_NAME}`,
      url,
      description:
        'Learn about our 3D animation, VFX, and product visualization studio, team, and capabilities.',
      breadcrumb,
    }),
    '@type': ['AboutPage', 'WebPage'],
    '@id': `${url}#about`,
  };

  return (
    <>
      <JsonLd id="ld-breadcrumb-about" data={breadcrumb} />
      <JsonLd id="ld-about" data={aboutPage} />
    </>
  );
}