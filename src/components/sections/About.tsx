'use client';
import { Compass, Eye, Target, HeartHandshake } from 'lucide-react';
import Reveal from '@/components/fx/Reveal';
import type { ComponentType } from 'react';

const TIMELINE: Array<{ title: string; Icon: ComponentType<{ className?: string }>; body: string; tag: string }> = [
  { title: 'Our Mission',    tag: 'Purpose',    Icon: Compass,       body: 'To redefine premium bus & cab travel in South India — one ride at a time — with punctuality, cleanliness and a human touch.' },
  { title: 'Our Vision',     tag: 'Tomorrow',   Icon: Eye,           body: 'To be the most trusted name in luxury ground travel for families, corporates and pilgrims across Tamil Nadu and beyond.' },
  { title: 'Our Commitment', tag: 'Promise',    Icon: Target,        body: 'A confirmed cab, a trained driver, a sanitised vehicle — every single time. With transparent pricing and a 24/7 desk you can actually reach.' },
  { title: 'Customer First', tag: 'North Star', Icon: HeartHandshake,body: 'From first call to last dropoff, every team member at Tamizhan Travels is measured by the comfort, safety and delight of the guest.' },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg-1/60 py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(212,175,55,0.12),transparent_70%)]" />
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal>
              <span className="eyebrow">About Us</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-display mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">
                A legacy of trust,<br />
                <span className="gold-text">driven one kilometre at a time.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-soft/85 lg:text-base">
                TAMIZHAN TRAVELS was born out of a simple frustration: good travel is hard to book,
                and great travel even harder. Based in Mannarai, Tiruppur, we have spent years
                curating a fleet we are proud of, a team of drivers we trust with our own families,
                and a way of doing business that leaves guests calling us again and again.
              </p>
            </Reveal>

            <div className="relative mt-16 pl-2">
              <span aria-hidden className="absolute left-[11px] top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold via-gold/60 to-transparent" />
              <ul className="space-y-8">
                {TIMELINE.map((t, i) => {
                  const Icon = t.Icon;
                  return (
                    <Reveal key={t.title} delay={i < 2 ? i * 0.06 : 0} as="li">
                      <div className="relative grid grid-cols-[44px_1fr] items-start gap-5">
                        <span className="grid h-[44px] w-[44px] place-items-center rounded-full border-2 border-gold/40 bg-bg-2 text-gold">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-6 transition-colors duration-300 hover:border-gold/30 hover:bg-gold/[0.05]">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-[0.28em] text-gold-300/90">{t.tag}</span>
                            <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                          </div>
                          <h3 className="mt-2 font-display text-[22px] font-semibold text-white">{t.title}</h3>
                          <p className="mt-3 text-[14px] leading-relaxed text-soft/80">{t.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/15">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&auto=format&fit=crop&q=75"
                alt="Travelling through South India"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
              <div className="absolute inset-x-6 bottom-6">
                <div className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-black/70 p-5">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-bg-0">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-[18px] font-semibold text-white">10+ Years on Road</p>
                    <p className="text-[12px] text-soft/80">Rooted in Tiruppur. Serving South India.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
