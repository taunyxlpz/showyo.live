export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function SuccessPage({ searchParams }: { searchParams?: { [k: string]: string } }) {
  const type = (searchParams?.type || 'photo').toLowerCase();
  return (
    <>
      <h1>Payment successful ✅</h1>
      <p>Click below to unlock the uploader for: <b>{type}</b>.</p>
      <Link href={`/api/unlock?type=${type}`}><button>Unlock & Go to Upload</button></Link>
    </>
  );
}
