import { NextResponse } from 'next/server';

export const revalidate: false | number = 0;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Item = { key: string; url?: string; duration?: number };

export async function GET() {
  // Minimal demo payload so the player works out-of-the-box
  const demo: Item[] = [
    { key: 'demo', url: '/demo.jpg', duration: 10 }
  ];

  return NextResponse.json(demo, {
    headers: { 'Cache-Control': 'no-store' }
  });
}
