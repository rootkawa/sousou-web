'use client';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Copy, Gift, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';

interface ReferralCodeCardProps {
  referCode?: string;
  referralPercentage?: number;
}

export function ReferralCodeCard({ referCode, referralPercentage }: ReferralCodeCardProps) {
  const t = useTranslations('affiliate');
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');

  // Set the invite URL after component mounts (client-side only)
  useEffect(() => {
    setInviteUrl(`${window.location.origin}/auth?invite=${referCode}`);
  }, [referCode]);

  const handleCodeCopy = (text: string, result: boolean) => {
    if (result) {
      setCodeCopied(true);
      toast.success(t('copySuccess'));
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const handleLinkCopy = (text: string, result: boolean) => {
    if (result) {
      setLinkCopied(true);
      toast.success(t('copySuccess'));
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <Card className='overflow-hidden border-2 shadow-md transition-all duration-300 hover:shadow-lg'>
      <CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 pb-4 dark:from-blue-950/40 dark:to-indigo-950/30'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <Gift className='h-5 w-5 text-indigo-500' />
              <CardTitle className='text-lg font-semibold'>{t('inviteCode')}</CardTitle>
            </div>
            <p className='text-muted-foreground mt-1 text-sm'>
              邀请好友注册并下单，您可以立即获得好友下单金额的{referralPercentage}
              %返现，并用于购买我们的任意一项服务。
            </p>
          </div>

          <div className='relative inline-flex items-center'>
            <div className='absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 opacity-70 blur-sm'></div>
            <div className='relative flex items-center gap-1.5 rounded-full border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 px-3 py-1.5 font-semibold text-amber-800 shadow-sm dark:border-amber-700/50 dark:from-amber-900/80 dark:to-amber-800/90 dark:text-amber-100'>
              <TrendingUp className='h-3.5 w-3.5 text-amber-600 dark:text-amber-300' />
              <span>{referralPercentage}%</span>
              <span className='text-xs font-medium opacity-90'>{t('commissionRate')}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pb-6 pt-5'>
        <div className='space-y-4'>
          <div className='bg-muted/50 border-muted-foreground/10 rounded-lg border p-4 text-center'>
            <code className='text-2xl font-bold tracking-wider'>{referCode}</code>
          </div>

          <CopyToClipboard text={referCode || ''} onCopy={handleCodeCopy}>
            <Button
              variant={codeCopied ? 'default' : 'outline'}
              size='default'
              className='w-full gap-2 font-medium transition-all duration-300'
            >
              <Copy className={`h-4 w-4 ${codeCopied ? 'text-white' : ''}`} />
              {codeCopied ? t('copySuccess') : t('copyInviteCode')}
            </Button>
          </CopyToClipboard>

          <CopyToClipboard text={inviteUrl} onCopy={handleLinkCopy}>
            <Button
              variant={linkCopied ? 'default' : 'outline'}
              size='default'
              className='w-full gap-2 font-medium transition-all duration-300'
            >
              <Copy className={`h-4 w-4 ${linkCopied ? 'text-white' : ''}`} />
              {linkCopied ? t('copySuccess') : t('copyInviteLink')}
            </Button>
          </CopyToClipboard>
        </div>
      </CardContent>
    </Card>
  );
}
