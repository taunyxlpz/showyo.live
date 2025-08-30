export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import SafeImage from '../components/SafeImage';

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
      {/* TODO: keep your current upload UI here.
          Important: do NOT pass onClick/onChange/etc from this Server file.
          If a section needs handlers, move that section into a 'use client' component. */}
    </main>
  );
}
