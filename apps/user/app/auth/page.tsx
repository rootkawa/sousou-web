'use client';

import { AuthCarousel } from '@/components/auth/auth-carousel';
import { OAuthMethods } from '@/components/auth/oauth-methods';
import LanguageSwitch from '@/components/language-switch';
import ThemeSwitch from '@/components/theme-switch';
import useGlobalStore from '@/config/use-global';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { useTranslations } from 'next-intl';
import Image from 'next/legacy/image';
import Link from 'next/link';
import EmailAuthForm from './email/auth-form';
import PhoneAuthForm from './phone/auth-form';

export default function Page() {
  const t = useTranslations('auth');
  const { common } = useGlobalStore();
  const { site, auth } = common;

  const AUTH_METHODS = [
    {
      key: 'email',
      enabled: auth.email.enable,
      children: <EmailAuthForm />,
    },
    {
      key: 'mobile',
      enabled: auth.mobile.enable,
      children: <PhoneAuthForm />,
    },
  ].filter((method) => method.enabled);

  const Logo = (
    <div className='flex flex-col'>
      <Link href='/' className='flex items-center gap-2'>
        {site.site_logo && (
          <div className='relative h-16 w-32 overflow-hidden'>
            <Image
              src={site.site_logo}
              layout='fill'
              alt='logo'
              unoptimized
              className='scale-150 object-contain'
            />
          </div>
        )}
        <span className='text-2xl font-bold'>{site.site_name}</span>
      </Link>
      <span className='text-muted-foreground mt-1 text-sm'>{site.site_desc}</span>
    </div>
  );

  return (
    <main className='bg-muted/50 flex h-full min-h-screen items-center'>
      <div className='flex size-full flex-auto flex-col lg:flex-row'>
        <div className='flex bg-cover bg-center lg:w-1/2 lg:flex-auto'>
          <div className='lg:py-15 flex w-full flex-col items-center justify-center px-5 py-7 md:px-10'>
            {Logo}
            <div className='mt-6 flex w-full justify-center'>
              <AuthCarousel t={t} />
            </div>
          </div>
        </div>
        <div className='flex flex-initial justify-center p-12 lg:flex-auto lg:justify-end'>
          <div className='lg:bg-background flex w-full flex-col items-center rounded-2xl md:w-[600px] md:p-10 lg:flex-auto lg:shadow'>
            <div className='flex w-full flex-col items-stretch justify-center md:w-[400px] lg:h-full'>
              <div className='flex flex-col justify-center lg:flex-auto'>
                <h1 className='mb-3 text-center text-2xl font-bold'>{t('verifyAccount')}</h1>
                <div className='text-muted-foreground mb-6 text-center font-medium'>
                  {t('verifyAccountDesc')}
                </div>
                {AUTH_METHODS.length === 1
                  ? AUTH_METHODS[0]?.children
                  : AUTH_METHODS[0] && (
                      <Tabs defaultValue={AUTH_METHODS[0].key}>
                        <TabsList className='mb-6 flex w-full *:flex-1'>
                          {AUTH_METHODS.map((item) => (
                            <TabsTrigger key={item.key} value={item.key}>
                              {t(`methods.${item.key}`)}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {AUTH_METHODS.map((item) => (
                          <TabsContent key={item.key} value={item.key}>
                            {item.children}
                          </TabsContent>
                        ))}
                      </Tabs>
                    )}
              </div>
              <div className='py-8'>
                <OAuthMethods />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                  <LanguageSwitch />
                  <ThemeSwitch />
                </div>
                <div className='text-primary flex gap-2 text-sm font-semibold'>
                  <Link href='/tos'>{t('tos')}</Link>
                  <span className='text-foreground/30'>|</span>
                  <Link href='/privacy-policy'>{t('privacyPolicy')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
