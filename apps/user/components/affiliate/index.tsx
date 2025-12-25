'use client';

import { Empty } from '@/components/empty';
import { ProList } from '@/components/pro-list';
import useGlobalStore from '@/config/use-global';
import { queryUserAffiliate, queryUserAffiliateList } from '@/services/user/user';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@workspace/ui/components/card';
import { formatDate } from '@workspace/ui/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CommissionCard } from './commission-card';
import { ReferralCodeCard } from './referral-code-card';

export default function Affiliate() {
  const t = useTranslations('affiliate');
  const { user, common } = useGlobalStore();
  const [sum, setSum] = useState<number>();
  const { data } = useQuery({
    queryKey: ['queryUserAffiliate'],
    queryFn: async () => {
      const response = await queryUserAffiliate();
      return response.data.data;
    },
  });

  return (
    <div className='flex flex-col gap-4'>
      <CommissionCard totalCommission={data?.total_commission} />

      <ReferralCodeCard
        referCode={user?.refer_code}
        referralPercentage={common?.invite?.referral_percentage}
      />


      <ProList<API.UserAffiliate, Record<string, unknown>>
        request={async (pagination, filter) => {
          const response = await queryUserAffiliateList({ ...pagination, ...filter });
          setSum(response.data.data?.sum);
          return {
            list: response.data.data?.list || [],
            total: response.data.data?.total || 0,
          };
        }}
        header={{
          title: t('inviteRecords'),
        }}
        renderItem={(item) => {
          return (
            <Card className='overflow-hidden'>
              <CardContent className='p-3 text-sm'>
                <ul className='grid grid-cols-2 gap-3 *:flex *:flex-col'>
                  <li className='font-semibold'>
                    <span className='text-muted-foreground'>{t('userIdentifier')}</span>
                    <span>{item.identifier}</span>
                  </li>
                  <li className='font-semibold'>
                    <span className='text-muted-foreground'>{t('registrationTime')}</span>
                    <time>{formatDate(item.registered_at)}</time>
                  </li>
                </ul>
              </CardContent>
            </Card>
          );
        }}
        empty={<Empty />}
      />
    </div>
  );
}
