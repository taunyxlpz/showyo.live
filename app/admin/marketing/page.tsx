'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { useState } from 'react';

type Repeat = 'none' | 'daily' | 'weekly';

export default function AdminMarketingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState('');
  const [startAt, setStartAt] = useState<string>('');
  const [repeat, setRepeat] = useState<Repeat>('none');
  const [days, setDays] = useState<string[]>([]); // 0..6 (Sun..Sat)
  const [status, setStatus] = useState('');

  async function presignAndUpload(): Promise<string> {
    if (!file) throw new Error('No file');
    const { uploadUrl, publicUrl } = await fetch('/api/file', {
      method: 'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ contentType: file.type })
    }).then(r=>r.json());
    await fetch(uploadUrl, { method:'PUT', body:file, headers:{'Content-Type': file.type} });
    return publicUrl as string;
  }

  async function submit() {
    try {
      setStatus('Preparing…');
      const url = file ? await presignAndUpload() : src;
      if (!url) throw new Error('No URL selected');

      setStatus('Pushing schedule to TB60…');
      const kind = (file?.type || '').startsWith('video') || /\.(mp4|webm|ogg|m3u8)(\?.*)?$/i.test(url) ? 'video' : 'image';
      const payload = {
        url, kind,
        schedule: {
          startAt: startAt || null,    // ISO timestamp, or null = immediate
          repeat,                      // none|daily|weekly
          days: repeat === 'weekly' ? days.map(Number) : [], // 0..6
        },
      };
      const res = await fetch('/api/push-to-tb60', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }).then(r=>r.json());
      if (res.ok) setStatus('Scheduled & sent to TB60 ✅');
      else setStatus('TB60 push failed');
    } catch (e:any) {
      setStatus('Error: ' + e.message);
    }
  }

  function toggleDay(d: string) {
    setDays(prev => prev.includes(d) ? prev.filter(x=>x!==d) : [...prev, d]);
  }

  return (
    <>
      <h1>Admin · Marketing</h1>
      <p>Upload creative or paste a URL, then schedule.</p>

      <div className="row">
        <div>
          <label>Upload file (image/video)</label>
          <input type="file" accept="image/*,video/*" onChange={e=>setFile(e.target.files?.[0] || null)} />
          <div style={{ marginTop: 8 }}><small className="mono">or</small></div>
          <label>Existing URL</label>
          <input placeholder="https://..." value={src} onChange={e=>setSrc(e.target.value)} />
        </div>

        <div>
          <label>Start at</label>
          <input type="datetime-local" value={startAt} onChange={e=>setStartAt(e.target.value)} />
          <label>Repeat</label>
          <select value={repeat} onChange={e=>setRepeat(e.target.value as Repeat)}>
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          {repeat === 'weekly' && (
            <div style={{ marginTop: 8 }}>
              <small className="mono">Days</small>
              <div className="row" style={{ marginTop: 6 }}>
                {['0 Sun','1 Mon','2 Tue','3 Wed','4 Thu','5 Fri','6 Sat'].map(lbl => {
                  const [dTxt, dName] = lbl.split(' ');
                  return (
                    <label key={lbl} style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                      <input type="checkbox" checked={days.includes(dTxt)} onChange={()=>toggleDay(dTxt)} />
                      {dName}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="row" style={{ marginTop: 12 }}>
            <button onClick={submit}>Schedule & Send</button>
          </div>
        </div>
      </div>

      {status && <p style={{ marginTop: 12 }}><small className="mono">{status}</small></p>}
    </>
  );
}
