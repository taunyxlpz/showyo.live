export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Payment successful ✅</h1>
      <p style={{ marginTop: 8 }}>
        Thanks! You can now <Link href="/upload">continue to upload</Link>.
      </p>
    </>
  );
}
