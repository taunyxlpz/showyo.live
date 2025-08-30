export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">ShowYo</h1>
      <p className="mt-2">Home</p>
    </main>
  );
}
