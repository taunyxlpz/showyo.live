export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import SafeImage from './components/SafeImage';

export default function Page() {
  return (
    <main className="p-6">
      <SafeImage
        src="/ShowYo Yellow.png"
        alt="ShowYo"
        width={240}
        height={80}
        className="h-auto w-auto"
      />
      {/* TODO: put your existing homepage JSX here if you want */}
    </main>
  );
}
