'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { useEffect, useMemo, useRef, useState } from 'react';

function getCookie(name: string) {
  return document.cookie.split('; ').find(x => x.startsWith(name + '='))?.split('=')[1];
}

export default function UploadPage() {
  const unlocked = useMemo(() => getCookie('uploadUnlocked'), []);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');
  const [publicUrl, setPublicUrl] = useState<string>('');

  useEffect(() => {
    if (!unlocked) setStatus('You must purchase first (Home → Pay).');
  }, [unlocked]);

  async function handleUpload() {
    if (!file) return;
    setStatus('Requesting S3 URL…');
    const presign = await fetch('/api/file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentType: file.type }),
    }).then(r => r.json());

    setStatus('Uploading to S3…');
    const put = await fetch(presign.uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
    if (!put.ok) { setStatus('Upload failed'); return; }

    setPublicUrl(presign.publicUrl);
    setStatus('Moderating…');
    const mod = await fetch('/api/moderate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: presign.publicUrl }) }).then(r => r.json());
    if (!mod.approved) { setStatus('Rejected by AI'); return; }

    setStatus('Pushing to TB60…');
    const kind = file.type.startsWith('video') ? 'video' : 'image';
    const push = await fetch('/api/push-to-tb60', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: presign.publicUrl, kind, meta: { unlocked } }),
    }).then(r => r.json());

    if (push.ok) setStatus('Sent to TB60 ✅');
    else setStatus('TB60 push failed');
  }

  return (
    <>
      <h1>Upload</h1>
      {!unlocked && <p className="notice">No purchase detected. Go to Home and complete checkout.</p>}
      <div style={{ opacity: unlocked ? 1 : 0.5, pointerEvents: unlocked ? 'auto' : 'none' }}>
        <label>Choose file</label>
        <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        <div className="row" style={{ marginTop: 12 }}>
          <button onClick={handleUpload} disabled={!file}>Upload & Send</button>
        </div>
        {status && <p style={{ marginTop: 12 }}><small className="mono">{status}</small></p>}
        {publicUrl && <p><a href={publicUrl} target="_blank">View uploaded</a></p>}
      </div>
    </>
  );
}

