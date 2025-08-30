export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import SafeImage from '@/app/components/SafeImage';

export default function UploadPage() {
  return (
    <main className="p-6">
      <SafeImage
        src="/ShowYo Yellow.png"
        alt="ShowYo"
        width={180}
        height={60}
        className="mb-4 h-auto w-auto"
      />
      {/* Your upload UI here (if interactive, make that part a 'use client' component). */}
    </main>
  );
}
