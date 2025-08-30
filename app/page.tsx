export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to ShowYo. Choose what to buy to unlock upload.</p>
      <div className="row" style={{ marginTop: 12 }}>
        <Link href="/api/create-checkout-session?type=photo"><button>Pay $10 — Photo (10s)</button></Link>
        <Link href="/api/create-checkout-session?type=video"><button>Pay $20 — Video (10s)</button></Link>
      </div>
      <p style={{ marginTop: 14 }} className="notice">
        After paying, you’ll land on <em>Success</em> and can unlock the uploader.
      </p>
    </>
  );
}
