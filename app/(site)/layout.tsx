// Optional runtime flags if this segment does any dynamic work.
// Safe to keep; remove if you want.
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import React from 'react';
import BrandLogo from '../../components/BrandLogo';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="p-4">
        <BrandLogo className="h-auto w-auto" />
      </nav>
      <div>{children}</div>
    </section>
  );
}
