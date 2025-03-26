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
        {subscriptionData?.flatMap((item, index) => {
          const allOptions = [{ quantity: 1, discount: 100 }, ...(item.discount || [])];

          return allOptions.map((discountTier, discountIndex) => {
            const isPopular = discountTier.quantity === 6;

            return (
              <motion.div
                key={`${item.id}-${discountTier.quantity}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + discountIndex) * 0.1 }}
                className='w-full'
              >
                <SubscriptionCard
                  item={item}
                  discountTier={discountTier}
                  t={t}
                  isPopular={isPopular}
                />
              </motion.div>
            );
          });
        }) || []}
      </div>
    </motion.section>
  );
}
