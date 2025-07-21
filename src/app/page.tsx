import { getCarouselImages } from '@/lib/services/imageService';
import HomeImageCarousel from './components/HomeImageCarousel';
import FeaturedLayout from './components/Layout/FeaturedLayout';
import HomePageLayout from './components/Layout/HomePageLayout';

export const revalidate = 120;

export default async function Home() {
  const images = await getCarouselImages();

  return (
    <main className="home flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <HomeImageCarousel images={images} />
      <HomePageLayout />
      <FeaturedLayout />

    </main>
  );
}