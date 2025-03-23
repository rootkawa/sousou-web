'use server';

import { getSubscription } from '@/services/user/portal';

export async function fetchSubscriptionData() {
  try {
    const { data } = await getSubscription({
      skipErrorHandler: true,
    });
    return data.data?.list || [];
  } catch (error) {
    return [];
  }
}
