import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL, x } from '@/lib/constants'

export const seoDefaults: Pick<
  Metadata, 
  'metadataBase'| 'robots' | 'openGraph' | 'twitter'
> = {
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    site: `${x}`,
    creator: `${x}`,
  },
}