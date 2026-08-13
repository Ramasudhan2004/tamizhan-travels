'use client';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Play, Images, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryCollection, GalleryMedia } from '@/types/cms';
import Reveal from '@/components/fx/Reveal';
import { resolveImageUrl } from '@/lib/sanity/queries';
import { cn } from '@/lib/utils';

type Props = { collections?: GalleryCollection[]; items?: any[] };

const CATEGORIES = ['All', 'Trip Memories', 'Pilgrimages', 'On The Road'] as const;

export default function Gallery({ collections = [] }: Props) {
  const [activeTab, setActiveTab] = useState('All');
  const [openCollection, setOpenCollection] = useState<GalleryCollection | null>(null);

  const safeCollections = collections ?? [];

  const filtered = useMemo(() =>
    activeTab === 'All' ? safeCollections : safeCollections.filter((c) => c.category === activeTab),
    [safeCollections, activeTab]
  );

  const totalMemories = safeCollections.reduce((sum, c) => sum + (c.media?.length ?? 0), 0);

  return (
    <section id="gallery" className="relative py-28 lg:py-36 bg-bg-1/50">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(212,175,55,0.12),transparent_70%)]" />

      <div className="container">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <span className="eyebrow">
              <Camera className="h-3.5 w-3.5" />
              Tour Memories
            </span>
            <h2 className="heading-display mt-5 text-[clamp(2.2rem,5vw,4.5rem)]">
              Real Trips. <span className="gold-text">Real Moments.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-soft/75">
              Every photo and video here is from an actual journey — captured by our guests and drivers across South India.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-2xl border border-gold/20 bg-gold/[0.05] px-5 py-3">
                <span className="font-display text-[28px] font-semibold text-white">{collections.length}</span>
                <span className="text-[12px] uppercase tracking-[0.2em] text-gold/80 leading-tight">Trip<br />Albums</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3">
                <span className="font-display text-[28px] font-semibold text-white">{totalMemories}</span>
                <span className="text-[12px] uppercase tracking-[0.2em] text-soft/60 leading-tight">Total<br />Memories</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Category Tabs */}
        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? collections.length : collections.filter(c => c.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    'rounded-full border px-5 py-2 text-[12px] uppercase tracking-[0.2em] transition-all duration-200',
                    activeTab === cat
                      ? 'border-gold bg-gold text-bg-0 font-semibold'
                      : 'border-white/10 bg-white/[0.03] text-soft/70 hover:border-gold/40 hover:text-white'
                  )}
                >
                  {cat}
                  <span className={cn('ml-2 text-[10px]', activeTab === cat ? 'text-bg-0/70' : 'text-muted')}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Collection Cards Grid */}
        {filtered.length === 0 ? (
          <div className="mt-20 flex flex-col items-center gap-4 text-center text-muted">
            <Images className="h-12 w-12 opacity-30" />
            <p className="text-[15px]">No collections yet in this category.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((col, i) => (
              <CollectionCard
                key={col._id}
                collection={col}
                index={i}
                onClick={() => setOpenCollection(col)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openCollection && (
          <CollectionLightbox
            collection={openCollection}
            onClose={() => setOpenCollection(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Collection Card ── */
function CollectionCard({ collection, index, onClick }: {
  collection: GalleryCollection; index: number; onClick: () => void;
}) {
  const coverSrc = resolveImageUrl(collection.cover as any);
  const mediaCount = collection.media?.length ?? 0;
  const previews = collection.media?.slice(0, 3) ?? [];

  return (
    <Reveal delay={Math.min(index, 5) * 0.05}>
      <button
        onClick={onClick}
        className="group relative w-full overflow-hidden rounded-3xl border border-white/8 bg-bg-2 text-left transition-all duration-300 hover:border-gold/40"
      >
        {/* Cover image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt={collection.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-bg-2 text-muted">
              <Camera className="h-10 w-10 opacity-30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Category pill */}
          <div className="absolute left-4 top-4">
            <span className="rounded-full border border-gold/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold">
              {collection.category}
            </span>
          </div>

          {/* Media count badge */}
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1">
            <Images className="h-3 w-3 text-white/70" />
            <span className="text-[11px] text-white/90">{mediaCount}</span>
          </div>

          {/* Preview strip at bottom of image */}
          <div className="absolute inset-x-4 bottom-4 flex gap-1.5">
            {previews.map((m) => {
              const s = resolveImageUrl((m.imageAsset ?? m.poster) as any);
              return s ? (
                <div key={m._key} className="h-10 w-14 flex-none overflow-hidden rounded-lg border border-white/20">
                  <img src={s} alt="" className="h-full w-full object-cover" />
                </div>
              ) : null;
            })}
            {mediaCount > 3 && (
              <div className="flex h-10 w-14 flex-none items-center justify-center rounded-lg border border-white/20 bg-black/60 text-[11px] text-white/70">
                +{mediaCount - 3}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-display text-[17px] font-semibold leading-snug text-white">
            {collection.title}
          </h3>
          {collection.date && (
            <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-muted">
              <CalendarDays className="h-3.5 w-3.5" />
              {new Date(collection.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-gold/60 transition-colors group-hover:text-gold/90">
            View all {mediaCount} memories →
          </p>
        </div>
      </button>
    </Reveal>
  );
}

/* ── Collection Lightbox ── */
function CollectionLightbox({ collection, onClose }: {
  collection: GalleryCollection; onClose: () => void;
}) {
  const media = collection.media ?? [];
  const [index, setIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const safeIndex = Math.max(0, Math.min(media.length - 1, index));
  const current = media[safeIndex];

  const src = current?.kind === 'video'
    ? resolveImageUrl((current.poster ?? current.imageAsset) as any)
    : resolveImageUrl(current?.imageAsset as any);

  const next = useCallback(() => { setImgLoaded(false); setIndex((i) => (i + 1) % media.length); }, [media.length]);
  const prev = useCallback(() => { setImgLoaded(false); setIndex((i) => (i - 1 + media.length) % media.length); }, [media.length]);

  useEffect(() => { setImgLoaded(false); }, [safeIndex]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [next, prev, onClose]);

  useEffect(() => {
    thumbsRef.current?.querySelector<HTMLElement>('[data-active]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [safeIndex]);

  if (media.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex flex-col bg-black/97"
      role="dialog"
      aria-modal="true"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-gold/80">{collection.category}</p>
          <p className="mt-0.5 font-display text-[16px] font-semibold text-white">{collection.title}</p>
          {current?.caption && (
            <p className="mt-0.5 text-[12px] text-soft/60">{current.caption}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full border border-gold/20 bg-gold/[0.07] px-3 py-1 font-mono text-[12px] text-gold/80">
            {String(safeIndex + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-gold/50 hover:text-gold"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main media */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-14 py-4">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={safeIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex h-full w-full items-center justify-center"
          >
            {current?.kind === 'video' && (current as any).videoUrl ? (
              <video
                src={(current as any).videoUrl}
                controls
                poster={src}
                className="max-h-full max-w-full rounded-2xl object-contain"
                onLoadedData={() => setImgLoaded(true)}
              />
            ) : (
              <img
                key={src}
                src={src}
                alt={current?.caption ?? collection.title}
                onLoad={() => setImgLoaded(true)}
                className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <button onClick={prev} aria-label="Previous"
          className="absolute left-2 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/70 text-white transition hover:border-gold/60 hover:text-gold">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={next} aria-label="Next"
          className="absolute right-2 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/70 text-white transition hover:border-gold/60 hover:text-gold">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="border-t border-white/5 px-6 py-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.26em] text-muted">
          {collection.title} · {media.length} memories
        </p>
        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {media.map((m, i) => {
            const tSrc = resolveImageUrl((m.imageAsset ?? m.poster) as any);
            const isActive = i === safeIndex;
            return (
              <button
                key={m._key}
                data-active={isActive ? '' : undefined}
                onClick={() => { setImgLoaded(false); setIndex(i); }}
                title={m.caption ?? ''}
                className={cn(
                  'relative h-16 w-24 flex-none overflow-hidden rounded-xl border-2 transition-all duration-200',
                  isActive
                    ? 'border-gold scale-105 shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'border-transparent opacity-40 hover:opacity-75 hover:border-white/20'
                )}
              >
                {tSrc ? (
                  <img src={tSrc} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-bg-2">
                    <Play className="h-4 w-4 text-white/50" />
                  </div>
                )}
                {isActive && <div className="absolute inset-0 bg-gold/10" />}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
