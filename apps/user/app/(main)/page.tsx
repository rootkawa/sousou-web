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
  }, [user, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, []);

  if (user) {
    return <div className='container py-20 text-center'>Redirecting to dashboard...</div>;
  }

  return (
    <main className='container space-y-16'>
      <Hero />
      {/* Product Showcase Section - Full Page */}
      <section id='products' className='flex min-h-screen items-center py-16'>
        <div className='container mx-auto scale-110 px-4'>
          <ProductShowcase />{' '}
          {/* a hack (server action) is used here to fetch the subscription data */}{' '}
        </div>
      </section>
      <GlobalMap />
      {/* <Stats /> */}
    </main>
  );
}
