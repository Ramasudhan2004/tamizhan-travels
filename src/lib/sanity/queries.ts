import type { HomepageData } from '@/types/cms';
import { HOMEPAGE_QUERY, sanityClient } from './client';
import { seedData } from './seed';

export async function fetchHomepage(): Promise<HomepageData> {
  try {
    if (sanityClient) {
      const res = (await sanityClient.fetch(HOMEPAGE_QUERY, {}, { next: { revalidate: 60 } })) as any;
      if (res) {
        return {
          hero:         res.hero?.headline         ? res.hero         : seedData.hero,
          fleet:        res.fleet?.length          ? res.fleet        : seedData.fleet,
          destinations: res.destinations?.length   ? res.destinations : seedData.destinations,
          gallery:      res.gallery?.length        ? res.gallery      : seedData.gallery,
          collections:  res.collections?.length    ? res.collections  : seedData.collections,
          testimonials: res.testimonials?.length   ? res.testimonials : seedData.testimonials,
          features:     res.features?.length       ? res.features     : seedData.features,
          contact:      res.contact?.phone         ? res.contact      : seedData.contact,
        };
      }
    }
  } catch (e) {
    console.error('[Sanity] fetch failed, using seed data:', e);
  }
  return seedData;
}

export function resolveImageUrl(img?: { asset?: { url?: string }; placeholderUrl?: string; url?: string }): string {
  if (!img) return '';
  // Sanity asset URL takes priority — placeholderUrl is only a fallback for seed data
  return (
    img.asset?.url ||
    img.url ||
    img.placeholderUrl ||
    ''
  );
}
