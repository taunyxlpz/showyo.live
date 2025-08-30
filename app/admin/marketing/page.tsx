export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function AdminMarketingPage() {
  return (
    <>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Admin · Marketing</h1>
      <p style={{ marginTop: 8 }}>
        Put your campaigns, pixels, emails, and reporting UI here.
      </p>
    </>
  );
}
