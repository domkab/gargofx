'use client';

import { useEffect } from 'react';

export function GTMPageView() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { pathname, search } = window.location;
    const url = search ? `${pathname}${search}` : pathname;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).dataLayer?.push({
      event: 'page_view',
      page_path: url,
    });
  }, []);

  return null;
}