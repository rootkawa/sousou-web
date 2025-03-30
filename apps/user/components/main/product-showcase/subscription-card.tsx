import { Display } from '@/components/display';
import { SubscribeDetail } from '@/components/subscribe/detail';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface SubscriptionCardProps {
  item: API.Subscribe;
  subscriptionDiscount: number; // Replace with proper type if available
  subscriptionQuantity: number; // Replace with proper type if available
  t: ReturnType<typeof useTranslations>;
  isPopular: boolean;
  fromDashboard: boolean;
  onSubscribe?: () => void;
}

export function SubscriptionCard({
  item,
  subscriptionDiscount,
  subscriptionQuantity,
  t,
  isPopular,
  fromDashboard,
  onSubscribe,
}: SubscriptionCardProps) {
  return (
    <div className='relative flex flex-col'>
      {/* Popular badge positioned above the card */}
      {isPopular && (
        <div className='bg-primary text-primary-foreground absolute left-0 right-0 top-[-36px] rounded-t-lg py-2 text-center text-sm font-medium'>
          {t('most_popular')}
        </div>
      )}
      <Card
        className={cn(
          'flex h-full flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl',
          isPopular ? 'rounded-t-none border-2 border-amber-400 shadow-amber-200/50' : '',
        )}
      >
        {/* Discount ribbon */}
        {subscriptionDiscount != 0 && (
          <div className='absolute right-0 top-0 z-10 overflow-hidden'>
            <div className='relative h-20 w-20'>
              <div className='absolute right-[-40px] top-[12px] w-[140px] rotate-45 bg-slate-600 py-1.5 text-center text-sm font-medium text-white shadow-sm'>
                {t('saves')} {subscriptionDiscount}%
              </div>
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
        <Separator />
        <CardFooter className='relative flex flex-col gap-4 p-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='pb-4'
          >
            {item.unit_time == 'Month' && (
              <div className='text-2xl font-semibold sm:text-3xl'>
                <Display type='currency' value={item.unit_price} />
                <span className='text-base font-medium'>/{t(item.unit_time)}</span>
              </div>
            )}
            {item.unit_time == 'Day' && (
              <div className='text-2xl font-semibold sm:text-3xl'>
                <Display type='currency' value={item.unit_price * subscriptionQuantity} />
              </div>
            )}
            {/* <div className='text-muted-foreground text-sm'>
              <div>
                {t('total')}:
                <Display
                  type='currency'
                  value={(item.unit_price * discountTier.discount * discountTier.quantity) / 100}
                />
              </div>
            </div> */}
          </motion.div>
          <motion.div>
            {fromDashboard ? (
              <Button
                className='absolute bottom-0 left-0 w-full rounded-b-xl rounded-t-none'
                onClick={onSubscribe}
              >
                {t('buy')}
              </Button>
            ) : (
              <Button
                className='absolute bottom-0 left-0 w-full rounded-b-xl rounded-t-none'
                asChild
              >
                <Link href={`/purchasing?id=${item.id}`}>{t('subscribe')}</Link>
              </Button>
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
}
