'use client';
import { Phone, MessageCircle, MapPin, Clock, Mail, Send, ArrowUpRight } from 'lucide-react';
import type { ContactInfo } from '@/types/cms';
import Reveal from '@/components/fx/Reveal';
import MagneticButton from '@/components/fx/MagneticButton';
import { formatPhoneDisplay, whatsappLink } from '@/lib/utils';

type Props = { contact: ContactInfo };

export default function Contact({ contact }: Props) {
  const wa = whatsappLink(
    contact.whatsapp || contact.phone,
    'Hi Tamizhan Travels, I saw your website and would like to know more about your services.',
  );

  return (
    <section id="contact" className="relative overflow-hidden py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-70 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.16),transparent_70%)]" />
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">Contact Us</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="heading-display mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">
              Talk to a real human.<br />
              <span className="gold-text">Any time, any day.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-soft/80 lg:text-base">
              Call, WhatsApp, or walk into our office in Mannarai, Tiruppur. A real person, not a bot, will help you with every detail.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12 items-stretch">
          <Reveal className="flex flex-col gap-6">
            <div className="glass-gold relative overflow-hidden rounded-[2rem] p-8 md:p-10">
              <div className="mb-8 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-bg-0 shadow-gold-glow">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-[22px] font-semibold text-white">{contact.businessName}</p>
                  <p className="text-[12px] uppercase tracking-[0.28em] text-gold-200">Tiruppur · Tamil Nadu</p>
                </div>
              </div>

              <ul className="space-y-5">
                <ContactRow icon={<Phone className="h-5 w-5 text-gold" />} label="Call us">
                  <a href={`tel:${contact.phone}`} className="group/data data-interactive inline-flex items-center gap-3">
                    <span className="font-display text-2xl font-semibold text-white group-hover/data:text-gold transition-colors tabular-nums">
                      {formatPhoneDisplay(contact.phone)}
                    </span>
                    <ArrowUpRight className="h-4 w-4 -translate-y-1 translate-x-1 opacity-0 transition group-hover/data:opacity-100 group-hover/data:translate-y-0 group-hover/data:translate-x-0" />
                  </a>
                </ContactRow>

                <ContactRow icon={<MessageCircle className="h-5 w-5 text-green-400" />} label="WhatsApp (Instant reply)">
                  <a href={wa} target="_blank" rel="noreferrer" className="group/data data-interactive inline-flex items-center gap-3">
                    <span className="font-display text-2xl font-semibold text-white group-hover/data:text-green-300 transition-colors tabular-nums">
                      {formatPhoneDisplay(contact.whatsapp || contact.phone)}
                    </span>
                    <Send className="h-4 w-4 text-green-400 -translate-y-1 translate-x-1 opacity-0 transition group-hover/data:opacity-100 group-hover/data:translate-y-0 group-hover/data:translate-x-0" />
                  </a>
                </ContactRow>

                <ContactRow icon={<MapPin className="h-5 w-5 text-gold" />} label="Our Office">
                  <div className="text-[15px] leading-relaxed text-soft/85 max-w-md">
                    {contact.addressLines.join(', ')}
                    <br />
                    {contact.city}, {contact.state} — {contact.pincode}
                  </div>
                </ContactRow>

                <ContactRow icon={<Clock className="h-5 w-5 text-gold" />} label="Opening Hours">
                  <span className="text-[15px] text-soft/85">Open <span className="gold-text font-semibold">{contact.openHours}</span> · 365 days</span>
                </ContactRow>

                <ContactRow icon={<Mail className="h-5 w-5 text-gold" />} label="Email">
                  <a href="mailto:hello@tamizhantravels.in" className="text-[15px] text-soft/85 hover:text-gold data-interactive">
                    hello@tamizhantravels.in
                  </a>
                </ContactRow>
              </ul>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <MagneticButton variant="primary" className="h-14 text-[14px]" onClick={() => window.location.href = `tel:${contact.phone}`}>
                  <Phone className="h-4 w-4" /> Call {formatPhoneDisplay(contact.phone)}
                </MagneticButton>
                <MagneticButton
                  variant="ghost"
                  className="h-14 text-[14px]"
                  onClick={() => window.open(wa, '_blank')}
                >
                  <MessageCircle className="h-4 w-4 text-green-400" /> WhatsApp Us
                </MagneticButton>
              </div>
            </div>

            {/* Contact cards row */}
            <div className="grid gap-6 md:grid-cols-3">
              <MiniCard title="Instant" subtitle="Reply under 20 mins" icon={<Send className="h-5 w-5 text-gold" />} />
              <MiniCard title="Transparent" subtitle="No hidden charges" icon={<Clock className="h-5 w-5 text-gold" />} />
              <MiniCard title="24 / 7" subtitle="Day or night help" icon={<Phone className="h-5 w-5 text-gold" />} />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="relative h-full min-h-[560px] overflow-hidden rounded-[2rem] border border-gold/15 glass-gold p-4 md:p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(212,175,55,0.35), transparent 50%)",
                }}
              />
              <div className="relative z-10 flex h-full items-stretch overflow-hidden rounded-2xl border border-white/5 bg-black/40">
                <iframe
                  title="Tamizhan Travels - Tiruppur location"
                  src={
                    contact.mapEmbedUrl ||
                    'https://www.google.com/maps?q=Mannarai+Tiruppur&Tamil+Nadu+641607&output=embed'
                  }
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[520px] w-full flex-1"
                  allowFullScreen
                />
              </div>
              <div className="absolute left-10 top-10 rounded-2xl border border-gold/30 bg-black/80 px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-bg-0">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gold-200">We are here</p>
                    <p className="font-display text-[14px] font-semibold text-white">Mannarai, Tiruppur</p>
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

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[52px_1fr] items-start gap-4">
      <span className="grid h-[52px] w-[52px] place-items-center rounded-2xl border border-gold/30 bg-gold/5">
        {icon}
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold-300/80">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  );
}

function MiniCard({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gold/15 glass-gold p-5 group hover:border-gold/40 transition-all duration-500 hover:shadow-gold-glow">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold transition-transform duration-500 group-hover:rotate-6">
        {icon}
      </div>
      <p className="mt-4 font-display text-[17px] font-semibold text-white">{title}</p>
      <p className="mt-1 text-[12px] text-muted">{subtitle}</p>
    </div>
  );
}
