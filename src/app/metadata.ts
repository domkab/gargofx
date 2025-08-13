import {
  SITE_NAME,
  SITE_URL,
  // TWITTER_HANDLE
} from '@/lib/constants'
import { Metadata } from 'next';

const TWITTER_HANDLE = '';

export const LayoutMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Site-wide title logic (page titles can use the template)
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },

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
    site: TWITTER_HANDLE,     // e.g. '@gargofx'
    creator: TWITTER_HANDLE,  // optional
  },
}