import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn, isSanityConfigured } from './env';
import { createClient as createRawClient } from '@sanity/client';

export { apiVersion, dataset, projectId, useCdn, isSanityConfigured };

export const sanityClient = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn, perspective: 'published' })
  : null;

export const sanityWriteClient = (() => {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!isSanityConfigured || !token) return null;
  return createRawClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
})();

export const HOMEPAGE_QUERY = /* groq */ `{
  "hero": *[_type == "heroBanner"][0]{
    ...,
    featuredVehicles[]{ ..., image{ ..., asset->{ url } } }
  },
  "fleet": *[_type == "vehicle"] | order(_createdAt asc){
    ..., image{ ..., asset->{ url } }
  },
  "destinations": *[_type == "destination"] | order(name asc){
    ..., hero{ ..., asset->{ url } }
  },
  "gallery": *[_type == "gallery"] | order(_createdAt desc)[0...24]{
    ...,
    imageAsset{ ..., asset->{ url } },
    poster{ ..., asset->{ url } }
  },
  "collections": *[_type == "galleryCollection"] | order(_createdAt desc){
    _id, title, category, date,
    cover{ ..., asset->{ url } },
    media[]{
      _key, kind, caption,
      imageAsset{ ..., asset->{ url } },
      videoUrl,
      poster{ ..., asset->{ url } }
    }
  },
  "testimonials": *[_type == "testimonial"] | order(_createdAt desc){
    ..., avatar{ ..., asset->{ url } }
  },
  "features": *[_type == "whyChooseUs"] | order(order asc),
  "contact": *[_type == "contactInfo"][0]
}`;

export const urlFor = (source: any) => {
  if (!sanityClient) return '';
  try {
    const builder = (sanityClient as any).imageBuilder?.();
    if (!builder || !source) return '';
    return builder.image(source).auto('format').fit('max').url();
  } catch {
    return '';
  }
};
