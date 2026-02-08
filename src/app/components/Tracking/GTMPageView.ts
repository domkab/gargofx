'use client';

import { useEffect } from 'react';

export function GTMPageView() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { pathname, search } = window.location;
    const url = search ? `${pathname}${search}` : pathname;

    (window as any).dataLayer?.push({
      event: 'page_view',
      page_path: url,
    });
  }, []);

  return null;
}