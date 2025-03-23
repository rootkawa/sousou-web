'use client';

import { GlobalMap } from '@/components/main/global-map';
import { Hero } from '@/components/main/hero';
import { ProductShowcase } from '@/components/main/product-showcase';
// import { Stats } from '@/components/main/stats';
import useGlobalStore from '@/config/use-global';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useGlobalStore();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  });

  if (user) {
    return <div className='container py-20 text-center'>Redirecting to dashboard...</div>;
  }

  return (
    <main className='container space-y-16'>
      <Hero />
      {/* <Stats /> */}
      <ProductShowcase /> {/* a hack (server action) is used here to fetch the subscription data */}
      <GlobalMap />
    </main>
  );
}
