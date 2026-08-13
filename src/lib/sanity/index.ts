export { apiVersion, dataset, isSanityConfigured, projectId, useCdn } from './env';
export { HOMEPAGE_QUERY, sanityClient, sanityWriteClient, urlFor } from './client';
export { fetchHomepage, resolveImageUrl } from './queries';

export const sanityConfig = {
  name: 'default',
  title: 'Tamizhan Travels',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-09-01',
  basePath: '/studio',
};
