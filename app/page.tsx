'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    // When visiting the portal, always show the login interface first
    router.replace('/login');
  }, [router]);

  return null;
}
