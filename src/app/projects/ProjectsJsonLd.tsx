// app/projects/ProjectsJsonLd.tsx
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildBreadcrumb, buildCollectionPage } from '@/lib/structured-data';
import JsonLd from '../components/seo/JsonLd';

export default function ProjectsJsonLd() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Home', item: `${SITE_URL}/` },
    { name: 'Projects', item: `${SITE_URL}/projects` },
  ]);

  const collection = buildCollectionPage({
    name: `Featured projects | ${SITE_NAME}`,
    url: `${SITE_URL}/projects`,
    description:
      'Featured 3D animation, VFX, and product render projects (2024–2025).',
    breadcrumb,
  });

  return (
    <>
      <JsonLd id="ld-breadcrumb-projects" data={breadcrumb} />
      <JsonLd id="ld-collection-projects" data={collection} />
    </>
  );
}