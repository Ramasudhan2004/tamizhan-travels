'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import type { Destination } from '@/types/cms';
import Reveal from '@/components/fx/Reveal';
import { resolveImageUrl } from '@/lib/sanity/queries';

type Props = { destinations?: Destination[] };

const INITIAL_SHOW = 6;

export default function DestinationsMap({ destinations = [] }: Props) {
  const [selected, setSelected] = useState<Destination | null>(null);
  const [showAll, setShowAll] = useState(false);

  const safeDestinations = destinations ?? [];
  const visible = showAll ? safeDestinations : safeDestinations.slice(0, INITIAL_SHOW);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section id="destinations" className="relative py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(212,175,55,0.10),transparent_70%)]" />

      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">Iconic Destinations</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="heading-display mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">
              South India, <span className="gold-text">Reimagined.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-soft/80 lg:text-base">
              Tap a destination to discover curated journeys across the finest places in South India.
            </p>
          </Reveal>
        </div>

        {/* Card Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((d, i) => (
            <Reveal key={d._id} delay={i < INITIAL_SHOW ? i * 0.04 : 0}>
              <button
                onClick={() => setSelected(d)}
                className="group relative w-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] text-left transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.06]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={resolveImageUrl(d.hero as any)}
                    alt={d.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-black/50 px-2.5 py-1 font-mono text-[11px] text-gold/90">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-[18px] font-semibold text-white">{d.name}</h3>
                      <p className="mt-1 text-[12px] text-muted">{d.tagline}</p>
                    </div>
                    <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold/70 transition-colors group-hover:text-gold" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(d.highlights ?? []).slice(0, 3).map((h) => (
                      <span key={h} className="rounded-full border border-gold/20 bg-gold/[0.07] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-gold/80">
                        {h}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-gold/50 transition-colors group-hover:text-gold/80">
                    Explore →
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Show More / Less */}
        {destinations.length > INITIAL_SHOW && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[0.07] px-7 py-3 font-display text-[13px] uppercase tracking-[0.2em] text-gold transition-all duration-200 hover:bg-gold/[0.14] hover:border-gold/70"
            >
              {showAll ? (
                <><ChevronUp className="h-4 w-4" /> Show Less</>
              ) : (
                <><ChevronDown className="h-4 w-4" /> {destinations.length - INITIAL_SHOW} More Places</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Modal — rendered outside section so overflow:hidden doesn't clip it */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/80"
              onClick={() => setSelected(null)}
            />

            {/* Modal — scrollable so it never gets cut on small screens */}
            <div className="fixed inset-0 z-[101] overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  key="modal"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gold/30 bg-bg-1 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Hero image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={resolveImageUrl(selected.hero as any)}
                      alt={selected.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-1 via-black/20 to-transparent" />

                    {/* Close button */}
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:border-gold/60 hover:text-gold"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Greeting badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-gold/50 bg-black/70 px-4 py-2">
                      <Sparkles className="h-3.5 w-3.5 text-gold" />
                      <span className="text-[11px] uppercase tracking-[0.24em] text-gold">Welcome to</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-[28px] font-bold text-white leading-tight">{selected.name}</h3>
                    <p className="mt-1.5 text-[14px] text-gold/80">{selected.tagline}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {selected.highlights.map((h) => (
                        <span key={h} className="flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/[0.08] px-3 py-1.5 text-[12px] text-gold/90">
                          <MapPin className="h-3 w-3 flex-none" />
                          {h}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#booking"
                      onClick={() => setSelected(null)}
                      className="mt-6 flex w-full items-center justify-center rounded-2xl bg-gold py-3.5 font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-bg-0 transition-opacity hover:opacity-90"
                    >
                      Book This Destination
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
