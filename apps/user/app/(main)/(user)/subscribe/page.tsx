'use client';

import { querySubscribeGroupList, querySubscribeList } from '@/services/user/subscribe';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { useTranslations } from 'next-intl';
import { memo, useCallback, useMemo, useState } from 'react';

import { Empty } from '@/components/empty';
import { SubscriptionCard } from '@/components/main/product-showcase/subscription-card/subscription-card';
import parseSubscriptionFeatures from '@/components/main/product-showcase/subscription-card/subscription-parser';
import Purchase from '@/components/subscribe/purchase';
import { HoverBorderGradient } from '@workspace/ui/components/hover-border-gradient';

// Memoize the SubscriptionCard component to prevent unnecessary re-renders
const MemoizedSubscriptionCard = memo(SubscriptionCard);

// Feature flag to control group filtering UI visibility
const ENABLE_GROUP_FILTERING = false;

export default function SubscribePage() {
  const t = useTranslations('subscribe');

  const [subscribe, setSubscribe] = useState<API.Subscribe>();
  const [group, setGroup] = useState<string>('');

  // Only fetch groups if the feature is enabled
  const { data: groups } = useQuery({
    queryKey: ['querySubscribeGroupList'],
    queryFn: async () => {
      if (!ENABLE_GROUP_FILTERING) return [];
      const { data } = await querySubscribeGroupList();
      return data.data?.list || [];
    },
    enabled: ENABLE_GROUP_FILTERING,
  });

  const { data } = useQuery({
    queryKey: ['querySubscribeList'],
    queryFn: async () => {
      const { data } = await querySubscribeList();
      return data.data?.list || [];
    },
  });

  // Memoize filtered subscriptions - if feature is disabled, show all
  const filteredSubscriptions = useMemo(() => {
    if (!ENABLE_GROUP_FILTERING) return data || [];
    return data?.filter((item) => (group ? item.group_id === Number(group) : true)) || [];
  }, [data, group]);

  // Memoize the processed subscription data
  const processedSubscriptions = useMemo(() => {
    return filteredSubscriptions.map((item) => ({
      ...item,
      ...parseSubscriptionFeatures(item),
    }));
  }, [filteredSubscriptions]);

  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);

  const handleSelectPlan = useCallback((index: number) => {
    setSelectedPlanIndex(index);
  }, []);

  // Get the selected subscription based on selectedPlanIndex
  const selectedSubscription = useMemo(() => {
    return filteredSubscriptions[selectedPlanIndex];
  }, [filteredSubscriptions, selectedPlanIndex]);

  // Memoize the onClick handler
  const handlePurchaseClick = useCallback(() => {
    if (selectedSubscription) {
      setSubscribe(selectedSubscription);
    }
  }, [selectedSubscription]);

  return (
    <>
      {ENABLE_GROUP_FILTERING ? (
        <Tabs value={group} onValueChange={setGroup} className='space-y-4'>
          {groups && groups.length > 0 && (
            <>
              <h1 className='text-muted-foreground w-full'>{t('category')}</h1>
              <div className='flex items-center justify-between'>
                <TabsList>
                  <TabsTrigger value=''>{t('all')}</TabsTrigger>
                  {groups.map((group) => (
                    <TabsTrigger key={group.id} value={String(group.id)}>
                      {group.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Checkout button */}
                <HoverBorderGradient
                  containerClassName='rounded-full'
                  as='button'
                  className='m-0.5 flex items-center space-x-2 text-white'
                  onClick={handlePurchaseClick}
                >
                  {t('purchase_selected_plan')}
                </HoverBorderGradient>
              </div>
              <h2 className='text-muted-foreground w-full'>{t('products')}</h2>
            </>
          )}
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
              />
            ))}
          </div>
          {data?.length === 0 && <Empty />}
        </Tabs>
      ) : (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-muted-foreground'>{t('products')}</h2>

            {/* Purchase button */}
            <HoverBorderGradient
              containerClassName='rounded-full'
              as='button'
              className='m-0.5 flex items-center space-x-2 text-white'
              onClick={handlePurchaseClick}
            >
              {t('purchase_selected_plan')}
            </HoverBorderGradient>
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
              />
            ))}
          </div>
          {data?.length === 0 && <Empty />}
        </div>
      )}

      {/* Only render Purchase component when subscribe is defined */}
      {subscribe && <Purchase subscribe={subscribe} setSubscribe={setSubscribe} />}
    </>
  );
}
