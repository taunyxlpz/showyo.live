import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const payload = await req.json(); // { url, kind: 'image'|'video', meta?: {...}, schedule?: {...} }

  if (!process.env.TB60_API_BASE || !process.env.TB60_API_KEY) {
    // For now, just echo so you can see it works.
    return NextResponse.json({ ok: true, mocked: true, payload });
  }

  // Example forward — replace path/body with your TB60 API contract.
  const r = await fetch(`${process.env.TB60_API_BASE}/ingest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TB60_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!r.ok) {
    const text = await r.text();
    return NextResponse.json({ ok: false, error: text }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
