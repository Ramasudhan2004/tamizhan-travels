import { fetchHomepage } from '@/lib/sanity/queries';
import Hero3D from '@/components/sections/Hero3D';
import Services from '@/components/sections/Services';
import DestinationsMap from '@/components/sections/DestinationsMap';
import Gallery from '@/components/sections/Gallery';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Reviews from '@/components/sections/Reviews';
import BookingForm from '@/components/sections/BookingForm';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

// Revalidate cache every 60 seconds for optimal page load speed
export const revalidate = 60;

export default async function HomePage() {
  const data = await fetchHomepage();
  return (
    <>
      <Hero3D hero={data.hero} />
      <Services />
      <DestinationsMap destinations={data.destinations} />
      <Gallery items={data.gallery} collections={data.collections} />
      <WhyChooseUs features={data.features} />
      <Reviews testimonials={data.testimonials} />
      <BookingForm />
      <About />
      <Contact contact={data.contact} />
    </>
  );
}
