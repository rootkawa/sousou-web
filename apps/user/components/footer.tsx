'use client';

import {
  NEXT_PUBLIC_DISCORD_LINK,
  NEXT_PUBLIC_EMAIL,
  NEXT_PUBLIC_GITHUB_LINK,
  NEXT_PUBLIC_INSTAGRAM_LINK,
  NEXT_PUBLIC_LINKEDIN_LINK,
  NEXT_PUBLIC_TELEGRAM_LINK,
  NEXT_PUBLIC_TWITTER_LINK,
} from '@/config/constants';
import useGlobalStore from '@/config/use-global';
import { Separator } from '@workspace/ui/components/separator';
import { Icon } from '@workspace/ui/custom-components/icon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Links = [
  {
    icon: 'uil:envelope',
    href: NEXT_PUBLIC_EMAIL ? `mailto:${NEXT_PUBLIC_EMAIL}` : undefined,
  },
  {
    icon: 'uil:telegram',
    href: NEXT_PUBLIC_TELEGRAM_LINK,
  },
  {
    icon: 'uil:twitter',
    href: NEXT_PUBLIC_TWITTER_LINK,
  },
  {
    icon: 'uil:discord',
    href: NEXT_PUBLIC_DISCORD_LINK,
  },
  {
    icon: 'uil:instagram',
    href: NEXT_PUBLIC_INSTAGRAM_LINK,
  },
  {
    icon: 'uil:linkedin',
    href: NEXT_PUBLIC_LINKEDIN_LINK,
  },
  {
    icon: 'uil:github',
    href: NEXT_PUBLIC_GITHUB_LINK,
  },
];

export default function Footer() {
  const { common } = useGlobalStore();
  const { site } = common;
  const t = useTranslations('auth');
  return (
    <footer>
      <Separator className='my-14' />
      <div className='text-muted-foreground mx-auto mb-14 flex max-w-[95%] flex-wrap justify-between gap-4 text-sm 2xl:max-w-[90%]'>
        <nav className='flex flex-wrap items-center gap-2'>
          {Links.filter((item) => item.href).map((item, index) => (
            <div key={index} className='flex items-center gap-2'>
              {index !== 0 && <Separator orientation='vertical' />}
              <Link href={item.href!}>
                <Icon icon={item.icon} className='text-foreground size-5' />
              </Link>
            </div>
          ))}
        </nav>
        <div>
          <strong className='text-foreground'>{site.site_name}</strong> © All rights reserved.
          <div>
            <Link href='/tos' className='underline'>
              {t('tos')}
            </Link>
            <Link href='/privacy-policy' className='ml-2 underline'>
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
