import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sanityWriteClient, isSanityConfigured } from '@/lib/sanity/client';

const VehicleTypes = ['Premium Cab', 'Tempo Traveller', 'Mini Bus', 'Not Sure'] as const;

const schema = z.object({
  name: z.string().min(2).max(60),
  phone: z.string().min(10).max(16).regex(/^[+\d\s-]+$/),
  travelDate: z.string().min(6),
  pickup: z.string().min(2).max(80),
  destination: z.string().min(2).max(80),
  vehicle: z.enum(VehicleTypes).default('Not Sure'),
  passengers: z.coerce.number().int().min(1).max(50),
  message: z.string().max(500).optional(),
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.errors[0]?.message ?? 'Invalid input' },
        { status: 400 },
      );
    }
    const body = parsed.data;

    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    if (isSanityConfigured && sanityWriteClient) {
      try {
        await sanityWriteClient.create({
          _type: 'booking',
          _id: bookingId,
          ...body,
          travelDate: new Date(body.travelDate).toISOString(),
          status: 'new',
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error('Sanity booking write failed:', e);
      }
    }

    // Optional: Resend email (uncomment & configure in env)
    // const RESEND = process.env.RESEND_API_KEY;
    // if (RESEND) {
    //   await fetch('https://api.resend.com/emails', {
    //     method: 'POST',
    //     headers: { Authorization: `Bearer ${RESEND}`, 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       from: 'Tamizhan Travels <bookings@tamizhantravels.in>',
    //       to: ['hello@tamizhantravels.in'],
    //       reply_to: [body.name, body.phone].join(' ') + ' <hello@tamizhantravels.in>',
    //       subject: `New Booking · ${body.name} · ${body.pickup} → ${body.destination}`,
    //       html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
    //     }),
    //   });
    // }

    return NextResponse.json({ ok: true, bookingId });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'Server error' },
      { status: 500 },
    );
  }
}
