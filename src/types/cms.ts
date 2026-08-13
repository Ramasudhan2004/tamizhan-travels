export type VehicleType = 'Premium Cab' | 'Tempo Traveller' | 'Mini Bus';
export type ComfortLevel = 'Luxury' | 'Premium' | 'Executive';

export type SanityImageRef = {
  _type: 'image';
  asset?: { _ref?: string; url?: string };
  alt?: string;
  url?: string;
  placeholderUrl?: string;
};

export type HeroVehicle = { name: string; tag: string; image: SanityImageRef };
export type HeroBanner = {
  _id?: string;
  eyebrow: string;
  headline: string;
  subheading: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  featuredVehicles: HeroVehicle[];
};

export type FleetVehicle = {
  _id: string;
  slug: { current: string };
  name: string;
  type: VehicleType;
  image: SanityImageRef;
  capacity: number;
  comfortLevel: ComfortLevel;
  ac: boolean;
  musicSystem: boolean;
  luxurySeating: boolean;
  features: string[];
};

export type Destination = {
  _id: string;
  slug: { current: string };
  name: string;
  tagline: string;
  hero: SanityImageRef;
  mapPosition: { x: number; y: number };
  highlights: string[];
};

export type GalleryKind = 'image' | 'video';
export type GalleryMedia = {
  _key: string;
  kind: GalleryKind;
  imageAsset?: SanityImageRef;
  videoUrl?: string;
  poster?: SanityImageRef;
  caption?: string;
};
export type GalleryCollection = {
  _id: string;
  title: string;
  category: string;
  cover: SanityImageRef;
  date?: string;
  media: GalleryMedia[];
};
// legacy single-item type kept for seed compatibility
export type GalleryItem = {
  _id: string;
  kind: GalleryKind;
  title?: string;
  imageAsset?: SanityImageRef;
  videoUrl?: string;
  poster?: SanityImageRef;
  category?: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  place?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  avatar?: SanityImageRef;
  googleReview?: boolean;
};

export type Feature = {
  _id: string;
  order: number;
  title: string;
  description: string;
  iconName: string;
};

export type ContactInfo = {
  _id?: string;
  businessName: string;
  phone: string;
  whatsapp: string;
  addressLines: string[];
  city: string;
  state: string;
  pincode: string;
  openHours: string;
  mapEmbedUrl?: string;
};

export type BookingInput = {
  name: string;
  phone: string;
  travelDate: string;
  pickup: string;
  destination: string;
  vehicle: VehicleType | 'Not Sure';
  passengers: number;
  message?: string;
};

export type TourPackage = { _id: string; title: string; price: number; days: number; inclusions: string[]; cover: SanityImageRef };
export type Offer = { _id: string; title: string; subtitle: string; expiresAt?: string; banner: SanityImageRef };
export type BlogPost = { _id: string; title: string; slug: string; excerpt: string; cover: SanityImageRef; publishedAt: string };

export type HomepageData = {
  hero: HeroBanner;
  fleet: FleetVehicle[];
  destinations: Destination[];
  gallery: GalleryItem[];
  collections: GalleryCollection[];
  testimonials: Testimonial[];
  features: Feature[];
  contact: ContactInfo;
};
