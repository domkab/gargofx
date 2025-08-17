import { HOME_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildBreadcrumb, buildCollectionPage} from '@/lib/structured-data';
import JsonLd from '../components/seo/JsonLd';

export default function HomeJsonLd() {
  const url = SITE_URL;

  const breadcrumb = buildBreadcrumb([
    { name: 'Home', item: `${SITE_URL}/` },
  ]);

  const homePage = {
    ...buildCollectionPage({
      name: SITE_NAME,
      url,
      description: HOME_DESCRIPTION,
      breadcrumb,
    }),
    '@type': ['WebPage', 'CollectionPage'],
    '@id': `${url}#home`,
  };

  return (
    <>
      <JsonLd id="ld-breadcrumb-home" data={breadcrumb} />
      <JsonLd id="ld-home" data={homePage} />
    </>
  );
}