import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { inter, spaceGrotesk } from '@/lib/fonts';
import { LenisProvider } from '@/hooks/useLenis';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileQuickBar from '@/components/layout/MobileQuickBar';
import GrainOverlay from '@/components/fx/GrainOverlay';

const SITE = 'TAMIZHAN TRAVELS';
const TAG = 'Premium Travel & Luxury Transportation across South India';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tamizhantravels.example';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE} · Every Journey Begins With Trust.`,
    template: `%s | ${SITE}`,
  },
  description: TAG + ' — Premium Cab, Tempo Traveller & Mini Bus rentals from Tiruppur to Kerala, Ooty, Kodaikanal, Rameswaram, Kanyakumari and more.',
  keywords: [
    'Tiruppur cabs', 'Tempo Traveller Tiruppur', 'Mini Bus Tamil Nadu',
    'South India tours', 'Kerala tours', 'Ooty cabs', 'Kodaikanal travel',
    'Rameswaram pilgrimage', 'TAMIZHAN TRAVELS', 'Premium travel agency',
  ],
  authors: [{ name: SITE }],
  openGraph: {
    title: SITE,
    description: TAG,
    url: SITE_URL,
    siteName: SITE,
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: SITE }],
  },
  twitter: { card: 'summary_large_image', title: SITE, description: TAG, images: ['/og.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="relative font-sans antialiased text-soft pb-16 md:pb-0">
        <LenisProvider>
          <GrainOverlay />
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <MobileQuickBar />
        </LenisProvider>
      </body>
    </html>
  );
}
