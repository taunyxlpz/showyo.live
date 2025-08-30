export const revalidate = false;
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ margin: '12px 0' }}>Welcome to ShowYo</h1>
      <p style={{ opacity: .8 }}>Upload assets and play them on your TB60 display.</p>
      <ul style={{ marginTop: 16, lineHeight: 1.9 }}>
        <li><a href="/upload">Upload</a></li>
        <li><a href="/player?w=1080&h=1920&fit=cover&zoom=1.02&rotate=90&overlay=1">Open Player (TB60)</a></li>
        <li><a href="/success">Success page</a> / <a href="/cancel">Cancel page</a></li>
      </ul>
    </div>
  );
}
