export default function Upload() {
  return (
    <div className="container">
      <h1>Upload</h1>
      <p className="muted">You’ll receive an upload link after checkout. For testing, drop a file here:</p>
      <div className="card" style={{ marginTop: 12 }}>
        <input type="file" />
      </div>
    </div>
  );
}
