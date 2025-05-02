import { GlobalMap } from '@/components/main/global-map';
import { Hero } from '@/components/main/hero';
import { ProductShowcase } from '@/components/main/product-showcase';
import { ScrollingBanner } from '@/components/main/scrolling-banner';
import { NEXT_PUBLIC_AFFILIATE_SHARE_DESCRIPTION } from '@/config/constants';
// import { Stats } from '@/components/main/stats';

export default async function Home() {
  return (
    <>
      <div className='bg-background/80 fixed left-0 top-16 z-40 w-full shadow-sm backdrop-blur-md'>
        <ScrollingBanner
          items={[NEXT_PUBLIC_AFFILIATE_SHARE_DESCRIPTION]}
          speed={50}
          gradientColors={['#4776E6', '#8E54E9']} // purple gradient
          fontSize='1rem'
        />
      </div>
      <main className='mx-auto max-w-[80%] space-y-16 pt-14 2xl:max-w-[75%]'>
        <Hero />
        {/* Product Showcase Section - Full Page */}
        <section id='products' className='flex min-h-screen items-center py-16'>
          <ProductShowcase />
        </section>
        <GlobalMap />
        {/* <Stats /> */}
      </main>
    </>
  );
}
