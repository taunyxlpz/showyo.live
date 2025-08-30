export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function PlayerPage() {
  return (
    <>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Player</h1>
      <p style={{ marginTop: 8 }}>Player runtime goes here.</p>
    </>
  );
}
