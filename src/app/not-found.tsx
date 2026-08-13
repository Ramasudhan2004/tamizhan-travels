import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-0 text-center px-4">
      <span className="eyebrow text-gold">404 Error</span>
      <h1 className="heading-display mt-4 text-4xl text-white">Page Not Found</h1>
      <p className="mt-4 text-soft/80 max-w-md">
        The destination you are looking for does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gold px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-bg-0 hover:opacity-90 transition-opacity"
      >
        Return to Home
      </Link>
    </div>
  );
}
