'use client';

import { HoverBorderGradient } from '@workspace/ui/components/hover-border-gradient';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { memo, useState } from 'react';
import { SubscriptionCard } from './subscription-card/subscription-card';

interface ProductShowcaseProps {
  subscriptionData: API.Subscribe[];
}

const MemoizedSubscriptionCard = memo(SubscriptionCard);

export function Content({ subscriptionData }: ProductShowcaseProps) {
  const t = useTranslations('index');

  // Default to the first plan
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const handleSelectPlan = (index: number) => {
    setSelectedPlanIndex(index);
  };

  return (
    <div className='flex flex-col items-center'>
      <h2 className='mb-2 text-center text-3xl font-bold'>{t('product_showcase_title')}</h2>
      <p className='text-muted-foreground mb-16 text-center text-lg'>
        {t('product_showcase_description')}
      </p>

      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {subscriptionData?.map((item, index) => {
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
            <div key={`${item.id}-${item.name}`} className='w-full'>
              <MemoizedSubscriptionCard
                item={item}
                subscriptionDiscount={subscriptionDiscount}
                subscriptionQuantity={subscriptionQuantity}
                t={t}
                isPopular={isPopular}
                fromDashboard={false}
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
