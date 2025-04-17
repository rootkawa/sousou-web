import { GlobalMap } from '@/components/main/global-map';
import { Hero } from '@/components/main/hero';
import { ProductShowcase } from '@/components/main/product-showcase';
// import { Stats } from '@/components/main/stats';

export default function Home() {
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
