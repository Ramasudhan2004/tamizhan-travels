import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { isSanityConfigured } from '@/lib/sanity/env';

// Sanity webhook → POST this URL with a secret to invalidate homepage ISR.
// Example Sanity GROQ webhook: *[_type in ["heroBanner","vehicle","destination","gallery","testimonial","whyChooseUs","contactInfo","tourPackage","offer","blogPost"]]
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  const expected = process.env.SANITY_WEBHOOK_SECRET;
  if (expected && expected !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  if (!isSanityConfigured) {
    return NextResponse.json({ ok: true, revalidated: false, reason: 'sanity not configured' });
  }
  try {
    revalidateTag('sanity');
    return NextResponse.json({ ok: true, revalidated: true, tag: 'sanity', now: Date.now() });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'revalidate failed' }, { status: 500 });
  }
}
