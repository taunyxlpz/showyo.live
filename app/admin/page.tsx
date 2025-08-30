export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Link from 'next/link';

export default function AdminHome() {
  return (
    <>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Admin</h1>
      <p style={{ marginTop: 8 }}>
        Go to <Link href="/admin/marketing">Marketing</Link>
      </p>
    </>
  );
}
