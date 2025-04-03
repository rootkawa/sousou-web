'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SubscriptionCard } from './subscription-card';

interface ProductShowcaseProps {
  subscriptionData: API.Subscribe[];
}

export function Content({ subscriptionData }: ProductShowcaseProps) {
  const t = useTranslations('index');
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-2 text-center text-3xl font-bold'
      >
        {t('product_showcase_title')}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='text-muted-foreground mb-16 text-center text-lg'
      >
        {t('product_showcase_description')}
      </motion.p>

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
                fromDashboard={false}
              />
            </motion.div>
          );
        }) || []}
      </div>
    </motion.section>
  );
}
