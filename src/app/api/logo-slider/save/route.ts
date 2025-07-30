import LogoSliderModel from '@/lib/models/LogoSliderModel';
import { connect } from '@/lib/mongodb/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { logos } = await req.json();

    type Logo = {
      url: string;
      alt: string;
      order: number;
    };

    const cleanLogos = logos.map((logo: Logo) => ({
      url: logo.url,
      alt: logo.alt,
      order: logo.order
    }));

    await LogoSliderModel.deleteMany({});
    await LogoSliderModel.insertMany(cleanLogos);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Save logos error:', err);
    return NextResponse.json({ error: 'Failed to save logos' }, { status: 500 });
  }
}