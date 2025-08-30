export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function CancelPage() {
  return (
    <>
      <h1>Payment canceled ❌</h1>
      <p>You can try again from the Home page.</p>
    </>
  );
}
