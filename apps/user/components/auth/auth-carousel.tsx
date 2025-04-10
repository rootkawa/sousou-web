'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@workspace/ui/components/carousel';
import { cn } from '@workspace/ui/lib/utils';
import DiscountLottie from '@workspace/ui/lotties/discount.json';
import GiftLottie from '@workspace/ui/lotties/gift.json';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

interface AuthCarouselProps {
  t: ReturnType<typeof useTranslations>;
}

export function AuthCarousel({ t }: AuthCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const resetAutoScrollInterval = useCallback(() => {
    if (!isMountedRef.current) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      if (!isMountedRef.current) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      if (api) api.scrollNext();
    }, 4000);
  }, [api]);

  // 1. FIRST: Initialize mounted flag
  useEffect(() => {
    // This runs first during mount
    isMountedRef.current = true;

    return () => {
      // This runs last during unmount
      isMountedRef.current = false;
    };
  }, []);

  // 2. SECOND: API event handling
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      if (!isMountedRef.current) return;
      setActiveIndex(api.selectedScrollSnap());
      resetAutoScrollInterval();
    };

    api.on('select', onSelect);

    // Set initial index - only if mounted
    if (isMountedRef.current) {
      setActiveIndex(api.selectedScrollSnap() || 0);
    }

    return () => {
      api.off('select', onSelect);
    };
  }, [api, resetAutoScrollInterval]);

  // 3. THIRD: Interval management
  useEffect(() => {
    if (!api || !isMountedRef.current) return;

    resetAutoScrollInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [api, resetAutoScrollInterval]);

  // Memoize the animation components
  const renderDiscountAnimation = useCallback(
    () => (
      <DotLottieReact
        data={DiscountLottie}
        loop={false}
        autoplay={true}
        className='h-full w-full'
      />
    ),
    [],
  );

  const renderGiftAnimation = useCallback(
    () => (
      <DotLottieReact
        data={GiftLottie}
        loop={true}
        autoplay={true}
        className='h-full w-full'
        speed={0.8}
      />
    ),
    [],
  );

  return (
    <div className='h-full w-full bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950'>
      <Carousel
        className='h-full w-full overflow-hidden'
        opts={{
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent className='h-full'>
          {/* Slide 1 */}
          <CarouselItem className='h-full'>
            <div className='flex h-full flex-col items-center justify-center px-8 py-12'>
              <h2 className='mb-6 text-2xl font-bold text-slate-800 dark:text-white'>
                {t('carousel.slide1.title')}
              </h2>

              <div className='mb-8 h-[200px] w-[200px]'>
                {activeIndex === 0 && renderDiscountAnimation()}
              </div>

              <p className='max-w-md whitespace-pre-line text-center text-lg text-blue-600 dark:text-blue-300'>
                {t('carousel.slide1.description')}
              </p>
            </div>
          </CarouselItem>

          {/* Slide 2 */}
          <CarouselItem className='h-full'>
            <div className='flex h-full flex-col items-center justify-center px-8 py-12'>
              <h2 className='mb-6 text-2xl font-bold text-slate-800 dark:text-white'>
                {t('carousel.slide2.title')}
              </h2>

              <div className='mb-8 h-[200px] w-[200px]'>
                {activeIndex === 1 && renderGiftAnimation()}
              </div>

              <p className='max-w-md whitespace-pre-line text-center text-lg text-blue-600 dark:text-blue-300'>
                {t('carousel.slide2.description')}
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>

        {/* Navigation arrows */}
        <div className='absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center'>
          <button
            onClick={() => api?.scrollNext()}
            className='flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-500 shadow-md transition-colors hover:bg-blue-50 dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-slate-700'
            aria-label='Next slide'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='m9 18 6-6-6-6' />
            </svg>
          </button>
        </div>

        {/* Slide indicators */}
        <div className='absolute bottom-6 left-0 right-0 flex justify-center gap-2'>
          {[0, 1].map((index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                activeIndex === index
                  ? 'w-8 bg-blue-500 dark:bg-blue-400'
                  : 'bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
