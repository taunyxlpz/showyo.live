'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate: false | number = 0;
export const fetchCache = 'force-no-store';

type Item = { key: string; url?: string; duration?: number };

function isVideo(src: string) {
  return /\.(mp4|mov|m4v|webm|avi)$/i.test(src);
}

export default function PlayerPage() {
  return (
    <Suspense
      fallback={
        <div style={{
          position:'fixed', inset:0, background:'#000', color:'#fff',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'system-ui, sans-serif'
        }}>
          Loading…
        </div>
      }
    >
      <PlayerCore />
    </Suspense>
  );
}

function PlayerCore() {
  const q = useSearchParams();

  const fit = (q.get('fit') || 'cover') as 'cover' | 'contain' | 'stretch';
  const rotate = Number(q.get('rotate') || '0');
  const zoom = Number(q.get('zoom') || '1');
  const bg = q.get('bg') || '#000';
  const refreshMs = Math.max(5000, Number(q.get('refreshMs') || '15000'));
  const showOverlay = q.get('overlay') === '1';

  // TB60 fix: allow forced width/height via URL
  const forcedW = Math.max(0, Number(q.get('w') || '0'));
  const forcedH = Math.max(0, Number(q.get('h') || '0'));

  const [wh, setWH] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [list, setList] = useState<Item[]>([]);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const apply = () => {
      const w = forcedW || Math.max(1, Math.floor(window.innerWidth || document.documentElement.clientWidth || 0));
      const h = forcedH || Math.max(1, Math.floor(window.innerHeight || document.documentElement.clientHeight || 0));
      setWH({ w, h });

      const root = document.getElementById('player-root') as HTMLDivElement | null;
      if (root) { root.style.width = `${w}px`; root.style.height = `${h}px`; }
      document.body.style.background = bg;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
    };

    apply();
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', apply);
    const id = setInterval(apply, 2000);
    return () => { window.removeEventListener('resize', apply); window.removeEventListener('orientationchange', apply); clearInterval(id); };
  }, [bg, forcedW, forcedH]);

  async function load() {
    try {
      const r = await fetch('/api/playlist', { cache: 'no-store' });
      if (!r.ok) throw new Error('playlist failed');
      const data = await r.json();
      const items: Item[] = (Array.isArray(data) ? data : data.items || []).map((it: any) => ({
        key: it.key,
        url: it.url || (it.key ? `/api/file?key=${encodeURIComponent(it.key)}` : ''),
        duration: Number(it.duration || 10),
      }));
      if (items.length) {
        setList(items);
        setIdx((i) => (i >= items.length ? 0 : i));
      }
    } catch { /* keep last */ }
  }

  useEffect(() => { load(); const id = setInterval(load, refreshMs); return () => clearInterval(id); }, [refreshMs]);

  useEffect(() => {
    if (!list.length) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    const durMs = Math.max(1000, (list[idx].duration || 10) * 1000);
    timerRef.current = setTimeout(() => setIdx((i) => (i + 1) % list.length), durMs);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [list, idx]);

  const src = list.length ? (list[idx].url || '') : '';
  const mediaIsVideo = useMemo(() => (src ? isVideo(src) : false), [src]);

  const objectFit = fit === 'stretch' ? ('fill' as const) : fit === 'contain' ? ('contain' as const) : ('cover' as const);

  const outer: React.CSSProperties = { position:'fixed', top:0, left:0, width:`${wh.w || 1}px`, height:`${wh.h || 1}px`, background:bg, overflow:'hidden' };
  const stage: React.CSSProperties = { position:'absolute', inset:0, transformOrigin:'50% 50%', transform:`translateZ(0) rotate(${rotate}deg) scale(${zoom})` };
  const media: React.CSSProperties = { position:'absolute', width:'100%', height:'100%', objectFit, objectPosition:'center center', display:'block', backgroundColor:bg };

  return (
    <div id="player-root" style={outer}>
      <div style={stage}>
        {src ? (mediaIsVideo ? (
          <video key={src} src={src} style={media} muted playsInline autoPlay controls={false} preload="auto" />
        ) : (
          <img key={src} src={src} style={media} alt="" />
        )) : null}
      </div>
      {showOverlay && (
        <div style={{ position:'absolute', left:8, bottom:6, color:'#fff', font:'12px system-ui', opacity:0.7, pointerEvents:'none', textShadow:'0 1px 2px rgba(0,0,0,.7)' }}>
          {fit.toUpperCase()} • Z{zoom} • R{rotate}° • {wh.w}×{wh.h}
        </div>
      )}
    </div>
  );
}
