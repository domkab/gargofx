// app/page.tsx
import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '../../lib/constants'

export const revalidate = 300

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} | About Us`,
  description:
    'Meet the GargoFX team — a creative collective specializing in 3D design, animation, VFX, and product visualization for brands, games, and studios worldwide.',
  keywords: [
    'About GargoFX',
    '3D animation studio team',
    'VFX artists',
    'product visualization experts',
    'game cinematic creators',
  ],
  alternates: { canonical: '/about' },
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