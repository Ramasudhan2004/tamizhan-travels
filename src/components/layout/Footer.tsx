'use client';
import { Instagram, Facebook, MapPin, Phone, Mail, Clock, Youtube, Twitter, MessageCircle } from 'lucide-react';
import { seedData } from '@/lib/sanity/seed';
import { scrollToId } from '@/lib/utils';

const QUICK = [
  { label: 'Home', id: 'hero' },
  { label: 'Destinations', id: 'destinations' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Booking', id: 'booking' },
  { label: 'About', id: 'about' },
];

export default function Footer() {
  const c = seedData.contact;
  return (
    <footer id="footer" className="relative overflow-hidden border-t border-white/5 bg-bg-0 pt-20 pb-10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-32 h-80 bg-gold-gradient-radial opacity-70" />
      <div className="container relative">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-700 shadow-gold-glow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 18h2l1-6h10l1 6h2" stroke="#050505" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M6 12V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4" stroke="#050505" strokeWidth="1.7" strokeLinecap="round" />
                  <circle cx="8.5" cy="19" r="1.4" fill="#050505" />
                  <circle cx="15.5" cy="19" r="1.4" fill="#050505" />
                </svg>
              </span>
              <div>
                <div className="font-display text-[15px] font-semibold text-white">TAMIZHAN <span className="gold-text">TRAVELS</span></div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold-300/80">Every Journey Begins With Trust</div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-muted">
              Premium travel & luxury transportation across South India — from Tiruppur to the hills of Ooty, the backwaters of Kerala, and the sacred shores of Rameswaram.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <Social href="#" label="Instagram"><Instagram className="h-4 w-4" /></Social>
              <Social href="#" label="Facebook"><Facebook className="h-4 w-4" /></Social>
              <Social href="#" label="YouTube"><Youtube className="h-4 w-4" /></Social>
              <Social href="#" label="Twitter/X"><Twitter className="h-4 w-4" /></Social>
              <Social href={`https://wa.me/${c.whatsapp}`} label="WhatsApp"><MessageCircle className="h-4 w-4" /></Social>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.22em] text-gold-200">Quick Links</h4>
            <ul className="mt-6 space-y-3">
              {QUICK.map((q) => (
                <li key={q.id}>
                  <button
                    onClick={() => scrollToId(q.id, 80)}
                    className="group inline-flex items-center gap-2 text-[14px] text-soft/80 transition hover:text-gold data-interactive"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-6" />
                    {q.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.22em] text-gold-200">Contact</h4>
            <ul className="mt-6 space-y-4 text-[14px] text-soft/90">
              <li className="flex items-start gap-3">
                <IconWrap><MapPin className="h-4 w-4 text-gold" /></IconWrap>
                <span className="leading-relaxed">
                  {c.addressLines.join(', ')}
                  <br />
                  {c.city}, {c.state} {c.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <IconWrap><Phone className="h-4 w-4 text-gold" /></IconWrap>
                <a className="hover:text-gold data-interactive" href={`tel:${c.phone}`}>{c.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <IconWrap><Mail className="h-4 w-4 text-gold" /></IconWrap>
                <a className="hover:text-gold data-interactive" href="mailto:ravir11111980@gmail.com">ravir11111980@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <IconWrap><Clock className="h-4 w-4 text-gold" /></IconWrap>
                Open {c.openHours}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.22em] text-gold-200">Book Instantly</h4>
            <p className="mt-6 text-[14px] text-soft/80">
              Call or WhatsApp us anytime. We respond within minutes for confirmed bookings.
            </p>
            <div className="mt-5 space-y-3">
              <a className="btn-primary w-full justify-center text-[14px]" href={`tel:${c.phone}`}>
                <Phone className="h-4 w-4" /> Call 099444 98909
              </a>
              <a
                className="btn-ghost w-full justify-center text-[14px]"
                href={`https://wa.me/${c.whatsapp}?text=${encodeURIComponent('Hi Tamizhan Travels, I want to book a journey.')}`}
              >
                <MessageCircle className="h-4 w-4 text-green-400" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="gold-divider mt-16 mb-8" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-[13px] text-muted/80">
          <p>© {new Date().getFullYear()} TAMIZHAN TRAVELS. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-4">
            <button onClick={() => scrollToId('hero', 100)} className="hover:text-gold data-interactive">Back to top ↑</button>
            <span>Privacy Policy</span>
            <span>Terms</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg border border-gold/20 bg-gold/5">
      {children}
    </span>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      data-interactive
      target="_blank"
      rel="noreferrer"
      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-soft/80 transition hover:border-gold/60 hover:text-gold hover:-translate-y-0.5 hover:shadow-gold-glow"
    >
      {children}
    </a>
  );
}
