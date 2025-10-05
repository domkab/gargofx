import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const revalidate = 800;

export const ContactMetadata: Metadata = {
  title: { absolute: `${SITE_NAME} | Contact` },
  description:
    'Ready to bring your idea to life? Contact GargoFX for 3D animation, cinematic ads, or product film collaborations.',
  keywords: [
    'Contact GargoFX',
    '3D animation studio contact',
    'hire 3D animator',
    'product film inquiries',
    'cinematic ads',
    '3D animation quotes',
  ],
  alternates: { canonical: '/contact' },
};