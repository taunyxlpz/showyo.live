export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function Page() {
  return (
    <>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Home</h1>
      <p style={{ marginTop: 8 }}>Welcome to ShowYo.</p>
    </>
  );
}
