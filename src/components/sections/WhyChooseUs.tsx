'use client';
import { Clock, UserCheck, Gem, Sparkles, Heart, ShieldCheck, Briefcase } from 'lucide-react';
import type { ComponentType } from 'react';
import type { Feature } from '@/types/cms';
import Reveal from '@/components/fx/Reveal';
import CountUp from '@/components/fx/CountUp';
import { cn } from '@/lib/utils';

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Clock, UserCheck, Gem, Sparkles, Heart, ShieldCheck, Briefcase,
};

const STATS = [
  { label: 'Years of Service', value: 10,   suffix: '+' },
  { label: 'Happy Travellers', value: 5000, suffix: '+' },
  { label: 'Google Rating',    value: 4.7,  suffix: '★', decimals: 1 },
  { label: '24/7 Support',     value: 24,   suffix: '/7' },
];

type Props = { features: Feature[] };

export default function WhyChooseUs({ features }: Props) {
  return (
    <section id="why-us" className="relative overflow-hidden py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(ellipse_50%_40%_at_0%_0%,rgba(212,175,55,0.14),transparent_70%),radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(212,175,55,0.12),transparent_70%)]" />
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-12 items-start">

          {/* Left — static, no sticky */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Why Tamizhan Travels</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-display mt-6 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02]">
                Where Trust Meets <span className="gold-text">Luxury on Wheels.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-soft/80 lg:text-base">
                Seven reasons guests book us again and again — and recommend us to everyone they love.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-14 grid grid-cols-2 gap-5 md:max-w-xl">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-gold/15 bg-white/[0.03] p-6">
                    <p className="font-display text-[40px] font-semibold leading-none text-white">
                      <CountUp end={s.value} suffix={s.suffix ?? ''} decimals={(s as any).decimals ?? 0} />
                    </p>
                    <div className="mt-3 h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />
                    <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-soft/80">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — feature cards, plain divs no TiltCard */}
          <div className="lg:col-span-7">
            <div className="grid gap-5 md:grid-cols-2">
              {features.map((f, i) => {
                const Icon = ICONS[f.iconName] ?? Gem;
                return (
                  <Reveal key={f._id} delay={i < 4 ? i * 0.04 : 0} as="div" className={cn(i === features.length - 1 && features.length % 2 === 1 ? 'md:col-span-2' : '')}>
                    <div className="group flex items-start gap-5 rounded-2xl border border-white/5 bg-white/[0.025] p-6 transition-colors duration-300 hover:border-gold/30 hover:bg-gold/[0.04]">
                      <span className="grid h-12 w-12 flex-none place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.24em] text-gold-300/80">
                          {String(i + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-1 font-display text-[18px] font-semibold text-white">{f.title}</h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-soft/75">{f.description}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
