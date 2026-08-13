'use client';
import { useEffect, useState } from 'react';
import { Menu, Phone } from 'lucide-react';
import { useUIStore } from '@/stores/ui';
import { cn, scrollToId } from '@/lib/utils';
import MagneticButton from '@/components/fx/MagneticButton';

const LINKS = [
  { label: 'Home', href: 'hero' },
  { label: 'Services', href: 'services' },
  { label: 'Destinations', href: 'destinations' },
  { label: 'Gallery', href: 'gallery' },
  { label: 'About', href: 'about' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const toggleDrawer = useUIStore((s) => s.toggleMobileDrawer);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Find active section
      let currentActive = 'hero';
      for (const { href } of LINKS) {
        const el = document.getElementById(href);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 140) currentActive = href;
      }
      setActive(currentActive);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'py-2 backdrop-blur-2xl bg-bg-0/70 border-b border-white/5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-transparent border-b border-transparent',
      )}
    >
      <div className="container flex h-14 items-center justify-between">
        <button
          onClick={() => scrollToId('hero', 100)}
          data-interactive
          className="flex items-center gap-3 group"
          aria-label="TAMIZHAN TRAVELS Home"
        >
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 shadow-gold-glow group-hover:shadow-gold-glow-lg transition-all duration-500 group-hover:scale-105"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 18h2l1-6h10l1 6h2" stroke="#050505" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 12V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4" stroke="#050505" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8.5" cy="19" r="1.4" fill="#050505" />
              <circle cx="15.5" cy="19" r="1.4" fill="#050505" />
            </svg>
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-wide text-white">
              TAMIZHAN <span className="gold-text">TRAVELS</span>
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold-300/80">
              Premium · Since Day One
            </span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollToId(l.href, 80)}
              data-interactive
              className={cn(
                'relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors',
                'gold-underline',
                active === l.href
                  ? 'text-white is-active'
                  : 'text-soft hover:text-white',
              )}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:09944498909"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] font-medium text-soft hover:border-gold/50 hover:text-white transition-all data-interactive"
          >
            <Phone className="h-4 w-4 text-gold" />
            099444 98909
          </a>
          <MagneticButton
            variant="primary"
            onClick={() => scrollToId('booking', 80)}
            className="h-11 px-6 text-[13px]"
          >
            Book Now
          </MagneticButton>
        </div>

        <button
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white hover:border-gold/50 transition data-interactive"
          onClick={toggleDrawer}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer links={LINKS} onJump={(id) => { scrollToId(id, 80); useUIStore.getState().setMobileDrawerOpen(false); }} />
    </header>
  );
}

function MobileDrawer({
  links,
  onJump,
}: {
  links: { label: string; href: string }[];
  onJump: (id: string) => void;
}) {
  const open = useUIStore((s) => s.mobileDrawerOpen);
  const setOpen = useUIStore((s) => s.setMobileDrawerOpen);
  return (
    <div
      className={cn(
        'lg:hidden fixed inset-0 z-50 transition-all duration-500',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          'absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-500',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          'absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-gold/15 bg-gradient-to-b from-bg-1/95 to-bg-0/95 backdrop-blur-2xl shadow-gold-glow-lg',
          'transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/5">
          <span className="font-display text-[15px] font-semibold">
            TAMIZHAN <span className="gold-text">TRAVELS</span>
          </span>
          <button
            data-interactive
            className="h-9 w-9 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-gold/50 transition"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-5">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => onJump(l.href)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] text-soft hover:bg-gold/5 hover:text-white transition data-interactive"
            >
              {l.label}
              <span className="text-gold">→</span>
            </button>
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 p-5 space-y-3 border-t border-white/5">
          <a
            href="tel:09944498909"
            className="btn-ghost w-full justify-center"
          >
            <Phone className="h-4 w-4 text-gold" /> Call 099444 98909
          </a>
          <button className="btn-primary w-full" onClick={() => onJump('booking')}>
            Book Your Journey
          </button>
        </div>
      </aside>
    </div>
  );
}
