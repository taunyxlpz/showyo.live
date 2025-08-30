'use client';

import SafeImage from '@/app/components/SafeImage';

export default function Logo() {
  return (
    <SafeImage
      src="/ShowYo Yellow.png"
      alt="ShowYo"
      width={240}
      height={80}
      className="h-auto w-auto"
    />
  );
}
