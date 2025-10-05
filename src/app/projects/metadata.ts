import type { Metadata } from 'next'
import { seoDefaults } from '@/lib/seoDefaults'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const projectsMetadata: Metadata = {
  ...seoDefaults,
  title: { absolute: `${SITE_NAME} | Featured Projects` },
  description:
    'Discover GargoFX projects — cinematic 3D animations, product films, and realistic renders crafted for brands and studios worldwide.',
  keywords: [
    '3D animation projects',
    'product film portfolio',
    'cinematic ads',
    '3D renders showcase',
    'GargoFX work',
  ],
  alternates: { canonical: '/projects' },
}