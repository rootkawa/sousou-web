import { env } from 'next-runtime-env';
import packageJSON from '../package.json';

export const locales = packageJSON.i18n.outputLocales;
export const defaultLocale = packageJSON.i18n.entry;

// language config
export const NEXT_PUBLIC_DEFAULT_LANGUAGE =
  env('NEXT_PUBLIC_DEFAULT_LANGUAGE') ?? process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE ?? defaultLocale;

// banner config
export const NEXT_PUBLIC_LIMITED_OFFER_END_DATE =
  env('NEXT_PUBLIC_LIMITED_OFFER_END_DATE') ??
  process.env.NEXT_PUBLIC_LIMITED_OFFER_END_DATE ??
  '20000000';

// promotion config
export const NEXT_PUBLIC_PROMOTION_TITLE =
  env('NEXT_PUBLIC_PROMOTION_TITLE') ?? process.env.NEXT_PUBLIC_PROMOTION_TITLE ?? '敬请期待';
export const NEXT_PUBLIC_PROMOTION_DESCRIPTION =
  env('NEXT_PUBLIC_PROMOTION_DESCRIPTION') ?? process.env.NEXT_PUBLIC_PROMOTION_DESCRIPTION ?? '';
export const NEXT_PUBLIC_AFFILIATE_SHARE_TITLE =
  env('NEXT_PUBLIC_AFFILIATE_SHARE_TITLE') ??
  process.env.NEXT_PUBLIC_AFFILIATE_SHARE_TITLE ??
  '敬请期待';
export const NEXT_PUBLIC_AFFILIATE_SHARE_DESCRIPTION =
  env('NEXT_PUBLIC_AFFILIATE_SHARE_DESCRIPTION') ??
  process.env.NEXT_PUBLIC_AFFILIATE_SHARE_DESCRIPTION ??
  '';

// site config
export const NEXT_PUBLIC_SITE_URL = env('NEXT_PUBLIC_SITE_URL') ?? process.env.NEXT_PUBLIC_SITE_URL;
export const NEXT_PUBLIC_API_URL = env('NEXT_PUBLIC_API_URL') ?? process.env.NEXT_PUBLIC_API_URL;
export const NEXT_PUBLIC_SURVEY_URL =
  env('NEXT_PUBLIC_SURVEY_URL') ?? process.env.NEXT_PUBLIC_SURVEY_URL;
export const NEXT_PUBLIC_CDN_URL =
  env('NEXT_PUBLIC_CDN_URL') || process.env.NEXT_PUBLIC_CDN_URL || 'https://fastly.jsdelivr.net';
export const NEXT_PUBLIC_CLARITY_PROJECT_ID =
  env('NEXT_PUBLIC_CLARITY_PROJECT_ID') ?? process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? '';

// config for default user
export const NEXT_PUBLIC_DEFAULT_USER_EMAIL =
  env('NEXT_PUBLIC_DEFAULT_USER_EMAIL') ?? process.env.NEXT_PUBLIC_DEFAULT_USER_EMAIL;
export const NEXT_PUBLIC_DEFAULT_USER_PASSWORD =
  env('NEXT_PUBLIC_DEFAULT_USER_PASSWORD') ?? process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD;

// config for social links
export const NEXT_PUBLIC_EMAIL = env('NEXT_PUBLIC_EMAIL') ?? process.env.NEXT_PUBLIC_EMAIL;
export const NEXT_PUBLIC_TELEGRAM_LINK =
  env('NEXT_PUBLIC_TELEGRAM_LINK') ?? process.env.NEXT_PUBLIC_TELEGRAM_LINK;
export const NEXT_PUBLIC_DISCORD_LINK =
  env('NEXT_PUBLIC_DISCORD_LINK') ?? process.env.NEXT_PUBLIC_DISCORD_LINK;
export const NEXT_PUBLIC_GITHUB_LINK =
  env('NEXT_PUBLIC_GITHUB_LINK') ?? process.env.NEXT_PUBLIC_GITHUB_LINK;
export const NEXT_PUBLIC_LINKEDIN_LINK =
  env('NEXT_PUBLIC_LINKEDIN_LINK') ?? process.env.NEXT_PUBLIC_LINKEDIN_LINK;
export const NEXT_PUBLIC_TWITTER_LINK =
  env('NEXT_PUBLIC_TWITTER_LINK') ?? process.env.NEXT_PUBLIC_TWITTER_LINK;
export const NEXT_PUBLIC_INSTAGRAM_LINK =
  env('NEXT_PUBLIC_INSTAGRAM_LINK') ?? process.env.NEXT_PUBLIC_INSTAGRAM_LINK;

export const NEXT_PUBLIC_HOME_USER_COUNT = (() => {
  const value = env('NEXT_PUBLIC_HOME_USER_COUNT') ?? process.env.NEXT_PUBLIC_HOME_USER_COUNT;
  const numberValue = Number(value);
  if (isNaN(numberValue)) return 999;
  return numberValue;
})();

export const NEXT_PUBLIC_HOME_SERVER_COUNT = (() => {
  const value = env('NEXT_PUBLIC_HOME_SERVER_COUNT') ?? process.env.NEXT_PUBLIC_HOME_SERVER_COUNT;
  const numberValue = Number(value);
  if (isNaN(numberValue)) return 999;
  return numberValue;
})();

export const NEXT_PUBLIC_HOME_LOCATION_COUNT = (() => {
  const value =
    env('NEXT_PUBLIC_HOME_LOCATION_COUNT') ?? process.env.NEXT_PUBLIC_HOME_LOCATION_COUNT;
  const numberValue = Number(value);
  if (isNaN(numberValue)) return 999;
  return numberValue;
})();
