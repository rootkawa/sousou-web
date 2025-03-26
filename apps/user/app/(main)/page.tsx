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
      <GlobalMap />
      {/* <Stats /> */}
      {/* Product Showcase Section - Full Page */}
      <section id='products' className='flex h-screen items-center'>
        <div className='container mx-auto scale-110 px-4'>
          <ProductShowcase />{' '}
          {/* a hack (server action) is used here to fetch the subscription data */}{' '}
        </div>
      </section>
    </main>
  );
}
