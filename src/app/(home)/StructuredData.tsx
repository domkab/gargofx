import { SITE_NAME } from '@/lib/constants'
import Script from 'next/script'

export default function StructuredData() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: 'https://www.your-domain.com',
    logo: 'https://www.your-domain.com/logo.png',
    sameAs: [
      'https://www.linkedin.com/company/your-company',
      'https://www.instagram.com/your-handle',
      'https://vimeo.com/your-handle',
      // add others you actually use
    ],
    description:
      'Creative studio for 3D design, animation, VFX, product visualization, and game cinematics.',
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'business',
      email: 'hello@your-domain.com',
      availableLanguage: ['en']
    }]
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.your-domain.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.your-domain.com/about' }
    ]
  }

  return (
    <>
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(org)}
      </Script>
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumb)}
      </Script>
    </>
  )
}