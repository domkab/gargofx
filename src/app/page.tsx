import FeaturedLayout from './components/Layout/FeaturedLayout';
import HomePageLayout from './components/Layout/HomePageLayout';

export const revalidate = 120;

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        Welcome to your new project
      </h1>
      <p className="mt-2 text-muted-foreground text-base max-w-prose">
        This is a blank starter. You can begin building your layout, dashboard, or landing page here.
      </p>

      <HomePageLayout />
      <FeaturedLayout />
    </main>
  );
}