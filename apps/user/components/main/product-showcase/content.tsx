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
        className='text-muted-foreground mb-8 text-center text-lg'
      >
        {t('product_showcase_description')}
      </motion.p>
      <div className='mx-auto flex flex-wrap justify-center gap-8 overflow-x-auto overflow-y-hidden *:max-w-80 *:flex-auto'>
        {subscriptionData?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='w-1/2 lg:w-1/4'
          >
            {item.discount?.map((discountTier, discountIndex) => (
              <SubscriptionCard
                key={`${discountTier.quantity}`}
                item={item}
                discountTier={discountTier}
                t={t}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
