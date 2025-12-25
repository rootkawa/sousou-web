import { getSubscription } from '@/services/user/portal';
import { getLocale } from 'next-intl/server';
import Content from './content';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    id: string;
  }>;
}) {
  const { id } = await searchParams;
  const locale = await getLocale();
  const { data } = await getSubscription(
    {
      language: locale,
    },
    {
      skipErrorHandler: true,
    },
  );
  const subscriptionList = data.data?.list || [];
  const subscription = subscriptionList.find((item) => item.id === Number(id));

  return subscription ? (
    <main className='container space-y-16'>
      <Content subscription={subscription} />
    </main>
  ) : (
    <div className='container flex h-[50vh] flex-col items-center justify-center'>
      <h1 className='mb-2 text-2xl font-semibold text-gray-800'>Subscription not found</h1>
      <p className='text-gray-500'>
        The subscription you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
    </div>
  );
}
