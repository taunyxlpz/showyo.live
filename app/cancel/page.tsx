export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function CancelPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Payment canceled ❌</h1>
    </main>
  );
}
