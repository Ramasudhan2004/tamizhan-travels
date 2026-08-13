'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown, Shield, Star, Award } from 'lucide-react';
import type { HeroBanner } from '@/types/cms';
import MagneticButton from '@/components/fx/MagneticButton';
import Reveal from '@/components/fx/Reveal';
import { resolveImageUrl } from '@/lib/sanity/queries';
import { cn, scrollToId } from '@/lib/utils';

const HeroCanvas = dynamic(() => import('@/components/three').then((m) => m.HeroCanvas || (m as any).default), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-hero-fade">
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_80%_50%_at_70%_20%,rgba(212,175,55,0.35),transparent_60%)]" />
    </div>
  ),
});

type Props = { hero?: HeroBanner };

export default function Hero3D({ hero }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headline = hero?.headline ?? 'EVERY JOURNEY BEGINS WITH TRUST';
  const eyebrowText = hero?.eyebrow ?? 'PREMIUM TRAVEL & LUXURY TRANSPORTATION';
  const subheadingText = hero?.subheading ?? 'Sanitized cabs, luxury tempo travellers & mini buses from Tiruppur to South India.';
  const primaryCta = hero?.ctaPrimary?.label ?? 'Book Your Journey';
  const secondaryCta = hero?.ctaSecondary?.label ?? 'Our Services';

  return (
    <section id="hero" className="relative isolate min-h-[100svh] w-full overflow-hidden pt-20">
      {/* 3D scene — static, no scroll-driven transforms */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 mask-fade-b">
          {mounted && <HeroCanvas />}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_30%_0%,rgba(212,175,55,0.20),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-0/0 via-bg-0/20 to-bg-0" />
      </div>

      <div className="container relative grid min-h-[calc(100svh-5rem)] items-center gap-10 pb-20 pt-12 lg:grid-cols-12">
        {/* Left: Text */}
        <div className="relative z-10 lg:col-span-7 xl:col-span-7">
          <Reveal delay={0.05}>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]" />
              {eyebrowText}
            </span>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="heading-display mt-6 text-[clamp(2.6rem,6.8vw,6.5rem)] text-shadow-gold">
              <span className="gold-text">{headline.slice(0, 5)}</span>{headline.slice(5)}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-soft/90 lg:text-lg">
              {subheadingText}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <MagneticButton
                variant="primary"
                onClick={() => scrollToId('booking', 80)}
                className="h-14 px-8 text-[15px] w-full sm:w-auto justify-center"
              >
                {primaryCta}
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                onClick={() => scrollToId('services', 80)}
                className="h-14 px-8 text-[15px] w-full sm:w-auto justify-center"
              >
                {secondaryCta}
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <TrustBadge icon={<Star className="h-4 w-4 text-gold" fill="currentColor" />} text="4.7★ Google Rated" />
              <TrustBadge icon={<Shield className="h-4 w-4 text-gold" />} text="100% Safe Journeys" />
              <TrustBadge icon={<Award className="h-4 w-4 text-gold" />} text="Premium Fleet" />
            </div>
          </Reveal>
        </div>

        {/* Right: Premium Vehicle Showcase Image (front.png) */}
        <div className="relative z-10 lg:col-span-5 xl:col-span-5">
          <Reveal delay={0.25}>
            <div className="relative mx-auto max-w-lg lg:max-w-none group">
              {/* Golden Ambient Aura Behind Image */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-gold/30 via-gold/10 to-transparent blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"
              />

              <div className="glass-gold relative overflow-hidden rounded-[2.2rem] p-3.5 border border-gold/35 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.8rem] bg-black/40">
                  <img
                    src="/front.png"
                    alt="Tamizhan Travels Premium Fleet & Vehicles"
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-black/75 backdrop-blur-md px-3.5 py-1.5 text-[11px] uppercase tracking-[0.24em] text-gold-200 shadow-md">
                      <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                      Premium Fleet
                    </span>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                    <div>
                      <p className="font-display text-[20px] font-bold text-white drop-shadow-md">
                        Tamizhan Luxury Fleet
                      </p>
                      <p className="mt-1 text-[12px] text-gold-200/90 font-medium">
                        Luxury Cabs · Tempo Travellers · Mini Buses
                      </p>
                    </div>
                    <button
                      onClick={() => scrollToId('booking', 80)}
                      data-interactive
                      className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gold-gradient px-4 text-[12px] font-bold uppercase tracking-wider text-bg-0 shadow-gold-glow hover:scale-105 transition-all duration-300"
                    >
                      Book <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollToId('services', 60)}
        data-interactive
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-gold-200/70 hover:text-white reveal-item"
        style={{ animationDelay: '1.2s' }}
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>

      <span aria-hidden className="pointer-events-none absolute left-0 top-24 h-px w-20 bg-gradient-to-r from-gold/60 to-transparent" />
      <span aria-hidden className="pointer-events-none absolute right-0 top-40 h-px w-24 bg-gradient-to-l from-gold/60 to-transparent" />
    </section>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] text-soft/90">
      {icon}
      {text}
    </div>
  );
}
