import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { Metadata } from 'next';

export const HomeMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} | ${SITE_DESCRIPTION}`,
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
}