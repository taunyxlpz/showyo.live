export const dynamic = 'force-dynamic';
export const revalidate: false | number = 0;
export const fetchCache = 'force-no-store';

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return children; // full-screen; no header
}
