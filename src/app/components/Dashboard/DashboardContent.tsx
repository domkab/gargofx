'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DashSidebar from './DashSidebar';
import DashProfile from './DashProfile';
import DashPosts from './DashPosts';
import DashUsers from './DashUsers';
import DashboardComponent from './DashboardComponent';
import DashCategories from './Categories/DashCategories';
import DashImageSettings from './DashImageSettings';
import DashFeaturedPosts from './FeaturedPosts/DashFeaturedPosts';

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashPosts />}
      {tab === 'featured-posts' && <DashFeaturedPosts />}
      {tab === 'categories' && <DashCategories />}
      {tab === 'image-settings' && <DashImageSettings />}
      {tab === 'users' && <DashUsers />}
      {tab === 'dash' && <DashboardComponent />}
    </div>
  );
}