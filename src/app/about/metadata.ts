import type { Metadata } from 'next'
import { SITE_NAME } from '../../lib/constants'

export const revalidate = 300

export const AboutMetadata: Metadata = {
  title: { absolute: `${SITE_NAME} | About Us` },
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
}