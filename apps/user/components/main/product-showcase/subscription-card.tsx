import { Display } from '@/components/display';
import { SubscribeDetail } from '@/components/subscribe/detail';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { Icon } from '@workspace/ui/custom-components/icon';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Key, ReactNode } from 'react';

interface SubscriptionCardProps {
  item: API.Subscribe;
  discountTier: API.SubscribeDiscount; // Replace with proper type if available
  t: ReturnType<typeof useTranslations>;
  isPopular: boolean;
}

export function SubscriptionCard({ item, discountTier, t, isPopular }: SubscriptionCardProps) {
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
        {discountTier.discount < 100 && (
          <div className='absolute right-0 top-0 z-10 overflow-hidden'>
            <div className='relative h-20 w-20'>
              <div className='absolute right-[-40px] top-[12px] w-[140px] rotate-45 bg-slate-600 py-1.5 text-center text-sm font-medium text-white shadow-sm'>
                {100 - discountTier.discount}% {t('off')}
              </div>
            </div>
          </div>
        )}

        <CardHeader className='bg-muted/50 p-4 text-xl font-medium'>
          {discountTier.quantity} {t(item.unit_time)}
        </CardHeader>
        <CardContent className='flex flex-grow flex-col gap-4 p-6 text-sm'>
          <ul className='flex flex-grow flex-col gap-3'>
            {(() => {
              let parsedDescription;
              try {
                parsedDescription = JSON.parse(item.description);
              } catch {
                parsedDescription = { description: '', features: [] };
              }

              const { description, features } = parsedDescription;
              return (
                <>
                  {description && <li className='text-muted-foreground'>{description}</li>}
                  {features.map(
                    (
                      feature: {
                        type: string;
                        icon: string;
                        label: ReactNode;
                      },
                      index: Key,
                    ) => (
                      <li
                        className={cn('flex items-center gap-2', {
                          'text-muted-foreground line-through': feature.type === 'destructive',
                        })}
                        key={index}
                      >
                        {feature.icon && (
                          <Icon
                            icon={feature.icon}
                            className={cn('text-primary size-5', {
                              'text-green-500': feature.type === 'success',
                              'text-destructive': feature.type === 'destructive',
                            })}
                          />
                        )}
                        {feature.label}
                      </li>
                    ),
                  )}
                </>
              );
            })()}
          </ul>
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
            <div className='text-2xl font-semibold sm:text-3xl'>
              <Display type='currency' value={(item.unit_price * discountTier.discount) / 100} />
              <span className='text-base font-medium'>/{t(item.unit_time)}</span>
            </div>
            <div className='text-muted-foreground text-sm'>
              {t('total')}:{' '}
              <Display
                type='currency'
                value={(item.unit_price * discountTier.discount * discountTier.quantity) / 100}
              />
            </div>
          </motion.div>
          <motion.div>
            <Button className='absolute bottom-0 left-0 w-full rounded-b-xl rounded-t-none' asChild>
              <Link href={`/purchasing?id=${item.id}&quantity=${discountTier.quantity}`}>
                {t('subscribe')}
              </Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
}
