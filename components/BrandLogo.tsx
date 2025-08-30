'use client';

import { useState } from 'react';

export default function BrandLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  const [src, setSrc] = useState('/logo.png'); // primary logo in /public
  return (
    <img
      src={src}
      alt="ShowYo"
      className={className}
      onError={() => setSrc('/favicon.ico')} // safe fallback if logo missing
    />
  );
}
