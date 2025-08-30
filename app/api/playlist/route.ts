import { NextResponse } from 'next/server';

export const revalidate: false | number = 0;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Item = { key: string; url?: string; duration?: number };

export async function GET() {
  // demo item so /player works before S3 is wired
  const demo: Item[] = [{ key: 'demo', url: '/demo.jpg', duration: 10 }];
  return NextResponse.json(demo, { headers: { 'Cache-Control': 'no-store' } });
}
