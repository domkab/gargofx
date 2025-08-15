import { SITE_NAME, SITE_URL } from '@/lib/constants'
import { buildBreadcrumb, buildCollectionPage } from '@/lib/StructuredData'
import JsonLd from '../components/seo/JsonLd'

export default function ProjectsJsonLd() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-projects"
        data={buildBreadcrumb([
          { name: 'Home', item: SITE_URL },
          { name: 'Projects', item: `${SITE_URL}/projects` },
        ])}
      />
      <JsonLd
        id="ld-collection-projects"
        data={buildCollectionPage({
          name: `Featured projects | ${SITE_NAME}`,
          url: `${SITE_URL}/projects`,
          description:
            'Featured 3D animation, VFX, and product render projects (2024–2025).',
        })}
      />
    </>
  )
}