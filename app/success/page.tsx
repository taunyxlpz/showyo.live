export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function SuccessPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Payment successful ✅</h1>
      {/* TODO: show any success details here (no blocking fetch at build time) */}
    </main>
  );
}
