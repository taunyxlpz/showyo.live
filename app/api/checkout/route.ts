import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const kind = body?.kind === 'video' ? 'video' : 'photo';

  const secret = process.env.STRIPE_SECRET_KEY;
  const price =
    kind === 'video'
      ? process.env.STRIPE_PRICE_VIDEO_10S
      : process.env.STRIPE_PRICE_PHOTO_10S;

  if (!secret || !price) {
    return NextResponse.json(
      { error: 'Missing STRIPE_SECRET_KEY or price env var' },
      { status: 500 }
    );
  }

  const origin =
    req.headers.get('origin') ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    'http://localhost:3000';

  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('success_url', `${origin}/success?session_id={CHECKOUT_SESSION_ID}&kind=${kind}`);
  form.set('cancel_url', `${origin}/cancel`);
  form.append('line_items[0][price]', price);
  form.append('line_items[0][quantity]', '1');

  const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });

  const data = await resp.json();
  if (!resp.ok) {
    return NextResponse.json({ error: data }, { status: resp.status });
  }
  return NextResponse.json({ url: data.url });
}
