'use client';

import { querySubscribeList } from '@/services/user/subscribe';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';

import { Empty } from '@/components/empty';
import { SubscriptionCard } from '@/components/main/product-showcase/subscription-card/subscription-card';
import parseSubscriptionFeatures from '@/components/main/product-showcase/subscription-card/subscription-parser';
import Purchase from '@/components/subscribe/purchase';

// Memoize the SubscriptionCard component to prevent unnecessary re-renders
const MemoizedSubscriptionCard = memo(SubscriptionCard) as typeof SubscriptionCard;

// Feature flag to control group filtering UI visibility
const ENABLE_GROUP_FILTERING = false;

export default function SubscribePage() {
  const t = useTranslations('subscribe');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const idParam = searchParams?.get('id');

  const [subscribe, setSubscribe] = useState<API.Subscribe>();

  const { data } = useQuery({
    queryKey: ['querySubscribeList', locale],
    queryFn: async () => {
      console.log('Fetching subscription list...');
      const { data } = await querySubscribeList({ language: locale });
      return data.data?.list || [];
    },
  });

  // Since ENABLE_GROUP_FILTERING is false, we just use all data
  const filteredSubscriptions = data || [];

  // Process subscription data with parsed features
  const processedSubscriptions = filteredSubscriptions.map((item) => ({
    ...item,
    ...parseSubscriptionFeatures(item),
  }));

  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);

  // Handle initial selection based on URL param
  useEffect(() => {
    if (idParam && filteredSubscriptions?.length) {
      const index = filteredSubscriptions.findIndex((item) => String(item.id) === idParam);
      if (index !== -1) {
        setSelectedPlanIndex(index);
        setSubscribe(filteredSubscriptions[index]);
      }
    }
  }, [idParam, filteredSubscriptions]);

  const handleSelectPlan = useCallback((index: number) => {
    setSelectedPlanIndex(index);
  }, []);

  // Handle purchase for a specific subscription
  const handlePurchase = useCallback((subscription: API.Subscribe) => {
    setSubscribe(subscription);
  }, []);

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-muted-foreground'>{t('products')}</h2>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
          {processedSubscriptions.map((processed, index) => (
            <MemoizedSubscriptionCard
              key={`${processed.id}-${processed.name}`}
              item={processed}
              subscriptionDiscount={processed.subscriptionDiscount}
              subscriptionQuantity={processed.subscriptionQuantity}
              t={t}
              isPopular={processed.isPopular}
              isSelected={index === selectedPlanIndex}
              onSelect={() => handleSelectPlan(index)}
              onPurchase={() => handlePurchase(processed)}
            />
          ))}
        </div>
        {data?.length === 0 && <Empty />}
      </div>

      {/* Only render Purchase component when subscribe is defined */}
      {subscribe && <Purchase subscribe={subscribe} setSubscribe={setSubscribe} />}
    </>
  );
}
