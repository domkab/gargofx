import { getCarouselImages } from '@/lib/services/imageService';
import HomeImageCarousel from './components/HomeImageCarousel';
import FeaturedLayout from './components/Layout/FeaturedLayout';
import HomePageLayout from './components/Layout/HomePageLayout';

export const revalidate = 120;

export default async function Home() {
  const images = await getCarouselImages();

  return (
    <main className="home flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="relative w-full aspect-[16/9]">
        <HomeImageCarousel images={images} />

        <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-6 text-white z-10">
          <h1 className="text-2xl sm:text-4xl font-semibold leading-tight max-w-lg">
            Unlocking the <span className="font-bold italic">power</span><br />
            of <span className="font-bold">CGI</span> to bring<br />
            stories to <span className="italic font-semibold">life.</span>
          </h1>
        </div>
      </div>

      <HomePageLayout />
      <FeaturedLayout />

    </main>
  );
}