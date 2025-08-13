// app/about/twitter-image.tsx
import { ImageResponse } from 'next/og'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 56,
          background: '#111',
          color: '#ffcc00',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {SITE_NAME} | {SITE_DESCRIPTION}
      </div>
    ),
    { ...size }
  )
}