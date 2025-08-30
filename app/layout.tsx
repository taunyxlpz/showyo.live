export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import React from 'react';
import BrandLogo from '../components/BrandLogo'; // ← relative import (no "@/")

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="p-4">
          <BrandLogo className="h-auto w-auto" />
        </header>
        {children}
      </body>
    </html>
  );
}
