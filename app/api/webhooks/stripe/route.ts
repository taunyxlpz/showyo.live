export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate: false | number = 0;

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

async function alreadyHandled(_id: string) { return false; }
async function markHandled(_id: string) { /* persist id */ }

export async function GET() {
  return new NextResponse('Method Not Allowed', { status: 405, headers: { 'Allow': 'POST' } });
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) return new NextResponse('Missing Stripe signature', { status: 400 });

  let rawBody = '';
  try { rawBody = await req.text(); } catch { return new NextResponse('Unable to read raw body', { status: 400 }); }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (await alreadyHandled(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const _session = event.data.object as Stripe.Checkout.Session;
        // TODO: mark order paid, create upload token, email receipt, etc.
        break;
      }
      default:
        break;
    }
    await markHandled(event.id);
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return new NextResponse(`Handler Error: ${String(err?.message || err)}`, { status: 500 });
  }
}
