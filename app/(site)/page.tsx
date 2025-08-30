export default function Home() {
  return (
    <div className="container">
      <h1>ShowYo</h1>
      <p className="muted">Share your moment on the big screen. Choose a post type below.</p>

      <div style={{ display:'flex', gap:12, flexWrap:'wrap', margin:'12px 0 16px' }}>
        <a className="btn brand" href="/api/checkout?type=photo">Pay $10 + taxes — Photo (10s)</a>
        <a className="btn brand" href="/api/checkout?type=video">Pay $20 + taxes — Video (10s)</a>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <p className="muted" style={{ margin: 0 }}>
          Accepted: JPG, PNG, WEBP, MP4, MOV (≤ 200 MB). Videos must be ≥ 10 seconds.
          <br />
          Moderation blocks: Nudity & sexual content (incl. minors), Hate/racism, Violence & gore,
          Illegal activity (drugs, weapons, terrorism), Harassment/threats, Self-harm & suicide.
        </p>
      </div>
    </div>
  );
}
