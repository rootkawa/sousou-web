'use client';

import { querySubscribeGroupList, querySubscribeList } from '@/services/user/subscribe';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Empty } from '@/components/empty';
import { SubscriptionCard } from '@/components/main/product-showcase/subscription-card/subscription-card';
import Purchase from '@/components/subscribe/purchase';
import { motion } from 'framer-motion';

export default function Page() {
  const t = useTranslations('subscribe');
  const [subscribe, setSubscribe] = useState<API.Subscribe>();

  const [group, setGroup] = useState<string>('');

  const { data: groups } = useQuery({
    queryKey: ['querySubscribeGroupList'],
    queryFn: async () => {
      const { data } = await querySubscribeGroupList();
      return data.data?.list || [];
    },
  });

  const { data } = useQuery({
    queryKey: ['querySubscribeList'],
    queryFn: async () => {
      const { data } = await querySubscribeList();
      return data.data?.list || [];
    },
  });

  return (
    <>
      <Tabs value={group} onValueChange={setGroup} className='space-y-4'>
        {groups && groups.length > 0 && (
          <>
            <h1 className='text-muted-foreground w-full'>{t('category')}</h1>
            <TabsList>
              <TabsTrigger value=''>{t('all')}</TabsTrigger>
              {groups.map((group) => (
                <TabsTrigger key={group.id} value={String(group.id)}>
                  {group.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <h2 className='text-muted-foreground w-full'>{t('products')}</h2>
          </>
        )}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
          {data
            ?.filter((item) => (group ? item.group_id === Number(group) : true))
            ?.map((item, index) => {
              const isPopular = item.name.includes('超值');
              let parsedDescription;
              try {
                parsedDescription = JSON.parse(item.description);
              } catch {
                parsedDescription = { description: '', features: {} };
              }

              // Extract duration and saves from features
              let subscriptionQuantity = 1; // Default to 1
              let subscriptionDiscount = 0; // Default to 0
              const features = parsedDescription.features;
              // Simple direct property access for the dictionary
              if (features) {
                // Get duration/quantity from features
                if (features.duration) {
                  subscriptionQuantity = parseFloat(features.duration) || 1;
                }

                // Get saves/discount from features
                if (features.saves) {
                  subscriptionDiscount = parseFloat(features.saves) || 0;
                }
              }
              return (
                <motion.div
                  key={`${item.id}-${item.name}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='w-full'
                >
                  <SubscriptionCard
                    item={item}
                    subscriptionDiscount={subscriptionDiscount}
                    subscriptionQuantity={subscriptionQuantity}
                    t={t}
                    isPopular={isPopular}
                    fromDashboard={true}
                    onSubscribe={() => {
                      setSubscribe(item);
                    }}
                  />
                </motion.div>
              );
            })}
        </div>
        {data?.length === 0 && <Empty />}
      </Tabs>
      <Purchase subscribe={subscribe} setSubscribe={setSubscribe} />
    </>
  );
}
