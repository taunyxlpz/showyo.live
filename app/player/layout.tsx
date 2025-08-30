export const dynamic = 'force-dynamic';
export const revalidate = false;
export const fetchCache = 'force-no-store';

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  // No header — let the page be full screen
  return children;
}
