import { buildOrganization, buildWebsite } from '@/lib/StructuredData';
import JsonLd from './components/seo/JsonLd';

export default function SiteJsonLd() {
  return (
    <>
      <JsonLd id="ld-org" data={buildOrganization()} />
      <JsonLd id="ld-website" data={buildWebsite()} />
    </>
  )
}