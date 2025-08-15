import type { Metadata } from 'next'
import { seoDefaults } from '@/lib/seoDefaults'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const projectsMetadata: Metadata = {
  ...seoDefaults,
  // title: `Featured Projects — ${SITE_NAME}`,
  title: { absolute: `${SITE_NAME} | Featured Projects` },
  description:
    'Explore our featured 3D animation, VFX, and product render projects from 2024–2025.',
  keywords: [
    'featured 3D projects',
    'VFX portfolio',
    'product render showcase',
    'animation highlights',
  ],
  alternates: { canonical: '/projects' },
}