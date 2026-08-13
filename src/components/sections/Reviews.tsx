'use client';
import { useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, Globe2 } from 'lucide-react';
import type { Testimonial } from '@/types/cms';
import Reveal from '@/components/fx/Reveal';
import { SEED_GOOGLE_REVIEWS } from '@/lib/sanity/seed';

type Props = { testimonials: Testimonial[] };

export default function Reviews({ testimonials }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const items = testimonials.length > 0 ? testimonials : [];

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-t-card]') as HTMLElement | null;
    const w = card ? card.getBoundingClientRect().width + 24 : 420;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  // Use setInterval instead of RAF — no need to run 60fps for a 5s auto-scroll
  useEffect(() => {
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el || document.visibilityState !== 'visible') return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const card = el.querySelector('[data-t-card]') as HTMLElement | null;
        const w = card ? card.getBoundingClientRect().width + 24 : 420;
        el.scrollBy({ left: w, behavior: 'smooth' });
      }
    }, 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="reviews" className="relative overflow-hidden bg-bg-1/60 py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-70 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(212,175,55,0.10),transparent_70%)]" />
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <Reveal>
              <span className="eyebrow">Guest Reviews</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-display mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">
                Loved by <span className="gold-text">5000+ Travellers.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="flex items-center gap-4 rounded-3xl border border-gold/20 glass-gold px-6 py-5">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[0,1,2,3,4].map((i) => (
                      <Star key={i} className="h-5 w-5 text-gold" fill="currentColor" />
                    ))}
                  </div>
                  <p className="font-display text-3xl font-semibold text-white tabular-nums">{SEED_GOOGLE_REVIEWS.rating.toFixed(1)}</p>
                </div>
                <div className="mt-2 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-soft/80">
                  <Globe2 className="h-3.5 w-3.5 text-gold" />
                  {SEED_GOOGLE_REVIEWS.count}+ Google Reviews
                </div>
              </div>
              <div className="h-12 w-px bg-gold/20" />
              <div className="flex items-center gap-2">
                <button data-interactive aria-label="Previous" onClick={() => scrollBy(-1)}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80 transition hover:border-gold/50 hover:text-gold">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button data-interactive aria-label="Next" onClick={() => scrollBy(1)}
                  className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient text-bg-0 shadow-gold-glow transition hover:shadow-gold-glow-lg">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div ref={trackRef} className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-10 scrollbar-hide">
          {items.map((t, i) => (
            <div
              key={t._id}
              data-t-card
              className="w-[92%] flex-none snap-center md:w-[58%] lg:w-[42%] xl:w-[34%]"
            >
              <div className="glass-gold relative h-full overflow-hidden rounded-2xl p-7">
                <div className="pointer-events-none absolute right-5 top-5 opacity-30">
                  <Quote className="h-12 w-12 text-gold" />
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`h-4 w-4 ${idx < t.rating ? 'text-gold' : 'text-white/20'}`} fill={idx < t.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="mt-6 text-[16px] leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="grid h-12 w-12 flex-none place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold font-display text-[16px] font-semibold">
                    {(t.name?.[0] ?? 'T').toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-[16px] font-semibold text-white">{t.name}</p>
                    <p className="text-[12px] text-muted">
                      {t.place ? `Traveller from ${t.place}` : 'Verified Guest'}
                      {t.googleReview ? ' · Google Review' : ''}
                    </p>
                  </div>
                  {t.googleReview && (
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.03] border border-white/10">
                      <Globe2 className="h-4 w-4 text-gold" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
