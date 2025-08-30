'use client';

import { useState } from 'react';

export default function BrandLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  const [src, setSrc] = useState('/logo.png'); // put a real logo in public/logo.png
  return (
    <img
      src={src}
      alt="ShowYo"
      className={className}
      onError={() => setSrc('/favicon.ico')} // harmless client-side fallback
    />
  );
}
