import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from '../../../lib/sanity/schemas';

export default defineConfig({
  name: 'tamizhan-travels',
  title: 'Tamizhan Travels',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'lk4y4jga',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-09-01',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Tamizhan Travels CMS')
          .items([
            S.listItem()
              .title('🖼️  Gallery Collections')
              .schemaType('galleryCollection')
              .child(S.documentTypeList('galleryCollection').title('Gallery Collections')),
            S.divider(),
            S.listItem()
              .title('🏠  Hero Banner')
              .schemaType('heroBanner')
              .child(S.documentTypeList('heroBanner').title('Hero Banner')),
            S.listItem()
              .title('📍  Destinations')
              .schemaType('destination')
              .child(S.documentTypeList('destination').title('Destinations')),
            S.listItem()
              .title('⭐  Testimonials')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            S.listItem()
              .title('📋  Bookings')
              .schemaType('booking')
              .child(S.documentTypeList('booking').title('Booking Inquiries')),
            S.divider(),
            S.listItem()
              .title('🚗  Fleet Vehicles')
              .schemaType('vehicle')
              .child(S.documentTypeList('vehicle').title('Fleet')),
            S.listItem()
              .title('✅  Why Choose Us')
              .schemaType('whyChooseUs')
              .child(S.documentTypeList('whyChooseUs').title('Why Choose Us')),
            S.listItem()
              .title('📞  Contact Info')
              .schemaType('contactInfo')
              .child(S.documentTypeList('contactInfo').title('Contact Info')),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
