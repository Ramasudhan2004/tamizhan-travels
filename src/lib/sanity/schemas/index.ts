import { defineType, defineField } from 'sanity';

export const heroBanner = defineType({
  name: 'heroBanner',
  type: 'document',
  title: 'Hero Banner',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', initialValue: 'TAMIZHAN TRAVELS' }),
    defineField({ name: 'headline', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'ctaPrimary',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'href', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaSecondary',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'href', type: 'string' },
      ],
    }),
    defineField({
      name: 'featuredVehicles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string' },
            { name: 'tag', type: 'string' },
            { name: 'image', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
});

export const contactInfo = defineType({
  name: 'contactInfo',
  type: 'document',
  title: 'Contact Info',
  fields: [
    defineField({ name: 'businessName', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'whatsapp', type: 'string' }),
    defineField({ name: 'addressLines', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'state', type: 'string' }),
    defineField({ name: 'pincode', type: 'string' }),
    defineField({ name: 'openHours', type: 'string', initialValue: '24 Hours' }),
    defineField({ name: 'mapEmbedUrl', type: 'url' }),
  ],
});

export const vehicle = defineType({
  name: 'vehicle',
  type: 'document',
  title: 'Fleet Vehicle',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({
      name: 'type',
      type: 'string',
      options: { list: ['Premium Cab', 'Tempo Traveller', 'Mini Bus'] },
    }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'capacity', type: 'number' }),
    defineField({
      name: 'comfortLevel',
      type: 'string',
      options: { list: ['Luxury', 'Premium', 'Executive'] },
    }),
    defineField({ name: 'ac', type: 'boolean', initialValue: true }),
    defineField({ name: 'musicSystem', type: 'boolean', initialValue: true }),
    defineField({ name: 'luxurySeating', type: 'boolean', initialValue: true }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] }),
  ],
});

export const destination = defineType({
  name: 'destination',
  type: 'document',
  title: 'Destination',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'hero', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'mapPosition',
      type: 'object',
      fields: [
        { name: 'x', type: 'number' },
        { name: 'y', type: 'number' },
      ],
    }),
    defineField({ name: 'highlights', type: 'array', of: [{ type: 'string' }] }),
  ],
});

export const galleryCollection = defineType({
  name: 'galleryCollection',
  type: 'document',
  title: 'Gallery Collection',
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'cover' },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Collection Title',
      description: 'e.g. "Kerala Family Trip — March 2024"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: '🏖️  Trip Memories', value: 'Trip Memories' },
          { title: '🛕  Pilgrimages',    value: 'Pilgrimages' },
          { title: '🚗  On The Road',    value: 'On The Road' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Trip Date',
      description: 'When did this trip happen?',
    }),
    defineField({
      name: 'cover',
      type: 'image',
      title: 'Cover Photo',
      description: 'Main photo shown on the gallery card',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'media',
      type: 'array',
      title: 'Photos & Videos',
      description: 'Add all photos and videos from this trip',
      of: [
        {
          type: 'object',
          title: 'Media Item',
          preview: {
            select: { title: 'caption', media: 'imageAsset', kind: 'kind' },
            prepare: ({ title, media, kind }: any) => ({
              title: title || (kind === 'video' ? '🎥 Video' : '📷 Photo'),
              media,
            }),
          },
          fields: [
            defineField({
              name: 'kind',
              type: 'string',
              title: 'Type',
              options: { list: ['image', 'video'], layout: 'radio' },
              initialValue: 'image',
            }),
            defineField({
              name: 'imageAsset',
              type: 'image',
              title: 'Photo',
              options: { hotspot: true },
              hidden: ({ parent }) => (parent as any)?.kind !== 'image',
            }),
            defineField({
              name: 'videoUrl',
              type: 'url',
              title: 'Video URL',
              description: 'Direct MP4 link or YouTube URL',
              hidden: ({ parent }) => (parent as any)?.kind !== 'video',
            }),
            defineField({
              name: 'poster',
              type: 'image',
              title: 'Video Thumbnail',
              options: { hotspot: true },
              hidden: ({ parent }) => (parent as any)?.kind !== 'video',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption (optional)',
            }),
          ],
        },
      ],
    }),
  ],
});


