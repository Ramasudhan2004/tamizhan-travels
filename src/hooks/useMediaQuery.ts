'use client';
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const m = window.matchMedia(query);
    setMatches(m.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    m.addEventListener?.('change', handler);
    return () => m.removeEventListener?.('change', handler);
  }, [query]);
  return matches;
}

export function useIsTouch() {
  return useMediaQuery('(hover: none) and (pointer: coarse)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
