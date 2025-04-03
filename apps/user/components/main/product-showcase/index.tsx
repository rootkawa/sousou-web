'use client';

import { useEffect, useState } from 'react';
import { fetchSubscriptionData } from './actions';
import { Content } from './content';

export function ProductShowcase() {
  const [subscriptionList, setSubscriptionList] = useState<API.Subscribe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSubscriptionData();
        setSubscriptionList(data);
      } catch (error) {
        console.error('Failed to fetch subscription data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div className='flex justify-center py-8'>Loading Subscriptions...</div>;
  }

  if (subscriptionList.length === 0) return null;

  return <Content subscriptionData={subscriptionList} />;
}
