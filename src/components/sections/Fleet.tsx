'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AirVent, Music, Users, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { FleetVehicle } from '@/types/cms';
import MagneticButton from '@/components/fx/MagneticButton';
import Reveal from '@/components/fx/Reveal';
import { Badge } from '@/components/ui/badge';
import { resolveImageUrl } from '@/lib/sanity/queries';
import { cn, scrollToId } from '@/lib/utils';

type Props = { fleet: FleetVehicle[] };

export default function Fleet({ fleet }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('[data-fleet-card]') as HTMLElement | null;
    const w = card ? card.getBoundingClientRect().width + 24 : 440;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  return (
    <section id="fleet" className="relative overflow-hidden bg-bg-1/60 py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-10 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-10 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(212,175,55,0.1),transparent_70%)]" />

      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">Our Fleet</span>
            <h2 className="heading-display mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">
              Curated Vehicles<br />
              for <span className="gold-text">Every Journey.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-soft/80 lg:text-base">
              Pristine, sanitized and chauffeur-driven. Every vehicle in our fleet is road-tested, insured and appointed with your comfort in mind.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              data-interactive
              aria-label="Previous vehicles"
              className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80 hover:border-gold/60 hover:text-gold transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              data-interactive
              aria-label="Next vehicles"
              className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-bg-0 shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </Reveal>
        </div>

        <div
          ref={scrollRef}
          className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 scrollbar-hide"
        >
          {fleet.map((v, i) => (
            <FleetCard key={v._id} vehicle={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetCard({ vehicle, index }: { vehicle: FleetVehicle; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const img = resolveImageUrl(vehicle.image as any);

  return (
    <motion.article
      ref={ref as any}
      data-fleet-card
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-[92%] flex-none snap-center md:w-[62%] lg:w-[44%] xl:w-[33%]"
    >
      <div className="relative h-full overflow-hidden rounded-3xl border border-gold/15 bg-bg-2/70 shadow-deep transition-colors duration-300 hover:border-gold/40">
        {/* Image */}
        <div className="relative h-[320px] w-full overflow-hidden">
          <img
            src={img}
            alt={vehicle.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/30 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />

          <div className="absolute left-5 top-5 flex items-center gap-2">
            <Badge variant="default">{vehicle.type}</Badge>
            <Badge variant="outline">{vehicle.comfortLevel}</Badge>
          </div>

          <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-black/55 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gold-200">
            <Sparkles className="h-3.5 w-3.5" />
            Tamizhan Premium
          </div>
        </div>

        {/* Content */}
        <div className="relative p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold-300/90">Signature Ride</p>
              <h3 className="mt-2 font-display text-[26px] font-semibold text-white">{vehicle.name}</h3>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
              <Users className="h-4 w-4 text-gold" />
              <span className="text-[13px] font-semibold text-white">{vehicle.capacity}+1</span>
              <span className="text-[11px] text-muted"> Guests</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Feature icon={<AirVent className="h-4 w-4 text-gold" />} label="A/C" active={vehicle.ac} />
            <Feature icon={<Music className="h-4 w-4 text-gold" />} label="Music" active={vehicle.musicSystem} />
            <Feature icon={<span className="grid h-4 w-4 place-items-center text-gold text-[10px] font-bold">LS</span>} label="Luxury Seating" active={vehicle.luxurySeating} />
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-y-2">
            {vehicle.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[13px] text-soft/80">
                <Check className="h-4 w-4 text-gold" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
            <p className="text-[12px] text-muted">
              Prices start from <span className="gold-text font-semibold">₹ 14 / KM</span>
            </p>
            <MagneticButton
              variant="primary"
              onClick={() => scrollToId('booking', 80)}
              className="h-12 px-6 text-[13px]"
              strength={70}
            >
              Book This Vehicle
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Feature({ icon, label, active }: { icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl border px-3 py-2.5',
        active ? 'border-gold/30 bg-gold/5 text-white' : 'border-white/5 bg-white/[0.02] text-muted/80',
      )}
    >
      {icon}
      <span className="text-[12px] font-medium">{label}</span>
    </div>
  );
}
