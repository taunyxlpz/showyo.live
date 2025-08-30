import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const _ = await req.json(); // { url: string }
  // TODO: Plug a provider (OpenAI/Google/AWS) if desired.
  return NextResponse.json({ approved: true, reason: 'stub-allow' });
}
