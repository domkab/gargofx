import {
  SITE_NAME,
} from '@/lib/constants'
import { seoDefaults } from '@/lib/seoDefaults';
import { Metadata } from 'next';

export const LayoutMetadata: Metadata = {
  ...seoDefaults,
  title: {
    default: `${SITE_NAME} | 3D Animation, VFX & Product Renders`,
    template: `%s — ${SITE_NAME} | 3D Animation, VFX & Product Renders`,
  },
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
    alternates: { canonical: '/'},
}