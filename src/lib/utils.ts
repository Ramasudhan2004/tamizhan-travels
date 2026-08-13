import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneDisplay(raw: string) {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) {
    return '+91 ' + digits.slice(2, 7) + ' ' + digits.slice(7);
  }
  if (digits.length === 10) {
    return digits.slice(0, 5) + ' ' + digits.slice(5);
  }
  return raw;
}

export function whatsappLink(number: string, message = '') {
  const digits = number.replace(/\D/g, '');
  const withCountry = digits.startsWith('91') ? digits : '91' + digits;
  const base = `https://wa.me/${withCountry}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function todayISOPlus(offsetDays = 7) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function scrollToId(id: string, offset = 60) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (globalThis as any)?.window?.lenis;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  if (lenis && typeof lenis.scrollTo === 'function') lenis.scrollTo(top);
  else window.scrollTo({ top, behavior: 'smooth' });
}
