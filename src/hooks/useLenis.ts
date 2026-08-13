'use client';
import React, { type ReactNode } from 'react';

// Native scroll — no JS RAF loop, browser handles it natively at compositor level
export function LenisProvider({ children }: { children: ReactNode }) {
  return React.createElement(React.Fragment, null, children);
}

export function scrollToId(id: string, offset = 60) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
