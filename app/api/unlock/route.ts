import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = (url.searchParams.get('type') || 'photo').toLowerCase();
  const res = NextResponse.redirect(new URL('/upload', url).toString());
  res.cookies.set('uploadUnlocked', type, { path: '/', maxAge: 60 * 60 }); // 1h
  return res;
}
