import type { Metadata } from 'next'
import { SITE_NAME } from '../../lib/constants'

export const revalidate = 300

export const AboutMetadata: Metadata = {
  title: { absolute: `${SITE_NAME} | About Us` },
  description:
    'GargoFX is a 3D animation studio built on precision, creativity, and storytelling. We craft cinematic visuals — from product films to full 3D ads — driven by a passion for design and detail.',
  keywords: [
    'GargoFX studio',
    '3D animation studio',
    'cinematic product films',
    '3D ads',
    '3D design and animation',
  ],
  alternates: { canonical: '/about' },
}