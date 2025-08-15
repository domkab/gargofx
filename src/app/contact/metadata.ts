import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const revalidate = 300;

export const ContactMetadata: Metadata = {
  title: { absolute: `${SITE_NAME} | Contact` },
  description:
    'Get in touch with GargoFX for project inquiries, quotes, or general questions about our 3D animation, VFX, and product visualization services.',
  keywords: [
    'Contact GargoFX',
    '3D animation inquiries',
    'VFX studio contact',
    'product visualization quotes',
    'hire 3D animation team',
  ],
  alternates: { canonical: '/contact' },
};