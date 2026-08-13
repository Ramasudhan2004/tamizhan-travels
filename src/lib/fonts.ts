import { Inter, Space_Grotesk } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const clashDisplay = spaceGrotesk;
