import Image, { type ImageLoader } from 'next/image.js';

export { Image };

export const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  if (!src) return '';
  if (src.startsWith('/') || src.startsWith('data:') || /^\s*https?:\/\/(images|plus|source)\.unsplash\.com\//.test(src) || src.includes('cdn.sanity.io')) {
    // passthrough: let next/image handle unsplash/sanity via remote patterns, with a query if possible
    const sep = src.includes('?') ? '&' : '?';
    return `${src}${sep}w=${width}&q=${quality ?? 75}&auto=format&fit=crop`;
  }
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloud && src.includes('cloudinary.com')) return src; // already CDN url
  if (cloud) {
    return `https://res.cloudinary.com/${cloud}/image/upload/w_${width},q_${quality ?? 75},f_auto,c_limit/${src}`;
  }
  return src;
};
