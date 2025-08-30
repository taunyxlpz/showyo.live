import type { Metadata, Viewport } from 'next';
import './globals.css';
import BrandLogo from '@/components/BrandLogo';

export const metadata: Metadata = {
  title: 'ShowYo',
  description: 'ShowYo Digital Signage',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const revalidate = false;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#000', color: '#fff', margin: 0 }}>
        <header style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,.1)',
          background: 'rgba(0,0,0,.7)'
        }}>
          <BrandLogo className="h-6 w-auto" />
          <span style={{ font: '14px system-ui', opacity: .7 }}>ShowYo</span>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
