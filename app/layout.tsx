import './globals.css';
import React from 'react';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export const revalidate: false | number = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-dvh bg-black text-white antialiased">{children}</body>
    </html>
  );
}
