'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import DashSidebar from './DashSidebar';
import DashProfile from './DashProfile';
import DashPosts from './DashPosts';
import DashUsers from './DashUsers';
import DashboardComponent from './DashboardComponent';
import DashImageSettings from './DashImageSettings';
import DashFeaturedPosts from './FeaturedPosts/DashFeaturedPosts';
import DashHomeLayout from './DashHomeLayout';
import DashLogoSlider from './DashLogoSlider';
import DashCarousel from './DashCarousel';

export default function DashboardContent() {
  const [tab, setTab] = useState<string>('dash');
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  // redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, router]);

  // read ?tab=... from the browser URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar tab={tab} onTabChange={setTab} />
      </div>

      {tab === 'profile' && <DashProfile />}
      {tab === 'image-slider' && <DashCarousel />}
      {tab === 'home-settings' && <DashHomeLayout />}
      {tab === 'posts' && <DashPosts />}
      {tab === 'featured-posts' && <DashFeaturedPosts />}
      {tab === 'logo-slider' && <DashLogoSlider />}
      {tab === 'image-settings' && <DashImageSettings />}
      {tab === 'users' && <DashUsers />}
      {tab === 'dash' && <DashboardComponent />}
    </div>
  );
}