'use client';

import { querySubscribeGroupList, querySubscribeList } from '@/services/user/subscribe';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Empty } from '@/components/empty';
import { SubscriptionCard } from '@/components/main/product-showcase/subscription-card';
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
              // Extract discount from name if format is xxxx-xxxx-xxxx
              let subscriptionName = '';
              try {
                subscriptionName = item.name?.split('-')[0] || '';
              } catch {}
              let subscriptionDiscount = 0;
              try {
                subscriptionDiscount = parseFloat(item.name?.split('-')[1] || '0');
              } catch {}
              let subscriptionQuantity = 0;
              try {
                subscriptionQuantity = parseFloat(item.name?.split('-')[2] || '0');
              } catch {}
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
                    subscriptionName={subscriptionName}
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
