import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const dir = path.join(process.cwd(), 'public/images/logo-slider');
  const files = fs
    .readdirSync(dir)
    .filter(file => !file.startsWith('.') && /\.(png|jpg|jpeg|webp|svg)$/i.test(file));

  return NextResponse.json(files);
}