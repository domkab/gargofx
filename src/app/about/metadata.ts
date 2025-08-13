// app/page.tsx
import type { Metadata } from 'next'
import { SITE_NAME } from '../../lib/constants'

export const revalidate = 300

export const AboutMetadata: Metadata = {
  metadataBase: new URL('https://www.your-domain.com'),
  title: `${SITE_NAME} — 3D Animation, VFX & Product Renders`,
  description:
    'GargoFX is a 3D animation and VFX studio delivering game trailers, product visualization, and cinematic content for brands and studios.',
  keywords: [
    '3D animation',
    'VFX studio',
    'game trailers',
    'product visualization',
    'cinematics',
    'motion graphics',
  ],
  alternates: { canonical: '/' },
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
    url: 'https://www.your-domain.com/',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — 3D Animation, VFX & Product Renders`,
    description:
      'Game trailers, product visualization, and cinematic 3D content.',
    images: ['/og/home-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — 3D Animation, VFX & Product Renders`,
    description:
      'Game trailers, product visualization, and cinematic 3D content.',
    images: ['/og/home-og.png'],
  },
}