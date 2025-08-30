export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate: false | number = 0;
export const fetchCache = 'force-no-store';

import { NextRequest, NextResponse } from 'next/server';
import { presign } from '../../../lib/s3';

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key') || '';
  if (!key) return NextResponse.json({ error: 'missing key' }, { status: 400 });

  try {
    const url = await presign(key, 300);
    return NextResponse.redirect(url, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'presign failed' }, { status: 500 });
  }
}
