export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import React from 'react';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div style={{ fontWeight: 800 }}>ShowYo</div>
          <nav className="nav">
            <Link href="/upload">Upload</Link>
            <Link href="/player">Player</Link>
            <Link href="/success">Success</Link>
            <Link href="/cancel">Cancel</Link>
            <Link href="/admin/marketing">Admin</Link>
          </nav>
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
