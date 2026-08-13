'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-0 text-center px-4">
      <span className="eyebrow text-gold">Notice</span>
      <h1 className="heading-display mt-4 text-3xl text-white">Something Went Wrong</h1>
      <p className="mt-4 text-soft/80 max-w-md">
        We encountered an error loading this page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 rounded-full bg-gold px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-bg-0 hover:opacity-90 transition-opacity"
      >
        Try Again
      </button>
    </div>
  );
}
