import { getLogoSlider } from '@/lib/services/imageService';
import { NextResponse } from 'next/server';

export async function GET() {
  const logos = await getLogoSlider();
  return NextResponse.json(logos);
}