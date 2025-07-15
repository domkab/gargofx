'use client';

import { Suspense } from 'react';
import DashboardContent from './DashboardContent';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.replace('/');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}