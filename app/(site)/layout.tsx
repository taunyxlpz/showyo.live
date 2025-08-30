export const revalidate: false | number = false;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="w-full flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/70">
        <img
          src="/logo.png"
          alt="ShowYo"
          className="h-6 w-auto"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.dataset.fallback) { img.src = '/favicon.ico'; img.dataset.fallback = '1'; }
          }}
        />
        <span className="text-sm opacity-70">ShowYo</span>
      </header>
      <main className="w-full">{children}</main>
    </>
  );
}
