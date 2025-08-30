import type { ReactNode } from 'react';
import BrandLogo from '@/components/BrandLogo';

export const revalidate: false | number = false;

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="w-full flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/70">
        <BrandLogo className="h-6 w-auto" />
        <span className="text-sm opacity-70">ShowYo</span>
      </header>
      <main className="w-full">{children}</main>
    </>
  );
}
