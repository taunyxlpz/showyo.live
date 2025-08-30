export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import CheckoutButtons from './components/CheckoutButtons';

export default function Page() {
  return (
    <>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Home</h1>
      <p style={{ marginTop: 8 }}>Welcome to ShowYo. Choose what to buy to unlock upload.</p>
      <CheckoutButtons />
    </>
  );
}
