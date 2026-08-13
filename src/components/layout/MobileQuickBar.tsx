'use client';

import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { scrollToId } from '@/lib/utils';

export default function MobileQuickBar() {
  const whatsappUrl = `https://wa.me/919944498909?text=${encodeURIComponent('Hi Tamizhan Travels, I saw your website and would like to book a journey.')}`;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-2.5 bg-bg-0/95 backdrop-blur-2xl border-t border-gold/30 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="grid grid-cols-3 gap-2 container px-2">
        <a
          href="tel:09944498909"
          aria-label="Call Tamizhan Travels"
          className="flex flex-col items-center justify-center py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-soft hover:text-white hover:border-gold/50 transition active:scale-95"
        >
          <Phone className="h-4 w-4 text-gold mb-1" />
          <span className="text-[11px] font-semibold tracking-wider uppercase">Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Tamizhan Travels on WhatsApp"
          className="flex flex-col items-center justify-center py-2.5 rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition active:scale-95"
        >
          <MessageCircle className="h-4 w-4 text-green-400 mb-1" />
          <span className="text-[11px] font-semibold tracking-wider uppercase">WhatsApp</span>
        </a>

        <button
          type="button"
          aria-label="Book a Journey"
          onClick={() => scrollToId('booking', 80)}
          className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-gold-gradient text-bg-0 font-bold shadow-gold-glow transition active:scale-95"
        >
          <Calendar className="h-4 w-4 mb-1" />
          <span className="text-[11px] tracking-wider uppercase font-bold">Book</span>
        </button>
      </div>
    </div>
  );
}
