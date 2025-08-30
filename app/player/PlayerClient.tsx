'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

function bool(sp: URLSearchParams, key: string, def = false) {
  const v = sp.get(key);
  if (v == null) return def;
  return ['1','true','yes','on'].includes(v.toLowerCase());
}
function fitValue(raw?: string | null) {
  const ok = ['cover','contain','fill','none','scale-down'];
  return ok.includes((raw || '').toLowerCase()) ? (raw as any) : ('cover' as const);
}

export default function PlayerClient() {
  const sp = useSearchParams();
  const w = Number(sp.get('w')) || undefined;
  const h = Number(sp.get('h')) || undefined;
  const zoom = Number(sp.get('zoom')) || 1;
  const rotate = Number(sp.get('rotate')) || 0;
  const fit = fitValue(sp.get('fit'));
  const overlay = bool(sp, 'overlay', false);
  const bg = sp.get('bg') || '#000';
  const src = sp.get('src') || '/showyo-yellow.png';
  const isVideo = useMemo(() => /\.(mp4|webm|ogg|m3u8)(\?.*)?$/i.test(src), [src]);

  const container: React.CSSProperties = { width: w ? `${w}px` : '100vw', height: h ? `${h}px` : '100vh', background: bg, position: 'relative', overflow: 'hidden' };
  const media: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit, transform: `scale(${zoom}) rotate(${rotate}deg)`, transformOrigin: 'center center' };

  return (
    <div style={container}>
      {isVideo ? <video src={src} style={media} playsInline muted autoPlay loop controls={bool(sp, 'controls', false)} /> : <img src={src} style={media} alt="" />}
      {overlay && (
        <div style={{ position:'absolute', top:8, left:8, background:'rgba(0,0,0,.55)', color:'#fff', padding:'6px 8px', borderRadius:6, fontSize:12, fontFamily:'ui-monospace,Menlo,monospace' }}>
          w:{w||'100vw'} h:{h||'100vh'} fit:{fit} zoom:{zoom} rot:{rotate}°
        </div>
      )}
    </div>
  );
}
