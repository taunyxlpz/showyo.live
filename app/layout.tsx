export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import React from 'react';
import Link from 'next/link';
import BrandLogo from '../components/BrandLogo';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            padding: '12px 16px',
            borderBottom: '1px solid #eee'
          }}
        >
          <BrandLogo />
          <nav style={{ display: 'flex', gap: 16 }}>
            <Link href="/upload">Upload</Link>
            <Link href="/player">Player</Link>
            <Link href="/success">Success</Link>
            <Link href="/cancel">Cancel</Link>
          </nav>
        </header>
        <main style={{ padding: '24px 16px' }}>{children}</main>
      </body>
    </html>
  );
}
