import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = (url.searchParams.get('type') || 'photo').toLowerCase();
  const priceId = type === 'video' ? process.env.STRIPE_PRICE_VIDEO : process.env.STRIPE_PRICE_PHOTO;

  if (!process.env.STRIPE_SECRET_KEY || !priceId) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

  const successBase = process.env.STRIPE_SUCCESS_URL || 'https://showyo.live/success?type={TYPE}';
  const cancelUrl = process.env.STRIPE_CANCEL_URL || 'https://showyo.live/cancel';
  const successUrl = successBase.replace('{TYPE}', type);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { type },
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