export const gallery = defineType({
  name: 'gallery',
  type: 'document',
  title: 'Gallery Asset',
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'imageAsset' },
  },
  fields: [
    defineField({
      name: 'kind',
      type: 'string',
      title: 'Type',
      options: { list: ['image', 'video'], layout: 'radio' },
      initialValue: 'image',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Memory Title',
      description: 'e.g. "Kerala Backwaters — Family Trip 2024"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Which collection does this belong to?',
      options: {
        list: [
          { title: '🏖️  Trip Memories', value: 'Trip Memories' },
          { title: '🛕  Pilgrimages',    value: 'Pilgrimages' },
          { title: '🚗  On The Road',    value: 'On The Road' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'imageAsset',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
      hidden: ({ parent }) => (parent as any)?.kind !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: 'Direct video link (MP4) or YouTube embed URL',
      hidden: ({ parent }) => (parent as any)?.kind !== 'video',
    }),
    defineField({
      name: 'poster',
      type: 'image',
      title: 'Video Thumbnail',
      options: { hotspot: true },
      hidden: ({ parent }) => (parent as any)?.kind !== 'video',
    }),
  ],
});

export const testimonial = defineType({
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'place', type: 'string' }),
    defineField({ name: 'rating', type: 'number', validation: (R) => R.min(1).max(5) }),
    defineField({ name: 'quote', type: 'text', rows: 3 }),
    defineField({ name: 'avatar', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'googleReview', type: 'boolean' }),
  ],
});

export const whyChooseUs = defineType({
  name: 'whyChooseUs',
  type: 'document',
  title: 'Why Choose Us',
  fields: [
    defineField({ name: 'order', type: 'number', initialValue: 1 }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    defineField({ name: 'iconName', type: 'string', description: 'Lucide icon key e.g. Clock, Shield, Users' }),
  ],
});

export const tourPackage = defineType({
  name: 'tourPackage',
  type: 'document',
  title: 'Tour Package',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'price', type: 'number' }),
    defineField({ name: 'days', type: 'number' }),
    defineField({ name: 'inclusions', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'cover', type: 'image', options: { hotspot: true } }),
  ],
});

export const offer = defineType({
  name: 'offer',
  type: 'document',
  title: 'Offer',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({ name: 'expiresAt', type: 'datetime' }),
    defineField({ name: 'banner', type: 'image', options: { hotspot: true } }),
  ],
});

export const blogPost = defineType({
  name: 'blogPost',
  type: 'document',
  title: 'Blog Post',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', type: 'text', rows: 2 }),
    defineField({ name: 'cover', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
  ],
});

export const booking = defineType({
  name: 'booking',
  type: 'document',
  title: 'Booking (Inquiry)',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'travelDate', type: 'datetime' }),
    defineField({ name: 'pickup', type: 'string' }),
    defineField({ name: 'destination', type: 'string' }),
    defineField({
      name: 'vehicle',
      type: 'string',
      options: { list: ['Premium Cab', 'Tempo Traveller', 'Mini Bus', 'Not Sure'] },
    }),
    defineField({ name: 'passengers', type: 'number' }),
    defineField({ name: 'message', type: 'text' }),
    defineField({
      name: 'status',
      type: 'string',
      initialValue: 'new',
      options: { list: ['new', 'contacted', 'booked', 'cancelled'] },
    }),
    defineField({ name: 'createdAt', type: 'datetime' }),
  ],
});

export const schemaTypes = [
  heroBanner,
  contactInfo,
  vehicle,
  destination,
  galleryCollection,
  gallery,
  testimonial,
  whyChooseUs,
  tourPackage,
  offer,
  blogPost,
  booking,
];
