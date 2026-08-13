'use client';

import { useState, useEffect, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Users2, Bus, HeartHandshake, Building2, Landmark, Plane, Flower2,
  X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck
} from 'lucide-react';
import Reveal from '@/components/fx/Reveal';
import TiltCard from '@/components/fx/TiltCard';
import { scrollToId } from '@/lib/utils';

type ServiceItem = {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  greeting: string;
  details: string;
  features: string[];
  fleetOptions: string;
  startingPrice: string;
  Icon: ComponentType<{ className?: string }>;
  accent: string;
};

const SERVICES: ServiceItem[] = [
  {
    id: 'cab',
    title: 'Premium Cab Booking',
    tagline: 'Sedan & SUV',
    desc: '4–7 seater luxury cabs for airport transfers, city rides and outstation trips.',
    greeting: 'Greetings! Welcome to Tamizhan Travels Premium Cab Services.',
    details: 'Experience smooth, luxurious, and hassle-free travel across South India. Whether you need a swift sedan for city errands or a spacious SUV like Innova Crysta for long highway trips, our sanitized vehicles and experienced chauffeurs ensure top-tier comfort.',
    features: [
      'Clean & Sanitized Fleet',
      'Experienced Uniformed Chauffeurs',
      'Transparent Per-KM Pricing',
      '24/7 Doorstep Pickup & Drop',
      'Zero Hidden or Surge Charges'
    ],
    fleetOptions: 'Swift Dzire, Etios, Innova Crysta, Fortuner',
    startingPrice: '₹ 14 / KM',
    Icon: Car,
    accent: 'from-gold-400 to-gold-600',
  },
  {
    id: 'tempo',
    title: 'Tempo Traveller',
    tagline: '12 – 17 Seater',
    desc: 'Spacious pushback/recliner traveller vans for families, friends and small groups.',
    greeting: 'Hello! Welcome to our Executive Tempo Traveller Fleet.',
    details: 'Planning a trip to Ooty, Kodaikanal, or Kerala with family or colleagues? Our 12 to 17-seater Tempo Travellers feature plush pushback seats, dual AC, high-tech audio systems, and ample luggage space for comfortable group journeys.',
    features: [
      'Luxury Reclining Pushback Seats',
      'Dual Air Conditioning & LED TV',
      'Spacious Overhead Luggage Racks',
      'Hill Station Experienced Drivers',
      'Smooth Air Suspension Travel'
    ],
    fleetOptions: '12-Seater AC, 14-Seater Luxury, 17-Seater Premium',
    startingPrice: '₹ 22 / KM',
    Icon: Users2,
    accent: 'from-amber-300 to-gold-600',
  },
  {
    id: 'minibus',
    title: 'Mini Bus Rental',
    tagline: '18 – 26 Seater',
    desc: 'Executive mini buses for wedding parties, corporate outings and group pilgrimages.',
    greeting: 'Welcome! Discover hassle-free Group Transportation.',
    details: 'Designed for wedding escorts, corporate conferences, and large tour groups. Our luxury mini buses come equipped with comfortable wide seats, ambient lighting, onboard entertainment, and professional multi-lingual drivers.',
    features: [
      'High-Back Comfort Recliners',
      'Individual AC Vents & Charging Ports',
      'Spacious Rear Luggage Boot',
      'Professional Multi-lingual Chauffeur',
      'Full Comprehensive Insurance Coverage'
    ],
    fleetOptions: '18 Seater, 21 Seater & 26 Seater Luxury Buses',
    startingPrice: '₹ 30 / KM',
    Icon: Bus,
    accent: 'from-gold-300 to-bronze',
  },
  {
    id: 'family',
    title: 'Family Tours',
    tagline: 'Curated Itineraries',
    desc: 'Custom multi-day South India tours designed for every generation of your family.',
    greeting: 'Warmest Welcome to Tamizhan Family Holiday Experiences!',
    details: 'We turn multi-day family vacations into unforgettable memories. From tranquil hill station retreats in Nilgiris to lush backwaters in Munnar and Kerala, we customize itineraries, handle stays, and provide dedicated vehicles.',
    features: [
      'Customized Tour Routes & Pacing',
      'Family-Friendly Flexible Stops',
      '24/7 Dedicated Trip Coordinator',
      'Kid & Elderly Friendly Drivers',
      'Hassle-Free Hotel Assistance'
    ],
    fleetOptions: 'Innova Crysta, Tempo Traveller & SUV Fleet',
    startingPrice: 'Custom Package Pricing',
    Icon: HeartHandshake,
    accent: 'from-gold-400 to-gold-700',
  },
  {
    id: 'corporate',
    title: 'Corporate Travel',
    tagline: 'On Time, Every Time',
    desc: 'Dedicated executive cabs, employee transfers and business trip logistics.',
    greeting: 'Greetings Executive Partner! Welcome to Corporate Solutions.',
    details: 'Punctuality and professionalism define our corporate transit services. We handle corporate executive transfers, VIP airport pickups, delegate shuttles, and monthly corporate fleet arrangements with automated billing.',
    features: [
      'Guaranteed On-Time Pickup',
      'Professional Executive Dress Code',
      'GST Compliant Corporate Invoicing',
      'Priority 24/7 Operations Desk',
      'Flight & Schedule Delay Monitoring'
    ],
    fleetOptions: 'Sedans, Executive Cabs & Tempo Travellers',
    startingPrice: 'Contract & Per-KM Rates',
    Icon: Building2,
    accent: 'from-yellow-200 to-gold-600',
  },
  {
    id: 'pilgrimage',
    title: 'Pilgrimage Tours',
    tagline: 'Sacred Routes',
    desc: 'Rameswaram, Madurai, Kanyakumari, Palani and the entire holy circuit.',
    greeting: 'Vanakkam! Welcome to Tamizhan Sacred Pilgrimage Journeys.',
    details: 'Embark on spiritual journeys across South India’s most revered temples. We optimize routes according to temple opening timings, provide patient drivers familiar with sacred towns, and facilitate comfortable travel for elders.',
    features: [
      'Temple Darshan Timings Optimization',
      'Patient & Respectful Chauffeurs',
      'Clean & Hygienic Vehicle Cabins',
      'Custom Multi-Temple Circuits',
      'Senior Citizen Assistance'
    ],
    fleetOptions: 'Etios, Innova Crysta & Tempo Traveller',
    startingPrice: 'Special Package Rates',
    Icon: Landmark,
    accent: 'from-gold-400 to-gold-700',
  },
  {
    id: 'airport',
    title: 'Airport Transfer',
    tagline: 'Coimbatore · Chennai',
    desc: 'Punctual door-to-door airport transfers with flight tracking included.',
    greeting: 'Welcome to Tamizhan Express Airport Transfers!',
    details: 'Never miss a flight or wait at the arrivals gate again. Our drivers track flight status in real time to adapt to early arrivals or delays, ensuring prompt pickup with zero waiting charges for delayed flights.',
    features: [
      'Real-Time Flight Tracking',
      'Zero Waiting Fee for Delays',
      'Door-to-Door Express Pickup',
      'Luggage Handling Assistance',
      'Instant SMS Driver Allocation'
    ],
    fleetOptions: 'Luxury Sedans & Premium SUVs',
    startingPrice: 'Fixed Route Fares',
    Icon: Plane,
    accent: 'from-gold-300 to-gold-600',
  },
  {
    id: 'wedding',
    title: 'Wedding Transportation',
    tagline: 'Grand Entrances',
    desc: 'Premium fleet for Baraat, guest transfers and shuttle services across events.',
    greeting: 'Heartiest Congratulations & Welcome to Wedding Fleet Logistics!',
    details: 'Make your grand day seamless and majestic. We coordinate complete transport management for wedding couples, family VIPs, and guest shuttles between venues, hotels, and transit hubs.',
    features: [
      'Decorated VIP Bride & Groom Cars',
      'Fleet Coordination Support',
      'Multi-Venue Guest Shuttle',
      'Dedicated Event Logistics Manager',
      'Immaculately Dressed Drivers'
    ],
    fleetOptions: 'Audi, Benz, Fortuner, Innova & Buses',
    startingPrice: 'Wedding Event Packages',
    Icon: Flower2,
    accent: 'from-amber-300 to-gold-700',
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Lock body scroll when greeting modal is active
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  return (
    <section id="services" className="relative overflow-hidden py-28 lg:py-36">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.18),transparent_70%)]" />
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-10 h-px w-64 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container">
        <Reveal className="max-w-3xl text-center mx-auto">
          <span className="eyebrow">Our Craft</span>
          <h2 className="heading-display mt-6 text-[clamp(2.25rem,5vw,4.5rem)]">
            Luxury Services,<br />
            <span className="gold-text">Crafted for You.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-soft/80 lg:text-base">
            From a quick airport drop to a ten-day pilgrimage, every journey is orchestrated with the same obsession for detail, comfort and grace. Click explore to view complete details.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = s.Icon;
            return (
              <Reveal key={s.id} delay={i < 4 ? i * 0.05 : 0} as="div">
                <TiltCard strength={3.5} borderGradient className="h-full">
                  <article className="glass-gold relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-7 group">
                    <div className="relative flex flex-col">
                      <span
                        className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} shadow-gold-glow transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3`}
                      >
                        <Icon className="h-7 w-7 text-bg-0" />
                      </span>
                      <div className="mt-7">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-gold-300/90">{s.tagline}</p>
                        <h3 className="mt-2 font-display text-[20px] font-semibold text-white">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-4 text-[14px] leading-relaxed text-soft/75">
                        {s.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedService(s)}
                      className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-left w-full group/btn"
                    >
                      <span className="text-[11px] uppercase tracking-[0.28em] font-semibold text-gold-200 group-hover/btn:text-gold transition-colors">
                        Explore Service
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold transition-all duration-300 group-hover/btn:bg-gold group-hover/btn:text-bg-0 group-hover/btn:scale-110">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </button>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Interactive Service Greeting Card Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Backdrop */}
            <motion.div
              key="service-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedService(null)}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-[101] overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                <motion.div
                  key="service-modal"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gold/35 bg-bg-1 shadow-[0_0_50px_rgba(212,175,55,0.15)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Decorative ambient header */}
                  <div className="relative overflow-hidden bg-gradient-to-b from-gold/15 via-gold/5 to-transparent p-6 sm:p-8 border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:border-gold/60 hover:text-gold"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    <div className="flex flex-wrap items-center gap-4">
                      <span className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${selectedService.accent} shadow-gold-glow`}>
                        <selectedService.Icon className="h-8 w-8 text-bg-0" />
                      </span>

                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-gold-200">
                          <Sparkles className="h-3.5 w-3.5 text-gold" />
                          Tamizhan Greeting Card
                        </div>
                        <h3 className="mt-2 font-display text-[26px] sm:text-[32px] font-bold text-white leading-tight">
                          {selectedService.title}
                        </h3>
                        <p className="text-[13px] text-gold-300/90 font-medium tracking-wide">{selectedService.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Content Body */}
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Greeting Box */}
                    <div className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-4 sm:p-5">
                      <p className="font-display text-[15px] sm:text-[16px] font-semibold text-gold-200">
                        {selectedService.greeting}
                      </p>
                      <p className="mt-2 text-[14px] leading-relaxed text-soft/90">
                        {selectedService.details}
                      </p>
                    </div>

                    {/* Features list */}
                    <div>
                      <h4 className="text-[12px] uppercase tracking-[0.28em] font-semibold text-gold-200 mb-3 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-gold" /> Key Inclusions & Guarantees
                      </h4>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {selectedService.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-[13px] text-soft">
                            <CheckCircle2 className="h-4 w-4 text-gold flex-none" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Options & Rate */}
                    <div className="grid gap-4 sm:grid-cols-2 border-t border-white/10 pt-5">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <p className="text-[11px] uppercase tracking-widest text-muted">Fleet Options</p>
                        <p className="mt-1 font-display text-[14px] font-semibold text-white">{selectedService.fleetOptions}</p>
                      </div>

                      <div className="rounded-2xl border border-gold/25 bg-gold/[0.05] p-4">
                        <p className="text-[11px] uppercase tracking-widest text-gold-300">Starting Tariff</p>
                        <p className="mt-1 font-display text-[18px] font-bold text-gold">{selectedService.startingPrice}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedService(null);
                        scrollToId('booking', 80);
                      }}
                      className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gold-gradient py-4 font-display text-[15px] font-bold uppercase tracking-[0.18em] text-bg-0 shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
                    >
                      <span>Book {selectedService.title}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
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
