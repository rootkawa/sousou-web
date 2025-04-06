'use client';

import { Display } from '@/components/display';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { TrendingUpIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CommissionCardProps {
  totalCommission?: number;
}

export function CommissionCard({ totalCommission }: CommissionCardProps) {
  const t = useTranslations('affiliate');

  return (
    <Card className='overflow-hidden border-2'>
      <CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 pb-4 dark:from-blue-950/40 dark:to-indigo-950/30'>
        <div className='flex items-center gap-3'>
          <div className='bg-primary/10 rounded-full p-2'>
            <TrendingUpIcon className='text-primary h-5 w-5' />
          </div>
          <CardTitle className='text-xl font-semibold'>{t('totalCommission')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-1'>
            <p className='text-muted-foreground text-sm'>{t('commissionInfo')}</p>
            <div className='flex items-baseline gap-2'>
              <span className='text-3xl font-bold'>
                <Display type='currency' value={totalCommission} />
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
