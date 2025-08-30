export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Link from 'next/link';

export default function Page() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">ShowYo</h1>
      <p>Home</p>

      <nav className="space-x-4">
        <Link href="/upload">Upload</Link>
        <Link href="/player">Player</Link>
        <Link href="/success">Success</Link>
        <Link href="/cancel">Cancel</Link>
      </nav>
    </main>
  );
}
