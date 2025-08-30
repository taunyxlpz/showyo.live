export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function PlayerPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Player</h1>
      {/* TODO: your player logic goes here.
          Keep anything interactive inside a 'use client' component. */}
    </main>
  );
}
