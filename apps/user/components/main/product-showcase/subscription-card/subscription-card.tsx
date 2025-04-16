import { Display } from '@/components/display';
import { SubscribeDetail } from '@/components/subscribe/detail';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { HoverBorderGradient } from '@workspace/ui/components/hover-border-gradient';
import { Separator } from '@workspace/ui/components/separator';
import { cn } from '@workspace/ui/lib/utils';
import { NEXT_PUBLIC_LIMITED_OFFER_END_DATE } from 'config/constants';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LimitedTimeOffer } from './limited-time-offer';

interface SubscriptionCardProps {
  item: API.Subscribe;
  subscriptionDiscount: number;
  subscriptionQuantity: number;
  t: ReturnType<typeof useTranslations>;
  isPopular: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onPurchase?: () => void;
}

export function SubscriptionCard({
  item,
  subscriptionDiscount,
  subscriptionQuantity,
  t,
  isPopular,
  isSelected = false,
  onSelect,
  onPurchase,
}: SubscriptionCardProps) {
  // Server-side expiration check
  const isOfferExpired = (() => {
    // Parse the end date from environment variable (format: YYYYMMDD)
    const endDateStr = NEXT_PUBLIC_LIMITED_OFFER_END_DATE;
    // Parse YYYYMMDD format to a Date object
    const year = parseInt(endDateStr.substring(0, 4));
    const month = parseInt(endDateStr.substring(4, 6)) - 1; // 0-indexed months
    const day = parseInt(endDateStr.substring(6, 8));

    // Create date at the end of the specified day (23:59:59)
    const endDate = new Date(year, month, day, 23, 59, 59);
    const now = new Date();

    // Compare dates to determine if offer is expired
    return now > endDate;
  })();

  return (
    <div
      className={cn('group relative flex cursor-pointer flex-col', isSelected && 'z-10')}
      onClick={onSelect}
    >
      {/* Popular badge positioned above the card */}
      {isPopular && (
        <div className='bg-primary text-primary-foreground absolute left-0 right-0 top-[-36px] z-10 rounded-t-lg py-2 shadow-lg'>
          <div
            className={cn(
              'flex items-center px-2',
              isOfferExpired ? 'justify-center' : 'justify-between',
            )}
          >
            {isOfferExpired ? (
              <span className='text-m font-medium'>{t('most_popular')}</span>
            ) : (
              <span className='text-m font-medium'>{t('limited_time_offer')}</span>
            )}
            {!isOfferExpired && <LimitedTimeOffer t={t} />}
          </div>
        </div>
      )}

      <div
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          // Removed custom border radius styling from here
        )}
        style={
          {
            // Remove the custom borderRadius style to prevent conflicts
          }
        }
      >
        <Card
          className={cn(
            'bg-card/95 flex h-full w-full flex-col overflow-hidden backdrop-blur-sm',
            'border-2 transition-colors duration-300',
            isSelected ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700',
            !isSelected && 'group-hover:border-gray-300 dark:group-hover:border-gray-600',
            isPopular ? 'rounded-t-none' : 'rounded-xl',
          )}
          style={{
            borderRadius: isPopular ? '0 0 1rem 1rem' : '1rem',
            // Ensure smooth border rendering
            boxSizing: 'border-box',
          }}
        >
          {/* Discount badge */}
          {subscriptionDiscount != 0 && (
            <div className='absolute right-0 top-0 z-10 overflow-hidden'>
              <div className='relative h-20 w-20'>
                <motion.div
                  className='absolute right-[-40px] top-[12px] w-[140px] rotate-45 bg-gradient-to-r from-cyan-600 to-blue-700 py-1.5 text-center text-sm font-medium text-white shadow-md'
                  initial={{ opacity: 0.9, x: 0, rotate: 45 }}
                  animate={{
                    opacity: [0.9, 1, 0.9],
                    x: [0, 2, 0, -2, 0], // Gentle horizontal movement
                    rotate: [45, 45.5, 45, 44.5, 45], // Subtle rotation
                    boxShadow: [
                      '0 4px 6px rgba(0, 0, 0, 0.1)',
                      '0 6px 8px rgba(0, 0, 0, 0.15)',
                      '0 4px 6px rgba(0, 0, 0, 0.1)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.25, 0.5, 0.75, 1], // Control timing of keyframes
                  }}
                >
                  {t('saves')} {subscriptionDiscount}%
                </motion.div>
              </div>
            </div>
          )}

          <CardHeader className='bg-muted/50 p-4 text-xl font-medium'>{item.name}</CardHeader>
          <CardContent className='flex flex-grow flex-col gap-4 p-6 text-sm'>
            <SubscribeDetail
              subscribe={{
                ...item,
                name: undefined,
              }}
            />
          </CardContent>
          <Separator className='opacity-30' />
          <CardFooter className='relative flex flex-col gap-4 p-4'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='py-2'
            >
              {item.unit_time == 'Month' && (
                <div className='text-2xl font-semibold sm:text-3xl'>
                  {isPopular && !isOfferExpired && subscriptionDiscount > 0 && (
                    <span className='text-muted-foreground mr-2 text-lg line-through'>
                      <Display type='currency' value={item.unit_price + 400} />
                    </span>
                  )}
                  <Display type='currency' value={item.unit_price} />
                  <span className='text-muted-foreground text-base font-medium'>
                    /{t(item.unit_time)}
                  </span>
                </div>
              )}
              {item.unit_time == 'Day' && (
                <div className='text-2xl font-semibold sm:text-3xl'>
                  <Display type='currency' value={item.unit_price * subscriptionQuantity} />
                </div>
              )}
            </motion.div>

            {/* Selection indicator */}
            <div className='mt-2 flex w-full items-center justify-center space-x-3'>
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all',
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 group-hover:border-blue-300',
                )}
              >
                {isSelected && <div className='h-3.5 w-3.5 rounded-full bg-white'></div>}
              </div>
              <span className='text-sm font-medium'>
                {isSelected ? t('selected') : t('select_plan')}
              </span>
              {/* Purchase button (only shown when selected and onPurchase is true) */}
              {isSelected && onPurchase && (
                <HoverBorderGradient
                  containerClassName='rounded-full ml-2'
                  as='button'
                  className='m-0 flex h-8 items-center justify-center px-4 py-0 text-sm font-medium text-white'
                  onClick={(e) => {
                    e.stopPropagation();
                    onPurchase();
                  }}
                >
                  {t('buyNow')}
                </HoverBorderGradient>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
