'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  UserRound, Phone, Calendar, MapPin, Car, Users, Send, CheckCircle, Sparkles, MessageSquare,
} from 'lucide-react';
import MagneticButton from '@/components/fx/MagneticButton';
import Reveal from '@/components/fx/Reveal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { cn, todayISOPlus } from '@/lib/utils';
import { sendEmailJSBooking } from '@/lib/emailjs';

const VehicleOptions = ['Premium Cab', 'Tempo Traveller', 'Mini Bus', 'Not Sure'] as const;

const schema = z.object({
  name: z.string().min(2, 'Please enter your name').max(60),
  phone: z.string().min(10, 'Enter a valid 10-digit phone').max(16).regex(/^[+\d\s-]+$/),
  travelDate: z.string().min(6, 'Select travel date'),
  pickup: z.string().min(2, 'Pickup city/location'),
  destination: z.string().min(2, 'Destination city/location'),
  vehicle: z.enum(VehicleOptions).default('Not Sure'),
  passengers: z.coerce.number().int().min(1).max(50),
  message: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function BookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      travelDate: todayISOPlus(3),
      pickup: '',
      destination: '',
      vehicle: 'Not Sure',
      passengers: 4,
      message: '',
    },
  });

  const vehicle = watch('vehicle');

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setErrorMsg(null);
    try {
      // 1. Try sending via EmailJS if configured
      const emailRes = await sendEmailJSBooking(data);

      // 2. Also record in Sanity database / API handler
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok && !emailRes.success) {
        throw new Error(json?.error ?? emailRes.message ?? 'Failed to send booking');
      }

      setSuccess(true);
      setTimeout(() => {
        reset();
        setSuccess(false);
      }, 5200);
    } catch (e: any) {
      setErrorMsg(e?.message ?? 'Something went wrong. Please call us instead.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative overflow-hidden py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-70 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(212,175,55,0.16),transparent_70%)]" />

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">Book Your Journey</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="heading-display mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">
              Your Next Journey,<br />
              <span className="gold-text">A Click Away.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-soft/80 lg:text-base">
              Share a few details and our travel desk will call you within minutes — with a tailor-made itinerary and a transparent quote.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.22} className="mx-auto mt-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/15 glass-gold">
            {/* Decorative golden borders */}
            <div aria-hidden className="pointer-events-none absolute -top-1 left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute -bottom-1 left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute right-6 top-6 opacity-70">
              <Sparkles className="h-10 w-10 text-gold" />
            </div>

            <div className="grid gap-0 md:grid-cols-5">
              <aside className="relative hidden md:block md:col-span-2 overflow-hidden bg-gradient-to-br from-gold/15 via-bg-2 to-bg-2">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&auto=format&fit=crop&q=80')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bg-2/80 via-bg-2/60 to-bg-2/95" />
                <div className="relative flex h-full flex-col justify-between p-10">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gold-200">
                      Tamizhan Travels
                    </p>
                    <h3 className="mt-4 font-display text-4xl font-semibold leading-tight text-white">
                      Luxury is not an upgrade here.<br />
                      <span className="gold-text">It is standard.</span>
                    </h3>
                    <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-soft/80">
                      Fill the form. We usually respond in under 20 minutes with a confirmed plan, driver details, and transparent pricing — no surprises.
                    </p>
                  </div>
                  <ul className="space-y-3 text-[14px] text-soft/85">
                    <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-gold" /> Instant WhatsApp confirmation</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-gold" /> Zero booking fees</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-gold" /> Flexible rescheduling</li>
                  </ul>
                </div>
              </aside>

              <div className="md:col-span-3 p-7 md:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your Name" icon={<UserRound className="h-4 w-4 text-gold" />} error={errors.name?.message}>
                    <Input placeholder="e.g. Ramesh Kumar" {...register('name')} />
                  </Field>
                  <Field label="Phone" icon={<Phone className="h-4 w-4 text-gold" />} error={errors.phone?.message}>
                    <Input placeholder="10-digit mobile" {...register('phone')} inputMode="tel" />
                  </Field>
                  <Field label="Travel Date" icon={<Calendar className="h-4 w-4 text-gold" />} error={errors.travelDate?.message}>
                    <Input type="date" {...register('travelDate')} />
                  </Field>
                  <Field label="Passengers" icon={<Users className="h-4 w-4 text-gold" />} error={errors.passengers?.message}>
                    <Input type="number" min={1} max={50} {...register('passengers')} />
                  </Field>
                  <Field label="Pickup Location" icon={<MapPin className="h-4 w-4 text-gold" />} error={errors.pickup?.message}>
                    <Input placeholder="e.g. Tiruppur" {...register('pickup')} />
                  </Field>
                  <Field label="Destination" icon={<MapPin className="h-4 w-4 text-gold" />} error={errors.destination?.message}>
                    <Input placeholder="e.g. Ooty" {...register('destination')} />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Preferred Vehicle" icon={<Car className="h-4 w-4 text-gold" />} error={(errors as any).vehicle?.message}>
                      <Select
                        value={vehicle}
                        onValueChange={(v) => setValue('vehicle', v as FormValues['vehicle'], { shouldValidate: true })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          {VehicleOptions.map((v) => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field label="Your Message" icon={<MessageSquare className="h-4 w-4 text-gold" />} error={errors.message?.message}>
                      <Textarea
                        rows={4}
                        placeholder="Tell us about your trip — itinerary, days, places, special requests…"
                        {...register('message')}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="text-[13px] text-muted min-h-5">
                      <AnimatePresence mode="wait">
                        {errorMsg ? (
                          <motion.span
                            key="err"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="text-rose-300"
                          >
                            {errorMsg}
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            Your information is safe with us. We never share.
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative inline-flex">
                      <MagneticButton
                        type="submit"
                        variant="primary"
                        disabled={submitting || success}
                        className="h-14 px-8 text-[15px] disabled:opacity-70"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {success ? (
                            <motion.span
                              key="success"
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                              className="inline-flex items-center gap-2"
                            >
                              <CheckCircle className="h-5 w-5" /> Request Sent!
                            </motion.span>
                          ) : submitting ? (
                            <motion.span
                              key="sending"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="inline-flex items-center gap-2"
                            >
                              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-bg-0 border-t-transparent" />
                              Sending…
                            </motion.span>
                          ) : (
                            <motion.span
                              key="send"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.3 }}
                              className="inline-flex items-center gap-2"
                            >
                              <Send className="h-4 w-4" /> Send Booking Request
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </MagneticButton>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-60 blur-xl"
                        style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.7), rgba(184,134,11,0.0))' }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 inline-flex items-center gap-2">
        <Label className={cn('!text-[12px] uppercase tracking-[0.22em]', error ? 'text-rose-300' : 'text-soft/80')}>
          <span className="inline-flex items-center gap-1.5">{icon}{label}</span>
        </Label>
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-[11px] text-rose-300">{error}</span>
      )}
    </label>
  );
}
