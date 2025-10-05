import {
  HOME_DESCRIPTION,
  SITE_NAME,
} from '@/lib/constants'
import { seoDefaults } from '@/lib/seoDefaults';
import { Metadata } from 'next';

export const LayoutMetadata: Metadata = {
  ...seoDefaults,
  title: {
    default: `${SITE_NAME} | Cinematic 3D Animation & Product Films`,
    template: `%s — ${SITE_NAME} | Cinematic 3D Animation & Product Films`,
  },
  description: HOME_DESCRIPTION,
  keywords: [
    '3D animation studio',
    'product animation',
    'cinematic ads',
    'product visualization',
    '3D rendering',
    'commercial animation',
    'GargoFX',
  ],
  alternates: { canonical: '/' },
};