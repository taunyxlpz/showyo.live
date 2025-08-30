export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Link from 'next/link';

export default function AdminHome() {
  return (
    <>
      <h1>Admin</h1>
      <p>Go to <Link href="/admin/marketing">Marketing</Link></p>
    </>
  );
}
