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
      <h1 className="text-xl font-semibold">Upload</h1>
      <p className="mt-2">Your upload UI goes here.</p>
    </main>
  );
}
