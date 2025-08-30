import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin/* paths
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const authHeader = req.headers.get('authorization') || '';
  const [scheme, encoded] = authHeader.split(' ');

  const user = process.env.ADMIN_USER || '';
  const pass = process.env.ADMIN_PASS || '';

  // If no creds configured, allow (so you don't lock yourself out in dev)
  if (!user || !pass) return NextResponse.next();

  // Expect "Basic base64(user:pass)"
  if (scheme !== 'Basic' || !encoded) {
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
    });
  }

  const decoded = Buffer.from(encoded, 'base64').toString('utf8');
  const [u, p] = decoded.split(':');

  if (u === user && p === pass) {
    return NextResponse.next();
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};
