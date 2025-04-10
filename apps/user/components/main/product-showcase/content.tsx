'use client';

import { HoverBorderGradient } from '@workspace/ui/components/hover-border-gradient';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { memo, useCallback, useMemo, useState } from 'react';
import { SubscriptionCard } from './subscription-card/subscription-card';
import parseSubscriptionFeatures from './subscription-card/subscription-parser';

interface ProductShowcaseProps {
  subscriptionData: API.Subscribe[];
}

const MemoizedSubscriptionCard = memo(SubscriptionCard);

export function Content({ subscriptionData }: ProductShowcaseProps) {
  const t = useTranslations('index');

  // Default to the first plan
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const handleSelectPlan = useCallback((index: number) => {
    setSelectedPlanIndex(index);
  }, []);

  const processedSubscriptionData = useMemo(() => {
    return subscriptionData.map((item) => ({
      ...item,
      ...parseSubscriptionFeatures(item),
    }));
  }, [subscriptionData]);

  return (
    <div className='flex flex-col items-center'>
      <h2 className='mb-2 text-center text-3xl font-bold'>{t('product_showcase_title')}</h2>
      <p className='text-muted-foreground mb-16 text-center text-lg'>
        {t('product_showcase_description')}
      </p>

      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {processedSubscriptionData?.map((item, index) => {
          return (
            <div key={`${item.id}-${item.name}`} className='w-full'>
              <MemoizedSubscriptionCard
                item={item}
                subscriptionDiscount={item.subscriptionDiscount}
                subscriptionQuantity={item.subscriptionQuantity}
                t={t}
                isPopular={item.isPopular}
                isSelected={index === selectedPlanIndex}
                onSelect={() => handleSelectPlan(index)}
              />
            </div>
          );
        }) || []}
      </div>

      {/* Common subscription button for the selected plan */}
      {subscriptionData && subscriptionData.length > 0 && selectedPlanIndex >= 0 && (
        <div className='mt-12 flex w-full max-w-md items-center justify-center'>
          <Link href={`/purchasing?id=${subscriptionData[selectedPlanIndex]?.id}`}>
            <HoverBorderGradient
              containerClassName='rounded-full'
              as='button'
              className='m-0.5 flex items-center space-x-2 text-white'
            >
              {t('purchase_selected_plan')}
            </HoverBorderGradient>
          </Link>
        </div>
      )}
    </div>
  );
}
