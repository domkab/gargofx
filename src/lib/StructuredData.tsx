import { mail, phone, SITE_NAME, SITE_URL } from '@/lib/constants'

export function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/logo.svg`,
    sameAs: [
      'https://www.linkedin.com/company/your-company',
      'https://www.instagram.com/your-handle',
      'https://vimeo.com/your-handle',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: phone,
        email: mail,
        areaServed: ['LT', 'EU', 'US'],
        availableLanguage: ['en', 'lt'],
        url: `${SITE_URL}/contact`,
      },
    ],
  }
}

export function buildWebsite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  }
}

export function buildBreadcrumb(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  }
}

export function buildCollectionPage({
  name,
  url,
  description,
}: {
  name: string
  url: string
  description?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url,
    ...(description ? { description } : {}),
  }
}