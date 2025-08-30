export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav style={{ display: 'flex', gap: 12, padding: '12px 0' }}>
        <Link href="/admin/marketing">Marketing</Link>
        <Link href="/admin">Overview</Link>
      </nav>
      <div>{children}</div>
    </section>
  );
}
