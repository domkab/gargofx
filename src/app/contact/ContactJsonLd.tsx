import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildBreadcrumb, buildCollectionPage } from '@/lib/structured-data';
import JsonLd from '../components/seo/JsonLd';

export default function ContactJsonLd() {
  const url = `${SITE_URL}/contact`;

  const breadcrumb = buildBreadcrumb([
    { name: 'Home', item: `${SITE_URL}/` },
    { name: 'Contact', item: url },
  ]);

  const contactPage = {
    ...buildCollectionPage({
      name: `Contact — ${SITE_NAME}`,
      url,
      description: 'Get in touch for project inquiries, quotes, or general questions.',
      breadcrumb,
    }),
    '@type': ['ContactPage', 'WebPage'],
    '@id': `${url}#contact`,
  };

  return (
    <>
      <JsonLd id="ld-breadcrumb-contact" data={breadcrumb} />
      <JsonLd id="ld-contact" data={contactPage} />
    </>
  );
}