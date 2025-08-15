import { buildOrganization, buildWebsite } from '@/lib/structured-data';
import JsonLd from './components/seo/JsonLd';

export default function SiteJsonLd() {
  return (
    <>
      <JsonLd id="ld-org" data={buildOrganization()} />
      <JsonLd id="ld-website" data={buildWebsite()} />
    </>
  )
}