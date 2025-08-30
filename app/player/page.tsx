'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = false;
export const fetchCache = 'force-no-store';

type Item = { key: string; url?: string; duration?: number };

function isVideo(src: string) {
  return /\.(mp4|mov|m4v|webm|avi)$/i.test(src);
}

function PlayerCore() {
  const q = useSearchParams();

  const fit = (q.get('fit') || 'cover') as 'cover' | 'contain' | 'stretch';
  const rotate = Number(q.get('rotate') || '0');
  const zoom = Number(q.get('zoom') || '1');
  const bg = q.get('bg') || '#000';
  const refreshMs = Math.max(5000, Number(q.get('refreshMs') || '15000'));
  const showOverlay = q.get('overlay') === '1';

  // TB60 fix: allow forced width/height via URL (e.g. w=1080&h=1920)
  const forcedW = Math.max(0, Number(q.get('w') || '0'));
  const forcedH = Math.max(0, Number(q.get('h') || '0'));

  const [wh, setWH] = useState<{ w:
